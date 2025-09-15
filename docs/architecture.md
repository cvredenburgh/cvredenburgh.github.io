# Technical Architecture Overview

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Development   │    │   Build Process  │    │   Production    │
│   Environment   │───▶│                  │───▶│   Environment   │
│   (Replit)      │    │  Static Generation│    │ (GitHub Pages)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui components
- Vite build system
- Wouter routing library

**Backend (Development Only):**
- Express.js server
- Node.js runtime
- SendGrid email API

**Deployment:**
- GitHub Pages (static hosting)
- Custom domain with CNAME
- Automated deployment via gh-pages

**Content Management:**
- Markdown files with frontmatter
- Automated content discovery
- Pre-build optimization

---

## Directory Structure

```
portfolio-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
│   └── public/             # Static assets
│       ├── CNAME           # Custom domain configuration
│       └── *.jpg           # Images and assets
│
├── content/                # Content management
│   └── projects/           # Project markdown files
│       ├── project1.md
│       └── project2.md
│
├── server/                 # Development server
│   ├── routes.ts           # API endpoints
│   ├── index.ts            # Server entry point
│   └── storage.ts          # Data storage interface
│
├── scripts/                # Build automation
│   └── build-projects.js   # Project content builder
│
├── docs/                   # Documentation
│   ├── deployment.md
│   ├── troubleshooting.md
│   └── architecture.md
│
├── dist/                   # Build output (generated)
│   └── public/             # Static files for deployment
│
└── deploy.sh              # Deployment automation
```

---

## Component Architecture

### Frontend Component Hierarchy

```
App
├── Router (wouter)
├── ThemeProvider
└── Routes
    ├── Home
    │   ├── HeroSection
    │   ├── AttributeAnimation
    │   └── NavigationLinks
    ├── Projects
    │   ├── ProjectCard[]
    │   ├── ProjectExpansion
    │   └── ProjectLoader
    ├── About
    │   ├── PhotoCarousel
    │   ├── BiographyText
    │   └── PersonalPhotos
    └── Contact
        ├── ContactForm
        ├── SocialLinks
        └── ContactInfo
```

### Data Flow Architecture

```
Markdown Files → Project Loader → Component State → UI Rendering
     ↓                 ↓              ↓              ↓
content/projects/  loadProjects()  useState()   ProjectCard
     ↓                 ↓              ↓              ↓
Frontmatter +     API or JSON     projects[]    Rendered UI
Content           Response         Array
```

---

## Content Management System

### Project Content Flow

**Development Mode:**
1. API scans `content/projects/` directory
2. Returns list of `.md` files
3. Frontend loads each file individually
4. Real-time parsing and rendering

**Production Mode:**
1. Build script pre-processes all `.md` files
2. Generates `projects.json` with parsed content
3. Frontend loads single JSON file
4. Optimized for static hosting

### Markdown Processing Pipeline

```
Markdown File
     ↓
Frontmatter Parser
     ↓
Metadata Extraction (title, description, tags, etc.)
     ↓
Markdown to HTML Conversion
     ↓
HTML Sanitization & Styling
     ↓
Project Object Creation
     ↓
JSON Serialization (production) or Direct Use (development)
```

### Frontmatter Schema

```yaml
---
title: string           # Project title
description: string     # Brief description for cards
tags: string[]         # Array of technology tags
githubUrl: string      # GitHub repository URL
demoUrl?: string       # Optional demo URL
date: YYYY-MM-DD       # Publication date
---
```

---

## API Architecture

### Development Server Endpoints

```
GET  /api/content/projects/           # List all project files
GET  /api/content/projects/:filename  # Get specific project content
POST /api/contact                     # Send contact form email
```

### Request/Response Flow

**Project Discovery:**
```
Client Request → /api/content/projects/ → File System Scan → JSON Response
```

**Project Content:**
```
Client Request → /api/content/projects/file.md → File Read → Markdown Content
```

**Contact Form:**
```
Form Submit → /api/contact → SendGrid API → Email Delivery → Response
```

---

## Build System Architecture

### Development Build (Vite)

```
TypeScript → Compilation → JavaScript
SCSS/CSS → Processing → Optimized CSS
Assets → Optimization → Compressed Assets
Components → Bundling → Module Chunks
```

### Production Build Pipeline

```
1. Pre-build: node scripts/build-projects.js
   ├── Scan content/projects/
   ├── Parse frontmatter
   ├── Convert markdown to HTML
   └── Generate projects.json

2. Main build: npm run build
   ├── Compile TypeScript
   ├── Bundle JavaScript
   ├── Process CSS
   ├── Optimize assets
   └── Output to dist/public/

3. Deploy: gh-pages deployment
   ├── Push dist/public/ to gh-pages branch
   └── GitHub Pages serves static files
```

### Build Optimization Features

- **Tree Shaking:** Removes unused code
- **Code Splitting:** Loads components on demand
- **Asset Optimization:** Compresses images and assets
- **CSS Purging:** Removes unused Tailwind classes
- **Minification:** Reduces file sizes for production

---

## Deployment Architecture

### Source Code Flow

```
Local Development → Git Push → GitHub Repository (main branch)
                                        ↓
                              Build Process (Replit)
                                        ↓
                              GitHub Pages (gh-pages branch)
                                        ↓
                              Live Website (chrisvred.com)
```

### Branch Strategy

- **main branch:** Source code, development, all edits
- **gh-pages branch:** Deployed static files (auto-generated)

### Domain Configuration

```
chrisvred.com (DNS) → GitHub Pages → CNAME file → Correct routing
```

---

## State Management

### Frontend State Architecture

**Local Component State:**
- Form inputs and validation
- UI toggles and modals
- Component-specific data

**Global Application State:**
- Theme preference (light/dark)
- Project data cache
- Loading states

**Persistent State:**
- Theme preference → localStorage
- No user authentication required
- No server-side session management

### State Flow Patterns

```
User Interaction → Component Handler → State Update → UI Re-render
                                           ↓
                                    localStorage (themes)
                                           ↓
                                    Persistent Storage
```

---

## Performance Architecture

### Optimization Strategies

**Frontend:**
- Lazy loading for routes
- Image optimization and compression
- CSS purging for smaller bundles
- Component memoization where needed

**Content:**
- Pre-built JSON for faster loading
- Markdown pre-processing
- Static asset optimization

**Hosting:**
- GitHub Pages CDN
- HTTP/2 support
- Gzip compression
- Browser caching headers

### Performance Metrics

**Target Performance:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.0s
- Cumulative Layout Shift: < 0.1

---

## Security Architecture

### Security Measures

**Frontend Security:**
- CSP headers via GitHub Pages
- HTTPS enforcement
- No sensitive data in client code
- Sanitized HTML output

**API Security:**
- CORS configuration for allowed origins
- Input validation on all endpoints
- Rate limiting considerations
- Environment variable protection

**Deployment Security:**
- GitHub token with minimal required permissions
- No secrets committed to repository
- Secure environment variable handling

### Threat Mitigation

- **XSS Prevention:** HTML sanitization, CSP headers
- **Data Exposure:** No sensitive data in frontend
- **CSRF Protection:** API design prevents CSRF attacks
- **Injection Attacks:** Input validation and sanitization

---

## Monitoring & Analytics

### Available Metrics

**GitHub Pages:**
- Deployment status and history
- Traffic analytics (if enabled)
- Uptime monitoring

**Development:**
- Build process logs
- Error logging and debugging
- Performance profiling in dev tools

### Error Handling Strategy

```
Error Occurrence → Console Logging → User-Friendly Message → Graceful Degradation
                                                                      ↓
                                                          Fallback Content/Behavior
```

---

## Future Architecture Considerations

### Scalability Options

1. **Content Growth:**
   - Pagination for projects
   - Category/tag filtering
   - Search functionality

2. **Feature Expansion:**
   - Blog section
   - Portfolio galleries
   - Interactive demos

3. **Performance Optimization:**
   - Service worker for offline capability
   - Progressive Web App features
   - Advanced caching strategies

### Technology Upgrade Paths

- **React 19:** Future React features
- **Vite 6+:** Build system improvements
- **Tailwind CSS 4:** New architecture
- **TypeScript 5+:** Language enhancements

---

*Last updated: September 2025*