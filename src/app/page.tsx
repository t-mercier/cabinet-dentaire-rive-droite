import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calendar, 
  Star, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle,
  Zap,
  Activity,
  Wrench,
  Crown,
  Sparkles,
  Users
} from 'lucide-react'
import { staticTestimonials } from '@/lib/data/staticTestimonials'

const services = [
  {
    name: 'Implantologie',
    description: 'Remplacement de dents manquantes par des implants dentaires',
    icon: Zap,
    href: '/services/implantologie',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Parodontologie',
    description: 'Traitement des maladies des gencives et du parodonte',
    icon: Activity,
    href: '/services/parodontologie',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    name: 'Soins Conservateurs',
    description: 'Caries, obturations et soins préventifs',
    icon: Wrench,
    href: '/services/soins-conservateurs',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    name: 'Prothèses Dentaires',
    description: 'Couronnes, bridges et prothèses amovibles',
    icon: Crown,
    href: '/services/protheses-dentaires',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    name: 'Blanchiment',
    description: 'Éclaircissement dentaire professionnel',
    icon: Sparkles,
    href: '/services/blanchiment',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  {
    name: 'Pédodontie',
    description: 'Soins dentaires spécialisés pour enfants',
    icon: Users,
    href: '/services/pedodontie',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
]

// Use static testimonials from shared data
const testimonials = staticTestimonials.slice(0, 4) // Show first 4 on homepage

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
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre RDV
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
                <Card key={service.name} className={`hover:shadow-lg transition-shadow ${service.bgColor} border-0`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl text-center">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600 text-center">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Link href={service.href} className={`font-medium hover:font-bold transition-all ${service.iconColor}`}>
                      En savoir plus
                    </Link>
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
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre RDV
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
