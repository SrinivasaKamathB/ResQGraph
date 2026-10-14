#!/usr/bin/env bash

# ResQGraph Unified Dev Launcher
echo "=========================================================="
echo " Starting ResQGraph - AI Disaster Response System"
echo " Simulation Baseline: Bengaluru 2022 Urban Flood"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Start Python FastAPI Backend in background
echo "[1/2] Launching FastAPI Backend on http://localhost:8000..."
cd "$SCRIPT_DIR/backend"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# 2. Start React Frontend in background
echo "[2/2] Launching React + Leaflet Frontend on http://localhost:5173..."
cd "$SCRIPT_DIR/frontend"
npm run dev -- --host &
FRONTEND_PID=$!

echo ""
echo "=========================================================="
echo " ResQGraph is RUNNING!"
echo " 👉 Commander Dashboard: http://localhost:5173"
echo " 👉 Backend API & Docs:  http://localhost:8000/docs"
echo "=========================================================="
echo "Press Ctrl+C to terminate both servers."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM
wait
