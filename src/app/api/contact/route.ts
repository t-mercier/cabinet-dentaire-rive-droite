import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Save to database
    const contactForm = await db.contactForm.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        isRead: false
      }
    })

    // Here you could also send an email notification to the practice
    // For now, we'll just log it
    console.log('New contact form submission:', contactForm)

    return NextResponse.json(
      { 
        message: 'Message envoyé avec succès',
        id: contactForm.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
