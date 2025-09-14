# Cabinet Dentaire Rive Droite

Site web moderne et professionnel pour le Cabinet Dentaire Rive Droite, situé à Floirac, Bordeaux.

## 🚀 Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Supabase** - Base de données PostgreSQL
- **Prisma** - ORM TypeScript
- **Clerk** - Authentification
- **Vercel AI SDK** - Intégration IA
- **OpenAI** - Assistant virtuel

## 📋 Fonctionnalités

### Pages principales
- **Accueil** - Hero, services, témoignages, CTA
- **Services** - 6 pages détaillées (Implantologie, Parodontologie, etc.)
- **Contact** - Formulaire, informations, carte
- **Témoignages** - Avis patients avec filtres
- **Espace Patient** - Portail sécurisé avec documents

### Fonctionnalités avancées
- **Assistant IA** - Chat widget avec informations du cabinet
- **Authentification** - Système de connexion sécurisé
- **Gestion des documents** - Visualisation et téléchargement
- **Formulaires** - Contact et témoignages
- **Design responsive** - Mobile-first

## 🛠️ Installation

### Prérequis
- Node.js 18+
- pnpm
- Comptes Supabase, Clerk, OpenAI

### Installation locale

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd cabinet-dentaire
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configuration des variables d'environnement**
   ```bash
   cp .env.example .env.local
   ```
   
   Remplir les variables dans `.env.local` :
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/cabinet_dentaire"
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Configuration de la base de données**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Lancement du serveur de développement**
   ```bash
   pnpm dev
   ```

## 🚀 Déploiement sur Vercel

### 1. Préparation
- Créer un compte Vercel
- Connecter le repository GitHub
- Configurer les variables d'environnement dans Vercel

### 2. Variables d'environnement Vercel
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

### 3. Déploiement automatique
- Push sur la branche `main` déclenche le déploiement
- Vercel gère automatiquement les builds et déploiements

## 📁 Structure du projet

```
src/
├── app/                    # App Router Next.js
│   ├── api/               # Routes API
│   ├── contact/           # Page contact
│   ├── patient-portal/    # Espace patient
│   ├── services/          # Pages services
│   ├── testimonials/      # Page témoignages
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants shadcn/ui
│   ├── header.tsx        # En-tête
│   ├── footer.tsx        # Pied de page
│   └── chat-widget.tsx   # Widget chat IA
├── lib/                  # Utilitaires
│   ├── db.ts            # Configuration Prisma
│   ├── supabase.ts      # Configuration Supabase
│   └── utils.ts         # Utilitaires généraux
└── middleware.ts         # Middleware Clerk
```

## 🎨 Design

### Couleurs
- **Bleu principal** : #2E5A87
- **Vert** : #28A745
- **Gris clair** : #F8F9FA
- **Blanc** : #FFFFFF

### Typographie
- **Police** : Inter (Google Fonts)
- **Contraste** : WCAG AA compliant

## 🔧 Scripts disponibles

```bash
pnpm dev          # Serveur de développement
pnpm build        # Build de production
pnpm start        # Serveur de production
pnpm lint         # Linting ESLint
pnpm type-check   # Vérification TypeScript
```

## 📱 Responsive Design

- **Mobile-first** : Design optimisé pour mobile
- **Breakpoints** : sm, md, lg, xl
- **Touch-friendly** : Interface tactile optimisée

## 🔒 Sécurité

- **Authentification** : Clerk avec middleware
- **Validation** : Validation côté client et serveur
- **HTTPS** : Certificat SSL automatique sur Vercel
- **Variables d'environnement** : Secrets protégés

## 📊 Performance

- **Next.js 15** : Optimisations automatiques
- **Image optimization** : Next.js Image component
- **Code splitting** : Chargement optimisé
- **CDN** : Distribution globale Vercel

## 🤖 Assistant IA

L'assistant virtuel est configuré avec :
- **Modèle** : GPT-3.5-turbo
- **Contexte** : Informations complètes du cabinet
- **Langue** : Français
- **Fonctionnalités** : Questions sur services, horaires, conseils

## 📞 Support

Pour toute question ou problème :
- **Email** : cabinetdentaireaces@gmail.com
- **Téléphone** : 05.56.86.29.00

## 📄 Licence

Projet développé pour le Cabinet Dentaire Rive Droite.