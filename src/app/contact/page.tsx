import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  MessageCircle
} from 'lucide-react'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Prenez rendez-vous ou posez-nous vos questions. Notre équipe est là 
              pour vous accompagner dans vos soins dentaires.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Téléphone */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Phone className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Appelez-nous
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 mb-3">
                      05.56.86.29.00
                    </p>
                    <p className="text-gray-600 mb-4">
                      Du lundi au vendredi de 9h à 19h30
                    </p>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                      <a href="tel:0556862900">
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler maintenant
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Envoyez un email
                    </h3>
                    <p className="text-lg text-green-600 mb-3 break-all">
                      cabinetdentaireaces@gmail.com
                    </p>
                    <p className="text-gray-600 mb-4">
                      Nous vous répondrons rapidement
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
                      <a href="mailto:cabinetdentaireaces@gmail.com?subject=Demande de rendez-vous/information">
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer un email
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations pratiques */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Adresse
                    </h3>
                    <p className="text-gray-600">
                      69 cours Gambetta<br />
                      33270 Floirac, Bordeaux
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Horaires d'ouverture
                    </h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi<br />
                      09:00 - 12:30 / 14:00 - 19:30
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
