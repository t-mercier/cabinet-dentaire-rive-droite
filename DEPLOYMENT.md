# Guide de Déploiement - Cabinet Dentaire Rive Droite

## 🚀 Déploiement sur Vercel

### 1. Préparation des Services

#### Supabase (Base de données)
1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Récupérer les clés dans Settings > API :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

#### Clerk (Authentification)
1. Créer un compte sur [clerk.com](https://clerk.com)
2. Créer une nouvelle application
3. Récupérer les clés dans API Keys :
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Configurer les URLs de redirection :
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in URL: `/patient-portal`
   - After sign-up URL: `/patient-portal`

#### OpenAI (Assistant IA)
1. Créer un compte sur [platform.openai.com](https://platform.openai.com)
2. Générer une clé API
3. Récupérer `OPENAI_API_KEY`

#### Google Maps (Carte)
1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Activer l'API Maps JavaScript
3. Créer une clé API
4. Récupérer `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### 2. Configuration Vercel

#### Création du projet
1. Aller sur [vercel.com](https://vercel.com)
2. Importer le repository GitHub
3. Configurer le projet :
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`

#### Variables d'environnement
Ajouter dans Vercel > Settings > Environment Variables :

```
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

### 3. Configuration de la Base de Données

#### Migration Prisma
1. Connecter à Supabase
2. Exécuter les migrations :
   ```bash
   pnpm db:generate
   pnpm db:push
   ```

#### Données de test
```sql
-- Insérer des témoignages d'exemple
INSERT INTO testimonials (patient_name, rating, content, is_approved) VALUES
('Marie L.', 5, 'Excellent accueil et soins de qualité. Je recommande vivement !', true),
('Jean-Pierre D.', 5, 'Cabinet moderne et équipe très compétente.', true),
('Sophie M.', 5, 'Très satisfaite de mes soins d''implantologie.', true);
```

### 4. Déploiement

#### Déploiement automatique
- Push sur `main` déclenche automatiquement le déploiement
- Vercel gère les builds et déploiements

#### Déploiement manuel
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### 5. Configuration Post-Déploiement

#### Domaine personnalisé
1. Aller dans Vercel > Settings > Domains
2. Ajouter le domaine personnalisé
3. Configurer les DNS

#### Monitoring
- Vercel Analytics activé automatiquement
- Logs disponibles dans Vercel Dashboard

## 🔧 Développement Local

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd cabinet-dentaire

# Installer les dépendances
pnpm install

# Copier les variables d'environnement
cp .env.example .env.local

# Configurer la base de données
pnpm db:generate
pnpm db:push

# Lancer le serveur de développement
pnpm dev
```

### Variables d'environnement locales
Créer `.env.local` avec les mêmes variables que Vercel.

## 📊 Monitoring et Maintenance

### Logs
- Vercel Dashboard > Functions > Logs
- Supabase Dashboard > Logs

### Base de données
- Supabase Dashboard > Table Editor
- Prisma Studio : `pnpm db:studio`

### Performance
- Vercel Analytics
- Core Web Vitals monitoring

## 🚨 Dépannage

### Erreurs courantes

#### Build échoue
- Vérifier les variables d'environnement
- Vérifier la syntaxe TypeScript
- Vérifier les imports

#### Base de données
- Vérifier la connexion Supabase
- Vérifier les migrations Prisma
- Vérifier les permissions

#### Authentification
- Vérifier les clés Clerk
- Vérifier les URLs de redirection
- Vérifier le middleware

### Support
- Documentation Vercel
- Documentation Supabase
- Documentation Clerk
- Issues GitHub

## 🔄 Mises à jour

### Déploiement des mises à jour
1. Développer en local
2. Tester avec `pnpm dev`
3. Push sur `main`
4. Vérifier le déploiement Vercel

### Sauvegarde
- Supabase gère automatiquement les sauvegardes
- Exporter régulièrement les données importantes

## 📈 Optimisations

### Performance
- Images optimisées avec Next.js Image
- Code splitting automatique
- CDN Vercel

### SEO
- Meta tags configurés
- Sitemap automatique
- Structured data

### Sécurité
- HTTPS automatique
- Variables d'environnement sécurisées
- Authentification Clerk
