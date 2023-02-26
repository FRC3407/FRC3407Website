/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  scope: "/",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextSafe = require("next-safe");
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  redirects: async () => [],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.firstinspires.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "authjs.dev",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: nextSafe({
          isDev,
          contentSecurityPolicy: {
            "style-src":
              "'self' fonts.googleapis.com fonts.gstatic.com 'unsafe-inline'",
            "connect-src":
              "'self' fonts.googleapis.com lh3.googleusercontent.com fonts.gstatic.com www.firstinspires.org www.googleapis.com authjs.dev",
            "img-src":
              "'self' www.firstinspires.org lh3.googleusercontent.com avatars.githubusercontent.com authjs.dev",
            "font-src": "'self' fonts.googleapis.com fonts.gstatic.com data:",
            "frame-src": "www.youtube.com",
          },
        }),
      },
    ];
  },
};

module.exports = withMDX(withPWA(nextConfig));
