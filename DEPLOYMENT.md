# 🚀 Guide de Déploiement Vercel

## Prérequis

1. **Compte Vercel** : Créez un compte sur [vercel.com](https://vercel.com)
2. **Base de données** : Créez un projet **Supabase** (recommandé)
3. **Variables d'environnement** : Préparez vos clés Supabase et API

## 📋 Étapes de Déploiement

### 1. Installation de Vercel CLI

```bash
npm install -g vercel
```

### 2. Connexion à Vercel

```bash
vercel login
```

### 3. Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com)
2. Copiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Générez une `SUPABASE_SERVICE_ROLE_KEY` (usage serveur uniquement)
4. Créez la table `testimonials` et policies (voir `DATABASE_SETUP.md` — section "Supabase JS (Actuel)")

### 4. Variables d'Environnement

Configurez ces variables dans Vercel Dashboard > Settings > Environment Variables :

#### Obligatoires
- `NEXT_PUBLIC_SUPABASE_URL` : URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` : Clé de service Supabase (serveur seulement)

#### Optionnelles
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

- Vérifiez que les 3 variables Supabase sont présentes et correctes
- Testez l'API `/api/testimonials` (GET et POST)

### 2. Vérification
- Testez toutes les pages
- Vérifiez les formulaires de contact
- Testez l'API des témoignages

## 🐛 Dépannage

### Erreur de Build
- Vérifiez que toutes les variables d'environnement sont définies
- Vérifiez la configuration de la base de données

### Erreur de Base de Données
- Vérifiez les policies RLS sur la table `testimonials`
- Si vous utilisez la clé anonyme pour POST, autorisez `insert` pour `anon`
- Sinon, configurez `SUPABASE_SERVICE_ROLE_KEY` côté serveur

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
- [Documentation Next.js](https://nextjs.org/docs)
 - [Documentation Supabase](https://supabase.com/docs)
