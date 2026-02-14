import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://localhost:3000", "http://192.168.0.224:3000"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
