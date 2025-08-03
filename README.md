# Text Behind Image Tool

A sophisticated web application that allows users to create stunning text-behind-image designs with AI-powered background removal.

## Features

- **AI Background Removal**: Automatically remove backgrounds from uploaded images using @imgly/background-removal
- **Text Customization**: Full control over text styling including:
  - Font family, size, weight, and color
  - Text positioning and rotation
  - Letter spacing and opacity
  - Shadow effects and 3D tilt
- **Real-time Preview**: See changes instantly on the canvas
- **Export Functionality**: Download your designs as high-quality images
- **User Authentication**: Secure user accounts with Supabase
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI primitives
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Image Processing**: @imgly/background-removal
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd text-behind-image
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

### Automatic Deployment

1. **Connect to Netlify**:
   - Fork this repository to your GitHub account
   - Go to [Netlify](https://netlify.com) and sign up/log in
   - Click "New site from Git" and select your repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - The included `netlify.toml` file will handle the rest

3. **Environment Variables**:
   - In Netlify dashboard, go to Site Settings > Environment Variables
   - Add your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Click "Deploy site" and wait for the build to complete
   - Your site will be available at `https://your-site-name.netlify.app`

### Manual Deployment

1. Build the project locally:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Deploy to Netlify:
```bash
netlify deploy --prod --dir=.next
```

## Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up the `profiles` table with the following schema:
```sql
create table profiles (
  id uuid references auth.users on delete cascade,
  images_generated integer default 0,
  paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);
```

3. Enable Row Level Security (RLS) and create appropriate policies

### Font Configuration

The application supports custom fonts loaded via CSS. Add your fonts to the `app/fonts.css` file.

## Usage

1. **Upload Image**: Click "Upload Image" and select your image file
2. **Background Removal**: The AI will automatically remove the background
3. **Add Text**: Click "Add New Text Set" to create text layers
4. **Customize**: Use the controls to style your text:
   - Adjust position by dragging or using position controls
   - Change font, size, color, and other properties
   - Add shadows and 3D effects
5. **Download**: Click "Download" to save your design

## Browser Compatibility

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14.1+
- Edge 88+

## Performance Considerations

- The background removal process requires WebAssembly support
- Large images (>5MB) may take longer to process
- Consider image compression for better performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Links

- Live Demo: https://textbehindimage.rexanwong.xyz
- Alternative URLs: 
  - https://textbehindimage.app
  - https://thetextbehindimage.com

## Credits

Created by [Rexan Wong](https://www.rexanwong.xyz)

---

⚠️ **Note**: Recently, some copycats with the EXACT SAME landing page and design have been created. Please be aware of these sites and use the official links listed above.

Thank you for using Text Behind Image! 🎨
