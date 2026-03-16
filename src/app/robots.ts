import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/legal-docs/dashboard/", "/padhai/dashboard/"],
    },
    sitemap: "https://kraftai.in/sitemap.xml",
    host: "https://kraftai.in",
  };
}
