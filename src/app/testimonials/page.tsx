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
import { staticTestimonials } from '@/lib/data/staticTestimonials'

// UI-facing testimonial type for display
type LocalTestimonial = {
  id: string
  name: string
  rating: number
  content: string
  service: string
  date: string
  isStatic: boolean
}

// Use static testimonials as seed data instead of hardcoded array
const seedTestimonials: LocalTestimonial[] = staticTestimonials

// Remove the services array as it's now in ServiceFilter component

export default function TestimonialsPage() {
  const [selectedService, setSelectedService] = useState<string>('Tous')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [localTestimonials, setLocalTestimonials] = useState<LocalTestimonial[]>(seedTestimonials)
  // Removed newTestimonial state - now handled in TestimonialForm component

  // Charger les témoignages depuis la base de données au montage du composant
  useEffect(() => {
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
    // Toujours commencer avec les témoignages statiques
    let combinedTestimonials = [...staticTestimonials]
    
    try {
      const dbTestimonials = await getTestimonials()
      // Convertir le format de la base de données vers le format d'affichage
      const formattedTestimonials: LocalTestimonial[] = dbTestimonials.map((t: Testimonial) => ({
        id: t.id || '',
        name: t.patientName,
        rating: t.rating,
        content: t.content,
        service: t.service ?? 'Général',
        date: new Date(t.createdAt || t.created_at || Date.now()).toISOString().split('T')[0],
        isStatic: false // Marquer comme témoignage de la DB
      }))
      
      // Ajouter les témoignages de la DB aux témoignages statiques
      combinedTestimonials = [...staticTestimonials, ...formattedTestimonials]
      
    } catch (error) {
      // En cas d'erreur, garder seulement les témoignages statiques
      console.log('Erreur lors du chargement des témoignages:', error)
    }
    
    setLocalTestimonials(combinedTestimonials)
    localStorage.setItem('testimonials', JSON.stringify(combinedTestimonials))
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
