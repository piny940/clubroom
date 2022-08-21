/** @type {import('next').NextConfig} */

const BACKEND =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://clubroom-backend.herokuapp.com'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
