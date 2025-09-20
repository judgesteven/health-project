#!/bin/bash

# Build script for Vercel deployment
set -e

echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run type check
echo "Running type check..."
npm run type-check

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"
