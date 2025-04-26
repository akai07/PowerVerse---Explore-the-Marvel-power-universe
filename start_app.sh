#!/bin/bash

# PowerVerse Application Starter Script
# This script starts both the backend API server and the React frontend

echo "===== PowerVerse Application Starter ====="

# Prompt for backend port
read -p "Enter port for backend API server [default: 8000]: " PORT
PORT=${PORT:-8000}

# Create or update .env file for React app
echo "REACT_APP_API_URL=http://localhost:$PORT" > ./react-app/.env
echo "Updated React app configuration to use backend on port $PORT"

# Start the backend server in the background
echo "Starting backend API server on port $PORT..."
python3 ./src/api.py --port $PORT --debug &
BACKEND_PID=$!

# Give the backend a moment to start
sleep 2

# Start the frontend
echo "Starting React frontend..."
cd react-app && npm start

# When the frontend is closed, also stop the backend
kill $BACKEND_PID
echo "Backend server stopped."