/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fakestoreapi.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

module.exports = nextConfig;
