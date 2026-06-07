/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  allowedDevOrigins: ['172.20.10.4', '192.168.1.58'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
};

export default nextConfig;
