import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  CheckCircle, 
  Phone, 
  Calendar,
  ArrowLeft,
  Clock,
  Award,
  Users,
  Search,
  Scissors,
  Zap,
  Heart,
  Crown
} from 'lucide-react'

const benefits = [
  {
    title: 'Fonctionnalité restaurée',
    description: 'Mastication normale et confort retrouvé',
    icon: CheckCircle
  },
  {
    title: 'Esthétique naturelle',
    description: 'Aspect identique aux dents naturelles',
    icon: Award
  },
  {
    title: 'Durabilité',
    description: 'Solution à long terme avec un bon entretien',
    icon: Clock
  },
  {
    title: 'Préservation osseuse',
    description: 'Maintien de la structure osseuse',
    icon: Shield
  }
]

const process = [
  {
    step: '1',
    title: 'Consultation et planification',
    description: 'Examen clinique, radiographies et plan de traitement personnalisé',
    icon: Search,
    color: 'bg-blue-100 text-blue-600',
    duration: '30-45 min'
  },
  {
    step: '2',
    title: 'Préparation chirurgicale',
    description: 'Extraction si nécessaire et préparation du site d\'implantation',
    icon: Scissors,
    color: 'bg-orange-100 text-orange-600',
    duration: '1-2h'
  },
  {
    step: '3',
    title: 'Pose de l\'implant',
    description: 'Insertion de la vis en titane dans l\'os maxillaire',
    icon: Zap,
    color: 'bg-green-100 text-green-600',
    duration: '1h'
  },
  {
    step: '4',
    title: 'Ostéointégration',
    description: 'Période de cicatrisation de 3 à 6 mois',
    icon: Heart,
    color: 'bg-purple-100 text-purple-600',
    duration: '3-6 mois'
  },
  {
    step: '5',
    title: 'Pose de la couronne',
    description: 'Fabrication et mise en place de la prothèse définitive',
    icon: Crown,
    color: 'bg-yellow-100 text-yellow-600',
    duration: '2-3h'
  }
]

const indications = [
  'Remplacement d\'une dent unique',
  'Remplacement de plusieurs dents',
  'Stabilisation d\'une prothèse amovible',
  'Reconstruction complète de l\'arcade dentaire'
]

const contraindications = [
  'Maladies parodontales non traitées',
  'Diabète non contrôlé',
  'Tabagisme important',
  'Ostéoporose sévère',
  'Traitements de radiothérapie récents'
]

export default function ImplantologiePage() {
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
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Implantologie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Remplacement de dents manquantes par des implants dentaires en titane 
              pour retrouver une dentition fonctionnelle et esthétique.
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
                Qu'est-ce qu'un implant dentaire ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Un implant dentaire est une vis en titane biocompatible qui remplace 
                la racine d'une dent manquante. Il s'intègre parfaitement dans l'os 
                maxillaire et sert de support pour une couronne, un bridge ou une 
                prothèse amovible.
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Taux de succès élevé</h3>
                    <p className="text-green-800">
                      Les implants dentaires ont un <strong>taux de succès de 95%</strong> 
                      sur 10 ans avec un bon entretien et un suivi régulier.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Avantages des implants</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Le processus d'implantation
            </h2>
            <p className="text-xl text-gray-600">
              Un traitement en plusieurs étapes pour un résultat optimal
            </p>
          </div>
          
          <div className="relative">
            {/* Mobile: Vertical timeline */}
            <div className="lg:hidden space-y-6">
              {process.map((step, index) => {
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-lg font-bold text-white">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop: Horizontal timeline */}
            <div className="hidden lg:block">
              {/* Timeline line - horizontal */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-yellow-200"></div>
              
              <div className="grid lg:grid-cols-5 gap-4">
                {process.map((step, index) => {
                  return (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center shadow-lg mb-4`}>
                          <span className="text-2xl font-bold text-white">{step.step}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Indications Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Indications
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Les implants dentaires sont indiqués dans les cas suivants :
              </p>
              <div className="space-y-3">
                {indications.map((indication, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{indication}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contre-indications
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Certaines conditions peuvent contre-indiquer l'implantation :
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

        {/* Care Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Entretien et suivi
            </h2>
            <p className="text-xl text-gray-600">
              Un suivi régulier pour assurer la longévité de vos implants
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Soins quotidiens</CardTitle>
                <CardDescription>
                  Les gestes essentiels pour maintenir vos implants en parfait état
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Brossage 2 fois par jour</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Utilisation du fil dentaire</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Bains de bouche antiseptiques</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Éviter le tabac</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Suivi médical</CardTitle>
                <CardDescription>
                  Les rendez-vous réguliers pour un suivi optimal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Contrôles tous les 6 mois</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Détartrage professionnel</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Radiographies de contrôle</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Maintenance préventive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Intéressé par un implant dentaire ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation et découvrez si l'implantologie 
              est la solution adaptée à votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-white">
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
