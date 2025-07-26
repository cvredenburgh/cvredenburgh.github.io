# Personal Portfolio Website Project

## Overview
A personal blogging website for Chris Vredenburgh that integrates with GitHub. Features dark/light theme toggle, projects section populated from markdown files, and pages for home, projects, about, and contact information. Deployed to GitHub Pages with custom domain chrisvred.com.

## Stack
- React.js frontend with TypeScript
- Tailwind CSS + shadcn/ui components  
- Vite build system
- Express.js backend for development
- GitHub Pages deployment
- Custom domain: chrisvred.com

## User Preferences
- ✓ CNAME file is critical and must never be removed - required for custom domain
- ✓ Deploy .replitignore file to protect CNAME from exclusion
- ✓ Clean, professional design without excessive technical details in communication
- ✓ Maintain working deployment process without breaking existing functionality

## Project Architecture
- Frontend: client/ directory with React components and pages
- Backend: server/ directory for development server only
- Build output: dist/ directory for GitHub Pages deployment
- Content: markdown files for projects with frontmatter metadata
- Assets: images stored in client/public/ directory

## Recent Changes
- 2025-07-26: Created dedicated API server architecture for contact form (api-server.ts) to handle GitHub Pages serverless limitation
- 2025-07-26: Fixed SendGrid email integration and deployed working contact form to production
- 2025-07-26: Updated frontend to use external API endpoint with proper CORS configuration
- 2025-06-14: Deployed projects.tsx changes: fixed closing bracket and changed "A personal" to "My personal"
- 2025-06-07: Fixed asset reference mismatch in HTML causing blank pages
- 2025-06-07: Restored CNAME file after deployment issues
- 2025-06-07: Added .replitignore file with !CNAME to protect domain configuration
- 2025-06-07: Updated build process to include .replitignore in deployments

## Deployment Process
1. Build: `npm run build` creates dist/ directory
2. Copy CNAME and .replitignore to dist/public/
3. Deploy: `gh-pages -d public` from dist/ directory to GitHub Pages
4. Domain: chrisvred.com routes through GitHub Pages with CNAME file

## Critical Files
- client/public/CNAME: Custom domain configuration (NEVER REMOVE)
- .replitignore: Deployment protection rules
- dist/public/: Final build output for GitHub Pages