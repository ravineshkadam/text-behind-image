# Text Behind Image Tool

A powerful web application that allows users to create stunning text-behind-image designs using AI-powered background removal.

## Live Demo

- https://textbehindimage.rexanwong.xyz
- https://textbehindimage.app
- https://thetextbehindimage.com

## Features

- 🎨 **AI Background Removal** - Automatically remove backgrounds from images
- 📝 **Text Placement** - Place text behind objects with precision
- 🎯 **Customizable Styling** - Font, color, size, and position controls
- 💾 **Export Functionality** - Download your creations as images
- 🌙 **Dark/Light Mode** - Beautiful UI with theme switching
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔐 **User Authentication** - Save and manage your projects

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: @imgly/background-removal
- **UI Components**: Radix UI, Lucide React
- **Authentication**: Supabase
- **Deployment**: Netlify

## Quick Start

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
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for easy deployment on Netlify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/text-behind-image)

## Usage

1. **Upload Image**: Click "Upload Image" to select a photo
2. **Remove Background**: The AI will automatically remove the background
3. **Add Text**: Use the text customizer to add and style text
4. **Position**: Drag text elements to place them behind objects
5. **Download**: Save your creation as an image

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

**Note**: Recently, some copycats with the EXACT SAME landing page and design have been created. Please be aware of these sites.

Thank you all! No audience, no show :)
