import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/legal-docs/api/documents/\\[id\\]/pdf": ["./public/fonts/**/*"],
  },
  transpilePackages: ['html5-qrcode'],
};

export default nextConfig;
