// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    // Or old way (still works in Next 15):
    // domains: ['source.unsplash.com'],
  },
}

module.exports = nextConfig
