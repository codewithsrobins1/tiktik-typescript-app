/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.wikia.nocookie.net', 'lh3.googleusercontent.com']
  }
};

module.exports = nextConfig;
