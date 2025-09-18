'use client'

/**
 * What changed & why
 * - Centralized API calls via lib/api/testimonials for clarity.
 * - Removed console logs; user feedback via toasts remains.
 * - Behavior unchanged: loads from API with localStorage fallback; submits via API.
 */

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus,
  MessageSquare
} from 'lucide-react'
import { toast } from 'sonner'
import { getTestimonials } from '@/lib/api/testimonials'
import type { Testimonial } from '@/types/testimonials'
import { TestimonialCard } from '@/components/testimonials/TestimonialCard'
import { TestimonialForm } from '@/components/testimonials/TestimonialForm'
import { ServiceFilter } from '@/components/testimonials/ServiceFilter'

// UI-facing testimonial type for display
type LocalTestimonial = {
  id: string
  name: string
  rating: number
  content: string
  service: string
  date: string
}

const seedTestimonials: LocalTestimonial[] = [
  {
    id: '1',
    name: 'Marie L.',
    rating: 5,
    content: 'Excellent accueil et soins de qualité. Détartrage parfait et l\'équipe a très bien soigné les caries de mes enfants. L\'équipe est très professionnelle et à l\'écoute. Je recommande vivement ce cabinet.',
    service: 'Soins Conservateurs',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jean-Pierre D.',
    rating: 5,
    content: 'Cabinet moderne et équipe ultra compétente. Les soins d\'implantologie ont été parfaitement réalisés. Je suis très satisfait du résultat.',
    service: 'Implantologie',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Sophie M.',
    rating: 5,
    content: 'Très satisfaite de mes soins d\'implantologie. L\'équipe est à l\'écoute et le résultat est parfait. Je recommande sans hésitation.',
    service: 'Implantologie',
    date: '2024-01-08'
  },
  {
    id: '9',
    name: 'Catherine L.',
    rating: 5,
    content: 'Le Dr Mercier m\'a posé un implant dentaire la semaine dernière, il a pris le temps de m\'expliquer chaque étape de façon très claire, et m\'a rassurée tout au long du processus. Un processus très bien organisé et un résultat parfait ! Merci beaucoup !',
    service: 'Implantologie',
    date: '2024-01-12'
  },
  {
    id: '4',
    name: 'Pierre R.',
    rating: 5,
    content: 'Excellent traitement parodontal. L\'équipe m\'a bien expliqué le processus et les résultats sont au rendez-vous. Merci !',
    service: 'Parodontologie',
    date: '2024-01-05'
  },
  {
    id: '5',
    name: 'Claire T.',
    rating: 5,
    content: 'Une service pédodontique chaleureux et vraiment bienveillant. Parfait pour mes enfants. Je recommande !',
    service: 'Pédodontie',
    date: '2024-01-03'
  },
  {
    id: '6',
    name: 'Michel B.',
    rating: 5,
    content: 'Prothèses dentaires de très bonne qualité. Le laboratoire intégré permet un suivi optimal, et un confort optimal. Très satisfait du résultat.',
    service: 'Prothèses Dentaires',
    date: '2023-12-28'
  },
  {
    id: '7',
    name: 'Isabelle C.',
    rating: 5,
    content: 'Blanchiment dentaire réussi ! L\'équipe est professionnelle et les conseils d\'entretien très utiles. Je suis ravie du résultat.',
    service: 'Blanchiment',
    date: '2023-12-25'
  },
  {
    id: '10',
    name: 'François M.',
    rating: 5,
    content: 'Le Dr Mercier a été exceptionnel lors de ma consultation d\'implantologie. Il a prit le temps de m\'expliquer chaque détail de la procédure, les risques et les bénéfices. Sa patience et son écoute m\'ont complètement rassuré. Un praticien à l\'écoute et très humain !',
    service: 'Implantologie',
    date: '2024-01-18'
  },
  {
    id: '8',
    name: 'Antoine F.',
    rating: 5,
    content: 'Cabinet très bien équipé et personnel compétent. Les carries ont été traitées avec soin, et sans douleur! Merci pour tout!',
    service: 'Soins Conservateurs',
    date: '2023-12-20'
  }
]

// Remove the services array as it's now in ServiceFilter component

export default function TestimonialsPage() {
  const [selectedService, setSelectedService] = useState<string>('Tous')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [localTestimonials, setLocalTestimonials] = useState<LocalTestimonial[]>(seedTestimonials)
  // Removed newTestimonial state - now handled in TestimonialForm component

  // Charger les témoignages depuis la base de données au montage du composant
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const dbTestimonials = await getTestimonials()
        // Convertir le format de la base de données vers le format d'affichage
        const formattedTestimonials: LocalTestimonial[] = dbTestimonials.map((t: Testimonial) => ({
          id: t.id || '',
          name: t.patientName,
          rating: t.rating,
          content: t.content,
          service: t.service ?? 'Général',
          date: new Date(t.createdAt || t.created_at || Date.now()).toISOString().split('T')[0]
        }))
        setLocalTestimonials(formattedTestimonials)
        localStorage.setItem('testimonials', JSON.stringify(formattedTestimonials))
      } catch {
        // Fallback vers localStorage
        const savedTestimonials = localStorage.getItem('testimonials')
        if (savedTestimonials) {
          try {
            const parsed = JSON.parse(savedTestimonials)
            setLocalTestimonials(parsed)
               } catch {
                 // ignore parse errors
               }
        }
      }
    }

    loadTestimonials()
  }, [])

  // Sauvegarder les témoignages dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(localTestimonials))
  }, [localTestimonials])

  // Fonction pour réinitialiser les témoignages (utile pour les tests)
  const resetTestimonials = () => {
    setLocalTestimonials(seedTestimonials)
    localStorage.removeItem('testimonials')
    toast.success('Témoignages réinitialisés')
  }

  const filteredTestimonials = selectedService === 'Tous' 
    ? localTestimonials 
    : localTestimonials.filter(t => t.service === selectedService)

  const loadTestimonials = async () => {
    try {
      const dbTestimonials = await getTestimonials()
      // Convertir le format de la base de données vers le format d'affichage
      const formattedTestimonials: LocalTestimonial[] = dbTestimonials.map((t: Testimonial) => ({
        id: t.id || '',
        name: t.patientName,
        rating: t.rating,
        content: t.content,
        service: t.service ?? 'Général',
        date: new Date(t.createdAt || t.created_at || Date.now()).toISOString().split('T')[0]
      }))
      setLocalTestimonials(formattedTestimonials)
      localStorage.setItem('testimonials', JSON.stringify(formattedTestimonials))
    } catch {
      // Fallback vers localStorage
      const savedTestimonials = localStorage.getItem('testimonials')
      if (savedTestimonials) {
        try {
          setLocalTestimonials(JSON.parse(savedTestimonials))
        } catch {
          // ignore parse errors
        }
      }
    }
  }

  const handleTestimonialSuccess = () => {
    setShowAddForm(false)
    // Reload testimonials from database
    loadTestimonials()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Témoignages
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que nos patients pensent de nos soins et partagez 
              votre propre expérience.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {localTestimonials.length}
              </div>
              <p className="text-gray-600">Témoignages</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                5.0
              </div>
              <p className="text-gray-600">Note moyenne</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                100%
              </div>
              <p className="text-gray-600">Satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <ServiceFilter 
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un témoignage
            </Button>
            {process.env.NODE_ENV === 'development' && (
              <Button 
                onClick={resetTestimonials}
                variant="outline"
                size="sm"
              >
                Reset (dev)
              </Button>
            )}
          </div>
        </div>

        {/* Add Testimonial Form */}
        {showAddForm && (
          <div className="mb-8">
            <TestimonialForm 
              onSuccess={handleTestimonialSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
            />
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun témoignage trouvé
            </h3>
            <p className="text-gray-600">
              Aucun témoignage ne correspond à votre filtre. Essayez de sélectionner un autre service.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
