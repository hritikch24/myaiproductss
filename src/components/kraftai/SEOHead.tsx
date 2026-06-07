import type { Metadata } from 'next';

interface NicheMetadataParams {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  subdomain: string;
  schemaMarkup?: object[];
  noIndex?: boolean;
}

export function generateNicheMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  subdomain,
  noIndex = false,
}: NicheMetadataParams): Metadata {
  const defaultOgImage = ogImage || `https://${subdomain}.kraftai.in/og-image.png`;
  const baseUrl = `https://${subdomain}.kraftai.in`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'KraftAI', url: 'https://kraftai.in' }],
    creator: 'KraftAI',
    publisher: 'KraftAI',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'KraftAI',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultOgImage],
      creator: '@kraftai',
      site: '@kraftai',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
          },
        },
    other: {
      'geo.region': 'US',
      'geo.placename': 'United States',
      'content-language': 'en-US',
      'rating': 'general',
    },
  };
}
