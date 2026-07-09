import { MetadataRoute } from 'next';
import { getNicheBySlug } from './kraftai-niches';
import { getProblemsByNiche } from './kraftai-seo-problems';

export function generateNicheSitemap(slug: string): MetadataRoute.Sitemap {
  const niche = getNicheBySlug(slug);
  if (!niche) return [];

  const baseUrl = `https://${slug}.kraftai.in`;
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/problems`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Problem/solution pages — high priority for SEO
  getProblemsByNiche(slug).forEach((problem) => {
    urls.push({
      url: `${baseUrl}/problems/${problem.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

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
      // Explicitly allow AI crawlers for GEO optimization
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Anthropic-AI', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `https://${slug}.kraftai.in/sitemap.xml`,
    host: `https://${slug}.kraftai.in`,
  };
}
