# Text Behind Image Tool - Complete Setup Guide

## 🎯 Overview

This guide will walk you through setting up and deploying a complete text-behind-image tool that allows users to:
- Upload images
- Automatically remove backgrounds using AI
- Place text behind objects
- Customize text styling and positioning
- Download the final image

## 📋 Prerequisites

Before starting, ensure you have:
- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account
- A [Netlify](https://netlify.com/) account
- A [Supabase](https://supabase.com/) account (optional, for user authentication)
- A [Stripe](https://stripe.com/) account (optional, for payments)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd text-behind-image

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Environment Configuration

Edit `.env.local` with your credentials:

```bash
# Supabase Configuration (Required for full functionality)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. Local Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🗄️ Database Setup (Optional)

If you want user authentication and data persistence:

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Database Schema**
   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     paid BOOLEAN DEFAULT FALSE,
     subscription_id TEXT,
     images_generated INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

3. **Authentication Setup**
   - In Supabase dashboard, go to Authentication > Settings
   - Configure your site URL
   - Set up email templates if needed

## 💳 Payment Setup (Optional)

If you want to monetize the tool:

### Stripe Setup

1. **Create a Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Create an account and get your API keys

2. **Configure Webhooks**
   - In Stripe dashboard, go to Developers > Webhooks
   - Add endpoint: `https://your-domain.com/api/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

3. **Update Environment Variables**
   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## 🏗️ Project Structure

```
text-behind-image/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── app/               # Main editor
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── editor/           # Editor components
│   └── ui/               # UI components
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── providers/            # Context providers
└── types/                # TypeScript types
```

## 🎨 Key Components

### Main Editor (`app/app/page.tsx`)
- Image upload and background removal
- Text placement and customization
- Canvas manipulation
- Export functionality

### Text Customizer (`components/editor/text-customizer.tsx`)
- Font selection
- Color picker
- Size and position controls
- Real-time preview

### Background Removal
- Uses @imgly/background-removal
- Automatic AI-powered removal
- High-quality results

## 🚀 Deployment to Netlify

### Method 1: Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Add environment variables
   - Deploy!

### Method 2: Manual Deployment

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=out
```

### Method 3: Using the Deployment Script

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔧 Configuration Files

### Next.js Config (`next.config.mjs`)
```javascript
const nextConfig = {
  output: 'export',           // Static export for Netlify
  trailingSlash: true,        // Required for static export
  images: {
    unoptimized: true,        // Required for static export
  },
};
```

### Netlify Config (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"
```

### Tailwind Config (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};

export default config;
```

## 🎯 Features Implementation

### Background Removal
```typescript
import { removeBackground } from "@imgly/background-removal";

const setupImage = async (imageUrl: string) => {
  try {
    const imageBlob = await removeBackground(imageUrl);
    const url = URL.createObjectURL(imageBlob);
    setRemovedBgImageUrl(url);
  } catch (error) {
    console.error(error);
  }
};
```

### Text Customization
```typescript
const [textSets, setTextSets] = useState<Array<any>>([]);

const addNewTextSet = () => {
  const newTextSet = {
    id: Date.now(),
    text: "Your Text Here",
    font: "Arial",
    size: 24,
    color: "#000000",
    x: 100,
    y: 100,
  };
  setTextSets([...textSets, newTextSet]);
};
```

### Image Export
```typescript
const saveCompositeImage = () => {
  const canvas = canvasRef.current;
  if (canvas) {
    const link = document.createElement('a');
    link.download = 'text-behind-image.png';
    link.href = canvas.toDataURL();
    link.click();
  }
};
```

## 🧪 Testing

### Local Testing
```bash
# Run development server
npm run dev

# Test image upload
# Test background removal
# Test text placement
# Test export functionality
```

### Build Testing
```bash
# Test production build
npm run build

# Check for build errors
# Verify static files are generated
```

## 🔍 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check environment variables are set
   - Verify all dependencies are installed
   - Check TypeScript errors

2. **Background Removal Not Working**
   - Ensure @imgly/background-removal is installed
   - Check image format (JPEG, PNG supported)
   - Verify image size (not too large)

3. **Deployment Issues**
   - Check Netlify build logs
   - Verify build command and publish directory
   - Ensure environment variables are set in Netlify

4. **Authentication Issues**
   - Verify Supabase credentials
   - Check database schema
   - Ensure RLS policies are correct

### Performance Optimization

1. **Image Optimization**
   - Compress images before upload
   - Use appropriate formats
   - Implement lazy loading

2. **Bundle Size**
   - Use dynamic imports for heavy components
   - Optimize dependencies
   - Enable tree shaking

## 📈 Analytics and Monitoring

### Google Analytics
```typescript
// Add to _app.tsx or layout.tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

### Error Monitoring
```typescript
// Add error boundary
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

## 🚀 Production Checklist

- [ ] Environment variables configured
- [ ] Database schema created (if using Supabase)
- [ ] Payment system configured (if using Stripe)
- [ ] Custom domain configured
- [ ] SSL certificate enabled
- [ ] Analytics tracking set up
- [ ] Error monitoring configured
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Social media previews configured

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the error logs
3. Search existing issues
4. Create a new issue with detailed information

---

**Happy coding! 🎉**

Your text-behind-image tool is now ready for production use!