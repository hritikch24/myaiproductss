import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kraftai.in";

  return [
    // Homepage — highest priority
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // Core service pages — these drive leads
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/services/websites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/ai-solutions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/mobile-apps`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/stores`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/services/business-apps`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/services/design`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },

    // Enterprise
    { url: `${baseUrl}/enterprise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Products (lower priority — not core revenue)
    { url: `${baseUrl}/padhai`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/legal-docs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
