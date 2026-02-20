import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  // Static export requires unoptimized images for GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
