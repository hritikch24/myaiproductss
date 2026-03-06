import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/legal-docs/api/documents/\\[id\\]/pdf": ["./public/fonts/**/*"],
  },
};

export default nextConfig;
