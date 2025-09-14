import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Heart, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Phone, 
  Calendar,
  ArrowLeft,
  Cigarette,
  Activity,
  Brain,
  Pill,
  Dna,
  Utensils,
  Zap,
  AlignCenter
} from 'lucide-react'

const stages = [
  {
    stage: 'Stade 1',
    name: 'Gingivite',
    description: 'Inflammation des gencives, saignements au brossage',
    symptoms: ['Saignements', 'Gencives rouges', 'Gonflement léger']
  },
  {
    stage: 'Stade 2',
    name: 'Parodontite légère',
    description: 'Perte d\'attache de 1-2mm, début de perte osseuse',
    symptoms: ['Poches parodontales', 'Mobilité dentaire légère', 'Halitose']
  },
  {
    stage: 'Stade 3',
    name: 'Parodontite modérée',
    description: 'Perte d\'attache de 3-4mm, perte osseuse significative',
    symptoms: ['Mobilité dentaire', 'Rétraction gingivale', 'Sensibilité']
  },
  {
    stage: 'Stade 4',
    name: 'Parodontite sévère',
    description: 'Perte d\'attache >5mm, perte osseuse majeure',
    symptoms: ['Mobilité importante', 'Perte dentaire possible', 'Abcès']
  }
]

const riskFactors = [
  {
    name: 'Tabagisme',
    description: 'Le tabac réduit la circulation sanguine et affaiblit le système immunitaire',
    icon: Cigarette,
    color: 'bg-red-100 text-red-600'
  },
  {
    name: 'Diabète non contrôlé',
    description: 'Le diabète altère la cicatrisation et augmente l\'inflammation',
    icon: Activity,
    color: 'bg-orange-100 text-orange-600'
  },
  {
    name: 'Stress chronique',
    description: 'Le stress affaiblit les défenses immunitaires et favorise l\'inflammation',
    icon: Brain,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    name: 'Médicaments',
    description: 'Certains médicaments peuvent causer une hypertrophie gingivale',
    icon: Pill,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Facteurs génétiques',
    description: 'Prédisposition familiale aux maladies parodontales',
    icon: Dna,
    color: 'bg-green-100 text-green-600'
  },
  {
    name: 'Malnutrition',
    description: 'Carences en vitamines C et D, calcium, affectent la santé parodontale',
    icon: Utensils,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    name: 'Bruxisme',
    description: 'Le grincement des dents surcharge les tissus de soutien',
    icon: Zap,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    name: 'Malocclusion',
    description: 'Mauvais alignement dentaire créant des forces anormales',
    icon: AlignCenter,
    color: 'bg-pink-100 text-pink-600'
  }
]

const treatments = [
  {
    name: 'Détartrage et surfaçage',
    description: 'Nettoyage professionnel des dents et des racines',
    icon: Shield
  },
  {
    name: 'Chirurgie parodontale',
    description: 'Traitement chirurgical des poches profondes',
    icon: Heart
  },
  {
    name: 'Greffes de gencive',
    description: 'Restauration des tissus gingivaux perdus',
    icon: CheckCircle
  },
  {
    name: 'Maintenance',
    description: 'Suivi régulier et prévention des récidives',
    icon: Shield
  }
]

const preventionTips = [
  'Brossage des dents 2 fois par jour avec une brosse à dents souple',
  'Utilisation quotidienne du fil dentaire ou de brossettes interdentaires',
  'Bains de bouche antiseptiques si recommandés',
  'Arrêt du tabac',
  'Contrôle du diabète et autres maladies systémiques',
  'Visites de contrôle tous les 6 mois',
  'Détartrage professionnel régulier'
]

export default function ParodontologiePage() {
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parodontologie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Traitement des maladies des gencives et du parodonte pour préserver 
              la santé de vos dents et de vos gencives.
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
                Qu'est-ce que la parodontologie ?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                La parodontologie est la spécialité dentaire qui traite les maladies 
                des gencives et du parodonte (tissus de soutien des dents). Ces maladies 
                sont la principale cause de perte dentaire chez l'adulte.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Statistique importante</h3>
                    <p className="text-blue-800">
                      <strong>80% des adultes</strong> souffrent de maladies parodontales 
                      à des degrés divers, souvent sans le savoir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Gingivite vs Parodontite</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800 mb-2">Gingivite (Réversible)</h4>
                  <p className="text-gray-600 text-sm">
                    Inflammation des gencives uniquement. Peut être traitée avec un bon 
                    brossage et un détartrage professionnel.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800 mb-2">Parodontite (Irréversible)</h4>
                  <p className="text-gray-600 text-sm">
                    Destruction des tissus de soutien des dents. Nécessite un traitement 
                    spécialisé pour éviter la perte dentaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stages Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Les 4 stades de la maladie parodontale
            </h2>
            <p className="text-xl text-gray-600">
              Comprendre l'évolution de la maladie pour un traitement adapté
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600">{stage.stage}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-green-500' : 
                      index === 1 ? 'bg-yellow-500' : 
                      index === 2 ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                  </div>
                  <CardTitle className="text-lg">{stage.name}</CardTitle>
                  <CardDescription>{stage.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {stage.symptoms.map((symptom, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Risk Factors Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Facteurs de risque
            </h2>
            <p className="text-xl text-gray-600">
              Identifier les facteurs qui augmentent le risque de maladie parodontale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskFactors.map((factor, index) => {
              const IconComponent = factor.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${factor.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {factor.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {factor.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Treatments Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos traitements
            </h2>
            <p className="text-xl text-gray-600">
              Des solutions adaptées à chaque stade de la maladie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((treatment, index) => {
              const IconComponent = treatment.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{treatment.name}</CardTitle>
                    <CardDescription>{treatment.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Prevention Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prévention et conseils
            </h2>
            <p className="text-xl text-gray-600">
              Comment prévenir les maladies parodontales
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preventionTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="mb-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <div className="flex items-start">
              <AlertTriangle className="w-8 h-8 text-red-600 mr-4 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-4">
                  Signes d'alerte à surveiller
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-red-800 font-medium">• Saignements des gencives</p>
                    <p className="text-red-800 font-medium">• Gencives rouges et gonflées</p>
                    <p className="text-red-800 font-medium">• Mauvaise haleine persistante</p>
                    <p className="text-red-800 font-medium">• Sensibilité au chaud/froid</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-red-800 font-medium">• Mobilité dentaire</p>
                    <p className="text-red-800 font-medium">• Rétraction des gencives</p>
                    <p className="text-red-800 font-medium">• Espaces entre les dents</p>
                    <p className="text-red-800 font-medium">• Douleurs lors de la mastication</p>
                  </div>
                </div>
                <p className="text-red-800 mt-4 font-medium">
                  Si vous observez ces signes, consultez rapidement votre dentiste.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d'un traitement parodontal ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              N'attendez pas que la situation s'aggrave. Contactez-nous pour une évaluation 
              et un plan de traitement personnalisé.
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
