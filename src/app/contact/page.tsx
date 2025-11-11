import { ContactForm } from '@/components/ContactForm'
import Image from 'next/image'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ExternalLink,
  Contact,
  Contact2Icon,
  ContactRound,
  LucideContactRound,
  LucideContact,
  MessageCircleMore
} from 'lucide-react'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1 - Informations de contact (icônes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Adresse */}
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Adresse</h3>
            <p className="text-gray-900 text-sm">
              69 cours Gambetta<br />
              33270 Floirac
            </p>
          </div>

          {/* Horaires */}
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Horaires</h3>
            <p className="text-gray-900 text-sm">
              Lun - Ven: 9h - 18h<br />
              Sam: 9h - 13h
            </p>
          </div>

          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircleMore className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Contact</h3>
            <a href="tel:0556862900" className="text-blue-600 hover:text-blue-700 font-medium text-sm">05.56.86.29.00</a><br />
            <a href="mailto:cabinetdentaireaces@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-sm break-all">
              cabinetdentaireaces@gmail.com
            </a>
          </div>

          {/* Doctolib */}
          <div className="p-6 text-center">
            <div className="w-16 h-16flex items-center justify-center mx-auto mb-3">
              <Image 
                src="/logo-doctolib.webp" 
                alt="Doctolib" 
                width={64} 
                height={64}
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Rendez-vous</h3>
            <div className="space-y-1">
              <a 
                href="https://www.doctolib.fr/dentiste/floirac/vincent-seguela" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-700 text-xs"
              >
                Dr. SEGUELA
              </a>
              <a 
                href="https://www.doctolib.fr/dentiste/merignac/stephane-aumailley" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-700 text-xs"
              >
                Dr. AUMAILLEY
              </a>
            </div>
          </div>

        </div>

        {/* Row 2 - Formulaire + Image */}
        <div className="bg-white/60 rounded-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* 2/3 - Formulaire */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <ContactForm />
            </div>

            {/* 1/3 - Image */}
            <div className="lg:w-1/3 relative min-h-[400px] lg:min-h-0">
              <Image
                src="/contact-femme.png"
                alt="Contact"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
