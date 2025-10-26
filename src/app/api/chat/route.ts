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

const SYSTEM_PROMPT = `Tu es l'assistant·e du Cabinet Dentaire Rive Droite à Bordeaux.

STYLE DE RÉPONSE
- Reste concis et direct pour les demandes d'infos
- Ne dis jamais que tu es une IA (réponds : "Je suis au standard du cabinet")
- Ne sois pas trop bavard, va droit au but

PRISE DE RENDEZ-VOUS (mots-clés: "rdv", "rendez-vous") :
1. Nom complet
2. Moyen de contact préféré (email OU téléphone - pas les deux, juste celui qu'ils préfèrent)
3. Service souhaité
4. Disponibilités
Récapitule et dis qu'une secrétaire rappellera.

⚠️ IMPORTANT - CONTACT OBLIGATOIRE :
- Demande UN SEUL moyen de contact (email OU téléphone, selon leur préférence)
- SI le patient n'a pas donné d'email NI de téléphone → explique qu'il FAUT un moyen de le contacter pour confirmer le rendez-vous
- Ne finalise PAS la demande de rendez-vous sans au moins un moyen de contact valide
- Exemple de demande : "Par quel moyen préférez-vous être contacté : email ou téléphone ?"
- Exemple si manque de contact : "Pour réserver votre rendez-vous, j'ai besoin d'un moyen de vous contacter (email ou téléphone). La secrétaire doit pouvoir vous joindre pour confirmer le créneau."

INFOS CABINET
- Tél : 05 56 86 29 00
- Email : cabinetdentaireaces@gmail.com
- Lun-Ven : 9h-12h30 / 14h-19h30 (fermé week-end)

RÈGLES
- Cherche infos dans CONTEXTE_SITE fourni
- Réponds brièvement aux questions simples
- Oriente vers consultation en cabinet si nécessaire
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
          .slice(0, 4000); // extraction plus grande pour avoir plus de contexte
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

    // Generate AI response with Groq (Llama 3.1 8B - faster and more prompt-following)
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: formattedMessages as any,
      temperature: 0.3, // Lower temperature for more consistent, prompt-following behavior
    })

    // Get the full response
    const response = await result.text
    
    // Check if this is a rendez-vous confirmation
    const isRDVConfirmation = response.toLowerCase().includes('secrétaire') || 
                             response.toLowerCase().includes('recontacter') ||
                             response.toLowerCase().includes('rappellera')
    
    // Send email if: (1) 3+ messages OR (2) RDV confirmation with at least 2 user messages
    const shouldSendEmail = (userMessagesCount >= 3) || (isRDVConfirmation && userMessagesCount >= 2)
    
    if (shouldSendEmail) {
      try {
        // Extract patient info from messages
        const patientInfo = extractPatientInfo([...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }])
        
        let emailBody = ''
        
        if (isRDVConfirmation && (patientInfo.nom || patientInfo.email || patientInfo.telephone)) {
          // Send structured info for appointment requests
          emailBody = `🎯 NOUVEAU RENDEZ-VOUS DEMANDÉ via Chatbot\n\n`
          emailBody += `Informations patient :\n`
          if (patientInfo.nom) emailBody += `- Nom : ${patientInfo.nom}\n`
          if (patientInfo.email) emailBody += `- Email : ${patientInfo.email}\n`
          if (patientInfo.telephone) emailBody += `- Téléphone : ${patientInfo.telephone}\n`
          if (patientInfo.service) emailBody += `- Service : ${patientInfo.service}\n`
          if (patientInfo.disponibilites) emailBody += `- Disponibilités : ${patientInfo.disponibilites}\n`
          emailBody += `\n---\n\n`
          emailBody += `Transcription complète :\n\n`
        } else {
          emailBody = `Conversation via le chatbot AI du site web.\n\nNombre de messages: ${userMessagesCount + 1}\n\n---\n\n`
        }
        
        const transcript = [...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }]
          .map((m: Message) => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
          .join('\n\n')
        
        emailBody += transcript

        const subject = isRDVConfirmation 
          ? `🎯 NOUVEAU RENDEZ-VOUS DEMANDÉ via Chatbot`
          : `Chatbot AI - Nouvelle conversation (${userMessagesCount} messages)`

        await resend.emails.send({
          from: 'Cabinet Dentaire Rive Droite <noreply@cabinetdentairerivedroite.com>',
          to: ['cdrivedroite@gmail.com', 'mercier.alfred@gmail.com'],
          subject,
          text: emailBody,
        })

        logger.info('Chat transcript sent via email', { isRDVConfirmation, patientInfo })
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
