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
}

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
