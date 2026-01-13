#!/usr/bin/env bash
set -e
echo "☢️ NUCLEAR BUILD SEQUENCE STARTING..."
rm -rf dist
pnpm install
NODE_OPTIONS=--max-old-space-size=400 pnpm run build
mkdir -p dist/server/public
mkdir -p dist/public
cp -r dist/public/* dist/server/public/ || true
cp -r dist/public/* public/ || true
echo "✨ NUCLEAR BUILD COMPLETE. ALL PATHS ARMED."
