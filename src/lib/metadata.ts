import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

interface MetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  keywords = [],
  path = '',
  noIndex = false,
}: MetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      'WebLab Sydney',
      'software agency Sydney',
      'digital agency tradies',
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name}, ${SITE_CONFIG.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${SITE_CONFIG.url}/og-image.png`],
    },
  };
}
