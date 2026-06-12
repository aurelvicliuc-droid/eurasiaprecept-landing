import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.shop.eurasiaprecept.org',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
      },
    ],
  },
}

export default nextConfig
