/** @type {import('next').NextConfig} */
const nextConfig = {
   devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: 'bottom-right',
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: false,
  output: "standalone",
  httpAgentOptions: {
    keepAlive: true,
  },
  images: {
    minimumCacheTTL: 36000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/**',
      },
    
    ],
  },
  experimental: {
    optimizeFonts: true,
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
  },
};

module.exports = nextConfig;
