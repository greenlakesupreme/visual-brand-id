// next.config.js
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // run `next build && firebase deploy` without needing `next export`
  output: "export",

  // opt into React’s strict mode checks
  reactStrictMode: true,

  // your existing webpack tweak
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = nextConfig;
