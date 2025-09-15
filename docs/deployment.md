# Deployment Guide - Chris Vredenburgh Portfolio

## Quick Start

To deploy your website changes to the live site:

```bash
./deploy.sh
```

That's it! This single command handles everything automatically.

---

## Detailed Deployment Process

### Prerequisites

1. **GitHub Token**: Ensure `GITHUB_TOKEN` environment variable is set with repo write permissions
2. **Git Repository**: All changes committed to `main` branch
3. **Dependencies**: All npm packages installed (`npm install`)

### Step-by-Step Process

#### 1. Pre-Build: Generate Projects Data
```bash
node scripts/build-projects.js
```
**What it does:**
- Scans `content/projects/` directory for `.md` files
- Parses frontmatter metadata (title, description, tags, etc.)
- Converts markdown content to HTML
- Creates `client/public/projects.json` with all project data
- Sorts projects by date (newest first)

**Output:** `client/public/projects.json` file ready for production

#### 2. Build React Application
```bash
npm run build
```
**What it does:**
- Runs Vite build process on `client/` directory
- Compiles TypeScript, bundles JavaScript, processes CSS
- Optimizes images and assets
- Outputs everything to `dist/public/` directory

**Output:** Complete static website in `dist/public/`

#### 3. Deploy to GitHub Pages
```bash
npx gh-pages -d dist/public -r https://$GITHUB_TOKEN@github.com/cvredenburgh/cvredenburgh.github.io.git
```
**What it does:**
- Takes `dist/public/` folder contents
- Pushes to `gh-pages` branch of your repository
- Uses GitHub token for authentication
- Overwrites previous deployment

**Output:** Updated `gh-pages` branch with new site version

#### 4. GitHub Pages Serves Your Site
- GitHub Pages automatically detects `gh-pages` branch update
- Serves static files from branch
- Custom domain `chrisvred.com` routes via CNAME file
- Site becomes live at https://chrisvred.com (usually within 1-2 minutes)

---

## Critical Files & Settings

### 🔴 NEVER REMOVE OR MODIFY

#### CNAME File
- **Location:** `client/public/CNAME`
- **Contents:** `chrisvred.com`
- **Purpose:** Tells GitHub Pages to serve site at custom domain
- **Consequence if removed:** Site becomes unreachable at your domain

#### .replitignore File
- **Location:** `.replitignore`
- **Critical line:** `!CNAME`
- **Purpose:** Ensures CNAME file is included in deployments
- **Consequence if removed:** CNAME might be excluded, breaking domain

### 🟡 HANDLE WITH CARE

#### GitHub Token
- **Environment Variable:** `GITHUB_TOKEN`
- **Scope Required:** repo write permissions
- **Security:** Never commit to code, keep secure
- **Purpose:** Allows automated push to gh-pages branch

#### Build Output Directory
- **Location:** `dist/public/`
- **Purpose:** Contains final built website
- **Note:** Auto-generated, safe to delete (will be recreated on build)

---

## Architecture Overview

### Repository Structure
```
├── main branch          # Source code (what you edit)
│   ├── client/         # React frontend
│   ├── content/        # Markdown project files
│   ├── server/         # Development server only
│   └── scripts/        # Build scripts
│
└── gh-pages branch     # Deployed site (auto-generated)
    └── [built files]   # Static HTML, CSS, JS
```

### Deployment Flow
```
1. Edit files in main branch
2. Run ./deploy.sh
3. Script builds static files
4. Files pushed to gh-pages branch
5. GitHub Pages serves files
6. Site live at chrisvred.com
```

### Two Environments

**Development (Replit):**
- Dynamic project loading from markdown files
- Express server for API endpoints
- Hot reloading for instant updates
- Full development tools

**Production (GitHub Pages):**
- Static files only (no server)
- Pre-built `projects.json` for fast loading
- Optimized, minified assets
- CDN-served for global performance

---

## Build Process Details

### Projects Build System

Your site uses a sophisticated two-stage project system:

**Development:**
- Projects loaded dynamically via `/api/content/projects/`
- Real-time markdown file scanning
- Perfect for development and testing

**Production:**
- Projects pre-built into `projects.json`
- Faster loading, no server needed
- Optimized for static hosting

### Build Scripts

**scripts/build-projects.js:**
- Custom frontmatter parser (avoids browser Buffer issues)
- Markdown to HTML conversion
- Metadata extraction and validation
- JSON generation for production

**Vite Build:**
- TypeScript compilation
- Tree shaking for smaller bundles
- Asset optimization
- Modern browser targeting

---

## Common Commands

### Development
```bash
npm run dev          # Start development server
```

### Building
```bash
npm run build        # Build for production
node scripts/build-projects.js  # Build projects only
```

### Deployment
```bash
./deploy.sh          # Full deployment process
npm run deploy       # Alternative deployment command
```

### Troubleshooting
```bash
git status           # Check for uncommitted changes
npm install          # Reinstall dependencies
rm -rf dist/         # Clean build directory
```

---

## Deployment Checklist

Before deploying, ensure:

- [ ] All changes committed to `main` branch
- [ ] No syntax errors in code
- [ ] `GITHUB_TOKEN` environment variable set
- [ ] `client/public/CNAME` file exists and contains `chrisvred.com`
- [ ] `.replitignore` file exists and contains `!CNAME`
- [ ] New project markdown files added to `content/projects/`

After deploying, verify:

- [ ] Build completed without errors
- [ ] Site accessible at https://chrisvred.com
- [ ] New projects/changes visible on live site
- [ ] Navigation works correctly
- [ ] Contact form functional (if modified)

---

## Troubleshooting

### Deployment Fails
1. Check GitHub token has correct permissions
2. Verify repository URL in deploy script
3. Ensure no uncommitted changes blocking deployment

### Site Not Updating
1. Clear browser cache (Ctrl+F5 / Cmd+Shift+R)
2. Check GitHub Pages deployment status
3. Verify CNAME file wasn't removed

### Projects Not Showing
1. Ensure `scripts/build-projects.js` ran successfully
2. Check markdown files have correct frontmatter format
3. Verify `content/projects/` directory structure

### Custom Domain Not Working
1. Verify `CNAME` file contains `chrisvred.com`
2. Check DNS settings for domain
3. Ensure `.replitignore` includes `!CNAME`

---

## Emergency Recovery

If deployment breaks your site:

1. **Restore from Git:**
   ```bash
   git log --oneline -10    # Find last working commit
   git checkout [commit-hash]
   ./deploy.sh              # Redeploy working version
   ```

2. **Fix CNAME Issues:**
   ```bash
   echo "chrisvred.com" > client/public/CNAME
   ./deploy.sh
   ```

3. **Clean Rebuild:**
   ```bash
   rm -rf dist/
   rm -rf node_modules/
   npm install
   ./deploy.sh
   ```

---

## Performance Notes

### Build Optimization
- Vite automatically optimizes assets
- JavaScript is minified and tree-shaken
- Images are compressed and optimized
- CSS is purged of unused styles

### Deployment Speed
- Typical deployment time: 30-60 seconds
- GitHub Pages propagation: 1-2 minutes
- CDN cache update: Up to 5 minutes globally

### Best Practices
- Keep image file sizes reasonable
- Test locally before deploying
- Deploy during low-traffic hours when possible
- Monitor deployment logs for any warnings

---

*Last updated: September 2025*