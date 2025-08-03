# Deploying Text Behind Image Tool to Netlify

This guide will help you deploy your text-behind-image tool to Netlify.

## Prerequisites

1. A GitHub account
2. A Netlify account
3. Your project pushed to a GitHub repository

## Step 1: Prepare Your Repository

1. Make sure your project is pushed to a GitHub repository
2. Ensure all dependencies are properly listed in `package.json`
3. Verify that the build command works locally: `npm run build`

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account if not already connected
4. Select your repository
5. Configure the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (or latest LTS)
6. Click "Deploy site"

### Option B: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Step 3: Environment Variables

If your app uses environment variables (like Supabase keys), you'll need to add them in Netlify:

1. Go to your site dashboard in Netlify
2. Navigate to Site settings → Environment variables
3. Add your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Any other environment variables your app needs

## Step 4: Custom Domain (Optional)

1. In your Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## Step 5: Verify Deployment

1. Check that your site is accessible at the provided Netlify URL
2. Test the main functionality:
   - Image upload
   - Background removal
   - Text placement
   - Image download

## Troubleshooting

### Build Errors
- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Runtime Errors
- Check browser console for errors
- Verify environment variables are set correctly
- Test locally with `npm run build && npm run start`

### Performance Issues
- Enable Netlify's CDN features
- Optimize images and assets
- Consider using Netlify's image optimization

## Configuration Files

The project includes:
- `netlify.toml` - Netlify-specific configuration
- `next.config.mjs` - Next.js configuration optimized for static export

## Support

If you encounter issues:
1. Check Netlify's documentation
2. Review the build logs
3. Test locally first
4. Check the project's GitHub issues

## Features

Your deployed text-behind-image tool will include:
- ✅ Background removal using AI
- ✅ Text placement behind objects
- ✅ Customizable text styling
- ✅ Image download functionality
- ✅ User authentication (if configured)
- ✅ Responsive design
- ✅ Dark/light mode toggle