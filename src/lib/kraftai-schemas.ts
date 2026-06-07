// Shared JSON-LD schema generators for all KraftAI niche subdomains
// Generates Google-compliant structured data for SEO and GEO

import type { NicheConfig, CityConfig } from './kraftai-niches';

const KRAFTAI_SOCIAL = [
  'https://twitter.com/kraftai',
  'https://www.linkedin.com/company/kraftai',
  'https://github.com/kraftai',
];

/** Organization schema — goes in every layout */
export function organizationSchema(niche: NicheConfig) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'KraftAI',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${baseUrl}/#logo`,
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512,
      caption: 'KraftAI',
    },
    image: { '@id': `${baseUrl}/#logo` },
    description: niche.metaDescription,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@kraftai.in',
      contactType: 'sales',
      availableLanguage: ['English'],
      areaServed: 'US',
    },
    sameAs: KRAFTAI_SOCIAL,
    ...(niche.cities
      ? {
          areaServed: niche.cities.map((city) => ({
            '@type': 'City',
            name: `${city.name}, ${city.state}`,
          })),
        }
      : { areaServed: { '@type': 'Country', name: 'United States' } }),
  };
}

/** WebSite schema — goes in every layout for AI crawlers */
export function webSiteSchema(niche: NicheConfig) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: `KraftAI ${niche.name}`,
    description: niche.metaDescription,
    publisher: { '@id': `${baseUrl}/#organization` },
    inLanguage: 'en-US',
  };
}

/** Service schema — goes on landing pages */
export function serviceSchema(niche: NicheConfig) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${baseUrl}/#service`,
    name: `AI Automation for ${niche.name}`,
    provider: { '@id': `${baseUrl}/#organization` },
    description: niche.metaDescription,
    serviceType: 'AI Business Automation',
    areaServed: niche.cities
      ? niche.cities.map((city) => ({
          '@type': 'City',
          name: `${city.name}, ${city.state}`,
        }))
      : { '@type': 'Country', name: 'United States' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '1500',
      highPrice: '4000',
      offerCount: '3',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${niche.name} AI Automation Plans`,
      itemListElement: niche.useCases.map((uc, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: uc.title,
          description: uc.description,
        },
        position: i + 1,
      })),
    },
  };
}

/** FAQPage schema — goes on landing pages */
export function faqPageSchema(niche: NicheConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: niche.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** LocalBusiness schema — for city pages */
export function localBusinessSchema(
  niche: NicheConfig,
  city: CityConfig
) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/${city.slug}/#localbusiness`,
    name: `KraftAI - AI Automation for ${niche.name} in ${city.name}`,
    description: city.description,
    url: `${baseUrl}/${city.slug}`,
    telephone: '+1-888-KRAFT-AI',
    email: 'hello@kraftai.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', addressCountry: 'US' },
      geoRadius: '50 mi',
      name: city.serviceArea,
    },
    priceRange: '$1,500 - $4,000/month',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    parentOrganization: { '@id': `${baseUrl}/#organization` },
    sameAs: KRAFTAI_SOCIAL,
  };
}

/** Article schema — for blog posts */
export function articleSchema(
  niche: NicheConfig,
  post: {
    title: string;
    excerpt: string;
    content: string;
    slug: string;
    date: string;
    author: string;
    keywords: string[];
  }
) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://kraftai.in',
    },
    publisher: { '@id': `${baseUrl}/#organization` },
    datePublished: post.date,
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    wordCount: post.content.split(/\s+/).length,
    articleSection: `${niche.name} Automation`,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${baseUrl}/#website` },
    about: {
      '@type': 'Thing',
      name: `AI Automation for ${niche.name}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article .excerpt-callout'],
    },
  };
}

/** CollectionPage schema — for blog listing pages */
export function collectionPageSchema(
  niche: NicheConfig
) {
  const baseUrl = `https://${niche.subdomain}.kraftai.in`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/blog/#collection`,
    name: `${niche.name} AI Automation Blog | KraftAI`,
    description: `Expert guides, tips, and insights on AI automation for ${niche.name.toLowerCase()} businesses.`,
    url: `${baseUrl}/blog`,
    isPartOf: { '@id': `${baseUrl}/#website` },
    about: {
      '@type': 'Thing',
      name: `AI Automation for ${niche.name}`,
    },
    inLanguage: 'en-US',
  };
}
