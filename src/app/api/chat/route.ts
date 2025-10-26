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

const SYSTEM_PROMPT = `Tu es l'assistant·e humain·e du Cabinet Dentaire Rive Droite (Bordeaux). Parle avec naturel, comme une personne au standard : chaleureux·se, bref·e et poli·e. Ne dis jamais que tu es une "IA" ou un "bot".

PRIORITÉS
1) Si la question concerne le cabinet (horaires, équipe, services), utilise d'abord le CONTEXTE_SITE fourni.
2) Si la question est médicale, réponds de façon générale et oriente vers une consultation pour un avis personnalisé.

PRISE DE RENDEZ-VOUS (procédure naturelle)
- Si l'utilisateur exprime l'intention "prendre rendez-vous", adopte ce flux naturel :
  1. Demande d'abord quel type de soin ou consultation (contrôle, détartrage, implant, blanchiment, prothèses, etc.)
  2. Demande ensuite si la personne a un praticien préféré au cabinet (Dr. Azma, Dr. Chevalier, Dr. Seguela, Dr. Mercier, Dr. Liotard, Dr. Aumailley...)
  3. Puis demande les créneaux souhaités : "Quand souhaiteriez-vous venir ?" (jour ou créneau)
  4. Puis demande le nom complet
  5. Puis demande le moyen de contact préféré (email OU téléphone - pas les deux) et collecte la valeur
  6. Quand tu as réuni service + (praticien s'il y a) + créneau souhaité + nom + contact,
    fais un récapitulatif clair en précisant que ce sont des préférences à transmettre au secrétariat
    (aucune confirmation). Termine TOUJOURS par une question de clôture :
    « Super, j'ai tout ce qu'il faut. Je transmets au secrétariat. Avez-vous besoin d'autre chose ? »
    Ne dis jamais « je note/je retiens/je confirme » ni « rendez-vous fixé ».
- Pose les questions de façon naturelle, variable et en une seule phrase quand possible.
- Ne propose jamais de rendez-vous le samedi/dimanche (cabinet fermé).
- Les noms des praticiens sont disponibles dans le CONTEXTE_SITE.
- Ne confirme JAMAIS un créneau ou un rendez-vous. Tu peux proposer des créneaux disponibles, mais rappelle qu'il s'agit de préférences et que la secrétaire validera l'horaire final.
- N'annonce pas de SMS de rappel ou d'email automatique. Indique simplement qu'un membre du secrétariat recontactera le patient.
- N'écris pas de date ou d'horaire comme "retenu(e)"; reste au conditionnel (« préférence pour… »).

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
    response = response.replace(/je (note|retiens|confirme|fixe)[^\.]*\./gi, 
      "Je transmettrai ces préférences à notre secrétaire qui vous recontactera.")
    response = response.replace(/(un\s+SMS|un e-mail|un SMS) de rappel sera envoyé[^\.]*\./gi,
      "Vous serez contacté·e pour convenir ensemble de l'horaire définitif.")
    response = response.replace(/votre rendez-vous est (fixé|confirmé|pris)[^\.]*\./gi,
      "Nous transmettons votre demande au secrétariat qui reviendra vers vous.")
    
    // Detect intent from conversation
    const conversationText = [...messages.map((m: Message) => m.content), response].join(' ')
    const intent = detectIntent(conversationText)
    
    // Extract patient info (with disponibilities using new function)
    const fullMessages = [...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }]
    const patientInfo = extractPatientInfo(fullMessages)
    patientInfo.disponibilites = extractDisponibilites(fullMessages) || patientInfo.disponibilites
    
    // Check if ready to send email
    const lastUserMessage = messages.filter((m: Message) => m.role === 'user').slice(-1)[0]?.content || ''
    
    const readyToSend = 
      (intent === 'appointment' || intent === 'quote') &&
      hasRequiredFields(intent, patientInfo) &&
      assistantAskedClosing(fullMessages) &&
      isNegativeCloseAnswer(lastUserMessage)
    
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
