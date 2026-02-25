#!/usr/bin/env node

/**
 * Script para fetchear artículos de Strapi durante el build
 * Se ejecuta antes de que Next.js haga el build
 */

const fs = require('fs');
const path = require('path');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const OUTPUT_FILE = path.join(__dirname, '../.cache/articles.json');

// Crear directorio .cache si no existe
const cacheDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

async function fetchArticles() {
  console.log(`🔄 Fetching articles from ${STRAPI_URL}...`);
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const articles = data.data || [];
    
    console.log(`✅ Fetched ${articles.length} articles`);
    
    // Guardar en archivo para que Next.js lo pueda usar
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
    console.log(`📁 Articles saved to ${OUTPUT_FILE}`);
    
    return articles;
  } catch (error) {
    console.error(`❌ Error fetching articles: ${error.message}`);
    
    // Si no hay artículos disponibles, usar un array vacío
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2));
    console.log(`⚠️  Using empty articles array`);
    
    return [];
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  fetchArticles().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { fetchArticles };
