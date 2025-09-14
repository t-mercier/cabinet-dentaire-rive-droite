import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkPublishableKey || clerkPublishableKey.includes('dummy')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Créer un compte
            </h1>
            <p className="text-gray-600">
              Rejoignez notre espace patient
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <p className="text-center text-gray-500">
              Service d'authentification non configuré
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">
            Rejoignez notre espace patient
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
              card: 'shadow-xl',
            }
          }}
        />
      </div>
    </div>
  )
}
