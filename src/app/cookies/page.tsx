import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestion des cookies - Cabinet Dentaire Rive Droite',
  description: 'Politique de gestion des cookies et technologies de suivi du Cabinet Dentaire Rive Droite.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Gestion des cookies
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Qu'est-ce qu'un cookie ?
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Un cookie est un petit fichier texte stocké sur votre ordinateur, tablette ou smartphone lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et préférences pendant une période donnée.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Types de cookies utilisés
              </h2>
              <div className="text-gray-600 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Cookies strictement nécessaires</h3>
                  <p>Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés. Ils incluent :</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Cookies de session pour maintenir votre navigation</li>
                    <li>Cookies de sécurité pour protéger contre les attaques</li>
                    <li>Cookies de préférences de langue</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700">Cookies de performance</h3>
                  <p>Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site :</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Pages les plus visitées</li>
                    <li>Temps passé sur le site</li>
                    <li>Erreurs rencontrées</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700">Cookies de fonctionnalité</h3>
                  <p>Ces cookies améliorent votre expérience utilisateur :</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Mémorisation de vos préférences</li>
                    <li>Personnalisation du contenu</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookies spécifiques utilisés
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalité</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Durée</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">vercel-analytics</td>
                      <td className="border border-gray-300 px-4 py-2">Analyse de trafic anonyme</td>
                      <td className="border border-gray-300 px-4 py-2">13 mois</td>
                      <td className="border border-gray-300 px-4 py-2">Performance</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">cookie-consent</td>
                      <td className="border border-gray-300 px-4 py-2">Mémorisation de vos préférences</td>
                      <td className="border border-gray-300 px-4 py-2">1 an</td>
                      <td className="border border-gray-300 px-4 py-2">Fonctionnalité</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">nextjs-session</td>
                      <td className="border border-gray-300 px-4 py-2">Session utilisateur</td>
                      <td className="border border-gray-300 px-4 py-2">Session</td>
                      <td className="border border-gray-300 px-4 py-2">Nécessaire</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Gestion de vos préférences
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Vous pouvez gérer vos préférences de cookies de plusieurs façons :</p>
                
                <h3 className="text-lg font-medium text-gray-700 mt-4">Via votre navigateur :</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                  <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-700 mt-4">Via notre bannière de cookies :</h3>
                <p>Lors de votre première visite, une bannière vous permet de choisir quels cookies accepter. Vous pouvez modifier vos préférences à tout moment en cliquant sur le lien "Cookies" en bas de page.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookies tiers
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Notre site peut utiliser des services tiers qui placent leurs propres cookies :</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h3 className="text-lg font-medium text-blue-800">Vercel Analytics</h3>
                  <p className="text-blue-700">Service d'analyse de trafic anonyme. Pour plus d'informations : <a href="https://vercel.com/analytics" className="underline" target="_blank" rel="noopener noreferrer">vercel.com/analytics</a></p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Conséquences du refus des cookies
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Le refus des cookies peut avoir les conséquences suivantes :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Impossibilité d'utiliser certaines fonctionnalités du site</li>
                  <li>Perte de vos préférences personnalisées</li>
                  <li>Expérience utilisateur dégradée</li>
                </ul>
                <p><strong>Note :</strong> Les cookies strictement nécessaires ne peuvent pas être désactivés sans affecter le fonctionnement du site.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Durée de conservation
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Les cookies ont des durées de vie différentes :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                  <li><strong>Cookies persistants :</strong> conservés selon la durée spécifiée (généralement 1 à 13 mois)</li>
                  <li><strong>Cookies de préférences :</strong> conservés 1 an maximum</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Vos droits
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Conformément au RGPD, vous disposez des droits suivants concernant les cookies :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Droit d'information sur l'utilisation des cookies</li>
                  <li>Droit de consentement pour les cookies non essentiels</li>
                  <li>Droit de retrait de votre consentement à tout moment</li>
                  <li>Droit d'accès aux données collectées via les cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Pour toute question concernant notre utilisation des cookies :</p>
                <p>Email : cabinetdentaireaces@gmail.com<br />
                Téléphone : 05.56.86.29.00<br />
                Adresse : 69 cours Gambetta, 33270 Floirac, Bordeaux</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
