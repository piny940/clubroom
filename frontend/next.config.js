/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development' })
}

process.env.BACKEND_HOST ||=
  'http://clubroom-backend.default.svc.cluster.local:3000'

console.log('backend host: ', process.env.BACKEND_HOST)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  async rewrites() {
    console.log('rewrite to', process.env.BACKEND_HOST)
    return [
      {
        source: '/api/:path*',
        destination: `http://clubroom-backend.default.svc.cluster.local:3000/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
