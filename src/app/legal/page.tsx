import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales - Cabinet Dentaire Rive Droite',
  description: 'Mentions légales du Cabinet Dentaire Rive Droite à Floirac, Bordeaux.',
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Éditeur du site
              </h2>
              <div className="text-gray-600 space-y-2">
                <p><strong>Cabinet Dentaire Rive Droite</strong></p>
                <p>69 cours Gambetta<br />
                33270 Floirac, Bordeaux</p>
                <p>Téléphone : 05.56.86.29.00</p>
                <p>Email : cabinetdentaireaces@gmail.com</p>
                <p>Directeur de publication : Docteur [Nom du praticien]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Hébergement
              </h2>
              <div className="text-gray-600">
                <p>Ce site est hébergé par :</p>
                <p><strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789, USA</p>
                <p>Site web : <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Propriété intellectuelle
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
                <p>La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Protection des données personnelles
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.</p>
                <p>Pour exercer ce droit, contactez-nous par email à : cabinetdentaireaces@gmail.com</p>
                <p>Consultez notre <a href="/privacy" className="text-blue-600 hover:underline">Politique de confidentialité</a> pour plus d'informations.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookies
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Ce site utilise des cookies pour améliorer votre expérience de navigation. Consultez notre <a href="/cookies" className="text-blue-600 hover:underline">politique de gestion des cookies</a> pour plus d'informations.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Responsabilité
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.</p>
                <p>Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse cabinetdentaireaces@gmail.com, en décrivant le problème de la manière la plus précise possible.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Droit applicable et juridiction compétente
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Tout litige en relation avec l'utilisation du site cabinetdentairerivedroite.com est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Bordeaux.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact
              </h2>
              <div className="text-gray-600 space-y-2">
                <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                <p>Par email : cabinetdentaireaces@gmail.com<br />
                Par téléphone : 05.56.86.29.00<br />
                Par courrier : 69 cours Gambetta, 33270 Floirac, Bordeaux</p>
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
