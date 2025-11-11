import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'
import { createMistral } from '@ai-sdk/mistral'
import { generateText } from 'ai'

const resend = new Resend(process.env.RESEND_API_KEY || 're_fake_key_for_build')
const mistral = createMistral({ apiKey: process.env.MISTRAL_API_KEY })

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

const SERVICE_KEYWORDS = [
  { canonical: 'contrôle', tokens: ['controle', 'controle annuel'] },
  { canonical: 'détartrage', tokens: ['detartrage', 'detartage', 'detartrer'] },
  { canonical: 'implant', tokens: ['implant', 'implantologie'] },
  { canonical: 'blanchiment', tokens: ['blanchiment'] },
  { canonical: 'parodontie', tokens: ['parodont', 'parodontie'] },
  { canonical: 'prothèse', tokens: ['prothese', 'protheses', 'prothese dentaire', 'couronne', 'bridge'] },
  { canonical: 'conservateur', tokens: ['conservateur', 'soins conservateurs', 'carie'] },
  { canonical: 'pédodontie', tokens: ['pedodontie', 'dent de lait', 'enfant'] },
  { canonical: 'orthodontie', tokens: ['orthodontie', 'appareil dentaire', 'appareil'] },
  { canonical: 'extraction', tokens: ['extraction', 'arracher', 'dent de sagesse', 'sagesse'] },
  { canonical: 'soin', tokens: ['soin', 'consultation'] }
]

const PRACTITIONER_KEYWORDS = [
  { label: 'Dr. Azma', tokens: ['azma'] },
  { label: 'Dr. Chevalier', tokens: ['chevalier'] },
  { label: 'Dr. Seguela', tokens: ['seguela'] },
  { label: 'Dr. Mercier', tokens: ['mercier'] },
  { label: 'Dr. Liotard', tokens: ['liotard'] },
  { label: 'Dr. Aumailley', tokens: ['aumailley'] }
]

const BANNED_NAME_WORDS = new Set([
  'disponible',
  'dispo',
  'matin',
  'apres',
  'soir',
  'jour',
  'jours',
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
  'docteur',
  'docteure',
  'dr',
  'doct',
  'cabinet',
  'bonjour',
  'merci',
  'rdv',
  'rendez',
  'souhaite',
  'souhait',
  'numero',
  'num',
  'telephone',
  'tel',
  'mail',
  'email',
  'contact',
  'besoin',
  'madame',
  'monsieur',
  'patient',
  'patiente'
])

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function cleanWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function isLikelyNameCandidate(candidate: string): boolean {
  const cleaned = cleanWhitespace(candidate).replace(/[,.;!?]+$/u, '').trim()
  if (!cleaned) return false
  const words = cleaned.split(/\s+/)
  if (words.length < 2 || words.length > 4) return false
  const normalizedWords = words.map(normalizeText)
  if (normalizedWords.some(word => BANNED_NAME_WORDS.has(word))) return false
  return true
}

function formatNameCandidate(candidate: string): string {
  const sanitized = cleanWhitespace(candidate).replace(/[,.;!?]+$/u, '')
  return sanitized
    .split(/\s+/)
    .map(word =>
      word
        .split('-')
        .map(segment =>
          segment ? segment[0].toUpperCase() + segment.slice(1).toLowerCase() : segment
        )
        .join('-')
    )
    .join(' ')
}

function extractNameCandidate(raw: string): { value: string; score: number } | null {
  const prefixMatch = raw.match(
    /(?:Je m'appelle|je m'appelle|Mon nom est|mon nom est|Je me nomme|je me nomme|Je suis|je suis|C'est|c'est)\s+([^.,;!?\\n]+)/u
  )
  if (prefixMatch) {
    const candidate = cleanWhitespace(prefixMatch[1])
    if (isLikelyNameCandidate(candidate)) {
      const prefix = prefixMatch[0].toLowerCase()
      const score = prefix.includes("je m'appelle") || prefix.includes('mon nom est') || prefix.includes('je me nomme') ? 3 : 2
      return { value: formatNameCandidate(candidate), score }
    }
  }

  const simpleMatch = raw.match(
    /^\s*([A-ZÀÂÄÉÈÊËÎÏÔÙÛÜÇ][\p{L}'-]+(?:\s+[A-ZÀÂÄÉÈÊËÎÏÔÙÛÜÇ][\p{L}'-]+)+)\s*$/u
  )
  if (simpleMatch) {
    const candidate = cleanWhitespace(simpleMatch[1])
    if (isLikelyNameCandidate(candidate)) {
      return { value: formatNameCandidate(candidate), score: 2 }
    }
  }

  return null
}

function extractPatientInfo(messages: Message[]): PatientInfo {
  const info: PatientInfo = {}
  const userMessagesRaw = messages
    .filter(m => m.role === 'user')
    .map(m => cleanWhitespace(m.content))
    .filter(Boolean)

  const userMessagesNormalized = userMessagesRaw.map(normalizeText)

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
  const phoneRegex = /(\+33|0)[1-9](?:[.\s-]?[0-9]{2}){4}/g

  let bestName: { value: string; score: number } | null = null

  for (let i = 0; i < userMessagesRaw.length; i += 1) {
    const raw = userMessagesRaw[i]
    const normalized = userMessagesNormalized[i]

    if (!info.email) {
      const emails = raw.match(emailRegex)
      if (emails && emails.length > 0) {
        info.email = emails[0]
      }
    }

    if (!info.telephone) {
      const phones = raw.match(phoneRegex)
      if (phones && phones.length > 0) {
        info.telephone = phones[0].replace(/[\s.-]/g, '')
      }
    }

    if (!info.service) {
      for (const entry of SERVICE_KEYWORDS) {
        if (entry.tokens.some(token => normalized.includes(token))) {
          info.service = entry.canonical
          break
        }
      }
    }

    if (!info.praticien) {
      const mentionsPractitioner = /\b(dr|docteur|docteure|dentiste|praticien|praticienne)\b/.test(normalized)
      if (mentionsPractitioner) {
        for (const entry of PRACTITIONER_KEYWORDS) {
          if (entry.tokens.some(token => normalized.includes(token))) {
            info.praticien = entry.label
            break
          }
        }
      }
    }

    if (!info.disponibilites) {
      const daysPattern = /\b(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/i
      const timePattern = /\b(\d{1,2}h\d{0,2}|\d{1,2}:\d{2})\b/
      if (daysPattern.test(raw) || timePattern.test(raw)) {
        info.disponibilites = raw.substring(0, 120)
      }
    }

    const nameCandidate = extractNameCandidate(raw)
    if (nameCandidate) {
      if (!bestName || nameCandidate.score >= bestName.score) {
        bestName = nameCandidate
      }
    }
  }

  if (bestName) {
    info.nom = bestName.value
  }

  return info
}

function detectIntent(conversation: string): 'appointment' | 'quote' | 'other' {
  const lower = conversation.toLowerCase()
  if (lower.includes('rdv') || lower.includes('rendez-vous') || lower.includes('prendre rendez-vous') || lower.includes('rendez vous')) {
    return 'appointment'
  }
  if (lower.includes('devis') || lower.includes('prix') || lower.includes('tarif') || lower.includes('coût')) {
    return 'quote'
  }
  return 'other'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, intent: providedIntent, patientInfo: providedPatientInfo } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages requis' },
        { status: 400 }
      )
    }

    // Use provided analysis from /api/chat if available, otherwise fallback to local extraction
    let intent: 'appointment' | 'quote' | 'other'
    let patientInfo: PatientInfo

    if (providedIntent && providedPatientInfo) {
      // Use AI analysis from /api/chat
      intent = providedIntent as 'appointment' | 'quote' | 'other'
      patientInfo = providedPatientInfo
      logger.info('Using provided AI analysis for email', { intent, patientInfo })
    } else {
      // Fallback: extract locally (for backwards compatibility)
      const fullConversation = messages.map((m: Message) => m.content).join(' ')
      intent = detectIntent(fullConversation)
      patientInfo = extractPatientInfo(messages)
      logger.info('Using local extraction for email', { intent, patientInfo })
    }

    // Only send email if there's an actionable request (appointment or quote)
    if (intent !== 'appointment' && intent !== 'quote') {
      logger.warn('No actionable intent detected', { intent })
      return NextResponse.json(
        { error: 'Aucune demande d\'action détectée' },
        { status: 400 }
      )
    }

    // Check if we have required fields
    const hasRequiredFields = patientInfo.nom && (patientInfo.email || patientInfo.telephone)
    if (!hasRequiredFields) {
      logger.warn('Missing required fields', { patientInfo })
      return NextResponse.json(
        { error: 'Informations manquantes (nom et contact requis)' },
        { status: 400 }
      )
    }

    // Generate AI summary of the conversation
    const conversationText = messages
      .map((m: Message) => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
      .join('\n')
    
    let summary = ''
    try {
      const { text } = await generateText({
        model: mistral('mistral-large-latest'),
        system: 'Tu es un assistant qui résume les conversations de manière concise pour le secrétariat d\'un cabinet dentaire. Extrait uniquement les informations essentielles : nom du patient, type de demande (RDV ou devis), soin concerné, praticien préféré, disponibilités, moyen de contact. IMPORTANT : Utilise un format TEXTE SIMPLE sans Markdown (pas de **, pas de #, pas de -, juste du texte avec des retours à la ligne).',
        prompt: `Résume cette conversation en extrayant les informations essentielles pour le secrétariat :\n\n${conversationText}\n\nFormat attendu :\nNom du patient : [nom]\nType de demande : [RDV ou Devis]\nSoin concerné : [soin]\nPraticien préféré : [praticien]\nDisponibilités : [créneaux]\nMoyen de contact : [téléphone ou email]`,
        temperature: 0.3
      })
      summary = text
    } catch (error) {
      logger.error('Error generating summary:', error)
      summary = conversationText
    }

    // Build email with summary only (no full transcript)
    let emailBody = ''
    emailBody = `🎯 ${intent === 'appointment' ? 'NOUVELLE DEMANDE DE RENDEZ-VOUS' : 'NOUVELLE DEMANDE DE DEVIS'} via Chatbot\n\n`
    emailBody += `📋 Résumé de la conversation :\n${summary}\n\n`
    emailBody += `---\n\n� Traiter cette demande en priorité - Le patient attend une confirmation.`

    const subject = intent === 'appointment' 
      ? `🎯 NOUVELLE DEMANDE DE RENDEZ-VOUS - ${patientInfo.nom || 'Patient'}`
      : intent === 'quote'
      ? `💰 NOUVELLE DEMANDE DE DEVIS - ${patientInfo.nom || 'Patient'}`
      : `Chatbot - Nouvelle conversation`

    await resend.emails.send({
      from: 'Cabinet Dentaire Rive Droite <contact@cabinetdentairerivedroite.com>',
      to: ['cdrivedroite@gmail.com', 'cabinetdentaireaces@gmail.com'],
      subject,
      text: emailBody,
    })

    logger.info('Chat session email sent successfully', { 
      intent, 
      patientInfo,
      summary: summary.substring(0, 100) + '...'
    })

    return NextResponse.json({ 
      success: true,
      message: 'Email envoyé avec succès',
      summary: summary.substring(0, 200) + '...'
    })
  } catch (error) {
    logger.error('Error sending chat session email:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'envoi de l\'email',
        details: process.env.NODE_ENV !== 'production' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}

