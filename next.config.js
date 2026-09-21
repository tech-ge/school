/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },
};

module.exports = nextConfig;