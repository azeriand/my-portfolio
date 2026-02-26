#!/usr/bin/env node

/**
 * Download Strapi Images Script
 * 
 * This script downloads all images from Strapi during build time and saves them
 * to the public/uploads folder for static hosting in Jamstack deployments.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const OUTPUT_DIR = path.join(__dirname, '../public/uploads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

async function fetchFromStrapi(endpoint) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadImages() {
  console.log('🖼️  Starting image download from Strapi...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  
  try {
    // Fetch articles with cover images
    console.log('\n📥 Fetching articles...');
    const articlesData = await fetchFromStrapi('articles?populate=cover');
    
    if (!articlesData.data || articlesData.data.length === 0) {
      console.log('⚠️  No articles found');
      return;
    }
    
    console.log(`✅ Found ${articlesData.data.length} articles`);
    
    const imageUrls = new Set();
    
    // Collect all image URLs
    for (const article of articlesData.data) {
      if (article.cover?.url) {
        imageUrls.add(article.cover.url);
      }
    }
    
    if (imageUrls.size === 0) {
      console.log('⚠️  No images found in articles');
      return;
    }
    
    console.log(`\n🔍 Found ${imageUrls.size} unique images to download`);
    
    // Download each image
    let downloaded = 0;
    let skipped = 0;
    
    for (const imageUrl of imageUrls) {
      const filename = path.basename(imageUrl);
      const filepath = path.join(OUTPUT_DIR, filename);
      
      // Skip if already exists
      if (fs.existsSync(filepath)) {
        console.log(`⏭️  Skipped (already exists): ${filename}`);
        skipped++;
        continue;
      }
      
      try {
        const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`;
        await downloadImage(fullUrl, filepath);
        console.log(`✅ Downloaded: ${filename}`);
        downloaded++;
      } catch (err) {
        console.error(`❌ Failed to download ${filename}:`, err.message);
      }
    }
    
    console.log(`\n🎉 Download complete!`);
    console.log(`   Downloaded: ${downloaded}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Total: ${imageUrls.size}`);
    
  } catch (err) {
    console.error('❌ Error downloading images:', err.message);
    process.exit(1);
  }
}

downloadImages();
