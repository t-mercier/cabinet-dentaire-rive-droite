#!/bin/bash

# Script de déploiement pour Vercel
echo "🚀 Déploiement du cabinet dentaire sur Vercel..."

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé. Installation..."
    npm install -g vercel
fi

# Vérifier que l'utilisateur est connecté à Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Connexion à Vercel..."
    vercel login
fi

# Déployer
echo "📦 Déploiement en cours..."
vercel --prod

echo "✅ Déploiement terminé !"
