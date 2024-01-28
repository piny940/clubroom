/** @type {import('next').NextConfig} */

process.env.BACKEND_HOST ||=
  'http://clubroom-backend.default.svc.cluster.local:3000'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_HOST}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
