# Deployment Guide

## Vercel Deployment

This project is configured for automatic deployment on Vercel from the GitHub repository.

### Setup Steps

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import the `judgesteven/health-project` repository

2. **Configure Build Settings**
   - Framework: **Other**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: `20.x`

3. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - The app currently uses hardcoded API keys for GameLayer

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy from the main branch
   - Future pushes to main will trigger automatic deployments

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build the project
npm run build

# The dist/ folder will contain the built files
# Upload the contents of dist/ to your hosting provider
```

### Build Output

The build process creates:
- `dist/index.html` - Main HTML file
- `dist/main.js` - Bundled JavaScript
- `dist/main.js.map` - Source map for debugging

### Custom Domain

To add a custom domain:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS records as instructed

### Performance Optimization

The Vercel configuration includes:
- Static file serving
- Proper caching headers
- Gzip compression
- CDN distribution

### Troubleshooting

**Build Fails:**
- Check Node.js version (requires 20+)
- Ensure all dependencies are in package.json
- Check build logs in Vercel dashboard

**App Doesn't Load:**
- Verify the output directory is set to `dist`
- Check that index.html is in the root of dist/
- Ensure routing is configured for SPA

**API Issues:**
- Check GameLayer API credentials
- Verify CORS settings
- Check browser console for errors
