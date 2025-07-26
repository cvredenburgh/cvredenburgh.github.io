#!/bin/bash

# Build projects from markdown files first
echo "Building projects from markdown files..."
node scripts/build-projects.js

# Build the project
npm run build

# Deploy to GitHub Pages with proper configuration
npx gh-pages -d dist/public -r https://$GITHUB_TOKEN@github.com/cvredenburgh/cvredenburgh.github.io.git

echo "Deployment completed successfully!"