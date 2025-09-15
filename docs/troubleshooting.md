# Troubleshooting Guide

## Common Issues & Solutions

### 🚨 Site Not Loading / Custom Domain Issues

**Symptoms:**
- Site shows 404 error
- chrisvred.com not working
- GitHub pages default URL works but custom domain doesn't

**Solutions:**
1. **Check CNAME file:**
   ```bash
   cat client/public/CNAME
   # Should output: chrisvred.com
   ```

2. **Restore CNAME if missing:**
   ```bash
   echo "chrisvred.com" > client/public/CNAME
   ./deploy.sh
   ```

3. **Verify .replitignore protection:**
   ```bash
   grep "!CNAME" .replitignore
   # Should exist to protect CNAME during deployment
   ```

---

### 📂 Projects Not Showing or Outdated

**Symptoms:**
- New projects don't appear
- Project content is old/cached
- Project cards show "Loading..." indefinitely

**Solutions:**
1. **Clear cached projects.json:**
   ```bash
   rm client/public/projects.json
   npm run dev  # Restart development server
   ```

2. **Rebuild projects manually:**
   ```bash
   node scripts/build-projects.js
   ```

3. **Check markdown file format:**
   ```markdown
   ---
   title: Your Project Title
   description: Brief description
   tags: ["tag1", "tag2"]
   githubUrl: https://github.com/user/repo
   date: 2025-07-25
   ---
   
   # Your Project Content
   Content goes here...
   ```

4. **Verify file location:**
   - Files must be in `content/projects/`
   - Files must have `.md` extension
   - Files must have valid frontmatter

---

### 🔄 Deployment Failures

**Symptoms:**
- `./deploy.sh` fails with errors
- GitHub token authentication issues
- Build process stops with errors

**Solutions:**
1. **Check GitHub token:**
   ```bash
   # Verify token is set (without exposing value)
   [ -n "$GITHUB_TOKEN" ] && echo "Token is set" || echo "Token is missing"
   ```

2. **Verify token permissions:**
   - Token needs `repo` scope
   - Token must not be expired
   - Repository access must be enabled

3. **Clean build and retry:**
   ```bash
   rm -rf dist/
   rm -rf node_modules/.cache/
   npm install
   ./deploy.sh
   ```

4. **Check for syntax errors:**
   ```bash
   npm run check  # TypeScript check
   npm run build  # Test build locally
   ```

---

### 🌐 Browser Cache Issues

**Symptoms:**
- Changes deployed but not visible
- Old version still showing
- Features working in development but not production

**Solutions:**
1. **Hard refresh browser:**
   - Chrome/Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Clear browser cache:**
   - Open browser developer tools
   - Right-click refresh button → "Empty Cache and Hard Reload"

3. **Test in incognito/private mode:**
   - Opens fresh session without cache
   - Confirms if issue is cache-related

4. **Wait for CDN propagation:**
   - GitHub Pages CDN can take 5-10 minutes to update globally
   - Check from different locations/devices

---

### 📧 Contact Form Issues

**Symptoms:**
- Contact form shows error messages
- Emails not being received
- Form submission fails

**Solutions:**
1. **Check SendGrid configuration:**
   ```bash
   echo $SENDGRID_EMAIL_API_KEY
   # Should show your SendGrid API key
   ```

2. **Verify domain authentication:**
   - Log into SendGrid account
   - Check that `chrisvred.com` domain is verified
   - Ensure DNS records are properly configured

3. **Test locally first:**
   ```bash
   npm run dev
   # Test contact form in development environment
   ```

4. **Check server logs:**
   - Look for SendGrid error messages
   - Verify API calls are reaching the server
   - Check for CORS issues

---

### 🔧 Development Server Issues

**Symptoms:**
- `npm run dev` fails to start
- Hot reloading not working
- API endpoints not responding

**Solutions:**
1. **Restart development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Clear Node.js cache:**
   ```bash
   rm -rf node_modules/.cache/
   npm run dev
   ```

3. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules/
   rm package-lock.json
   npm install
   npm run dev
   ```

4. **Check port conflicts:**
   - Default port is 5000
   - Ensure no other services using port 5000
   - Kill conflicting processes if needed

---

### 📱 Mobile/Responsive Issues

**Symptoms:**
- Layout broken on mobile devices
- Touch interactions not working
- Images not loading properly

**Solutions:**
1. **Test with browser dev tools:**
   - Open Chrome DevTools
   - Click device toolbar icon
   - Test various screen sizes

2. **Check Tailwind CSS classes:**
   - Verify responsive prefixes (`md:`, `lg:`, etc.)
   - Ensure mobile-first approach
   - Test breakpoint transitions

3. **Image optimization:**
   - Check image file sizes
   - Verify image paths are correct
   - Ensure responsive image classes

---

### 🎨 Dark Mode Issues

**Symptoms:**
- Dark mode toggle not working
- Colors not switching properly
- Theme not persisting

**Solutions:**
1. **Check localStorage:**
   ```javascript
   // In browser console:
   localStorage.getItem('theme')
   // Should show 'light' or 'dark'
   ```

2. **Verify CSS classes:**
   - Ensure `dark:` prefixes on Tailwind classes
   - Check that theme provider is wrapping app
   - Verify CSS variables are defined

3. **Clear localStorage:**
   ```javascript
   // In browser console:
   localStorage.removeItem('theme')
   // Refresh page to reset theme
   ```

---

## Emergency Procedures

### 🚨 Site Completely Down

1. **Check GitHub Pages status:**
   - Visit [GitHub Status](https://www.githubstatus.com/)
   - Look for Pages service issues

2. **Rollback to last working version:**
   ```bash
   git log --oneline -10
   git checkout [last-working-commit]
   ./deploy.sh
   ```

3. **Deploy minimal working version:**
   - Use fallback projects if main projects fail
   - Remove recent changes that might be causing issues

### 🔄 Corrupted Deployment

1. **Force clean deployment:**
   ```bash
   rm -rf dist/
   rm -rf .cache/
   npm install
   ./deploy.sh
   ```

2. **Reset gh-pages branch:**
   ```bash
   git push origin --delete gh-pages
   ./deploy.sh  # Creates fresh gh-pages branch
   ```

---

## Debugging Tools

### Useful Commands

```bash
# Check file structure
ls -la client/public/
ls -la content/projects/

# View build output
ls -la dist/public/

# Check git status
git status
git log --oneline -5

# Test API endpoints locally
curl http://localhost:5000/api/content/projects/

# View environment variables
env | grep -E "(GITHUB|SENDGRID)"
```

### Browser DevTools

1. **Console tab:** Check for JavaScript errors
2. **Network tab:** Monitor API calls and asset loading
3. **Application tab:** Check localStorage for theme settings
4. **Elements tab:** Inspect CSS and layout issues

### Log Locations

- **Development server:** Console output when running `npm run dev`
- **Build process:** Output from `npm run build`
- **Deployment:** Output from `./deploy.sh`
- **GitHub Pages:** Repository → Settings → Pages

---

## Getting Help

### Self-Service Resources

1. **Repository Issues:** Check for similar problems in GitHub issues
2. **Replit Community:** Search for deployment-related questions
3. **GitHub Pages Docs:** Official troubleshooting guides
4. **SendGrid Docs:** Email delivery troubleshooting

### When to Seek Additional Help

- Persistent deployment failures after trying all solutions
- Custom domain DNS issues beyond GitHub Pages
- SendGrid account or domain verification problems
- Performance issues affecting user experience

### Information to Include When Asking for Help

1. **Error messages:** Exact text of any error messages
2. **Steps taken:** What troubleshooting steps you've already tried
3. **Environment:** Development vs production, browser versions
4. **Timeline:** When the issue started, what changes were made
5. **Logs:** Relevant console output or error logs

---

*Last updated: September 2025*