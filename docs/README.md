# Documentation Directory

This directory contains comprehensive documentation for the Chris Vredenburgh Portfolio website.

## 📚 Available Documentation

### [Deployment Guide](./deployment.md)
Complete guide for deploying website changes to the live site.
- **Quick Start:** Single command deployment
- **Detailed Process:** Step-by-step breakdown
- **Critical Files:** What never to modify
- **Troubleshooting:** Common deployment issues
- **Emergency Recovery:** How to fix broken deployments

### [Troubleshooting Guide](./troubleshooting.md)
Solutions for common issues and problems.
- **Site Loading Issues:** Custom domain and CNAME problems
- **Project Display:** Content not updating or showing
- **Deployment Failures:** Build and GitHub issues
- **Browser Cache:** Clearing cached content
- **Contact Form:** Email delivery problems
- **Emergency Procedures:** Critical failure recovery

### [Technical Architecture](./architecture.md)
Deep dive into the technical implementation and system design.
- **System Overview:** High-level architecture
- **Component Structure:** Frontend organization
- **Content Management:** Markdown processing pipeline
- **Build System:** Development and production builds
- **Performance:** Optimization strategies
- **Security:** Protection measures

## 🚀 Quick Reference

### Most Common Commands
```bash
# Deploy to live site
./deploy.sh

# Start development server
npm run dev

# Build for production
npm run build

# Build projects only
node scripts/build-projects.js
```

### Emergency Commands
```bash
# Fix CNAME issue
echo "chrisvred.com" > client/public/CNAME

# Clean rebuild
rm -rf dist/ && npm run build

# Clear cached projects
rm client/public/projects.json
```

### Critical Files to Never Delete
- `client/public/CNAME` - Custom domain configuration
- `.replitignore` - Deployment protection
- `content/projects/*.md` - Project content

## 📋 Documentation Maintenance

### When to Update Documentation
- After major feature additions
- When deployment process changes
- After architecture modifications
- When new troubleshooting solutions are discovered

### How to Update
1. Edit the relevant markdown file in `docs/`
2. Update the "Last updated" date at the bottom
3. Commit changes to the main branch
4. Deploy updates to make them available on the live site

## 🔗 Additional Resources

- **Repository:** [GitHub Repository](https://github.com/cvredenburgh/cvredenburgh.github.io)
- **Live Site:** [chrisvred.com](https://chrisvred.com)
- **GitHub Pages:** [Settings](https://github.com/cvredenburgh/cvredenburgh.github.io/settings/pages)
- **SendGrid:** [Email Service Dashboard](https://app.sendgrid.com/)

## 📞 Support

For issues not covered in this documentation:
1. Check the troubleshooting guide first
2. Review recent commit history for related changes
3. Test in development environment before deploying
4. Use browser developer tools for debugging

---

*This documentation is maintained alongside the codebase and should be kept up-to-date with any system changes.*