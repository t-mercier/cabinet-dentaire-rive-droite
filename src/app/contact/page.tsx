import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertCircle
} from 'lucide-react'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prenez rendez-vous ou posez-nous vos questions. Notre équipe est là 
              pour vous accompagner dans vos soins dentaires.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Prise de rendez-vous */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Prendre rendez-vous</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Appelez-nous directement
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">
                    05.56.86.29.00
                  </p>
                  <p className="text-gray-600">
                    Du lundi au vendredi de 9h à 19h30
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ou envoyez-nous un email
                  </h3>
                  <p className="text-lg text-blue-600 mb-2">
                    cabinetdentaireaces@gmail.com
                  </p>
                  <p className="text-gray-600">
                    Nous vous répondrons rapidement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Practice Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Informations pratiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      69 cours Gambetta<br />
                      33270 Floirac, Bordeaux
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">05.56.86.29.00</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Pour les urgences, appelez directement
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">cabinetdentaireaces@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lundi - Vendredi : 09:00 - 12:30</p>
                      <p>Lundi - Vendredi : 14:00 - 19:30</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Fermé le week-end et les jours fériés
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Info */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-900 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  Urgences dentaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-800 mb-4">
                  En cas d'urgence dentaire (douleur intense, traumatisme, abcès), 
                  contactez-nous immédiatement au :
                </p>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <p className="text-2xl font-bold text-red-600 text-center">
                    05.56.86.29.00
                  </p>
                  <p className="text-sm text-red-700 text-center mt-2">
                    Nous ferons notre possible pour vous recevoir rapidement
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Nous trouver</CardTitle>
                <CardDescription>
                  Situé au cœur de Floirac, facilement accessible en voiture et en transport en commun
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>Carte Google Maps</p>
                    <p className="text-sm">69 cours Gambetta, 33270 Floirac</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p><strong>Accès en voiture :</strong> Parking disponible à proximité</p>
                  <p><strong>Transport en commun :</strong> Ligne de bus 15, arrêt Gambetta</p>
                  <p><strong>Métro :</strong> Ligne A, station Floirac Dravemont (10 min à pied)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
