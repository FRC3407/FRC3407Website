/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
};

module.exports = withPWA(nextConfig);
