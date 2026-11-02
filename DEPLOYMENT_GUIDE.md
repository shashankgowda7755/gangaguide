# GangaGuides Deployment Guide

## Deploy to Vercel

Your GangaGuides website is ready for deployment to Vercel! Here's how to deploy it:

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [https://vercel.com](https://vercel.com)
   - Login or create an account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository: `https://github.com/shashankgowda7755/gangaguide`
   - Vercel will automatically detect the configuration

3. **Configure Environment Variables** (Optional)
   - Add any environment variables if needed
   - The app will work with default settings

4. **Deploy**
   - Click "Deploy" and your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   - Follow the browser authentication

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts to configure your project
   - Choose your settings or accept defaults

### Option 3: Manual Deployment

1. **Build the Project**
   ```bash
   npm run vercel-build
   ```

2. **Upload to Vercel**
   - Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Drag and drop the entire project folder
   - Vercel will automatically deploy it

## Project Structure for Deployment

The project is configured with:
- `vercel.json` - Vercel configuration file
- `api/index.ts` - Serverless function for API routes
- `vercel-build` script - Builds only the client for Vercel

## Features

✅ **Full-stack deployment** - Both frontend and backend
✅ **API routes** - All API endpoints work
✅ **Static assets** - Images and assets served correctly
✅ **Database** - In-memory database (data resets on deploy)
✅ **Environment ready** - Production environment configured

## Post-Deployment

After deployment, your site will be available at:
- `https://[your-project-name].vercel.app`

The site includes:
- Spiritual tourism platform
- Destination listings
- Tour packages
- Blog posts
- Contact forms
- Responsive design

## Troubleshooting

If you encounter issues:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are installed
3. Verify the `vercel.json` configuration
4. Check environment variables if needed

## Next Steps

- Add a custom domain
- Set up a persistent database (optional)
- Configure environment variables
- Monitor performance and usage