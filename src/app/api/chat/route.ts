/**
 * API Route for chat assistant with Groq AI (Llama 3)
 * 
 * Purpose: Handle chat messages with intelligent AI responses
 * Features: Context-aware conversations, sends transcript to email
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'
import { createMistral } from '@ai-sdk/mistral'
import { streamText } from 'ai'

const resend = new Resend(process.env.RESEND_API_KEY || 're_fake_key_for_build')
const mistral = createMistral({ apiKey: process.env.MISTRAL_API_KEY })

const SYSTEM_PROMPT = `Tu es l'assistant·e humain·e du Cabinet Dentaire Rive Droite (Bordeaux). 
Ton ton est naturel, chaleureux et professionnel (jamais "je suis un bot" ou "IA").

Lorsqu'un patient veut prendre rendez-vous :
  - Demande quel type de soin ou consultation il souhaite (contrôle, détartrage, implant, etc.).
  - Demande ensuite s'il a une préférence pour un praticien (les noms sont dans le CONTEXTE_SITE, ne les liste pas dans ta question).
  - Demande quels jours ou quels créneaux conviendraient (jour ou plage horaire).
  - Demande enfin son nom complet et son moyen de contact préféré (téléphone ou e-mail). N'assume jamais le genre de l'utilisateur, reste neutre.
  - Lorsque tu as toutes ces informations, récapitule les souhaits (soin, praticien, créneau, nom, contact) et précise que tu vas transmettre au secrétariat. Termine par demander si l'utilisateur a besoin d'autre chose.
  - Ne confirme jamais un rendez-vous ni un créneau : rappelle que ce sont des préférences et que le secrétariat validera l'horaire final.

Pour une demande de devis :
  - Demande le type de soin, puis le nom et un contact (téléphone ou e-mail).
  - Dis que le secrétariat enverra un devis personnalisé.

Style : réponses courtes (1 a 3 phrases), amicales, formules variées, pas de répétitions. Ne parle pas de SMS ou d'e-mail de rappel automatique. N'indique jamais de créneau le samedi ou dimanche (cabinet fermé).

HORAIRES : Lun-Ven 9h 12h30 / 14h-19h30. Fermé le week-end.
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
  praticien?: string
}

// Detect intent from user message
function detectIntent(text: string): 'appointment' | 'quote' | 'other' {
  const t = text.toLowerCase()
  if (/\b(rendez|rdv|prendre rendez|prendre rdv)\b/.test(t)) return 'appointment'
  if (/\b(devis|estimation|prix approximatif|combien|coût|tarif)\b/.test(t)) return 'quote'
  return 'other'
}

// Check if all required fields for appointment are present
function hasAllAppointmentFields(info: PatientInfo): boolean {
  return Boolean(
    info?.service &&
    info?.disponibilites &&
    info?.nom &&
    (info?.email || info?.telephone)
  )
}

// Check if required fields are present based on intent
function hasRequiredFields(intent: string, info: PatientInfo): boolean {
  if (intent === 'appointment') {
    return hasAllAppointmentFields(info)
  }
  if (intent === 'quote') {
    return Boolean(info.nom && (info.email || info.telephone) && info.service)
  }
  return false
}

// Detect if user said "no" to closing question
function isNegativeCloseAnswer(text: string): boolean {
  const t = text.toLowerCase().trim()
  return [
    'non', 'non merci', 'c\'est bon', "c'est bon", 'ça ira', 'merci c\'est tout',
    "merci c'est tout", 'parfait merci', 'tout bon', 'ça me va', 'aucune autre'
  ].some(p => t.includes(p))
}

// Detect if assistant asked closing question
function assistantAskedClosing(messages: Array<{ role: string; content: string }>): boolean {
  const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant')?.content?.toLowerCase() || ''
  return lastAssistant.includes("avez-vous besoin d'autre chose")
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
  
  // Extract name (look for patterns like "Je m'appelle X", "Mon nom est X", or simple "First Last")
  const namePatterns = [
    /(?:je m'appelle|mon nom est|je suis|c'est)\s+([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)/i,
    /^([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)$/i // Simple "First Last" pattern
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
  const services = ['implant', 'blanchiment', 'parodont', 'prothèse', 'conservateur', 'pédodontie', 'orthodontie', 'extraction', 'détartrage', 'contrôle', 'soin']
  // Also check assistant messages for service mentions
  const allMessages = messages.map(m => m.content.toLowerCase())
  allMessages.forEach(msg => {
    if (!info.service) {
      for (const service of services) {
        // Use word boundary to avoid false matches (e.g. "contrôle" in "ccontrôle")
        if (msg.includes(' ' + service + ' ') || msg.includes(service + ' ') || msg.includes(' ' + service)) {
          info.service = service
          logger.info('Extracted service:', service, 'from message:', msg.substring(0, 100))
          break
        }
      }
    }
  })
  
  // Extract praticien
  const praticiens = ['azma', 'chevalier', 'seguela', 'mercier', 'liotard', 'aumailley']
  userMessages.forEach(msg => {
    if (!info.praticien) {
      for (const praticien of praticiens) {
        if (msg.includes(praticien)) {
          info.praticien = `Dr. ${praticien.charAt(0).toUpperCase() + praticien.slice(1)}`
          break
        }
      }
    }
  })
  
  return info
}

// Extract disponibilities (concatenate all mentions of days/times)
function extractDisponibilites(messages: Message[]): string {
  const days = /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)/i
  const time = /\b(\d{1,2}h\d{0,2}|\d{1,2}:\d{2})\b/
  const spans: string[] = []
  for (const m of messages) {
    if (m.role !== 'user') continue
    const line = m.content
    if (days.test(line) || time.test(line)) {
      spans.push(line.trim())
    }
  }
  return spans.slice(-3).join(' | ') // Keep last 3 mentions
}

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

    // Count user messages BEFORE conversion (for email transcript)
    const userMessagesCount = messages.filter((m: Message) => m.role === 'user').length

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
    let response = await result.text
    
    // Post-process to avoid premature confirmations
    // Replace overly affirmative expressions
    response = response
      .replace(/\bje\s+(note|retiens?|confirme|fixe)\b[^.]*\./gi, 
        "Je transmettrai ces préférences au secrétariat qui vous recontactera.")
      .replace(/\b(rendez[-\s]?vous|créneau)\s+(est\s+)?(fixé|confirmé|acté)\b[^.]*\./gi,
        "Ce sont des préférences ; l'horaire définitif sera fixé avec le secrétariat.")
      .replace(/(sms|e[-\s]?mail)\s+de\s+rappel\s+sera\s+envoyé[^.]*/gi,
        "Vous serez recontacté·e pour convenir de l'horaire définitif.")
    
    // Remove random capitalized words at end (AI sometimes adds random names)
    response = response.replace(/\.\s+([A-ZÀÂÄÉÈÊË][a-zàâäéèêëù]+)\s*\.(\s*\n|$)/g, '.$2')
    
    // Detect intent from conversation
    const conversationText = [...messages.map((m: Message) => m.content), response].join(' ')
    const intent = detectIntent(conversationText)
    
    // Extract patient info (with disponibilities using new function)
    const fullMessages = [...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }]
    const patientInfo = extractPatientInfo(fullMessages)
    patientInfo.disponibilites = extractDisponibilites(fullMessages) || patientInfo.disponibilites
    
    // Check if ready to send email
    const lastUserMessage = messages.filter((m: Message) => m.role === 'user').slice(-1)[0]?.content || ''
    
    // Ready to send when: intent + all fields + user said "no thanks"
    const hasFields = hasRequiredFields(intent, patientInfo)
    const isNegative = isNegativeCloseAnswer(lastUserMessage)
    const hasIntent = (intent === 'appointment' || intent === 'quote')
    
    // Ready to send: either user said "no" OR we have all required fields for appointment
    // (fallback in case negative answer detection fails)
    const readyToSend = hasIntent && hasFields && (isNegative || intent === 'appointment')
    
    logger.info('Email trigger check:', {
      hasIntent,
      hasFields,
      isNegative,
      readyToSend,
      intent,
      lastUserMessage,
      patientInfo
    })
    
    return NextResponse.json({ 
      response,
      intent,
      patientInfo,
      readyToSend
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
