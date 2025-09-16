import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock
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
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prendre rendez-vous
            </h2>
            <p className="text-xl text-gray-600">
              Contactez-nous pour planifier votre consultation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Téléphone */}
            <div className="text-center p-6">
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
            
            {/* Email */}
            <div className="text-center p-6">
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

            {/* Informations pratiques */}
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Informations pratiques
              </h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Adresse</p>
                <p className="text-sm">
                  69 cours Gambetta<br />
                  33270 Floirac, Bordeaux
                </p>
                <p className="font-medium mt-4">Horaires</p>
                <p className="text-sm">
                  Lun-Ven : 9h-12h30 / 14h-19h30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
