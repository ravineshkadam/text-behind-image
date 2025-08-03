/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.unsplash.com',
            },
            {
              protocol: 'https',
              hostname: 'lxlfwrdbdhafahrrgtzk.supabase.co',
            },
          ],
    },

    async headers() {
      return [
        {
          source: "/app/:path*", 
          headers: [
            { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
            { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          ],
        },
      ];
    },

    // Skip static generation for pages that need runtime environment variables
    generateBuildId: async () => {
      return 'text-behind-image-' + Date.now()
    }
};

export default nextConfig;
