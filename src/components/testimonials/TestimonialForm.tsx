'use client'

/**
 * Form component for submitting new testimonials.
 * 
 * Purpose: Handle testimonial submission with validation and user feedback
 * Usage: Used in testimonials page for user input
 * State: Manages form data and submission state
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Send } from 'lucide-react'
import { toast } from 'sonner'
import { postTestimonial } from '@/lib/api/testimonials'
import type { NewTestimonialInput } from '@/types/testimonials'

interface TestimonialFormProps {
  onSuccess: () => void
  onCancel: () => void
}

const services = ['Implantologie', 'Parodontologie', 'Soins Conservateurs', 'Prothèses Dentaires', 'Blanchiment', 'Pédodontie']

export function TestimonialForm({ onSuccess, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState<NewTestimonialInput>({
    name: '',
    rating: 5,
    content: '',
    service: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.content.trim() || !formData.service) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsSubmitting(true)
    
    try {
      await postTestimonial(formData)
      toast.success('Témoignage envoyé avec succès ! Il sera publié après validation.')
      setFormData({ name: '', rating: 5, content: '', service: '' })
      onSuccess()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'envoi du témoignage')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          Ajouter un témoignage
        </CardTitle>
        <CardDescription>
          Partagez votre expérience avec notre cabinet dentaire
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom (optionnel)
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom ou 'Anonyme'"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (obligatoire)
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      rating <= formData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service (obligatoire)
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Témoignage (obligatoire)
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Partagez votre expérience..."
              required
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Protection de vos données</p>
                <p>
                  En soumettant ce témoignage, vous acceptez qu'il soit publié sur notre site. 
                  Vos données sont protégées selon notre{' '}
                  <a href="/privacy" className="underline hover:no-underline" target="_blank">
                    politique de confidentialité
                  </a>. 
                  Vous pouvez demander la suppression de votre témoignage à tout moment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
