/**
 * What changed & why
 * - Switched to shared server-side Supabase client (no direct Postgres).
 * - Replaced console logs with a tiny logger for cleaner output.
 * - Server-side sorts results to avoid snake_case vs camelCase mismatch.
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabaseServer'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    logger.info('GET /api/testimonials - starting')

    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')

    if (error) {
      logger.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des témoignages' },
        { status: 500 }
      )
    }

    type TestimonialRow = { createdAt?: string; created_at?: string }
    const list = (testimonials || []).sort((a: TestimonialRow, b: TestimonialRow) => {
      const aDate = new Date(a.createdAt || a.created_at || 0).getTime()
      const bDate = new Date(b.createdAt || b.created_at || 0).getTime()
      return bDate - aDate
    })

    logger.info('Found testimonials:', list.length)
    return NextResponse.json(list)
  } catch (error) {
    logger.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des témoignages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    logger.info('POST /api/testimonials - starting')
    
    const body = await request.json()
    const { name, rating, content, service } = body

    // Validation
    if (!content || !service || !rating) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La note doit être comprise entre 1 et 5' },
        { status: 400 }
      )
    }

    // Save to database using Supabase. Use returning: 'minimal' to avoid
    // requiring SELECT permission when RLS allows only INSERT.
    const { error } = await supabase
      .from('testimonials')
      .insert({
        patientName: name || 'Anonyme',
        rating,
        content,
        service: service || 'Général',
        isApproved: false // Will be approved by admin
      }, { returning: 'minimal' })

    if (error) {
      logger.error('Supabase insert error:', error)
      const devDetails = process.env.NODE_ENV !== 'production' ? { details: error.message } : {}
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde du témoignage', ...devDetails },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Témoignage envoyé avec succès. Il sera publié après validation.'
      },
      { status: 201 }
    )

  } catch (error) {
    logger.error('Error processing testimonial:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
