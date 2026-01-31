import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Static HTML export for nginx deployment
  reactStrictMode: false,
  images: {
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
