import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/legal-docs/dashboard/documents", "/api/", "/legal-docs/api/"],
    },
    sitemap: "https://kraftai.in/sitemap.xml",
  };
}
