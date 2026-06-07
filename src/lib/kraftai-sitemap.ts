import { MetadataRoute } from 'next';
import { getNicheBySlug } from './kraftai-niches';

export function generateNicheSitemap(slug: string): MetadataRoute.Sitemap {
  const niche = getNicheBySlug(slug);
  if (!niche) return [];

  const baseUrl = `https://${slug}.kraftai.in`;
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  niche.blogPosts.forEach((post) => {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  if (niche.cities) {
    niche.cities.forEach((city) => {
      urls.push({
        url: `${baseUrl}/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  }

  return urls;
}

export function generateNicheRobots(slug: string): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/kraftai-metrics'],
      },
    ],
    sitemap: `https://${slug}.kraftai.in/sitemap.xml`,
    host: `https://${slug}.kraftai.in`,
  };
}
