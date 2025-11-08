# Vercel Deployment Package

This folder contains everything needed to deploy GangaGuides to Vercel.

## Quick Deploy Instructions

### Method 1: Vercel Dashboard (Easiest - 2 minutes)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com
   - Login or create a free account

2. **Import Project**
   - Click "New Project" button
   - Click "Import Git Repository"
   - Paste your GitHub URL: `https://github.com/shashankgowda7755/gangaguide`
   - Click "Import"

3. **Configure Project**
   - Project Name: `gangaguides` (or your choice)
   - Framework Preset: `Vite`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy" button
   - Wait 2-3 minutes for deployment
   - Your site will be live at: `https://gangaguides.vercel.app`

### Method 2: Drag & Drop (30 seconds)

1. **Build the project**
   ```bash
   npm run vercel-build
   ```

2. **Go to Vercel**
   - Visit: https://vercel.com/dashboard
   - Login to your account

3. **Drag & Drop**
   - Drag the entire project folder to the Vercel dashboard
   - Vercel will automatically detect settings and deploy

### Method 3: Vercel CLI (If you prefer command line)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   # Follow browser authentication
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## What's Included

- ✅ **Vercel Configuration** (`vercel.json`)
- ✅ **Serverless Function** (`api/index.ts`)
- ✅ **Build Scripts** (`package.json`)
- ✅ **Static Assets** (images, CSS, JS)
- ✅ **API Routes** (destinations, packages, blog posts)
- ✅ **Database** (in-memory, resets on deploy)

## Post-Deployment Features

Your deployed site will include:
- 🏛️ Spiritual tourism platform
- 📍 Destination listings (Varanasi, Ayodhya, Prayagraj, Sarnath)
- 📦 Tour packages with pricing
- 📝 Blog posts about spiritual experiences
- 📱 Contact forms
- 🎨 Responsive, spiritual design
- ⚡ Fast loading with Vercel CDN

## Customization Options

After deployment, you can:
- Add custom domain
- Set up persistent database
- Configure environment variables
- Monitor analytics
- Set up CI/CD with GitHub

## Support

If you encounter any issues:
1. Check Vercel build logs
2. Verify all files are committed to Git
3. Ensure `npm run vercel-build` works locally
4. Check the deployment guide (`DEPLOYMENT_GUIDE.md`)

**Ready to deploy? Choose Method 1 above for the fastest deployment!**