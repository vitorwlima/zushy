import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow importing code from outside the Next.js project dir (e.g. ../game)
    externalDir: true,
  },
};

export default nextConfig;
