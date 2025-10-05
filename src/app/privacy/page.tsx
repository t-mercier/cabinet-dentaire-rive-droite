import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Cabinet Dentaire Rive Droite',
  description: 'Politique de confidentialité et protection des données personnelles du Cabinet Dentaire Rive Droite.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Introduction
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Le Cabinet Dentaire Rive Droite s'engage à protéger la confidentialité et la sécurité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi française.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Responsable du traitement
              </h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Cabinet Dentaire Rive Droite</strong></p>
                <p>69 cours Gambetta<br />
                33270 Floirac, Bordeaux</p>
                <p>Téléphone : 05.56.86.29.00</p>
                <p>Email : cabinetdentaireaces@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Données collectées
              </h2>
              <div className="text-gray-600 space-y-2">
                <h3 className="text-lg font-medium text-gray-700">Données collectées via le site web :</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Formulaire de contact :</strong> nom, email, téléphone, message</li>
                  <li><strong>Formulaire de témoignages :</strong> nom (optionnel), note, commentaire, service concerné</li>
                  <li><strong>Données techniques :</strong> adresse IP, type de navigateur, pages visitées (cookies analytiques)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Finalités du traitement
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Nous utilisons vos données personnelles pour :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Répondre à vos demandes de contact et de renseignements</li>
                  <li>Publier vos témoignages (avec votre accord explicite)</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Base légale du traitement
              </h2>
              <div className="text-gray-600 space-y-2">
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Intérêt légitime :</strong> pour répondre à vos demandes de contact</li>
                  <li><strong>Consentement :</strong> pour la publication de témoignages</li>
                  <li><strong>Obligation légale :</strong> pour la conservation des données de contact</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Conservation des données
              </h2>
              <div className="text-gray-600 space-y-2">
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                  <li><strong>Témoignages approuvés :</strong> conservés tant qu'ils sont publiés sur le site</li>
                  <li><strong>Données techniques :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Partage des données
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Vos données personnelles ne sont pas vendues, louées ou partagées avec des tiers, sauf :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Avec votre consentement explicite</li>
                  <li>Pour respecter une obligation légale</li>
                  <li>Avec nos prestataires techniques (hébergement, analyse) sous contrat de confidentialité</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Vos droits
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                  <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
                  <li><strong>Droit à la limitation :</strong> restreindre l'utilisation de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                </ul>
                <p>Pour exercer ces droits, contactez-nous à : cabinetdentaireaces@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sécurité des données
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>L'accès non autorisé</li>
                  <li>La divulgation accidentelle</li>
                  <li>La modification non autorisée</li>
                  <li>La destruction malveillante</li>
                </ul>
                <p>Nos données sont hébergées sur des serveurs sécurisés en Europe.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookies et technologies de suivi
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Notre site utilise des cookies pour améliorer votre expérience. Consultez notre <a href="/cookies" className="text-blue-600 hover:underline">politique de gestion des cookies</a> pour plus d'informations.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Réclamations
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez :</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nous contacter directement : cabinetdentaireaces@gmail.com</li>
                  <li>Introduire une réclamation auprès de la CNIL : <a href="https://www.cnil.fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Modifications de cette politique
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Cette politique peut être modifiée pour refléter les changements dans nos pratiques ou la législation. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Pour toute question concernant cette politique de confidentialité :</p>
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
