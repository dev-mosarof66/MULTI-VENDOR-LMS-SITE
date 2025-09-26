// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Or old way (still works in Next 15):
    // domains: ['source.unsplash.com'],
  },
}

module.exports = nextConfig
