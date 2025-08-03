#!/bin/bash

# Text Behind Image - Setup Script
# This script helps you set up the project for local development

echo "🎨 Text Behind Image - Setup Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Setting up environment variables..."
    
    # Copy example file
    cp .env.example .env.local
    
    echo "📝 Environment file created at .env.local"
    echo "⚠️  Please edit .env.local and add your Supabase credentials:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "   Get these from: https://supabase.com/dashboard > Your Project > Settings > API"
    echo ""
else
    echo "✅ Environment file already exists"
fi

# Test build
echo "🔨 Testing build..."
cp .env.build .env.test
npm run build > /dev/null 2>&1
rm .env.test

if [ $? -eq 0 ]; then
    echo "✅ Build test successful"
else
    echo "⚠️  Build test failed (this is normal if environment variables aren't set)"
fi

echo ""
echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT.md"
echo "📖 For more information, see README.md"
echo ""
echo "Happy coding! 🎉"