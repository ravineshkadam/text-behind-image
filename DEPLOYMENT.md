# Deployment Guide for Text Behind Image Tool

## Netlify Deployment (Recommended)

### Prerequisites
- A GitHub account
- A Netlify account
- A Supabase account (for database and authentication)
- A Stripe account (optional, for payments)

### Step 1: Prepare Your Repository

1. **Fork or clone this repository** to your GitHub account
2. **Ensure all files are committed**, especially:
   - `netlify.toml` - Netlify configuration
   - `.env.build` - Build-time environment template
   - `.env.example` - Runtime environment template

### Step 2: Set Up Supabase

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)
2. **Set up the database schema**:
   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id uuid REFERENCES auth.users ON DELETE CASCADE,
     images_generated integer DEFAULT 0,
     paid boolean DEFAULT false,
     subscription_id text,
     created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
     PRIMARY KEY (id)
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can insert own profile" ON profiles
     FOR INSERT WITH CHECK (auth.uid() = id);
   ```

3. **Get your Supabase credentials**:
   - Go to Settings > API
   - Copy your Project URL and anon/public key

### Step 3: Set Up Stripe (Optional)

1. **Create a Stripe account** at [stripe.com](https://stripe.com)
2. **Get your API keys**:
   - Go to Developers > API keys
   - Copy your Secret key (starts with `sk_`)
3. **Set up webhook endpoint** (after deployment):
   - Go to Developers > Webhooks
   - Add endpoint: `https://your-site.netlify.app/api/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

### Step 4: Deploy to Netlify

#### Option A: Automatic Deployment (Recommended)

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com) and log in
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Configure build settings**:
   - Build command: `cp .env.build .env.local && npm run build`
   - Publish directory: `.next`
   - Node version: `18`

3. **Set environment variables**:
   - Go to Site Settings > Environment Variables
   - Add the following variables:

   **Required:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Optional (for payments):**
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be available at `https://random-name.netlify.app`

#### Option B: Manual Deployment

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   cp .env.build .env.local
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify login
   netlify deploy --prod --dir=.next
   ```

### Step 5: Configure Custom Domain (Optional)

1. **In Netlify dashboard**:
   - Go to Site Settings > Domain management
   - Click "Add custom domain"
   - Follow the DNS configuration instructions

2. **Update success URLs** in Stripe (if using payments):
   - Update the success_url in `/app/api/create-checkout-session/route.ts`
   - Change from `http://textbehindimage.rexanwong.xyz/app` to your domain

### Step 6: Test Your Deployment

1. **Test basic functionality**:
   - Visit your deployed site
   - Try uploading an image
   - Test text customization features

2. **Test authentication**:
   - Try signing up/logging in
   - Ensure user profiles are created properly

3. **Test payments** (if configured):
   - Try the payment flow
   - Check webhook events in Stripe dashboard

## Environment Variables Reference

### Required for Basic Functionality
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional for Full Functionality
- `STRIPE_SECRET_KEY` - Your Stripe secret key (for payments)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret (for payment verification)
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)

## Troubleshooting

### Build Fails with Environment Variables Error
- Ensure `.env.build` file exists with placeholder values
- Check that the build command includes `cp .env.build .env.local`

### Runtime Errors Related to Supabase
- Verify your Supabase environment variables are correctly set in Netlify
- Check that your Supabase project is active and accessible

### Payment Features Not Working
- Ensure Stripe environment variables are set
- Verify webhook endpoint is correctly configured in Stripe
- Check Stripe dashboard for webhook delivery attempts

### Images Not Loading
- Check that your domain is added to Supabase's allowed origins
- Verify CORS settings in Supabase dashboard

### Background Removal Not Working
- Ensure the application is served over HTTPS
- Check browser console for WebAssembly errors
- Verify browser compatibility

## Performance Optimization

### For High Traffic
1. **Enable caching** in Netlify:
   - Set up appropriate cache headers (already configured in netlify.toml)
   - Consider using Netlify's CDN features

2. **Optimize images**:
   - Consider implementing image compression
   - Use appropriate image formats (WebP, AVIF)

3. **Monitor performance**:
   - Use Netlify Analytics
   - Set up error tracking (Sentry, etc.)

## Security Considerations

1. **Environment Variables**:
   - Never commit real environment variables to git
   - Use different keys for development and production

2. **CORS Configuration**:
   - Properly configure allowed origins in Supabase
   - Restrict API access to your domain

3. **Rate Limiting**:
   - Consider implementing rate limiting for API routes
   - Monitor usage to prevent abuse

## Maintenance

### Regular Updates
- Keep dependencies updated: `npm audit fix`
- Monitor for security vulnerabilities
- Update Supabase and Stripe libraries regularly

### Backup
- Regularly backup your Supabase database
- Keep environment variables documented securely

### Monitoring
- Set up monitoring for uptime and performance
- Monitor error rates and user feedback

---

## Need Help?

If you encounter issues during deployment:

1. Check the [Netlify documentation](https://docs.netlify.com/)
2. Review [Supabase documentation](https://supabase.io/docs)
3. Check [Next.js deployment guides](https://nextjs.org/docs/deployment)
4. Open an issue in this repository with deployment logs

---

**Happy deploying! 🚀**