#!/bin/bash

echo "🗄️ Configuration de la base de données Supabase"
echo "================================================"

# Vérifier que Prisma est installé
if ! command -v npx &> /dev/null; then
    echo "❌ Node.js/npx n'est pas installé"
    exit 1
fi

echo "📝 Création du fichier .env.local..."

# Créer le fichier .env.local
cat > .env.local << 'EOF'
# Database URL (remplacez par votre URL Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase (optionnel pour l'instant)
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
EOF

echo "✅ Fichier .env.local créé"
echo ""
echo "🔧 Prochaines étapes :"
echo "1. Allez sur https://supabase.com"
echo "2. Créez un nouveau projet"
echo "3. Récupérez l'URL de connexion dans Settings > Database"
echo "4. Remplacez les valeurs dans .env.local"
echo "5. Exécutez : pnpm db:push"
echo ""
echo "📋 Exemple d'URL :"
echo "DATABASE_URL=\"postgresql://postgres:yourpassword@db.abcdefgh.supabase.co:5432/postgres\""
