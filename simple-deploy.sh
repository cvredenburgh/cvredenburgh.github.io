#!/bin/bash

echo "🚀 Building your website for GitHub Pages..."

# Build the application
npx vite build --outDir dist

# Copy 404.html for GitHub Pages routing
if [ -f "public/404.html" ]; then
    cp public/404.html dist/404.html
    echo "✅ Added 404.html for client-side routing"
fi

echo "📦 Build complete! Your files are ready in the 'dist' directory."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Copy all files from the 'dist' directory to your GitHub repository"
echo "2. Push to the 'gh-pages' branch, or"
echo "3. Use GitHub Pages settings to deploy from the main branch"
echo ""
echo "Your website will be available at: https://cvredenburgh.github.io/personal-blog"