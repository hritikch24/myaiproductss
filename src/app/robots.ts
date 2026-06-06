import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/legal-docs/dashboard/", "/padhai/dashboard/", "/kraftai-metrics", "/world-gym/", "/tokenshield/", "/dineready/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/services/", "/enterprise"],
        disallow: ["/api/", "/kraftai-metrics"],
      },
    ],
    sitemap: "https://kraftai.in/sitemap.xml",
    host: "https://kraftai.in",
  };
}
