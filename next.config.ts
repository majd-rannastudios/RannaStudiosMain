import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/about#studios",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
