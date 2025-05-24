#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting build and deployment process...');

try {
  // Step 1: Build the client application
  console.log('📦 Building the application...');
  execSync('npx vite build --outDir dist/client', { stdio: 'inherit' });
  
  // Step 2: Copy the 404.html file for GitHub Pages
  console.log('📄 Copying 404.html for GitHub Pages...');
  if (fs.existsSync('public/404.html')) {
    fs.copyFileSync('public/404.html', 'dist/client/404.html');
  }
  
  // Step 3: Deploy to GitHub Pages
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d dist/client', { stdio: 'inherit' });
  
  console.log('✅ Deployment completed successfully!');
  console.log('🎉 Your website should be available at: https://cvredenburgh.github.io/personal-blog');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}