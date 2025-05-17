// Simple GitHub Pages deployment script
const ghpages = require('gh-pages');
const path = require('path');

// GitHub repository URL (replace with your actual repository)
const repoUrl = 'https://github.com/cvredenburgh/personal-blog.git';

// Deployment options
const options = {
  repo: repoUrl,
  branch: 'gh-pages',
  dotfiles: true,
  message: 'Auto-deploy from script'
};

// Path to build directory (adjust if needed)
const buildPath = path.join(process.cwd(), 'dist');

console.log('Starting deployment to GitHub Pages...');
console.log(`Deploying from: ${buildPath}`);

// Deploy to GitHub Pages
ghpages.publish(buildPath, options, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment succeeded!');
    console.log('Your site should be available at:');
    console.log('https://cvredenburgh.github.io/personal-blog');
  }
});