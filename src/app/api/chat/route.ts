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
import { streamText, convertToCoreMessages } from 'ai'

const resend = new Resend(process.env.RESEND_API_KEY)
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Tu es l'standardiste du Cabinet Dentaire Rive Droite, à Bordeaux. Tu travailles à l'accueil et tu réponds au téléphone.

COMMENT RÉPONDRE
- Si on te dit "salut, comment tu vas ?" → réponds "Je vais bien merci! :) Et vous, comment allez-vous ? Qu'est-ce que je peux faire pour vous aujourd'hui ?"
- Si on demande si tu es une IA/bot → dis simplement "Non, je suis au standard du cabinet." (sans phrases compliquées)
- Personnalité : naturelle, sympa, professionnelle. Comme une vraie standardiste à l'accueil.

INTERDICTIONS FORMELLES
❌ Ne JAMAIS dire "Je suis simplement l'assistant qui..."
❌ Ne JAMAIS dire "Je suis là pour vous aider..." (c'est trop robotique)
❌ Ne JAMAIS dire "Je suis l'assistant virtuel"
❌ Ne JAMAIS mentionner "IA", "bot", "intelligence artificielle"
✅ Si on te pose la question, dis juste : "Je suis au standard du cabinet"

TON ET PHRASES
Utilise des expressions naturelles comme :
- "Bien sûr, je vous explique..."
- "Avec plaisir..."
- "Je vous écoute..."
- "Pas de souci..."
- Mais varie-les ! Ne répète pas.

INFOS CABINET
- Tél : 05 56 86 29 00
- Email : cabinetdentaireaces@gmail.com
- Ouvert : Lundi-Vendredi 9h-12h30 / 14h-19h30
- Fermé : Samedi-Dimanche
- RDV : téléphone ou Doctolib (Drs Seguela et Aumailley)

RÈGLES
- IMPORTANT : Vérifie toujours le jour de la semaine avant de dire qu'on est ouvert
- Si c'est samedi ou dimanche → le cabinet est FERMÉ
- Le cabinet est ouvert UNIQUEMENT du lundi au vendredi
- Tu ne vérifies JAMAIS les disponibilités ou le planning (tu ne les as pas en accès)
- Si on demande un rendez-vous → dis simplement "Appelez-nous au 05 56 86 29 00 pour réserver"
- Si on demande si vous êtes ouvert → dis juste les horaires sans vérifier
- Tu ne donnes PAS de conseils médicaux (oriente vers le cabinet en urgence)
- Reste humain et évite les phrases toutes faites
`

// en haut du fichier
const SITE_URLS = [
  'https://www.cabinetdentairerivedroite.com/',
  'https://www.cabinetdentairerivedroite.com/services',
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
          .slice(0, 3500); // on borne pour rester léger
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

    // Fetch site context asynchronously (don't block)
    const siteContextPromise = fetchSiteContext();
    
    // Add natural tone variation
    const naturalTones = [
      "Sois naturel et varie tes expressions, comme un vrai assistant humain.",
      "Évite de répéter les mêmes tournures de phrase.",
      "Utilise des phrases fluides, sans formules figées.",
      "Exprime-toi comme si tu discutais avec un patient en face de toi."
    ];
    const tonePrompt = naturalTones[Math.floor(Math.random() * naturalTones.length)];

    const systemPrompt = `${SYSTEM_PROMPT}

${tonePrompt}

CONTEXTE_SITE (extrait, priorité absolue si pertinent) :
Le site est accessible à https://www.cabinetdentairerivedroite.com
Consulte-le pour les informations précises.`;

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
    
    if (userMessagesCount >= 3) {
      try {
        const transcript = messages
          .map((m: Message) => `${m.role === 'user' ? 'Patient' : 'Assistant'}: ${m.content}`)
          .join('\n\n')

        await resend.emails.send({
          from: 'Cabinet Dentaire Rive Droite <noreply@cabinetdentairerivedroite.com>',
          to: ['cabinetdentaireaces@gmail.com'],
          subject: `Chatbot AI - Nouvelle conversation (${userMessagesCount} messages)`,
          text: `Nouvelle conversation via le chatbot AI du site web.\n\nNombre de messages: ${userMessagesCount}\n\n---\n\n${transcript}`,
        })

        logger.info('Chat transcript sent via email')
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
