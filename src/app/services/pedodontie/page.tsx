import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Baby, 
  Phone, 
  Calendar,
  ArrowLeft,
  Shield,
  CheckCircle,
  Heart,
  Star,
  Users
} from 'lucide-react'

const treatments = [
  {
    name: 'Soins préventifs',
    description: 'Détartrage, scellement de sillons et application de fluor',
    icon: Shield,
    age: 'Dès 3 ans',
    advantages: ['Prévention des caries', 'Renforcement de l\'émail', 'Éducation à l\'hygiène']
  },
  {
    name: 'Traitement des caries',
    description: 'Obturations et soins conservateurs adaptés aux enfants',
    icon: CheckCircle,
    age: 'Dès 2 ans',
    advantages: ['Matériaux biocompatibles', 'Techniques douces', 'Environnement rassurant']
  },
  {
    name: 'Pulpotomie',
    description: 'Traitement de la pulpe dentaire des dents de lait',
    icon: Heart,
    age: '3-12 ans',
    advantages: ['Préservation de la dent', 'Évite l\'extraction', 'Maintien de l\'espace']
  },
  {
    name: 'Orthodontie précoce',
    description: 'Dépistage et traitement des malocclusions précoces',
    icon: Star,
    age: '6-12 ans',
    advantages: ['Traitement plus court', 'Moins invasif', 'Meilleurs résultats']
  }
]

const ageGroups = [
  {
    age: '0-2 ans',
    title: 'Première visite',
    description: 'Examen de prévention et conseils aux parents',
    recommendations: ['Première visite à 1 an', 'Nettoyage des gencives', 'Éviter le biberon de nuit']
  },
  {
    age: '2-6 ans',
    title: 'Dents de lait',
    description: 'Soins préventifs et traitement des premières caries',
    recommendations: ['Brossage supervisé', 'Détartrage si nécessaire', 'Scellement de sillons']
  },
  {
    age: '6-12 ans',
    title: 'Dentition mixte',
    description: 'Transition entre dents de lait et dents définitives',
    recommendations: ['Surveillance de l\'éruption', 'Traitement orthodontique si besoin', 'Éducation renforcée']
  }
]

const prevention = [
  'Brossage 2 fois par jour avec un dentifrice fluoré adapté',
  'Supervision du brossage jusqu\'à 8 ans',
  'Alimentation équilibrée, limitant les sucres',
  'Éviter les boissons sucrées, surtout la nuit',
  'Visites de contrôle tous les 6 mois',
  'Application de fluor si nécessaire',
  'Scellement de sillons sur les molaires définitives'
]

const tips = [
  'Commencez les soins dentaires dès l\'apparition de la première dent',
  'Utilisez une brosse à dents adaptée à l\'âge de l\'enfant',
  'Rendez la visite chez le dentiste positive et ludique',
  'Évitez les menaces ou les punitions liées aux soins dentaires',
  'Montrez l\'exemple avec votre propre hygiène dentaire',
  'Récompensez les bons comportements d\'hygiène'
]

export default function PedodontiePage() {
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
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Baby className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pédodontie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soins dentaires spécialisés pour enfants dans un environnement 
              chaleureux et rassurant pour préserver leur santé bucco-dentaire.
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
                Qu'est-ce que la pédodontie ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                La pédodontie est la spécialité dentaire dédiée aux soins des enfants 
                de 0 à 16 ans. Elle prend en compte les spécificités de la dentition 
                en développement et l'approche psychologique nécessaire pour rassurer 
                les jeunes patients.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Approche bienveillante</h3>
                    <p className="text-blue-800">
                      Notre équipe est formée pour créer un environnement rassurant 
                      et ludique, permettant aux enfants d'aborder les soins dentaires 
                      sans stress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pourquoi consulter un pédodontiste ?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Spécialisation</h4>
                    <p className="text-gray-600 text-sm">Connaissance des spécificités de la dentition enfant</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Approche psychologique</h4>
                    <p className="text-gray-600 text-sm">Techniques pour rassurer et motiver l'enfant</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Prévention</h4>
                    <p className="text-gray-600 text-sm">Éducation précoce à l'hygiène bucco-dentaire</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Équipement adapté</h4>
                    <p className="text-gray-600 text-sm">Matériel et techniques spécifiques aux enfants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treatments Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos traitements
            </h2>
            <p className="text-xl text-gray-600">
              Des soins adaptés à chaque âge et situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => {
              const IconComponent = treatment.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-pink-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {treatment.age}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{treatment.name}</CardTitle>
                    <CardDescription>{treatment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-2">Avantages :</h4>
                      {treatment.advantages.map((advantage, i) => (
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

        {/* Age Groups Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Soins par âge
            </h2>
            <p className="text-xl text-gray-600">
              Un suivi adapté à chaque étape du développement
            </p>
          </div>
          
          <div className="space-y-8">
            {ageGroups.map((group, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-pink-600">{group.age}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {group.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {group.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Recommandations :</h4>
                    <div className="space-y-2">
                      {group.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Prévention et conseils
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hygiène quotidienne</h3>
                <ul className="space-y-3">
                  {prevention.slice(0, 4).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Suivi professionnel</h3>
                <ul className="space-y-3">
                  {prevention.slice(4).map((tip, index) => (
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

        {/* Tips Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-8 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Conseils pour les parents
              </h2>
              <p className="text-xl text-gray-600">
                Comment préparer votre enfant aux soins dentaires
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Environment Section */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Notre environnement enfant
              </h2>
              <p className="text-xl text-gray-600">
                Un espace conçu pour rassurer et motiver les jeunes patients
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Approche bienveillante</h3>
                <p className="text-gray-600">
                  Équipe formée à la psychologie de l'enfant et aux techniques de distraction
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Salle dédiée</h3>
                <p className="text-gray-600">
                  Espace coloré et ludique avec des jeux et des distractions
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Techniques douces</h3>
                <p className="text-gray-600">
                  Matériel adapté et techniques non invasives pour minimiser l'inconfort
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prenez soin du sourire de votre enfant
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Une bonne santé bucco-dentaire dès le plus jeune âge est la clé 
              d'une dentition saine à l'âge adulte. Contactez-nous pour un premier rendez-vous.
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
