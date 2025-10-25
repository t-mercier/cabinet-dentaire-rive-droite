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
2. Email
3. Téléphone
4. Service souhaité
5. Disponibilités
Récapitule et dis qu'une secrétaire rappellera.

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
        const transcript = [...messages, { role: 'assistant' as const, content: response, timestamp: new Date() }]
          .map((m: Message) => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
          .join('\n\n')

        const subject = isRDVConfirmation 
          ? `🎯 NOUVEAU RENDEZ-VOUS DEMANDÉ via Chatbot`
          : `Chatbot AI - Nouvelle conversation (${userMessagesCount} messages)`

        await resend.emails.send({
          from: 'Cabinet Dentaire Rive Droite <noreply@cabinetdentairerivedroite.com>',
          to: ['cdrivedroite@gmail.com'], // Testing email for now
          subject,
          text: `${isRDVConfirmation ? '🎯 NOUVEAU RENDEZ-VOUS DEMANDÉ\n\n' : ''}Conversation via le chatbot AI du site web.\n\nNombre de messages: ${userMessagesCount + 1}\n\n---\n\n${transcript}`,
        })

        logger.info('Chat transcript sent via email', { isRDVConfirmation })
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
