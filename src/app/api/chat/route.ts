/**
 * API Route for chat assistant with Groq AI (Llama 3)
 * 
 * Purpose: Handle chat messages with intelligent AI responses
 * Features: Context-aware conversations, sends transcript to email
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'
import { createGroq } from '@ai-sdk/groq'
import { streamText } from 'ai'

const resend = new Resend(process.env.RESEND_API_KEY || 're_fake_key_for_build')
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Tu es l'assistant·e humain·e du Cabinet Dentaire Rive Droite (Bordeaux). Parle avec naturel, comme une personne au standard : chaleureux·se, bref·e et poli·e. Ne dis jamais que tu es une "IA" ou un "bot".

PRIORITÉS
1) Si la question concerne le cabinet (horaires, équipe, services), utilise d'abord le CONTEXTE_SITE fourni.
2) Si la question est médicale, réponds de façon générale et oriente vers une consultation pour un avis personnalisé.

PRISE DE RENDEZ-VOUS (procédure naturelle)
- Si l'utilisateur exprime l'intention "prendre rendez-vous", adopte ce flux naturel :
  1. Demande d'abord : "Quand souhaiteriez-vous venir ?" ou "Quel jour / créneau vous conviendrait ?"
  2. Demande ensuite la raison du rendez-vous (ex : "contrôle", "implant", "blanchiment", etc.)
  3. Puis demande le nom complet.
  4. Puis demande le moyen de contact préféré (email ou téléphone) et collecte la valeur.
  5. Récapitule et dis : "Merci — notre secrétaire vous recontactera par téléphone ou e-mail pour confirmer."
- Pose les questions de façon naturelle, variable et en une seule phrase quand possible.
- Ne propose jamais de rendez-vous le samedi/dimanche (cabinet fermé).

DEMANDE DE DEVIS
- Si la personne demande un devis, collecte : type de soin / description brève / nom / email (ou téléphone).
- Informe que le cabinet enverra un devis par email ou contactera par téléphone.

STYLE
- Réponses courtes (1–4 phrases), varie les formulations ("Très bien", "D'accord", "Parfait"), évite les répétitions.
- Si une info manque ou est incertaine, dis clairement : "Je n'ai pas trouvé cette info sur notre site — souhaitez-vous que la secrétaire confirme ?"

HORAIRES CABINET
- Lun-Ven : 9h-12h30 / 14h-19h30
- Fermé : Samedi-Dimanche
- Tél : 05 56 86 29 00
- Email : cabinetdentaireaces@gmail.com

CONTEXTE_SITE : injecté par le serveur (priorité haute).
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


interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface PatientInfo {
  nom?: string
  email?: string
  telephone?: string
  service?: string
  disponibilites?: string
}

// Detect intent from user message
function detectIntent(text: string): 'appointment' | 'quote' | 'other' {
  const t = text.toLowerCase()
  if (/\b(rendez|rdv|prendre rendez|prendre rdv)\b/.test(t)) return 'appointment'
  if (/\b(devis|estimation|prix approximatif|combien|coût|tarif)\b/.test(t)) return 'quote'
  return 'other'
}

// Check if required fields are present
function hasRequiredFields(intent: string, info: PatientInfo): boolean {
  if (intent === 'appointment') {
    return !!(info.nom || info.email || info.telephone)
  }
  if (intent === 'quote') {
    return !!(info.nom || info.email || info.telephone)
  }
  return false
}

function extractPatientInfo(messages: Message[]): PatientInfo {
  const info: PatientInfo = {}
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase())
  
  // Extract email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
  userMessages.forEach(msg => {
    const emails = msg.match(emailRegex)
    if (emails && !info.email) info.email = emails[0]
  })
  
  // Extract phone
  const phoneRegex = /(\+33|0)[1-9](?:[.\s-]?[0-9]{2}){4}/g
  userMessages.forEach(msg => {
    const phones = msg.match(phoneRegex)
    if (phones && !info.telephone) info.telephone = phones[0].replace(/[\s.-]/g, '')
  })
  
  // Extract name (look for patterns like "Je m'appelle X", "Mon nom est X", etc.)
  const namePatterns = [
    /(?:je m'appelle|mon nom est|je suis)\s+([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)/i,
    /(?:c'est|mes coordonnées sont)\s+([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)/i
  ]
  userMessages.forEach(msg => {
    if (!info.nom) {
      for (const pattern of namePatterns) {
        const match = msg.match(pattern)
        if (match) {
          info.nom = match[1]
          break
        }
      }
    }
  })
  
  // Extract service
  const services = ['implant', 'blanchiment', 'parodont', 'prothèse', 'conservateur', 'pédodontie', 'orthodontie', 'extraction', 'détartrage']
  userMessages.forEach(msg => {
    if (!info.service) {
      for (const service of services) {
        if (msg.includes(service)) {
          info.service = service
          break
        }
      }
    }
  })
  
  // Extract disponibilities (look for days and times)
  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  const timePattern = /\d{1,2}h\d{0,2}|\d{1,2}:\d{2}/
  userMessages.forEach(msg => {
    if (!info.disponibilites) {
      const foundDays = days.filter(d => msg.includes(d))
      const foundTime = msg.match(timePattern)
      if (foundDays.length > 0 || foundTime) {
        info.disponibilites = msg.substring(0, 100) // Take first 100 chars as context
      }
    }
  })
  
  return info
}

export async function POST(request: NextRequest) {
  try {
    logger.info('POST /api/chat - starting')
    
    // Check for API keys
    if (!process.env.GROQ_API_KEY) {
      logger.error('GROQ_API_KEY not configured')
      return NextResponse.json(
        { error: 'Configuration error: GROQ_API_KEY not set' },
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

    // Count user messages BEFORE conversion (for email transcript)
    const userMessagesCount = messages.filter((m: Message) => m.role === 'user').length

    logger.info('Converting messages, count:', messages.length)

    // Manually format messages for Groq
    const formattedMessages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ]

    logger.info('Formatted messages:', JSON.stringify(formattedMessages, null, 2))

    // Generate AI response with Groq (Llama 3.3 70B - more powerful and nuanced)
    const result = await streamText({
      model: groq('llama-3.3-70b-versatile'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: formattedMessages as any,
      temperature: 0.3, // Lower temperature for more consistent, prompt-following behavior
    })

    // Get the full response
    const response = await result.text
    
    // Detect intent from conversation
    const lastUserMessage = messages.filter((m: Message) => m.role === 'user').slice(-1)[0]?.content || ''
    const intent = detectIntent([...messages.map((m: Message) => m.content), lastUserMessage].join(' '))
    
    // Extract patient info
    const patientInfo = extractPatientInfo([...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }])
    
    // Check if this is a request that requires action (RDV, devis, rappel, contact)
    const isActionRequest = response.toLowerCase().includes('secrétaire') || 
                           response.toLowerCase().includes('recontacter') ||
                           response.toLowerCase().includes('rappellera') ||
                           response.toLowerCase().includes('rappeler') ||
                           response.toLowerCase().includes('devis') ||
                           response.toLowerCase().includes('être rappelé')
    
    // Send email ONLY if we have required fields (name + contact)
    const shouldSendEmail = (intent === 'appointment' || intent === 'quote') && hasRequiredFields(intent, patientInfo)
    
    if (shouldSendEmail) {
      try {
        let emailBody = ''
        
        // Send structured info for appointment/quote requests
        emailBody = `🎯 ${intent === 'appointment' ? 'NOUVELLE DEMANDE DE RENDEZ-VOUS' : 'NOUVELLE DEMANDE DE DEVIS'} via Chatbot\n\n`
        emailBody += `Informations patient :\n`
        if (patientInfo.nom) emailBody += `- Nom : ${patientInfo.nom}\n`
        if (patientInfo.email) emailBody += `- Email : ${patientInfo.email}\n`
        if (patientInfo.telephone) emailBody += `- Téléphone : ${patientInfo.telephone}\n`
        if (patientInfo.service) emailBody += `- Service : ${patientInfo.service}\n`
        if (patientInfo.disponibilites) emailBody += `- Disponibilités : ${patientInfo.disponibilites}\n`
        emailBody += `\n---\n\nTranscription complète :\n\n`
        
        const transcript = [...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }]
          .map((m: Message) => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
          .join('\n\n')
        
        emailBody += transcript

        const subject = intent === 'appointment' 
          ? `🎯 NOUVELLE DEMANDE DE RENDEZ-VOUS - ${patientInfo.nom || 'Patient'}`
          : intent === 'quote'
          ? `💰 NOUVELLE DEMANDE DE DEVIS - ${patientInfo.nom || 'Patient'}`
          : `Chatbot - Nouvelle conversation`

        await resend.emails.send({
          from: 'Cabinet Dentaire Rive Droite <noreply@cabinetdentairerivedroite.com>',
          to: ['cdrivedroite@gmail.com', 'mercier.alfred@gmail.com'],
          subject,
          text: emailBody,
        })

        logger.info('Chat transcript sent via email', { intent, patientInfo })
      } catch (emailError) {
        logger.error('Error sending chat transcript:', emailError)
        // Don't fail the request if email sending fails
      }
    }

    return NextResponse.json({ response })
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
