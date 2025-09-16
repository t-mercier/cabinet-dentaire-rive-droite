'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Clock, MapPin } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Message de bienvenue automatique
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage('assistant', 'Bonjour ! 👋 Je suis l\'assistant du Cabinet Dentaire Rive Droite. Pour que notre équipe puisse vous répondre rapidement, pourriez-vous me donner votre nom, votre email et votre question ?')
        setShowContactForm(true)
      }, 500)
    }
  }, [isOpen, messages.length])

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const [showContactForm, setShowContactForm] = useState(false)
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    question: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.question.trim()) return

    setIsSubmitting(true)

    try {
      // Détecter si c'est une urgence
      const isEmergency = contactData.question.toLowerCase().includes('urgence') || 
                         contactData.question.toLowerCase().includes('douleur') || 
                         contactData.question.toLowerCase().includes('mal') ||
                         contactData.question.toLowerCase().includes('urgent') ||
                         contactData.question.toLowerCase().includes('détartrage') ||
                         contactData.question.toLowerCase().includes('rendez-vous')

      // Créer le lien mailto avec le message formaté
      const subject = isEmergency 
        ? encodeURIComponent('🚨 URGENCE - Demande de rendez-vous')
        : encodeURIComponent('Question depuis le site web')
      
      const body = encodeURIComponent(`
Bonjour,

${isEmergency ? '🚨 URGENCE - ' : ''}Vous avez reçu une nouvelle ${isEmergency ? 'demande de rendez-vous' : 'question'} depuis le site web :

Nom : ${contactData.name}
Email : ${contactData.email}

${isEmergency ? 'Urgence :' : 'Question :'}
${contactData.question}

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
        if (isEmergency) {
          addMessage('assistant', '🚨 Urgence transmise ! Notre équipe vous contactera en priorité dans les plus brefs délais. En cas d\'urgence extrême, appelez-nous au 05.56.86.29.00')
        } else {
          addMessage('assistant', 'Parfait ! Votre message a été envoyé. Notre équipe vous répondra dès que possible. Merci de votre confiance ! 😊')
        }
      }, 1000)

    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
    }
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
      <Card className="w-80 h-[500px] shadow-xl">
        <CardHeader className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <CardTitle className="text-lg">Assistant Dentaire</CardTitle>
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
          <CardContent className="p-0 flex flex-col h-[420px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start">
                      {message.role === 'assistant' && (
                        <Bot className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                      )}
                      {message.role === 'user' && (
                        <User className="w-4 h-4 mr-2 mt-0.5 text-white flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-2 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Formulaire de contact */}
            <div className="border-t p-4 bg-white">
              {!isSubmitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={contactData.name}
                    onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={contactData.email}
                    onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    required
                  />
                  <textarea
                    placeholder="Votre question..."
                    value={contactData.question}
                    onChange={(e) => setContactData(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full h-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !contactData.name.trim() || !contactData.email.trim() || !contactData.question.trim()}
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
              ) : (
                <div className="text-center">
                  <div className="text-green-600 text-sm mb-2">
                    ✅ Message envoyé avec succès !
                  </div>
                  <Button
                    onClick={() => {
                      setShowContactForm(false)
                      setIsSubmitted(false)
                      setContactData({ name: '', email: '', question: '' })
                      setMessages([])
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Nouvelle question
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
