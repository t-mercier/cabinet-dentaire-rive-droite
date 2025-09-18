/**
 * Service filter component for testimonials.
 * 
 * Purpose: Filter testimonials by service type
 * Usage: Used in testimonials page for filtering functionality
 * Props: Current selection and change handler
 */

import { Filter } from 'lucide-react'

interface ServiceFilterProps {
  selectedService: string
  onServiceChange: (service: string) => void
}

const services = ['Tous', 'Implantologie', 'Parodontologie', 'Soins Conservateurs', 'Prothèses Dentaires', 'Blanchiment', 'Pédodontie']

export function ServiceFilter({ selectedService, onServiceChange }: ServiceFilterProps) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="flex items-center text-gray-700">
        <Filter className="w-4 h-4 mr-2" />
        <span className="font-medium">Filtrer par service :</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => onServiceChange(service)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedService === service
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  )
}
