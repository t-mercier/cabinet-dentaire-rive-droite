'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  FileText, 
  MessageSquare, 
  Calendar, 
  User,
  Download,
  Eye,
  Clock,
  CheckCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface Document {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  createdAt: string
}

interface Appointment {
  id: string
  date: string
  time: string
  type: string
  status: string
  notes?: string
}

interface Message {
  id: string
  subject: string
  content: string
  isRead: boolean
  createdAt: string
}

function PatientPortalContent() {
  const { user, isLoaded } = useUser()
  const [documents, setDocuments] = useState<Document[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeTab, setActiveTab] = useState<'documents' | 'appointments' | 'messages'>('documents')

  useEffect(() => {
    if (user) {
      // In a real app, you would fetch this data from your API
      // For now, we'll use mock data
      setDocuments([
        {
          id: '1',
          title: 'Radiographie panoramique',
          description: 'Radiographie de contrôle annuel',
          fileUrl: '#',
          fileType: 'PDF',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Ordonnance antibiotiques',
          description: 'Traitement post-opératoire',
          fileUrl: '#',
          fileType: 'PDF',
          createdAt: '2024-01-10'
        }
      ])

      setAppointments([
        {
          id: '1',
          date: '2024-02-15',
          time: '14:30',
          type: 'Contrôle',
          status: 'scheduled',
          notes: 'Contrôle de routine'
        },
        {
          id: '2',
          date: '2024-01-20',
          time: '10:00',
          type: 'Détartrage',
          status: 'completed'
        }
      ])

      setMessages([
        {
          id: '1',
          subject: 'Rappel de rendez-vous',
          content: 'Votre rendez-vous du 15 février est confirmé à 14h30.',
          isRead: false,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          subject: 'Résultats d\'examen',
          content: 'Vos résultats d\'examen sont disponibles dans votre espace patient.',
          isRead: true,
          createdAt: '2024-01-10'
        }
      ])
    }
  }, [user])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Espace Patient</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à vos documents et informations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <a href="/sign-in">Se connecter</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="/sign-up">Créer un compte</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Espace Patient
            </h1>
            <p className="text-xl text-gray-600">
              Bonjour {user.firstName || user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'documents' ? 'default' : 'outline'}
            onClick={() => setActiveTab('documents')}
            className="flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </Button>
          <Button
            variant={activeTab === 'appointments' ? 'default' : 'outline'}
            onClick={() => setActiveTab('appointments')}
            className="flex items-center"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Rendez-vous
          </Button>
          <Button
            variant={activeTab === 'messages' ? 'default' : 'outline'}
            onClick={() => setActiveTab('messages')}
            className="flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
        </div>

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <span className="text-sm text-gray-500">{doc.fileType}</span>
                    </div>
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{new Date(doc.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes Rendez-vous</h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-6 h-6 text-blue-600 mr-4" />
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.type}</h3>
                          <p className="text-gray-600">
                            {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {appointment.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-600 mr-2" />
                        )}
                        <span className={`text-sm font-medium ${
                          appointment.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {appointment.status === 'completed' ? 'Terminé' : 'Programmé'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Mes Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={!message.isRead ? 'border-blue-200 bg-blue-50' : ''}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
                          <h3 className="font-semibold text-lg">{message.subject}</h3>
                          {!message.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{message.content}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PatientPortal() {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPublishableKey || clerkPublishableKey.includes('dummy')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Espace Patient</CardTitle>
            <CardDescription>
              Service d'authentification non configuré
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500">
              L'espace patient nécessite une configuration d'authentification.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <PatientPortalContent />
}
