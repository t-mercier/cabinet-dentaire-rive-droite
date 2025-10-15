import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const services = [
  { name: 'Implantologie', href: '/services/implantologie' },
  { name: 'Parodontologie', href: '/services/parodontologie' },
  { name: 'Soins Conservateurs', href: '/services/soins-conservateurs' },
  { name: 'Prothèses Dentaires', href: '/services/protheses-dentaires' },
  { name: 'Blanchiment', href: '/services/blanchiment' },
  { name: 'Pédodontie', href: '/services/pedodontie' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Practice Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="text-xl font-bold">
                Cabinet Dentaire Rive Droite
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Votre santé bucco-dentaire est notre priorité. Nous offrons des soins de qualité 
              dans un environnement moderne et confortable.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nos Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">
                  69 cours Gambetta<br />
                  33270 Floirac, Bordeaux
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">05.56.86.29.00</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <span className="text-gray-300 text-sm">cabinetdentaireaces@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horaires</h3>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-3 text-blue-400" />
              <div className="text-gray-300 text-sm">
                <div>Lun - Ven: 09:00 - 12:30</div>
                <div>14:00 - 19:30</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Cabinet Dentaire Rive Droite. Tous droits réservés.
              <br />
              <span className="text-xs">
                Créé avec ❤️ par{' '}
                <a 
                  href="mailto:timothee@mercier.app" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  mercier.dev
                </a>
              </span>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
