"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Calendar,
  MessageCircle,
  User,
  Clock3
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prendre rendez-vous
            </h2>
            <p className="text-lg text-gray-600">
              Choisissez le moyen qui vous convient le mieux
            </p>
          </div>
          
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

            {/* Formulaire de rendez-vous */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Demander un rendez-vous
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Remplissez le formulaire pour nous envoyer votre demande
                    </p>
                    
                    <form className="space-y-4" onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      const nom = formData.get('nom') as string;
                      const email = formData.get('email') as string;
                      const telephone = formData.get('telephone') as string;
                      const service = formData.get('service') as string;
                      const jour = formData.get('jour') as string;
                      const heure = formData.get('heure') as string;
                      const infos = formData.get('infos') as string;
                      
                      const subject = `Demande de rendez-vous - ${service}`;
                      const body = `Bonjour,

Je souhaiterais prendre rendez-vous pour : ${service}

Informations personnelles :
- Nom : ${nom}
- Email : ${email}
- Téléphone : ${telephone}

Préférences :
- Jour souhaité : ${jour}
- Heure souhaitée : ${heure}

Informations additionnelles :
${infos}

Merci de me recontacter pour confirmer le rendez-vous.

Cordialement,
${nom}`;

                      const mailtoLink = `mailto:cabinetdentaireaces@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      window.open(mailtoLink, '_self');
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <User className="w-4 h-4 inline mr-1" />
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            name="nom"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Votre nom complet"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Mail className="w-4 h-4 inline mr-1" />
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="votre@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Phone className="w-4 h-4 inline mr-1" />
                            Téléphone
                          </label>
                          <input
                            type="tel"
                            name="telephone"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="05.XX.XX.XX.XX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <MessageCircle className="w-4 h-4 inline mr-1" />
                            Service souhaité *
                          </label>
                          <select
                            name="service"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez un service</option>
                            <option value="Consultation générale">Consultation générale</option>
                            <option value="Implantologie">Implantologie</option>
                            <option value="Parodontologie">Parodontologie</option>
                            <option value="Soins conservateurs">Soins conservateurs</option>
                            <option value="Prothèses dentaires">Prothèses dentaires</option>
                            <option value="Blanchiment">Blanchiment</option>
                            <option value="Pédodontie">Pédodontie</option>
                            <option value="Urgence">Urgence</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Jour souhaité
                          </label>
                          <input
                            type="date"
                            name="jour"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <Clock3 className="w-4 h-4 inline mr-1" />
                            Heure souhaitée
                          </label>
                          <select
                            name="heure"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Sélectionnez une heure</option>
                            <option value="9h00">9h00</option>
                            <option value="9h30">9h30</option>
                            <option value="10h00">10h00</option>
                            <option value="10h30">10h30</option>
                            <option value="11h00">11h00</option>
                            <option value="11h30">11h30</option>
                            <option value="14h00">14h00</option>
                            <option value="14h30">14h30</option>
                            <option value="15h00">15h00</option>
                            <option value="15h30">15h30</option>
                            <option value="16h00">16h00</option>
                            <option value="16h30">16h30</option>
                            <option value="17h00">17h00</option>
                            <option value="17h30">17h30</option>
                            <option value="18h00">18h00</option>
                            <option value="18h30">18h30</option>
                            <option value="19h00">19h00</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <MessageCircle className="w-4 h-4 inline mr-1" />
                          Informations additionnelles
                        </label>
                        <textarea
                          name="infos"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Décrivez votre demande, symptômes, ou toute information utile..."
                        />
                      </div>
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer la demande
                      </Button>
                    </form>
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
