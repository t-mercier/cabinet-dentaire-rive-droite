'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Star, 
  Plus,
  Filter,
  MessageSquare
} from 'lucide-react'
import { toast } from 'sonner'

const testimonials = [
  {
    id: 1,
    name: 'Marie L.',
    rating: 5,
    content: 'Excellent accueil et soins de qualité. Le Dr. Martin est très professionnel et à l\'écoute. Je recommande vivement ce cabinet.',
    service: 'Soins Conservateurs',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jean-Pierre D.',
    rating: 5,
    content: 'Cabinet moderne et équipe très compétente. Les soins d\'implantologie ont été parfaitement réalisés. Je suis très satisfait du résultat.',
    service: 'Implantologie',
    date: '2024-01-10'
  },
  {
    id: 3,
    name: 'Sophie M.',
    rating: 5,
    content: 'Très satisfaite de mes soins d\'implantologie. L\'équipe est à l\'écoute et le résultat est parfait. Je recommande sans hésitation.',
    service: 'Implantologie',
    date: '2024-01-08'
  },
  {
    id: 4,
    name: 'Pierre R.',
    rating: 5,
    content: 'Excellent traitement parodontal. L\'équipe m\'a bien expliqué le processus et les résultats sont au rendez-vous. Merci !',
    service: 'Parodontologie',
    date: '2024-01-05'
  },
  {
    id: 5,
    name: 'Claire T.',
    rating: 5,
    content: 'Soins pédodontiques parfaits pour mes enfants. L\'approche bienveillante a permis de rassurer mes petits. Je recommande !',
    service: 'Pédodontie',
    date: '2024-01-03'
  },
  {
    id: 6,
    name: 'Michel B.',
    rating: 5,
    content: 'Prothèses dentaires de très bonne qualité. Le laboratoire intégré permet un suivi optimal. Très satisfait du résultat.',
    service: 'Prothèses Dentaires',
    date: '2023-12-28'
  },
  {
    id: 7,
    name: 'Isabelle C.',
    rating: 5,
    content: 'Blanchiment dentaire réussi ! L\'équipe est professionnelle et les conseils d\'entretien très utiles. Je suis ravie du résultat.',
    service: 'Blanchiment',
    date: '2023-12-25'
  },
  {
    id: 8,
    name: 'Antoine F.',
    rating: 5,
    content: 'Cabinet très bien équipé et personnel compétent. Les soins conservateurs ont été réalisés avec soin. Je recommande !',
    service: 'Soins Conservateurs',
    date: '2023-12-20'
  }
]

const services = ['Tous', 'Implantologie', 'Parodontologie', 'Soins Conservateurs', 'Prothèses Dentaires', 'Blanchiment', 'Pédodontie']

export default function TestimonialsPage() {
  const [selectedService, setSelectedService] = useState('Tous')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    rating: 5,
    content: '',
    service: ''
  })

  const filteredTestimonials = selectedService === 'Tous' 
    ? testimonials 
    : testimonials.filter(t => t.service === selectedService)

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newTestimonial.name || !newTestimonial.content || !newTestimonial.service) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      })

      if (response.ok) {
        toast.success('Témoignage envoyé avec succès ! Il sera publié après validation.')
        setNewTestimonial({ name: '', rating: 5, content: '', service: '' })
        setShowAddForm(false)
      } else {
        toast.error('Erreur lors de l\'envoi du témoignage')
      }
    } catch (error) {
      toast.error('Erreur lors de l\'envoi du témoignage')
    }
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
                {testimonials.length}
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
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un témoignage
          </Button>
        </div>

        {/* Add Testimonial Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Ajouter votre témoignage
              </CardTitle>
              <CardDescription>
                Partagez votre expérience avec nos soins dentaires
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom (optionnel)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre nom ou initiales"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service concerné
                    </label>
                    <select
                      id="service"
                      value={newTestimonial.service}
                      onChange={(e) => setNewTestimonial({...newTestimonial, service: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Sélectionnez un service</option>
                      <option value="Implantologie">Implantologie</option>
                      <option value="Parodontologie">Parodontologie</option>
                      <option value="Soins Conservateurs">Soins Conservateurs</option>
                      <option value="Prothèses Dentaires">Prothèses Dentaires</option>
                      <option value="Blanchiment">Blanchiment</option>
                      <option value="Pédodontie">Pédodontie</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewTestimonial({...newTestimonial, rating: star})}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= newTestimonial.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Votre témoignage
                  </label>
                  <textarea
                    id="content"
                    rows={4}
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Partagez votre expérience..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Envoyer le témoignage
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {testimonial.service}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
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
