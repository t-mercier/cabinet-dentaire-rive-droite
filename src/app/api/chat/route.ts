/**
 * API Route for chat assistant
 *
 * Purpose: Handle chat messages with intelligent AI responses
 * Features: AI-powered conversation management, intelligent data extraction
 *
 * This implementation uses AI to:
 * - Extract patient information (name, contact, preferences)
 * - Determine conversation intent and readiness
 * - Decide when to close conversation and send email
 *
 * Benefits over pattern matching:
 * - More flexible and natural language understanding
 * - Handles edge cases and variations automatically
 * - Less maintenance (no keyword lists)
 * - Better user experience
 */

import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { createMistral } from '@ai-sdk/mistral'
import { streamText, generateObject } from 'ai'
import { z } from 'zod'

const mistral = createMistral({ apiKey: process.env.MISTRAL_API_KEY })

const SYSTEM_PROMPT = `Tu es l'assistant·e du Cabinet Dentaire Rive Droite (Bordeaux).
Ton rôle : aider les patients à prendre rendez-vous, obtenir un devis, ou répondre à leurs questions.

🎯 DÉTECTION AUTOMATIQUE DE L'INTENT :
- Si le patient veut un RDV → Flow "Rendez-vous"
- Si le patient veut un devis → Flow "Devis"  
- Si le patient pose une question → Réponds avec les infos du site
- Si le patient veut juste discuter → Redirige poliment vers les services

📋 FLOW RENDEZ-VOUS (collecte dans l'ordre) :
1. Type de soin ? (contrôle, détartrage, implant, blanchiment, etc.)
2. Préférence de praticien ? (optionnel - ne pas insister)
3. Disponibilités ? (jours/horaires préférés)
4. Nom complet ?
5. Contact ? (téléphone 10 chiffres OU email avec @)

Une fois TOUTES les infos collectées → Récapitulatif + "Je transmets au secrétariat" + "Besoin d'autre chose ?"

💰 FLOW DEVIS (collecte dans l'ordre) :
1. Type de soin ?
2. Nom complet ?
3. Contact ? (téléphone 10 chiffres OU email avec @)

Une fois TOUTES les infos collectées → Récapitulatif + "Je transmets pour devis" + "Besoin d'autre chose ?"

✅ RÈGLES DE VALIDATION :
- Téléphone : DOIT avoir 10 chiffres minimum (ex: 0612345678)
  → Si moins de 10 chiffres : "Ce numéro semble incomplet, peux-tu me donner les 10 chiffres ?"
- Email : DOIT avoir @ et un point
  → Si invalide : "Cet email semble incomplet, peux-tu vérifier ?"
- Ne JAMAIS dire "je transmets" avant d'avoir un contact valide

🚫 INTERDICTIONS :
- Ne dis PAS "je note", "je retiens", "je transmets" PENDANT la collecte
- Ne confirme JAMAIS un RDV ou un créneau définitif
- Pas de SMS/email automatique - juste "le secrétariat vous recontactera"
- Pas de RDV samedi/dimanche (cabinet fermé)

💬 STYLE :
- Naturel, chaleureux, professionnel
- Réponses courtes (1-2 phrases max)
- Tutoiement ou vouvoiement selon le ton du patient
- Jamais "je suis un bot" ou "IA"

⏰ HORAIRES : Lun-Ven 9h-19h30. Fermé week-end.
`

const SITE_URLS = [
  'https://www.cabinetdentairerivedroite.com/',
  'https://www.cabinetdentairerivedroite.com/services',
  'https://www.cabinetdentairerivedroite.com/equipe',
  'https://www.cabinetdentairerivedroite.com/contact'
];

async function fetchSiteContext() {
  try {
    const texts = await Promise.all(
      SITE_URLS.map(async (u) => {
        const r = await fetch(u, { headers: { 'User-Agent': 'CDRD-Assistant/1.0' } });
        const html = await r.text();
        // extraction ultra simple du texte
        return html
          .replace(/<script[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 10000); // extraction plus grande pour avoir plus de contexte
      })
    );
    return texts.join('\n\n---\n\n');
  } catch {
    return '';
  }
}


// ==================== TYPE DEFINITIONS ====================

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Zod schemas for AI-powered structured extraction
const ConversationAnalysisSchema = z.object({
  intent: z.enum(['appointment', 'quote', 'question', 'other']).describe('The primary intent of the user in this conversation'),

  patientInfo: z.object({
    nom: z.string().nullable().describe('Full name of the patient (e.g., "Jean Dupont"). Extract ONLY if explicitly provided. Should be capitalized properly.'),
    email: z.string().nullable().describe('Email address if provided. Must contain @ and a domain (e.g., test@example.com). Return null if invalid format or missing @ or dot.'),
    telephone: z.string().nullable().describe('Phone number if provided. Must contain at least 10 digits. Return null if less than 10 digits (e.g., "071123" is invalid, return null).'),
    service: z.string().nullable().describe('Type of dental service requested (e.g., "contrôle", "détartrage", "implant", "blanchiment", "prothèse", etc.)'),
    praticien: z.string().nullable().describe('Preferred practitioner if mentioned (e.g., "Dr. Azma", "Dr. Chevalier", "Dr. Seguela", "Dr. Mercier", "Dr. Liotard", "Dr. Aumailley")'),
    disponibilites: z.string().nullable().describe('Patient\'s availability preferences (days, times, date ranges). Combine all mentions into a readable summary.')
  }).describe('Extracted patient information from the conversation'),

  hasValidContact: z.boolean().describe('True if email is valid (contains @ and .) OR telephone is valid (at least 10 digits). False otherwise.'),

  isComplete: z.boolean().describe('True if all required information has been collected based on the intent'),

  missingFields: z.array(z.string()).describe('List of missing required fields (e.g., ["nom", "contact"])'),

  userWantsToClose: z.boolean().describe('True if the user\'s last message indicates they are done (e.g., "Merci", "C\'est tout", "Non merci", "Parfait" after a summary)'),

  readyToSend: z.boolean().describe('True if: (1) intent is appointment or quote, (2) all required fields are complete, AND (3) user wants to close the conversation'),

  reasoning: z.string().describe('Brief explanation of the analysis (for debugging)')
})

type ConversationAnalysis = z.infer<typeof ConversationAnalysisSchema>

// ==================== AI-POWERED CONVERSATION ANALYSIS ====================

/**
 * Analyze the entire conversation using AI with structured output
 * This replaces pattern matching with intelligent extraction
 *
 * Benefits:
 * - Understands context and nuance
 * - Handles typos and variations naturally
 * - Single source of truth for all extraction logic
 * - Self-documenting through schema
 * - AI validates contact information (phone/email) directly
 */
async function analyzeConversation(messages: Message[]): Promise<ConversationAnalysis> {
  try {
    const conversationText = messages
      .map(m => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || ''
    const lastAssistantMessage = messages.filter(m => m.role === 'assistant').slice(-1)[0]?.content || ''

    const result = await generateObject({
      model: mistral('mistral-large-latest'),
      schema: ConversationAnalysisSchema,
      system: `Tu es un expert en analyse de conversations pour un cabinet dentaire.

🎯 TON RÔLE : Extraire les informations clés de la conversation et déterminer son état.

📝 EXTRACTION DES DONNÉES :

**Nom** : Extraire uniquement si explicitement donné (ex: "Je m'appelle Jean Dupont", "Jean Dupont", "timothee")

**Téléphone** : Compter les chiffres. Si >= 10 chiffres → extraire. Si < 10 chiffres (ex: "071123" = 6 chiffres) → null

**Email** : Vérifier présence de @ ET d'un point après le @. Si non → null

**Service** : Type de soin (contrôle, détartrage, implant, blanchiment, prothèse, parodontie, pédodontie, etc.)

**Praticien** : Si mentionné (Dr. Azma, Chevalier, Seguela, Mercier, Liotard, Aumailley)

**Disponibilités** : Jours/horaires préférés, résumés clairement

**hasValidContact** : 
- TRUE si téléphone valide (≥10 chiffres) OU email valide (@ + point)
- FALSE sinon

✅ COMPLÉTUDE :
- RDV : Requis = service + nom + hasValidContact + disponibilités
- Devis : Requis = service + nom + hasValidContact
- Question : Aucun champ requis

🔚 CLÔTURE :
userWantsToClose = TRUE si le patient dit "merci", "c'est tout", "non merci", "parfait", "ça ira", après un récapitulatif

📧 ENVOI EMAIL :
readyToSend = TRUE UNIQUEMENT si :
- (intent = appointment OU quote) 
- ET isComplete = true 
- ET userWantsToClose = true

Sois précis dans tes extractions. En cas de doute, mets null.`,
      prompt: `Analyse cette conversation complète :

${conversationText}

---
Dernière réponse de l'assistant : "${lastAssistantMessage}"
Dernière réponse du patient : "${lastUserMessage}"

Extrais toutes les informations et détermine l'état de la conversation.`,
      temperature: 0.1 // Low temperature for consistent extraction
    })

    logger.info('AI Conversation Analysis:', {
      intent: result.object.intent,
      isComplete: result.object.isComplete,
      userWantsToClose: result.object.userWantsToClose,
      readyToSend: result.object.readyToSend,
      patientInfo: result.object.patientInfo,
      missingFields: result.object.missingFields,
      reasoning: result.object.reasoning
    })

    return result.object
  } catch (error) {
    logger.error('Error in AI conversation analysis:', error)

    // Fallback: return safe defaults
    return {
      intent: 'other',
      patientInfo: {
        nom: null,
        email: null,
        telephone: null,
        service: null,
        praticien: null,
        disponibilites: null
      },
      hasValidContact: false,
      isComplete: false,
      missingFields: [],
      userWantsToClose: false,
      readyToSend: false,
      reasoning: 'Error in AI analysis - using fallback'
    }
  }
}

// ==================== SITE CONTEXT FETCHING ====================

export async function POST(request: NextRequest) {
  try {
    logger.info('POST /api/chat - starting')

    // Check for API keys
    if (!process.env.MISTRAL_API_KEY) {
      logger.error('MISTRAL_API_KEY not configured')
      return NextResponse.json(
        { error: 'Configuration error: MISTRAL_API_KEY not set' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { messages } = body

    logger.info('Received messages:', JSON.stringify(messages, null, 2))

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages requis' },
        { status: 400 }
      )
    }

    const timezone = 'Europe/Amsterdam';
    const todayDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: timezone });
    const tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate() + 1);
    const tomorrow = tomorrowDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: timezone });

    // Fetch site context
    const siteContext = await fetchSiteContext()

    const systemPrompt = `${SYSTEM_PROMPT}

    Aujourd'hui : ${todayDate}. Demain : ${tomorrow}.

    CONTEXTE_SITE (extrait, priorité absolue si pertinent) :
${siteContext || '(indisponible)'}`;

    logger.info('Converting messages, count:', messages.length)

    // Manually format messages for Groq
    const formattedMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ]

    logger.info('Formatted messages:', JSON.stringify(formattedMessages, null, 2))

    // Generate AI response with Mistral (Mistral Large - excellent French, made in France)
    const result = await streamText({
      model: mistral('mistral-large-latest'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: formattedMessages as any,
      temperature: 0.5, // Balanced temperature for natural conversation
    })

    // Get the full response
    const response = await result.text

    // ========== AI-POWERED CONVERSATION ANALYSIS ==========
    // Trust the AI completely - it handles validation, flow, and extraction
    const fullMessages = [...messages, { role: 'assistant' as const, content: response }]
    const analysis = await analyzeConversation(fullMessages)
    
    logger.info('AI Analysis:', {
      intent: analysis.intent,
      isComplete: analysis.isComplete,
      hasValidContact: analysis.hasValidContact,
      userWantsToClose: analysis.userWantsToClose,
      readyToSend: analysis.readyToSend,
      patientInfo: analysis.patientInfo,
      reasoning: analysis.reasoning
    })

    return NextResponse.json({
      response,
      intent: analysis.intent,
      patientInfo: analysis.patientInfo,
      readyToSend: analysis.readyToSend,
      // Additional debug info
      isComplete: analysis.isComplete,
      missingFields: analysis.missingFields,
      reasoning: analysis.reasoning
    })
  } catch (error) {
    logger.error('Error processing chat:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
    console.error('Full error:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors du traitement de votre message',
        details: process.env.NODE_ENV !== 'production' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
