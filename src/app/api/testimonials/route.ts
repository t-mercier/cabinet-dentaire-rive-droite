import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: {
        isApproved: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(testimonials)
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

    // Save to database (initially not approved)
    const testimonial = await db.testimonial.create({
      data: {
        patientName: name || 'Anonyme',
        rating,
        content,
        isApproved: false // Will be approved by admin
      }
    })

    // Here you could also send an email notification to the practice
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
