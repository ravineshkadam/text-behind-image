/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
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
};

export default nextConfig;
