'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      functional: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setIsVisible(false)
  }

  const acceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setIsVisible(false)
  }

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    setIsVisible(false)
  }

  const togglePreference = (type: keyof typeof preferences) => {
    if (type === 'necessary') return // Cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Gestion des cookies
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
              Vous pouvez choisir quels cookies accepter.
            </p>
            
            {/* Cookie Preferences */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Cookies nécessaires</span>
                  <p className="text-xs text-gray-500">Essentiels au fonctionnement du site</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Cookies analytiques</span>
                  <p className="text-xs text-gray-500">Aide à améliorer notre site</p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Cookies fonctionnels</span>
                  <p className="text-xs text-gray-500">Personnalisation de l'expérience</p>
                </div>
                <button
                  onClick={() => togglePreference('functional')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.functional ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.functional ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={rejectAll}
              className="w-full lg:w-auto"
            >
              Refuser tout
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={acceptSelected}
              className="w-full lg:w-auto"
            >
              Accepter sélection
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
              className="w-full lg:w-auto"
            >
              Accepter tout
            </Button>
          </div>

          {/* Learn More Link */}
          <div className="text-center lg:text-left w-full lg:w-auto">
            <a
              href="/cookies"
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
