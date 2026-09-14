// One-off image optimization: resize oversized project previews and export WebP.
// Run: node scripts/optimize-previews.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

// Max render width across the site is ~600px; 1200px covers retina/2x.
const targets = [
  { file: 'golden_core_preview.png', maxWidth: 1200 },
  { file: 'fitness_app_preview.png', maxWidth: 1200 },
  { file: 'portfolio_preview.png', maxWidth: 1200 },
  { file: 'azeriand_library_preview.png', maxWidth: 1200 },
  { file: 'library_preview.png', maxWidth: 900 },
];

for (const { file, maxWidth } of targets) {
  const input = path.join(publicDir, file);
  if (!fs.existsSync(input)) {
    console.warn(`skip (missing): ${file}`);
    continue;
  }
  const out = path.join(publicDir, file.replace(/\.png$/, '.webp'));
  await sharp(input)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);

  const before = (fs.statSync(input).size / 1024).toFixed(0);
  const after = (fs.statSync(out).size / 1024).toFixed(0);
  console.log(`${file}: ${before}KB -> ${path.basename(out)} ${after}KB`);
}
