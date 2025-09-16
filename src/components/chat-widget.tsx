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
        addMessage('assistant', 'Bonjour ! 👋 Je suis l\'assistant du Cabinet Dentaire Rive Droite. Comment puis-je vous aider aujourd\'hui ?')
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

  const getAssistantResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Salutations
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      return 'Bonjour ! 😊 Je suis ravi de vous accueillir. Que puis-je faire pour vous aujourd\'hui ?'
    }
    
    // Rendez-vous
    if (message.includes('rendez-vous') || message.includes('rdv') || message.includes('appointment')) {
      return 'Pour prendre rendez-vous, vous pouvez nous appeler au 📞 **05.56.86.29.00** ou nous envoyer un email à **cabinetdentaireaces@gmail.com**. Nous vous répondrons rapidement !'
    }
    
    // Horaires
    if (message.includes('horaire') || message.includes('ouvert') || message.includes('fermé')) {
      return 'Nos horaires d\'ouverture :\n\n🕐 **Lundi au Vendredi** : 8h30 - 19h00\n🕐 **Samedi** : 8h30 - 12h30\n🕐 **Dimanche** : Fermé\n\nNous sommes situés au **123 Avenue de la Rive Droite, 33000 Bordeaux**'
    }
    
    // Services
    if (message.includes('service') || message.includes('soin') || message.includes('traitement')) {
      return 'Nous proposons de nombreux services :\n\n🦷 **Implantologie**\n🦷 **Parodontologie**\n🦷 **Soins Conservateurs**\n🦷 **Prothèses Dentaires**\n🦷 **Blanchiment**\n🦷 **Pédodontie**\n\nVoulez-vous plus d\'informations sur un service particulier ?'
    }
    
    // Urgences
    if (message.includes('urgence') || message.includes('douleur') || message.includes('mal')) {
      return '🚨 **En cas d\'urgence dentaire**, appelez-nous immédiatement au **05.56.86.29.00**. Nous avons des créneaux d\'urgence disponibles. Si c\'est en dehors des horaires, laissez un message et nous vous rappellerons rapidement.'
    }
    
    // Prix/tarifs
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût') || message.includes('combien')) {
      return 'Les tarifs varient selon le traitement. Pour un devis personnalisé, je vous invite à nous contacter au **05.56.86.29.00** ou par email à **cabinetdentaireaces@gmail.com**. Nous vous fournirons un devis détaillé et transparent.'
    }
    
    // Contact
    if (message.includes('contact') || message.includes('adresse') || message.includes('téléphone')) {
      return '📞 **Téléphone** : 05.56.86.29.00\n📧 **Email** : cabinetdentaireaces@gmail.com\n📍 **Adresse** : 123 Avenue de la Rive Droite, 33000 Bordeaux\n\nN\'hésitez pas à nous contacter pour toute question !'
    }
    
    // Assurance/mutuelle
    if (message.includes('assurance') || message.includes('mutuelle') || message.includes('remboursement')) {
      return 'Nous acceptons la plupart des mutuelles et assurances. Pour connaître votre prise en charge, contactez votre mutuelle ou appelez-nous au **05.56.86.29.00**. Nous vous aiderons à optimiser vos remboursements.'
    }
    
    // Questions générales
    if (message.includes('merci') || message.includes('thanks')) {
      return 'De rien ! 😊 N\'hésitez pas si vous avez d\'autres questions. Je suis là pour vous aider !'
    }
    
    // Réponse par défaut
    return 'Merci pour votre question ! Pour une réponse personnalisée, je vous invite à nous contacter directement :\n\n📞 **Téléphone** : 05.56.86.29.00\n📧 **Email** : cabinetdentaireaces@gmail.com\n\nNotre équipe vous répondra rapidement avec des informations précises !'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    
    // Ajouter le message utilisateur
    addMessage('user', userMessage)
    
    // Simuler la frappe de l'assistant
    setIsTyping(true)
    
    setTimeout(() => {
      const response = getAssistantResponse(userMessage)
      addMessage('assistant', response)
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Délai réaliste
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
          <CardContent className="p-0 flex flex-col h-80">
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

            {/* Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isTyping || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
