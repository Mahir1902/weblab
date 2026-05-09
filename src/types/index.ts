import type { ReactNode } from 'react';

export interface Service {
  id: string;
  icon: ReactNode;
  headline: string;
  description: string;
  outcome: string;
  keywords: string[];
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServicePageData {
  longDescription: string;
  features: ServiceFeature[];
  faqs: { q: string; a: string }[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export type Feature = Service;

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  location: string;
  abn: string;
  email: string;
  phone: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}
