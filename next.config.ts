import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/birthdays", destination: "/small-events", permanent: true },
      { source: "/corporate", destination: "/large-events", permanent: true },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(ttf|otf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
