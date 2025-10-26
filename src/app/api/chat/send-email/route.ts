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
  
  // Extract name
  const namePatterns = [
    /(?:je m'appelle|mon nom est|je suis|c'est)\s+([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)/i,
    /^([A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+\s+[A-ZÀÂÄÉÈÊËÌÎÏÒÙÛÜ][a-zàâäéèêëìîïòùûüç]+)$/i
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
  
  // Extract disponibilities
  const days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
  const timePattern = /\d{1,2}h\d{0,2}|\d{1,2}:\d{2}/
  userMessages.forEach(msg => {
    if (!info.disponibilites) {
      const foundDays = days.filter(d => msg.includes(d))
      const foundTime = msg.match(timePattern)
      if (foundDays.length > 0 || foundTime) {
        info.disponibilites = msg.substring(0, 100)
      }
    }
  })
  
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
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages requis' },
        { status: 400 }
      )
    }

    // Detect intent and extract patient info from full conversation
    const fullConversation = messages.map((m: Message) => m.content).join(' ')
    const intent = detectIntent(fullConversation)
    const patientInfo = extractPatientInfo(messages)

    // Only send email if there's an actionable request (appointment or quote)
    if (intent !== 'appointment' && intent !== 'quote') {
      return NextResponse.json(
        { error: 'Aucune demande d\'action détectée' },
        { status: 400 }
      )
    }

    // Check if we have required fields
    const hasRequiredFields = patientInfo.nom && (patientInfo.email || patientInfo.telephone)
    if (!hasRequiredFields) {
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
        system: 'Tu es un assistant qui résume les conversations de manière concise pour le secrétariat d\'un cabinet dentaire. Extrait uniquement les informations essentielles : nom du patient, type de demande (RDV ou devis), soin concerné, praticien préféré, disponibilités, moyen de contact.',
        prompt: `Résume cette conversation en extrayant les informations essentielles pour le secrétariat :\n\n${conversationText}`,
        temperature: 0.3
      })
      summary = text
    } catch (error) {
      logger.error('Error generating summary:', error)
      summary = conversationText
    }

    // Build email with summary
    let emailBody = ''
    emailBody = `🎯 ${intent === 'appointment' ? 'NOUVELLE DEMANDE DE RENDEZ-VOUS' : 'NOUVELLE DEMANDE DE DEVIS'} via Chatbot\n\n`
    emailBody += `📋 Résumé de la conversation :\n${summary}\n\n`
    emailBody += `---\n\n`
    emailBody += `Informations extraites :\n`
    if (patientInfo.nom) emailBody += `- Nom : ${patientInfo.nom}\n`
    if (patientInfo.email) emailBody += `- Email : ${patientInfo.email}\n`
    if (patientInfo.telephone) emailBody += `- Téléphone : ${patientInfo.telephone}\n`
    if (patientInfo.service) emailBody += `- Service : ${patientInfo.service}\n`
    if (patientInfo.praticien) emailBody += `- Praticien préféré : ${patientInfo.praticien}\n`
    if (patientInfo.disponibilites) emailBody += `- Disponibilités : ${patientInfo.disponibilites}\n`
    emailBody += `\n---\n\n📝 Transcription complète :\n\n${conversationText}`

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
