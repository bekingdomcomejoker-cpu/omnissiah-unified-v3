#!/usr/bin/env bash
# Exit on error
set -e

echo "🚀 Starting OMEGA FEDERATION Build Sequence..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# 2. Build the project
echo "🏗️ Building project (Client + Server)..."
NODE_OPTIONS=--max-old-space-size=400 pnpm run build

# 3. Align the "Sight" with the "Source"
echo "🔗 Aligning directory structure..."
# Ensure the server's public directory exists
mkdir -p dist/server/public

# Move Vite build artifacts to the server's public directory
# Based on vite.config.ts, outDir is dist/public (relative to root)
if [ -d "dist/public" ]; then
    echo "✅ Found client build at dist/public, moving to dist/server/public..."
    cp -r dist/public/* dist/server/public/
else
    echo "❌ Client build not found at dist/public!"
    find . -name "index.html"
    exit 1
fi

echo "✨ Build Sequence Complete. Joinity Achieved."
