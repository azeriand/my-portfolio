#!/bin/bash

# Local Build Script
# This script simulates the GitHub Actions build process locally
# Useful for testing before pushing to GitHub

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}▶ $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}\n"
}

log_error() {
    echo -e "${RED}❌ $1${NC}\n"
}

log_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}\n"
}

cleanup() {
    log_warn "Cleaning up..."
    if [ ! -z "$STRAPI_PID" ]; then
        log_warn "Killing Strapi process $STRAPI_PID..."
        kill $STRAPI_PID 2>/dev/null || true
        sleep 2
        kill -9 $STRAPI_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    log_error "package.json not found. Please run this script from the project root."
    exit 1
fi

log_step "Installing Root Dependencies"
npm install

log_step "Installing Backend Dependencies"
cd backend
npm install
npm run build
cd ..

log_success "Backend built"

log_step "Starting Strapi Backend"
cd backend
npm run start > /tmp/strapi.log 2>&1 &
STRAPI_PID=$!
cd ..

log_warn "Strapi PID: $STRAPI_PID"

log_step "Waiting for Strapi to be Ready"
MAX_ATTEMPTS=60
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s http://localhost:1337/api/articles > /dev/null 2>&1; then
        log_success "Strapi is ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
        log_error "Strapi failed to start after $MAX_ATTEMPTS attempts"
        echo -e "\n${YELLOW}Last Strapi logs:${NC}"
        tail -20 /tmp/strapi.log
        exit 1
    fi
    
    echo "Waiting for Strapi... (attempt $ATTEMPT/$MAX_ATTEMPTS)"
    sleep 2
done

log_step "Installing Frontend Dependencies"
cd frontend
npm install
cd ..

log_success "Frontend dependencies installed"

log_step "Building Frontend for Static Export"
cd frontend
npm run build
cd ..

log_success "Frontend built"

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 BUILD COMPLETE!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
echo -e "📦 Static export location: ${YELLOW}frontend/out${NC}"
echo -e "📝 To deploy: ${YELLOW}git push origin main${NC}\n"
