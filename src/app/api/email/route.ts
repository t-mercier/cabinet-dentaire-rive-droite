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
  nom?: string | null
  email?: string | null
  telephone?: string | null
  service?: string | null
  disponibilites?: string | null
  praticien?: string | null
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

    // Require AI analysis from /api/chat (no fallback needed)
    if (!providedIntent || !providedPatientInfo) {
      logger.error('Missing AI analysis from /api/chat')
      return NextResponse.json(
        { error: 'Analyse IA manquante' },
        { status: 400 }
      )
    }

    const intent = providedIntent as 'appointment' | 'quote' | 'other'
    const patientInfo = providedPatientInfo as PatientInfo

    logger.info('Using AI analysis for email', { intent, patientInfo })

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
      from: 'Cabinet Dentaire Rive Droite <cdrivedroite@gmail.com>',
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

