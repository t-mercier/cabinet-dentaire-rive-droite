# 🗄️ Configuration de la Base de Données

## Option 1 : Supabase (Recommandé - Gratuit)

### 1. Créer un compte Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur **"Start your project"**
3. Connectez-vous avec **GitHub** (recommandé)
4. Cliquez sur **"New Project"**

### 2. Configurer le projet

- **Nom du projet** : `cabinet-dentaire-rive-droite`
- **Mot de passe** : Choisissez un mot de passe fort (notez-le !)
- **Région** : `Europe West (Paris)` ou `Europe West (Ireland)`
- Cliquez sur **"Create new project"**

### 3. Récupérer les informations de connexion

Une fois le projet créé (2-3 minutes) :

1. Allez dans **Settings** > **Database**
2. Copiez l'**URL de connexion** (section "Connection string")
3. Elle ressemble à : `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`

### 4. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Exécutez ce script pour créer le fichier
./scripts/setup-database.sh
```

Puis éditez `.env.local` et remplacez :
- `[YOUR-PASSWORD]` par votre mot de passe Supabase
- `[YOUR-PROJECT-REF]` par l'ID de votre projet

### 5. Appliquer le schéma à la base de données

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer le schéma à la base de données
pnpm db:push
```

### 6. Vérifier la connexion

```bash
# Ouvrir Prisma Studio pour voir les données
pnpm db:studio
```

## Option 2 : Neon (Alternative)

### 1. Créer un compte Neon

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez un nouveau projet

### 2. Récupérer l'URL de connexion

1. Dans le dashboard Neon, copiez l'**URL de connexion**
2. Elle ressemble à : `postgresql://[user]:[password]@[host]/[database]?sslmode=require`

### 3. Configurer les variables

Même procédure que Supabase, mais avec l'URL Neon.

## Option 3 : PlanetScale (Alternative)

### 1. Créer un compte PlanetScale

1. Allez sur [planetscale.com](https://planetscale.com)
2. Créez un compte gratuit
3. Créez une nouvelle base de données

### 2. Récupérer l'URL de connexion

1. Dans le dashboard, allez dans **Connect**
2. Copiez l'**URL de connexion**
3. Elle ressemble à : `mysql://[user]:[password]@[host]/[database]`

### 3. Modifier le schéma Prisma

Si vous choisissez PlanetScale, modifiez `prisma/schema.prisma` :

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## 🚀 Après la configuration

Une fois la base de données configurée :

1. **Modifiez le code des témoignages** pour utiliser l'API au lieu du localStorage
2. **Testez l'ajout de témoignages** - ils seront sauvegardés en base
3. **Déployez sur Vercel** avec les variables d'environnement

## 🔧 Commandes utiles

```bash
# Générer le client Prisma
pnpm db:generate

# Appliquer les migrations
pnpm db:push

# Créer une migration
pnpm db:migrate

# Ouvrir Prisma Studio
pnpm db:studio

# Réinitialiser la base de données
pnpm db:push --force-reset
```

## 🆘 Dépannage

### Erreur de connexion
- Vérifiez que l'URL de connexion est correcte
- Vérifiez que le mot de passe est correct
- Vérifiez que la base de données est accessible

### Erreur de schéma
- Vérifiez que le schéma Prisma est correct
- Exécutez `pnpm db:generate` après modification du schéma

### Erreur de permissions
- Vérifiez que l'utilisateur a les bonnes permissions
- Pour Supabase, utilisez l'utilisateur `postgres`
