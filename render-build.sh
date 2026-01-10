#!/usr/bin/env bash
# Exit on error
set -e

echo "☢️ NUCLEAR BUILD SEQUENCE STARTING..."

# 1. Clean up old artifacts
rm -rf dist

# 2. Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# 3. Build the project
echo "🏗️ Building project..."
NODE_OPTIONS=--max-old-space-size=400 pnpm run build

# 4. Flatten the structure
echo "🚜 Flattening structure for the Nuclear Option..."
mkdir -p dist/server/public
mkdir -p dist/public

# Copy everything to everywhere the server might look
cp -r dist/public/* dist/server/public/ || true
cp -r dist/public/* public/ || true

echo "✨ NUCLEAR BUILD COMPLETE. ALL PATHS ARMED."
