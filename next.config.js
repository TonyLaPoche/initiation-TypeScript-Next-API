/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ["rickandmortyapi.com"],
    loader: "custom",
    path: "/",
    unoptimized: true,
  },
};

module.exports = nextConfig
