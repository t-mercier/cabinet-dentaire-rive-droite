import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, question } = await request.json()

    // Validation des données
    if (!name || !email || !question) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Détecter si c'est une urgence
    const isEmergency = question.toLowerCase().includes('urgence') || 
                       question.toLowerCase().includes('douleur') || 
                       question.toLowerCase().includes('mal') ||
                       question.toLowerCase().includes('urgent') ||
                       question.toLowerCase().includes('détartrage') ||
                       question.toLowerCase().includes('rendez-vous')

    // Configuration du transporteur email
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Votre adresse Gmail
        pass: process.env.GMAIL_APP_PASSWORD // Mot de passe d'application Gmail
      }
    })

    // Configuration de l'email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'cabinetdentaireaces@gmail.com',
      subject: isEmergency 
        ? '🚨 URGENCE - Demande de rendez-vous'
        : 'Question depuis le site web',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">${isEmergency ? '🚨 URGENCE - ' : ''}Nouvelle ${isEmergency ? 'demande de rendez-vous' : 'question'} depuis le site web</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du patient :</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
          </div>
          
          <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">${isEmergency ? 'Urgence :' : 'Question :'}</h3>
            <p style="white-space: pre-wrap;">${question}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Message envoyé depuis cabinetdentairerivedroite.com</p>
            <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      `
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email envoyé avec succès',
        isEmergency 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
