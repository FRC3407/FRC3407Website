/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  scope: '/'
})

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  redirects: async () => [],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.firstinspires.org',
        pathname: '**',
      },
    ],
  }
};

module.exports = withMDX(withPWA(nextConfig));
