# 🚀 Guide de Déploiement

## Option 1: Déploiement via Vercel (Recommandé)

### 1. Connecter le repo à Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Clique sur "New Project"
3. Importe ton repo GitHub `cabinet-dentaire-rive-droite`
4. Sélectionne le framework "Next.js"

### 2. Configurer les variables d'environnement
Dans les settings de Vercel, ajoute ces variables :

**Variables Publiques :**
- `NEXT_PUBLIC_SUPABASE_URL` : Ton URL Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Ta clé anonyme Supabase

**Variables Privées :**
- `SUPABASE_SERVICE_ROLE_KEY` : Ta clé service role Supabase

### 3. Déployer
- Vercel détectera automatiquement Next.js
- Le build se lancera automatiquement
- Ton site sera disponible sur `https://ton-projet.vercel.app`

## Option 2: Déploiement via GitHub Actions

### 1. Créer le workflow
Crée `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build
        run: NODE_ENV=production pnpm build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

### 2. Ajouter les secrets GitHub
Dans GitHub > Settings > Secrets and variables > Actions, ajoute :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Option 3: Déploiement manuel

### 1. Build local
```bash
NODE_ENV=production pnpm build
```

### 2. Déployer le dossier `.next`
- Upload le dossier `.next` sur ton hébergeur
- Configure ton serveur pour servir Next.js
- Assure-toi que les variables d'environnement sont configurées

## ✅ Vérifications post-déploiement

1. **Site accessible** : Vérifie que le site se charge
2. **Formulaires** : Teste le formulaire de contact
3. **Témoignages** : Vérifie l'affichage des témoignages
4. **Base de données** : Teste l'ajout de témoignages
5. **Responsive** : Vérifie sur mobile et desktop

## 🔧 Dépannage

### Erreur de build
- Vérifie que `NODE_ENV=production` est défini
- Assure-toi que toutes les variables d'environnement sont configurées

### Erreur de base de données
- Vérifie les variables Supabase
- Assure-toi que les politiques RLS sont correctes
- Teste la connexion avec le script de test

### Erreur 500
- Vérifie les logs de déploiement
- Assure-toi que les variables d'environnement sont bien définies
- Teste localement avec `pnpm build && pnpm start`
