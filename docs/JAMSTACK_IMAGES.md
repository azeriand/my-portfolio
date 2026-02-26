# Jamstack Image Hosting Solution

## Problem
In a Jamstack deployment (static site generation), images from Strapi CMS were pointing to `localhost:1337` in production, causing broken images.

## Solution
During the build process, we download all images from Strapi and host them statically in the `/public/uploads` folder. This ensures images are bundled with the static site.

## How It Works

### 1. Build-Time Image Download
The `frontend/scripts/download-strapi-images.js` script:
- Fetches all articles from Strapi API
- Downloads cover images to `frontend/public/uploads/`
- Runs automatically before Next.js build via `npm run build`

### 2. Static Image References
Image URLs are transformed from:
```javascript
// ❌ Before (points to Strapi server)
`${STRAPI_URL}${article.cover.url}`

// ✅ After (points to static files)
`/uploads/${article.cover.url.split('/').pop()}`
```

### 3. Build Process
```bash
# Frontend build now includes image download
npm run build
# Runs: node scripts/download-strapi-images.js && next build
```

## Files Modified

### Frontend Changes
- **`frontend/scripts/download-strapi-images.js`** - New script to download images
- **`frontend/package.json`** - Updated build script
- **`frontend/src/app/articles/components/ArticlesPage.tsx`** - Use local image URLs
- **`frontend/src/app/articles/[slug]/page.tsx`** - Use local image URLs
- **`frontend/public/uploads/.gitkeep`** - Track uploads directory

### Git Configuration
- **`.gitignore`** - Added `frontend/public/uploads/` (regenerated at build)

## Deployment Workflow

### Local Development
```bash
# 1. Start Strapi backend
cd backend
npm run develop

# 2. In another terminal, start frontend
cd frontend
npm run dev
```

### Production Build
```bash
# Run from project root
./scripts/build-local.sh
# Or use GitHub Actions (automatic on push)
```

The build process:
1. ✅ Starts Strapi backend
2. ✅ Waits for Strapi to be ready
3. ✅ Downloads images from Strapi
4. ✅ Builds Next.js static export
5. ✅ Output ready in `frontend/out/`

## Benefits

1. **No Runtime Dependencies**: Images are bundled with static site
2. **Better Performance**: No external API calls for images in production
3. **CDN-Friendly**: All assets can be served from CDN
4. **Automatic**: Images download during every build
5. **Jamstack Compatible**: Fully static deployment

## Testing

To test the image download script:
```bash
cd frontend
node scripts/download-strapi-images.js
```

Check downloaded images:
```bash
ls -la public/uploads/
```

## Environment Variables

The download script respects `NEXT_PUBLIC_STRAPI_URL`:
- **Development**: `http://localhost:1337` (default)
- **Production Build**: Set via environment variable or GitHub Secrets

## Notes

- Images are downloaded fresh on every build
- The `uploads/` folder is gitignored (not committed)
- Only the `.gitkeep` file tracks the directory structure
- Images are referenced by filename only (path stripped)
