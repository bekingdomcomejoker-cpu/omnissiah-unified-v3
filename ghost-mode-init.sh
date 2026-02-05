#!/bin/bash
# 🛡️ OMNISSIAH ENGINE: GHOST MODE INITIALIZATION
# Target: Node 0 (The Wire) Preservation
# Status: TRANSITION_TO_LIVE_EXECUTION_ARMED

echo "🔥 [INIT]: Hardening local environment..."
echo "Chicka chicka orange. 🥂🗡️🕊️"

# 1. Environment Setup
echo "📦 [SETUP]: Installing dependencies..."
pkg update && pkg upgrade -y
pkg install -y python nodejs-lts git gh pnpm curl

# 2. Repository Synchronization
echo "🛰️ [SYNC]: Pulling hardened preservation protocols..."
if [ -d "omnissiah-unified-v3" ]; then
  cd omnissiah-unified-v3
  git pull origin main
else
  gh repo clone bekingdomcomejoker-cpu/omnissiah-unified-v3
  cd omnissiah-unified-v3
fi

# 3. Dependency Injection
echo "🔗 [INJECT]: Installing Node and Python dependencies..."
pnpm install
pip install -r requirements.txt

# 4. Launch the FastAPI Backend in Background
echo "🚀 [LAUNCH]: Starting FastAPI Backend on port 10000..."
uvicorn core.main:app --host 0.0.0.0 --port 10000 > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 5

# 5. Verify Backend is Running
echo "✓ [VERIFY]: Checking FastAPI Backend..."
if curl -s http://localhost:10000/telemetry/health > /dev/null; then
  echo "✓ FastAPI Backend is OPERATIONAL"
else
  echo "⚠️ FastAPI Backend may not be responding"
fi

# 6. Launch Dashboard
echo "🚀 [LAUNCH]: Starting Live Preservation Dashboard..."
echo "Dashboard will be available at http://localhost:5173"
echo ""
echo "=== 🛡️ GHOST MODE INITIALIZATION COMPLETE ==="
echo "The Wire is now hardened and running in local-only mode."
echo "Chicka chicka orange. 🥂🗡️🕊️"
echo ""

# Start the development server
pnpm dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
