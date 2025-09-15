import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, 
  Phone, 
  Calendar,
  ArrowLeft,
  Shield,
  Zap,
  Heart,
  Star
} from 'lucide-react'

const treatments = [
  {
    name: 'Détartrage',
    description: 'Nettoyage professionnel pour éliminer le tartre et la plaque dentaire',
    icon: Shield,
    frequency: 'Tous les 6 mois'
  },
  {
    name: 'Obturations',
    description: 'Traitement des caries avec des matériaux esthétiques',
    icon: CheckCircle,
    frequency: 'Selon besoin'
  },
  {
    name: 'Dévitalisation',
    description: 'Traitement endodontique pour sauver une dent infectée',
    icon: Heart,
    frequency: 'Urgence'
  },
  {
    name: 'Scellement de sillons',
    description: 'Protection préventive des dents de lait et permanentes',
    icon: Star,
    frequency: 'Préventif'
  }
]

const prevention = [
  'Brossage des dents 2 fois par jour avec un dentifrice fluoré',
  'Utilisation quotidienne du fil dentaire',
  'Bains de bouche fluorés si recommandés',
  'Alimentation équilibrée, limitant les sucres',
  'Visites de contrôle régulières',
  'Détartrage professionnel tous les 6 mois',
  'Application de vernis fluoré si nécessaire'
]

const materials = [
  {
    name: 'Composites',
    description: 'Matériaux esthétiques de la couleur des dents',
    advantages: ['Esthétique', 'Adhésion forte', 'Conservation maximale']
  },
  {
    name: 'Amalgames',
    description: 'Alliage métallique résistant et durable',
    advantages: ['Durabilité', 'Résistance', 'Coût abordable']
  },
  {
    name: 'Inlays/Onlays',
    description: 'Restauration indirecte en céramique ou résine',
    advantages: ['Précision', 'Esthétique', 'Durabilité']
  }
]

export default function SoinsConservateursPage() {
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Soins Conservateurs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prévention et traitement des caries, détartrage et soins préventifs 
              pour maintenir une dentition saine et fonctionnelle.
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
                Qu'est-ce que les soins conservateurs ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Les soins conservateurs regroupent tous les traitements visant à 
                préserver et restaurer la dent naturelle. Ils incluent la prévention, 
                le traitement des caries et les soins d'hygiène bucco-dentaire.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Prévention avant tout</h3>
                    <p className="text-blue-800">
                      La prévention est la clé d'une dentition saine. Un suivi régulier 
                      permet d'éviter les complications et de préserver vos dents naturelles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nos objectifs</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Préserver vos dents</h4>
                    <p className="text-gray-600 text-sm">Éviter les extractions et maintenir une dentition naturelle</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Prévenir les caries</h4>
                    <p className="text-gray-600 text-sm">Soins préventifs et éducation à l'hygiène</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Traiter précocement</h4>
                    <p className="text-gray-600 text-sm">Intervention rapide pour éviter les complications</p>
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
              Des soins adaptés à chaque situation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => {
              const IconComponent = treatment.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {treatment.frequency}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{treatment.name}</CardTitle>
                    <CardDescription>{treatment.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Materials Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Matériaux utilisés
              </h2>
              <p className="text-xl text-gray-600">
                Des matériaux de qualité pour des résultats durables
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material, index) => (
                <div key={index} className="bg-white p-6 rounded-lg">
                  <div className="text-center pb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {material.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {material.advantages.map((advantage, i) => (
                      <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {advantage}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prévention et conseils
            </h2>
            <p className="text-xl text-gray-600">
              Les bonnes pratiques pour maintenir une santé dentaire optimale
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Hygiène quotidienne</CardTitle>
                <CardDescription>
                  Les gestes essentiels à adopter au quotidien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prevention.slice(0, 4).map((tip, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Suivi professionnel</CardTitle>
                <CardDescription>
                  L'importance des contrôles réguliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prevention.slice(4).map((tip, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* When to consult Section */}
        <section className="mb-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <div className="flex items-start">
              <Zap className="w-8 h-8 text-yellow-600 mr-4 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-4">
                  Quand consulter ?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-yellow-800 font-medium">• Douleur dentaire</p>
                    <p className="text-yellow-800 font-medium">• Sensibilité au chaud/froid</p>
                    <p className="text-yellow-800 font-medium">• Tache ou trou visible</p>
                    <p className="text-yellow-800 font-medium">• Mauvaise haleine persistante</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-yellow-800 font-medium">• Saignements des gencives</p>
                    <p className="text-yellow-800 font-medium">• Gonflement ou abcès</p>
                    <p className="text-yellow-800 font-medium">• Mobilité dentaire</p>
                    <p className="text-yellow-800 font-medium">• Plus de 6 mois sans contrôle</p>
                  </div>
                </div>
                <p className="text-yellow-800 mt-4 font-medium">
                  N'attendez pas que la douleur s'intensifie. Une consultation précoce 
                  permet un traitement plus simple et moins coûteux.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prenez soin de vos dents dès maintenant
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Un suivi régulier et des soins préventifs sont la clé d'une dentition 
              saine et durable. Contactez-nous pour votre prochain contrôle.
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
