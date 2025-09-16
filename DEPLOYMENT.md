# 🚀 Guide de Déploiement Vercel

## Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Base de données** : Configurez une base de données PostgreSQL (Supabase, PlanetScale, ou Neon)
3. **Variables d'environnement** : Préparez vos clés API

## 📋 Étapes de Déploiement

### 1. Installation de Vercel CLI

```bash
npm install -g vercel
```

### 2. Connexion à Vercel

```bash
vercel login
```

### 3. Configuration de la Base de Données

#### Option A : Supabase (Recommandé)
1. Créez un projet sur [supabase.com](https://supabase.com)
2. Récupérez l'URL de connexion dans Settings > Database
3. Exécutez les migrations Prisma :

```bash
npx prisma db push
```

#### Option B : Autre PostgreSQL
1. Créez une base de données PostgreSQL
2. Mettez à jour `DATABASE_URL` dans vos variables d'environnement

### 4. Variables d'Environnement

Configurez ces variables dans Vercel Dashboard > Settings > Environment Variables :

#### Obligatoires
- `DATABASE_URL` : URL de votre base de données PostgreSQL

#### Optionnelles
- `NEXT_PUBLIC_SUPABASE_URL` : URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : Clé de service Supabase
- `SMTP_HOST` : Serveur SMTP pour les emails
- `SMTP_PORT` : Port SMTP (587)
- `SMTP_USER` : Email d'envoi
- `SMTP_PASS` : Mot de passe email
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` : Clé API Google Maps
- `OPENAI_API_KEY` : Clé API OpenAI
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` : Clé publique Clerk
- `CLERK_SECRET_KEY` : Clé secrète Clerk

### 5. Déploiement

#### Méthode 1 : Via Vercel CLI
```bash
vercel --prod
```

#### Méthode 2 : Via GitHub (Recommandé)
1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Vercel déploiera automatiquement

#### Méthode 3 : Script automatisé
```bash
./scripts/deploy.sh
```

## 🔧 Configuration Post-Déploiement

### 1. Base de Données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push
```

### 2. Vérification
- Testez toutes les pages
- Vérifiez les formulaires de contact
- Testez l'API des témoignages

## 🐛 Dépannage

### Erreur de Build
- Vérifiez que toutes les variables d'environnement sont définies
- Vérifiez la configuration de la base de données

### Erreur de Base de Données
- Vérifiez que `DATABASE_URL` est correct
- Vérifiez que la base de données est accessible depuis Vercel

### Images ne s'affichent pas
- Vérifiez la configuration `images` dans `next.config.ts`
- Vérifiez que les images sont dans le dossier `public/`

## 📊 Monitoring

- **Vercel Dashboard** : Surveillez les performances
- **Logs** : Consultez les logs en cas d'erreur
- **Analytics** : Activez Vercel Analytics si nécessaire

## 🔄 Mises à Jour

Pour mettre à jour le site :
1. Poussez les changements sur GitHub
2. Vercel déploiera automatiquement
3. Ou utilisez `vercel --prod` pour un déploiement manuel

## 📞 Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Next.js](https://nextjs.org/docs)