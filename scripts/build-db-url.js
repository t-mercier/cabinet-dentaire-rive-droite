#!/usr/bin/env node

// Script pour construire l'URL de base de données à partir des variables séparées
const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement depuis .env.local
require('dotenv').config({ path: '.env.local' });

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbHost || !dbPort || !dbName || !dbUser || !dbPassword) {
  console.error('❌ Variables de base de données manquantes');
  process.exit(1);
}

const databaseUrl = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

console.log('🔗 URL de base de données construite :');
console.log(databaseUrl);

// Optionnel : écrire dans un fichier temporaire
fs.writeFileSync('.env.temp', `DATABASE_URL="${databaseUrl}"`);
console.log('✅ Écrit dans .env.temp');
