import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Star, 
  Phone, 
  Calendar,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

const methods = [
  {
    name: 'Blanchiment au cabinet',
    description: 'Traitement professionnel en une séance au cabinet',
    icon: Shield,
    duration: '1-2 heures',
    advantages: ['Résultat immédiat', 'Contrôle professionnel', 'Sécurité maximale']
  },
  {
    name: 'Blanchiment à domicile',
    description: 'Traitement à domicile avec gouttières personnalisées',
    icon: Clock,
    duration: '2-3 semaines',
    advantages: ['Confort à domicile', 'Coût réduit', 'Flexibilité']
  },
  {
    name: 'Blanchiment combiné',
    description: 'Association des deux méthodes pour un résultat optimal',
    icon: Zap,
    duration: '1 séance + 2 semaines',
    advantages: ['Résultat maximal', 'Durabilité', 'Efficacité optimale']
  }
]

const causes = [
  'Consommation de café, thé, vin rouge',
  'Tabagisme',
  'Âge (épaississement de la dentine)',
  'Certains médicaments (tétracyclines)',
  'Traumatismes dentaires',
  'Consommation excessive de fluor',
  'Maladies génétiques'
]

const contraindications = [
  'Grossesse et allaitement',
  'Dents de lait chez l\'enfant',
  'Caries non traitées',
  'Maladies parodontales actives',
  'Hypersensibilité dentinaire sévère',
  'Dents avec restaurations importantes'
]

const maintenance = [
  'Éviter les aliments colorants pendant 48h',
  'Arrêter de fumer',
  'Brossage régulier avec dentifrice blanchissant',
  'Bains de bouche sans alcool',
  'Contrôles réguliers chez le dentiste',
  'Traitement d\'entretien si nécessaire'
]

export default function BlanchimentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blanchiment Dentaire
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Éclaircissement professionnel de vos dents pour retrouver un sourire 
              éclatant et une confiance en soi renouvelée.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Qu'est-ce que le blanchiment dentaire ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Le blanchiment dentaire est un traitement esthétique qui éclaircit 
                la couleur naturelle des dents en utilisant des agents blanchissants 
                sûrs et efficaces. Il permet d'obtenir des dents plus blanches 
                tout en préservant leur structure.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Traitement sécurisé</h3>
                    <p className="text-blue-800">
                      Nos traitements de blanchiment sont réalisés avec des produits 
                      professionnels et sous contrôle médical pour garantir votre sécurité.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Avantages du blanchiment</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Esthétique améliorée</h4>
                    <p className="text-gray-600 text-sm">Sourire plus éclatant et attrayant</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Confiance en soi</h4>
                    <p className="text-gray-600 text-sm">Retrouver l'envie de sourire</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Traitement non invasif</h4>
                    <p className="text-gray-600 text-sm">Aucune modification de la structure dentaire</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Résultats durables</h4>
                    <p className="text-gray-600 text-sm">Effet qui dure plusieurs années</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Methods Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Méthodes de blanchiment
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à vos besoins et votre budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-yellow-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {method.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-2">Avantages :</h4>
                      {method.advantages.map((advantage, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Causes Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Causes du jaunissement
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Les dents peuvent jaunir ou se tacher pour plusieurs raisons :
              </p>
              <div className="space-y-3">
                {causes.map((cause, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                    <span className="text-gray-700">{cause}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contre-indications
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Le blanchiment n'est pas recommandé dans certains cas :
              </p>
              <div className="space-y-3">
                {contraindications.map((contraindication, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">{contraindication}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Déroulement du traitement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
                <p className="text-gray-600">
                  Examen de vos dents et évaluation de l'éligibilité au traitement
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Traitement</h3>
                <p className="text-gray-600">
                  Application du produit blanchissant selon la méthode choisie
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Suivi</h3>
                <p className="text-gray-600">
                  Contrôle des résultats et conseils pour maintenir l'effet
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Entretien et maintenance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Après le traitement</h3>
                <ul className="space-y-2">
                  {maintenance.slice(0, 4).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">À long terme</h3>
                <ul className="space-y-2">
                  {maintenance.slice(4).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-8 rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Résultats attendus
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Le blanchiment peut éclaircir vos dents de 2 à 8 teintes selon 
                la méthode utilisée et la couleur initiale.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Blanchiment au cabinet</h3>
                  <p className="text-2xl font-bold text-blue-600">2-4 teintes</p>
                  <p className="text-sm text-gray-600">Résultat immédiat</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Blanchiment à domicile</h3>
                  <p className="text-2xl font-bold text-blue-600">3-6 teintes</p>
                  <p className="text-sm text-gray-600">Résultat progressif</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Méthode combinée</h3>
                  <p className="text-2xl font-bold text-blue-600">4-8 teintes</p>
                  <p className="text-sm text-gray-600">Résultat maximal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prêt pour un sourire éclatant ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation et découvrez quelle méthode 
              de blanchiment convient le mieux à vos dents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Demander un devis
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
