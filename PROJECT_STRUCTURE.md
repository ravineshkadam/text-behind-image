# Text Behind Image Tool - Complete Project Structure

## 📁 Project Overview

This is a full-stack Next.js application that creates text-behind-image designs using AI-powered background removal. The tool allows users to upload images, automatically remove backgrounds, and place text behind objects with customizable styling.

## 🏗️ Architecture

```
text-behind-image/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── cancel-subscription/     # Stripe subscription management
│   │   ├── create-checkout-session/ # Stripe checkout
│   │   └── webhook/                 # Stripe webhooks
│   ├── 📁 app/                      # Main application pages
│   │   └── page.tsx                 # Editor interface
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Landing page
├── 📁 components/                   # React components
│   ├── 📁 editor/                   # Editor-specific components
│   │   ├── app-ads.tsx             # Advertisement components
│   │   ├── color-picker.tsx        # Color selection
│   │   ├── font-picker.tsx         # Font selection
│   │   ├── input-field.tsx         # Input components
│   │   ├── slider-field.tsx        # Slider controls
│   │   └── text-customizer.tsx     # Main text editor
│   ├── 📁 ui/                       # Reusable UI components
│   │   ├── accordion.tsx           # Collapsible sections
│   │   ├── alert-dialog.tsx        # Confirmation dialogs
│   │   ├── avatar.tsx              # User avatars
│   │   ├── button.tsx              # Button components
│   │   ├── card.tsx                # Card layouts
│   │   ├── dialog.tsx              # Modal dialogs
│   │   ├── dropdown-menu.tsx       # Dropdown menus
│   │   ├── input.tsx               # Input fields
│   │   ├── label.tsx               # Form labels
│   │   ├── popover.tsx             # Popover components
│   │   ├── scroll-area.tsx         # Scrollable areas
│   │   ├── separator.tsx           # Visual separators
│   │   ├── slider.tsx              # Range sliders
│   │   ├── switch.tsx              # Toggle switches
│   │   ├── tabs.tsx                # Tab navigation
│   │   └── toast.tsx               # Notification toasts
│   ├── additional-info.tsx         # Information sections
│   ├── authenticate.tsx            # Authentication UI
│   ├── hero-images.tsx             # Hero section images
│   ├── mode-toggle.tsx             # Theme toggle
│   ├── pay-dialog.tsx              # Payment dialog
│   └── theme-provider.tsx          # Theme context
├── 📁 constants/                    # Application constants
│   ├── colors.ts                   # Color definitions
│   └── fonts.ts                    # Font configurations
├── 📁 hooks/                        # Custom React hooks
│   ├── use-toast.ts                # Toast notifications
│   └── useUser.tsx                 # User management
├── 📁 lib/                          # Utility libraries
│   ├── stripe.ts                   # Stripe configuration
│   └── utils.ts                    # Helper functions
├── 📁 providers/                    # Context providers
│   ├── SupabaseProvider.tsx        # Supabase client
│   └── UserProvider.tsx            # User context
├── 📁 ads/                          # Advertisement components
│   ├── firecrawl.tsx               # Firecrawl ads
│   ├── pallyy.tsx                  # Pallyy ads
│   ├── pimpmysnap.tsx              # PimpMySnap ads
│   └── randomcolor.tsx             # RandomColor ads
├── 📄 Configuration Files
│   ├── package.json                # Dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── next.config.mjs             # Next.js configuration
│   ├── netlify.toml                # Netlify deployment config
│   └── components.json             # UI component configuration
├── 📄 Type Definitions
│   ├── types.ts                    # Main type definitions
│   └── types_db.ts                 # Database types
├── 📄 Documentation
│   ├── README.md                   # Project overview
│   ├── DEPLOYMENT.md               # Deployment guide
│   └── PROJECT_STRUCTURE.md        # This file
├── 📄 Deployment
│   ├── deploy.sh                   # Deployment script
│   └── .env.example                # Environment variables template
└── 📄 Styling
    ├── app/globals.css             # Global styles
    └── app/fonts.css               # Font imports
```

## 🚀 Key Features

### Core Functionality
- **AI Background Removal**: Uses @imgly/background-removal for automatic background removal
- **Text Placement**: Drag-and-drop text positioning behind objects
- **Customizable Styling**: Font, color, size, and position controls
- **Image Export**: Download creations as high-quality images

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Beautiful theme switching
- **Real-time Preview**: Live updates as you edit
- **User Authentication**: Save and manage projects

### Technical Features
- **TypeScript**: Full type safety
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Supabase**: Backend as a service
- **Stripe**: Payment processing

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.8**: React framework
- **React 18**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS 3.4.1**: Styling
- **Framer Motion 11.7.0**: Animations

### UI Components
- **Radix UI**: Accessible components
- **Lucide React**: Icons
- **React Color**: Color picker
- **React Switch**: Toggle components

### Backend & Services
- **Supabase**: Database and authentication
- **Stripe**: Payment processing
- **@imgly/background-removal**: AI background removal

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Netlify**: Deployment platform

## 📦 Dependencies

### Core Dependencies
```json
{
  "@imgly/background-removal": "^1.5.5",
  "@supabase/auth-helpers-nextjs": "^0.10.0",
  "@supabase/auth-helpers-react": "^0.5.0",
  "next": "14.2.8",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5"
}
```

### UI Dependencies
```json
{
  "@radix-ui/react-*": "^1.x.x",
  "framer-motion": "^11.7.0",
  "lucide-react": "^0.439.0",
  "react-color": "^2.19.3",
  "tailwindcss": "^3.4.1"
}
```

## 🚀 Deployment

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: 18
- **Static Export**: Enabled for optimal performance

### Environment Variables
```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 📱 Usage Flow

1. **Landing Page**: Users see the main marketing page
2. **Authentication**: Optional user sign-up/login
3. **Image Upload**: Drag or select an image
4. **Background Removal**: AI automatically removes background
5. **Text Editing**: Add and customize text elements
6. **Positioning**: Drag text behind objects
7. **Export**: Download the final image

## 🔧 Development

### Local Setup
```bash
# Clone repository
git clone <repository-url>
cd text-behind-image

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

### Build & Deploy
```bash
# Build for production
npm run build

# Deploy to Netlify
./deploy.sh
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

---

**Note**: This is a production-ready text-behind-image tool with over 400,000 designs created. The application is actively maintained and deployed on multiple domains.