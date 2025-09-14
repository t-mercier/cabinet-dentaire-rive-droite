import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Smile, 
  Phone, 
  Calendar,
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react'

const prostheses = [
  {
    name: 'Couronnes',
    description: 'Restauration d\'une dent endommagée avec une coiffe en céramique',
    icon: Shield,
    duration: '2-3 semaines',
    advantages: ['Esthétique parfaite', 'Durabilité', 'Fonctionnalité restaurée']
  },
  {
    name: 'Bridges',
    description: 'Remplacement de dents manquantes en s\'appuyant sur les dents adjacentes',
    icon: CheckCircle,
    duration: '2-3 semaines',
    advantages: ['Solution fixe', 'Esthétique', 'Mastication normale']
  },
  {
    name: 'Prothèses amovibles',
    description: 'Prothèses partielles ou complètes amovibles',
    icon: Clock,
    duration: '3-4 semaines',
    advantages: ['Économique', 'Facile à entretenir', 'Solution rapide']
  },
  {
    name: 'Prothèses sur implants',
    description: 'Prothèses fixes ou amovibles stabilisées par des implants',
    icon: Award,
    duration: '3-6 mois',
    advantages: ['Stabilité maximale', 'Confort optimal', 'Durabilité']
  }
]

const materials = [
  {
    name: 'Céramique',
    description: 'Matériau esthétique de choix pour les couronnes et bridges',
    properties: ['Esthétique parfaite', 'Biocompatible', 'Résistant']
  },
  {
    name: 'Zircone',
    description: 'Céramique haute performance très résistante',
    properties: ['Très résistant', 'Esthétique', 'Biocompatible']
  },
  {
    name: 'Métal-céramique',
    description: 'Alliance de la résistance métallique et de l\'esthétique céramique',
    properties: ['Très résistant', 'Durable', 'Esthétique']
  }
]

const process = [
  {
    step: '1',
    title: 'Consultation et planification',
    description: 'Examen clinique et radiographique, choix du type de prothèse'
  },
  {
    step: '2',
    title: 'Préparation des dents',
    description: 'Préparation des dents supports et prise d\'empreintes'
  },
  {
    step: '3',
    title: 'Fabrication en laboratoire',
    description: 'Réalisation de la prothèse par notre prothésiste dentaire'
  },
  {
    step: '4',
    title: 'Essayage et ajustements',
    description: 'Mise en place et ajustements pour un confort optimal'
  },
  {
    step: '5',
    title: 'Pose définitive',
    description: 'Cimentation ou fixation définitive de la prothèse'
  }
]

export default function ProthesesDentairesPage() {
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
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Prothèses Dentaires
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restauration complète de votre dentition avec des prothèses esthétiques 
              et fonctionnelles adaptées à vos besoins.
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
                Qu'est-ce qu'une prothèse dentaire ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Une prothèse dentaire est un dispositif médical qui remplace une ou 
                plusieurs dents manquantes. Elle peut être fixe (couronnes, bridges) 
                ou amovible, selon vos besoins et votre situation.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Laboratoire intégré</h3>
                    <p className="text-blue-800">
                      Notre laboratoire de prothèses intégré nous permet de contrôler 
                      la qualité et d'optimiser les délais de fabrication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi une prothèse ?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fonction masticatoire</h4>
                    <p className="text-gray-600 text-sm">Retrouver une mastication normale</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Esthétique</h4>
                    <p className="text-gray-600 text-sm">Sourire harmonieux et naturel</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Prévention</h4>
                    <p className="text-gray-600 text-sm">Éviter les déplacements dentaires</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Confiance</h4>
                    <p className="text-gray-600 text-sm">Retrouver confiance en soi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prostheses Types Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Types de prothèses
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à chaque situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prostheses.map((prosthesis, index) => {
              const IconComponent = prosthesis.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {prosthesis.duration}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{prosthesis.name}</CardTitle>
                    <CardDescription>{prosthesis.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-2">Avantages :</h4>
                      {prosthesis.advantages.map((advantage, i) => (
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

        {/* Materials Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Matériaux utilisés
            </h2>
            <p className="text-xl text-gray-600">
              Des matériaux de qualité pour des résultats durables
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{material.name}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Propriétés :</h4>
                    {material.properties.map((property, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">{property}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Le processus de fabrication
            </h2>
            <p className="text-xl text-gray-600">
              Un processus en plusieurs étapes pour un résultat optimal
            </p>
          </div>
          
          <div className="space-y-8">
            {process.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  {step.step}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Care Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Entretien et suivi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Soins quotidiens</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Brossage 2 fois par jour</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Nettoyage interdentaire</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Bains de bouche si recommandés</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Éviter les aliments trop durs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suivi professionnel</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Contrôles tous les 6 mois</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Détartrage professionnel</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Ajustements si nécessaire</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-gray-700">Maintenance préventive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'une prothèse dentaire ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation et découvrez la solution prothétique 
              la plus adaptée à votre situation.
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
