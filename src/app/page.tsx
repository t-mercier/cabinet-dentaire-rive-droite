import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, 
  User, 
  Shield, 
  Heart, 
  Smile, 
  Baby, 
  Star, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle
} from 'lucide-react'

const services = [
  {
    name: 'Implantologie',
    description: 'Remplacement de dents manquantes par des implants dentaires',
    icon: Shield,
    href: '/services/implantologie'
  },
  {
    name: 'Parodontologie',
    description: 'Traitement des maladies des gencives et du parodonte',
    icon: Heart,
    href: '/services/parodontologie'
  },
  {
    name: 'Soins Conservateurs',
    description: 'Caries, obturations et soins préventifs',
    icon: CheckCircle,
    href: '/services/soins-conservateurs'
  },
  {
    name: 'Prothèses Dentaires',
    description: 'Couronnes, bridges et prothèses amovibles',
    icon: Smile,
    href: '/services/protheses-dentaires'
  },
  {
    name: 'Blanchiment',
    description: 'Éclaircissement dentaire professionnel',
    icon: Star,
    href: '/services/blanchiment'
  },
  {
    name: 'Pédodontie',
    description: 'Soins dentaires spécialisés pour enfants',
    icon: Baby,
    href: '/services/pedodontie'
  }
]

const testimonials = [
  {
    name: 'Marie L.',
    rating: 5,
    content: 'Excellent accueil et soins de qualité. Le Dr. Martin est très professionnel et à l\'écoute.'
  },
  {
    name: 'Jean-Pierre D.',
    rating: 5,
    content: 'Cabinet moderne et équipe très compétente. Je recommande vivement !'
  },
  {
    name: 'Sophie M.',
    rating: 5,
    content: 'Très satisfaite de mes soins d\'implantologie. Résultat parfait !'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Cabinet Dentaire Rive Droite"
                width={400}
                height={160}
                className="mx-auto"
                priority
              />
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Votre santé bucco-dentaire est notre priorité. Nous offrons des soins de qualité 
              dans un environnement moderne et confortable à Floirac, Bordeaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre RDV
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/patient-portal">
                  <User className="w-5 h-5 mr-2" />
                  Espace Patient
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des soins dentaires complets pour toute la famille
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card key={service.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={service.href}>
                        En savoir plus
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Notre Cabinet
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Situé au cœur de Floirac, notre cabinet dentaire moderne dispose d'équipements 
                de dernière génération pour vous offrir des soins de qualité dans un environnement 
                confortable et sécurisé.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">4 salles de soins équipées</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Bloc opératoire pour chirurgie</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Laboratoire de prothèses</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Service de radiologie</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informations Pratiques</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600">69 cours Gambetta<br />33270 Floirac, Bordeaux</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="text-gray-600">05.56.86.29.00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Horaires</p>
                    <p className="text-gray-600">
                      Lundi - Vendredi<br />
                      09:00 - 12:30<br />
                      14:00 - 19:30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Témoignages
            </h2>
            <p className="text-xl text-gray-600">
              Ce que disent nos patients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-600 italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-gray-900">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/testimonials">
                Voir tous les témoignages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à prendre rendez-vous ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour planifier votre consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Nous contacter
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
              <Link href="/patient-portal">
                <User className="w-5 h-5 mr-2" />
                Espace Patient
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
