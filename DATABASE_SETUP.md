# 🗄️ Configuration de la Base de Données

> Mise à jour: l’application n’utilise plus de connexions Postgres directes (Prisma). Toute la persistance passe par le client Supabase JS, côté client et côté serveur. Les sections Prisma ci‑dessous sont conservées à titre informatif mais ne sont plus requises.

## Supabase JS (Actuel)

1) Variables d’environnement

- `NEXT_PUBLIC_SUPABASE_URL` — URL du projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — clé anonyme (exposée côté client)
- `SUPABASE_SERVICE_ROLE_KEY` — clé service role (uniquement côté serveur, pour les routes API). Ne la rendez jamais publique.

2) Table `testimonials`

Exécutez ce SQL dans SQL Editor (Supabase):

```sql
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  patientName text not null,
  rating smallint not null check (rating between 1 and 5),
  content text not null,
  service text,
  isApproved boolean not null default false,
  createdAt timestamptz not null default now(),
  updatedAt timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Lecture publique (facultatif si vous servez depuis une route serveur avec service key)
create policy if not exists "testimonials_select_public"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

-- Insertion publique (si vous souhaitez autoriser l’envoi sans authentification)
-- Sinon, utilisez la service role key côté serveur et omettez cette policy.
create policy if not exists "testimonials_insert_public"
  on public.testimonials
  for insert
  to anon
  with check (
    rating between 1 and 5
  );

-- Trigger pour updatedAt (optionnel)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on public.testimonials;
create trigger trg_set_updated_at
before update on public.testimonials
for each row execute procedure public.set_updated_at();
```

3) Déploiement

- Ajoutez les trois variables d’environnement à votre hébergeur (Vercel, etc.).
- Les routes API utilisent la `SUPABASE_SERVICE_ROLE_KEY` si présente, sinon elles basculent sur la clé anonyme.


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

Créez un fichier `.env.local` à la racine du projet et ajoutez:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-key>"
# Facultatif mais recommandé pour les routes API serveur
SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"
```

### 5. Créer la table

Utilisez le bloc SQL fourni plus haut dans "Supabase JS (Actuel) > Table testimonials" dans l'éditeur SQL de Supabase.

### 6. Vérifier la connexion

Dans l'éditeur SQL, exécutez `select * from public.testimonials limit 1;` pour valider que la table existe.

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

Toutes les interactions se font depuis l'interface Supabase (SQL Editor, Table Editor) ou via le client JS dans le code. Aucune commande Prisma n'est nécessaire.

## 🆘 Dépannage

### Erreur de connexion
- Vérifiez que l'URL de connexion est correcte
- Vérifiez que le mot de passe est correct
- Vérifiez que la base de données est accessible

### Erreur de permissions
- Si vous utilisez la clé anonyme, créez des policies RLS adaptées pour `select/insert`.
- Sinon, placez `SUPABASE_SERVICE_ROLE_KEY` dans l'environnement des routes API (jamais côté client).
