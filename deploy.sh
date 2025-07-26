#!/bin/bash

# Build the project
npm run build

# Deploy to GitHub Pages with proper configuration
npx gh-pages -d dist/public -r https://$GITHUB_TOKEN@github.com/cvredenburgh/cvredenburgh.github.io.git

echo "Deployment completed successfully!"