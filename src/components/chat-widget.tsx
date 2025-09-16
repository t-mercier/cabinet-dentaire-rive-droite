'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, X, Mail, Send, User, CheckCircle } from 'lucide-react'

interface ContactForm {
  name: string
  email: string
  question: string
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    question: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.question.trim()) return

    setIsSubmitting(true)

    try {
      // Créer le lien mailto avec le message formaté
      const subject = encodeURIComponent('Question depuis le site web')
      const body = encodeURIComponent(`
Bonjour,

Vous avez reçu une nouvelle question depuis le site web :

Nom : ${formData.name}
Email : ${formData.email}

Question :
${formData.question}

---
Message envoyé depuis cabinetdentairerivedroite.com
      `)

      const mailtoLink = `mailto:cabinetdentaireaces@gmail.com?subject=${subject}&body=${body}`
      
      // Ouvrir le client email
      window.location.href = mailtoLink
      
      // Simuler l'envoi réussi
      setTimeout(() => {
        setIsSubmitted(true)
        setIsSubmitting(false)
      }, 1000)

    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', question: '' })
    setIsSubmitted(false)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-96 shadow-xl">
        <CardHeader className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <CardTitle className="text-lg">Contact</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-700 p-1"
              >
                {isMinimized ? '↑' : '↓'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-4 flex flex-col h-80">
            {!isSubmitted ? (
              <>
                <div className="text-center text-gray-600 text-sm mb-4">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p>Bonjour ! Quel est votre nom, email et question ?</p>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      required
                    />
                  </div>
                  
                  <div className="flex-1">
                    <textarea
                      placeholder="Votre question..."
                      value={formData.question}
                      onChange={(e) => handleInputChange('question', e.target.value)}
                      className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name.trim() || !formData.email.trim() || !formData.question.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Envoi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </div>
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Message envoyé !
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nous reviendrons vers vous dès que possible.
                </p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  size="sm"
                >
                  Nouveau message
                </Button>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
