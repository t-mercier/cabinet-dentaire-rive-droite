import { Metadata } from 'next'
import { User, Stethoscope, Users, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notre Équipe | Cabinet Dentaire Rive Droite',
  description: 'Découvrez l\'équipe de professionnels dévoués du Cabinet Dentaire Rive Droite à Floirac, Bordeaux.',
}

/**
 * Team page component
 * Displays all team members organized by role hierarchy
 */

// Team data structure
const teamData = {
  associesMajoritaires: [
    { name: 'Dr. Michel AZMA', role: 'Praticien Associé', assistant: 'Daphné', doctolibUrl: undefined },
    { name: 'Dr. Dominique CHEVALIER', role: 'Praticien Associé', assistant: 'Natacha', doctolibUrl: undefined },
    { name: 'Dr. Vincent SEGUELA', role: 'Praticien Associé', assistant: 'Camille', doctolibUrl: 'https://www.doctolib.fr/dentiste/floirac/vincent-seguela' },
    { name: 'Dr. Alfred MERCIER', role: 'Praticien Associé', assistant: 'Nathalie', doctolibUrl: undefined },
  ],
  associeIndustrie: [
    { name: 'Dr. Margaux LIOTARD', role: 'Pédodontiste', assistant: 'Valérie', doctolibUrl: undefined },
  ],
  collaborateur: [
    { name: 'Dr. Stéphane AUMAILLEY', role: 'Collaborateur', doctolibUrl: 'https://www.doctolib.fr/dentiste/merignac/stephane-aumailley' },
  ],
  secretaires: [
    { name: 'Elysia', role: 'Secrétaire' },
    { name: 'Marie-Agnès', role: 'Secrétaire' },
  ],
}

interface TeamMemberCardProps {
  name: string
  role: string
  specialty?: string
  assistant?: string
  doctolibUrl?: string
}

function PractitionerCard({ name, role, specialty, assistant, doctolibUrl }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 p-6">
      <div className="flex gap-6">
        {/* Praticien */}
        <div className="flex-1">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <User className="w-20 h-20 text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-blue-600 text-sm font-medium">{role}</p>
          {specialty && (
            <p className="text-xs text-gray-500 mt-1">{specialty}</p>
          )}
          {doctolibUrl && (
            <a
              href={doctolibUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Prendre RDV
            </a>
          )}
        </div>
        
        {/* Assistante */}
        {assistant && (
          <div className="w-32">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg h-32 flex items-center justify-center mb-3">
              <Users className="w-12 h-12 text-green-400" />
            </div>
            <p className="text-xs text-gray-500 mb-1">Assistante</p>
            <p className="text-sm font-medium text-gray-900">{assistant}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SimpleCard({ name, role, icon, doctolibUrl }: { name: string; role: string; icon: 'user' | 'phone'; doctolibUrl?: string }) {
  const bgColor = icon === 'phone' ? 'from-purple-50 to-purple-100' : 'from-blue-50 to-blue-100'
  const iconColor = icon === 'phone' ? 'text-purple-400' : 'text-blue-400'
  const textColor = icon === 'phone' ? 'text-purple-600' : 'text-blue-600'
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 p-6">
      <div className={`bg-gradient-to-br ${bgColor} rounded-lg h-40 flex items-center justify-center mb-4`}>
        {icon === 'phone' ? (
          <Phone className={`w-16 h-16 ${iconColor}`} />
        ) : (
          <User className={`w-16 h-16 ${iconColor}`} />
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className={`text-sm font-medium ${textColor} mb-3`}>{role}</p>
      
      {doctolibUrl && (
        <a
          href={doctolibUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Prendre RDV
        </a>
      )}
    </div>
  )
}

export default function EquipePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Stethoscope className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Équipe
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Découvrez les praticiens et l'équipe du Cabinet Dentaire Rive Droite
            </p>
          </div>
        </div>
      </section>

      {/* Praticiens Associés */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Praticiens Associés
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamData.associesMajoritaires.map((member) => (
              <PractitionerCard
                key={member.name}
                name={member.name}
                role={member.role}
                assistant={member.assistant}
                doctolibUrl={member.doctolibUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spécialiste & Collaborateur */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Autres Praticiens
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {teamData.associeIndustrie.map((member) => (
              <PractitionerCard
                key={member.name}
                name={member.name}
                role={member.role}
                assistant={member.assistant}
                doctolibUrl={member.doctolibUrl}
              />
            ))}
            {teamData.collaborateur.map((member) => (
              <SimpleCard
                key={member.name}
                name={member.name}
                role={member.role}
                icon="user"
                doctolibUrl={member.doctolibUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Secrétaires */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Secrétariat
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 text-sm">
              Notre équipe administrative est à votre écoute pour tous vos rendez-vous
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {teamData.secretaires.map((member) => (
              <SimpleCard
                key={member.name}
                name={member.name}
                role={member.role}
                icon="phone"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md"
          >
            Prendre Rendez-vous
          </a>
        </div>
      </section>
    </div>
  )
}

