/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
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
  redirects: async () => []
};

module.exports = withMDX(withPWA(nextConfig));
