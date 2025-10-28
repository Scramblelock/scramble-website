const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for better compression
    unoptimized: false,
    loader: 'default',
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizePackageImports: ['styled-components'],
  },
  // Performance optimizations
  swcMinify: true,
  // Redirects for old WordPress paths
  async redirects() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/wp-json/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/xmlrpc.php',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/comments/feed/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/author/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/page/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/news/:path*',
        destination: '/404',
        permanent: true,
      },
      {
        source: '/gallery/:path*',
        destination: '/media/photos',
        permanent: true,
      },
      {
        source: '/portfolio/:path*',
        destination: '/media/photos',
        permanent: true,
      },
      {
        source: '/videos/:path*',
        destination: '/media/videos',
        permanent: true,
      },
      {
        source: '/about-me/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/home/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
