#!/bin/bash

# Build and Deploy Script for GitHub Pages
# This script:
# 1. Installs all dependencies
# 2. Starts Strapi backend
# 3. Waits for Strapi to be ready
# 4. Builds the Next.js frontend to static export
# 5. Cleans up Strapi

set -e

echo "=========================================="
echo "🚀 Starting deployment build process..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
log_info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Cleanup function
cleanup() {
    log_info "Cleaning up Strapi process..."
    if [ ! -z "$STRAPI_PID" ]; then
        kill $STRAPI_PID 2>/dev/null || true
        sleep 2
        kill -9 $STRAPI_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

# Step 1: Install dependencies
log_info "Installing dependencies..."
npm ci

# Step 2: Build Strapi
log_info "Building Strapi backend..."
cd backend
npm ci
npm run build
cd ..

# Step 3: Start Strapi in the background
log_info "Starting Strapi backend..."
cd backend
npm run start &
STRAPI_PID=$!
cd ..

# Step 4: Wait for Strapi to be ready
log_info "Waiting for Strapi to be ready..."
MAX_ATTEMPTS=60
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s http://localhost:1337/api/articles > /dev/null 2>&1; then
        log_info "Strapi is ready! ✅"
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
        log_error "Strapi failed to start after $MAX_ATTEMPTS attempts"
        exit 1
    fi
    log_warn "Waiting for Strapi... (attempt $ATTEMPT/$MAX_ATTEMPTS)"
    sleep 2
done

# Step 5: Build Next.js frontend
log_info "Building Next.js frontend..."
cd frontend
npm ci
npm run build
cd ..

log_info "Build completed successfully! ✅"
log_info "Static export ready in frontend/out/"

echo "=========================================="
echo "✨ Deployment build complete!"
echo "=========================================="
