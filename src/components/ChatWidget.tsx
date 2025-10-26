'use client'

/**
 * Chat Widget Component - Interactive assistant for dental clinic
 * 
 * Purpose: Provide instant support and answers to common questions
 * Features: Chat interface, message history, email transcript
 */

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, X, Send, Sparkles, User, Stethoscope } from 'lucide-react'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Initial greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        role: 'assistant',
        content: 'Bonjour, comment puis-je vous aider ?',
        timestamp: new Date()
      }
      setMessages([greeting])
    }
  }, [isOpen, messages.length])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi du message')
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Erreur lors de l\'envoi du message')
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Désolé, j\'ai rencontré une erreur. Pouvez-vous reformuler votre question ou appeler directement au 05.56.86.29.00 ?',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">IA Assistant</h3>
                <p className="text-xs text-blue-100">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Fermer le chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 flex items-start space-x-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Stethoscope className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.role === 'assistant' ? (
                    <div className="text-sm leading-relaxed">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick action */}
          {messages.length === 1 && !inputValue && (
            <div className="px-4 pb-2 border-b border-gray-200">
              <button
                onClick={async () => {
                  const rdvMessage = "Je souhaite prendre rendez-vous"
                  const userMessage: Message = {
                    role: 'user',
                    content: rdvMessage,
                    timestamp: new Date()
                  }

                  setMessages(prev => [...prev, userMessage])
                  setIsLoading(true)

                  try {
                    // Send message to API
                    const response = await fetch('/api/chat', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        messages: [...messages, userMessage].map(m => ({
                          role: m.role,
                          content: m.content
                        }))
                      })
                    })

                    const data = await response.json()

                    if (!response.ok) {
                      throw new Error(data.error || 'Erreur lors de l\'envoi du message')
                    }

                    const assistantMessage: Message = {
                      role: 'assistant',
                      content: data.response,
                      timestamp: new Date()
                    }

                    setMessages(prev => [...prev, assistantMessage])
                  } catch (error) {
                    console.error('Chat error:', error)
                    toast.error('Erreur lors de l\'envoi du message')
                    
                    const errorMessage: Message = {
                      role: 'assistant',
                      content: 'Désolé, j\'ai rencontré une erreur. Pouvez-vous reformuler votre question ou appeler directement au 05.56.86.29.00 ?',
                      timestamp: new Date()
                    }

                    setMessages(prev => [...prev, errorMessage])
                  } finally {
                    setIsLoading(false)
                  }
                }}
                className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                📅 Prendre rendez-vous
              </button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-xl">
            <div className="flex space-x-2 items-end">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  // Auto-resize
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Tapez votre message..."
                disabled={isLoading}
                rows={1}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none min-h-[42px] max-h-[120px] overflow-y-auto"
                style={{ 
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap'
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
