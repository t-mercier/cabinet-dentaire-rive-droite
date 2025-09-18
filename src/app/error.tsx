'use client'

import { useEffect } from 'react'

/**
 * Error boundary component for the dental practice website.
 * Handles runtime errors gracefully with user-friendly messaging.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Erreur</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quelque chose s'est mal passé
        </h2>
        <p className="text-gray-600 mb-8">
          Une erreur inattendue s'est produite. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
        >
          Réessayer
        </button>
        <a 
          href="/"
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

