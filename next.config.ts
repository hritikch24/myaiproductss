import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/pay/:path*", headers: [
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
    ] }];
  },
  outputFileTracingIncludes: {
    "/legal-docs/api/documents/\\[id\\]/pdf": ["./public/fonts/**/*"],
  },
  transpilePackages: ['html5-qrcode'],
};

export default nextConfig;
