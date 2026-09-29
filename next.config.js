/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // The blog was removed; old links land on the home page instead of a 404.
  async redirects() {
    return [
      { source: '/blogs', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
    ];
  },
}

module.exports = nextConfig
