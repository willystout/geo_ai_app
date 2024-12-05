import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
