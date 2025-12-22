import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: {
      cacheComponents: true,
    },
  },
};

export default nextConfig;
