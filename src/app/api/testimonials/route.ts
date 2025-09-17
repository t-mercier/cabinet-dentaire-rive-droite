import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    console.log('GET /api/testimonials - Starting...')
    
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des témoignages' },
        { status: 500 }
      )
    }

    console.log('Found testimonials:', testimonials?.length || 0)
    return NextResponse.json(testimonials || [])
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des témoignages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/testimonials - Starting...')
    
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

    // Save to database using Supabase
    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert({
        patientName: name || 'Anonyme',
        rating,
        content,
        service: service || 'Général',
        isApproved: false // Will be approved by admin
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde du témoignage' },
        { status: 500 }
      )
    }

    console.log('New testimonial submission:', testimonial)

    return NextResponse.json(
      { 
        message: 'Témoignage envoyé avec succès. Il sera publié après validation.',
        id: testimonial.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error processing testimonial:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
