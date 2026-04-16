import type { Service, NavLink, SiteConfig } from '@/types';

export const SITE_CONFIG: SiteConfig = {
  name: 'WebLab',
  tagline: 'We Build Systems That Bring In Business While You Sleep',
  description:
    'Sydney-based software agency building high-converting websites, CRM automation, and lead capture systems for local service businesses.',
  url: 'https://weblab.com.au',
  location: 'Sydney, NSW, Australia',
  abn: 'XX XXX XXX XXX',
  email: 'hello@weblab.com.au',
  phone: '+61 4XX XXX XXX',
  socials: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
  },
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'website-design',
    icon: '🖥️',
    headline: 'High-Converting Websites',
    description:
      'Custom-built websites engineered to turn visitors into booked clients. Fast, mobile-first, and designed specifically for local service businesses in Sydney.',
    outcome: 'More booked jobs from web traffic',
    keywords: ['website design Sydney', 'tradie website', 'local business website'],
  },
  {
    id: 'crm-automation',
    icon: '⚡',
    headline: 'CRM & Lead Automation',
    description:
      'Never lose a lead again. We set up automated follow-up sequences, CRM pipelines, and lead nurturing flows so you can focus on the work, not chasing enquiries.',
    outcome: 'Zero leads fall through the cracks',
    keywords: ['CRM for tradies', 'automated follow-up Sydney', 'lead automation'],
  },
  {
    id: 'missed-call-textback',
    icon: '📱',
    headline: 'Missed Call Text-Back',
    description:
      'When you miss a call on a job, our system automatically texts back within seconds — keeping the lead warm until you can respond. Never lose work because you were busy.',
    outcome: 'Capture jobs even when you\'re on-site',
    keywords: ['missed call text back Sydney', 'auto reply SMS', 'call handling'],
  },
  {
    id: 'google-reviews',
    icon: '⭐',
    headline: 'Google Review Automation',
    description:
      'Automatically request 5-star Google reviews from happy customers after every completed job. Build your reputation on autopilot and dominate local search.',
    outcome: 'More 5-star reviews, less effort',
    keywords: ['Google reviews automation', 'review management Sydney', 'local SEO'],
  },
  {
    id: 'ai-chatbot',
    icon: '🤖',
    headline: 'AI Chatbot & Live Chat',
    description:
      'A 24/7 AI assistant on your website that answers questions, qualifies leads, and books appointments — even at 2am on a Sunday when you\'re asleep.',
    outcome: '24/7 lead capture without you',
    keywords: ['AI chatbot for tradies', 'website chatbot Sydney', 'lead capture bot'],
  },
  {
    id: 'seo-local',
    icon: '📍',
    headline: 'Local SEO & Google Business',
    description:
      'Get found when locals search for your trade. We optimise your Google Business Profile, build local citations, and improve rankings for high-intent keywords in your area.',
    outcome: 'Rank #1 for "[trade] near me"',
    keywords: ['local SEO Sydney', 'Google Business optimisation', 'tradie SEO'],
  },
];

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call';

export const INDUSTRIES = [
  'Plumbers',
  'Electricians',
  'HVAC Techs',
  'Builders',
  'Consultants',
  'Landscapers',
  'Painters',
  'Tilers',
  'Roofers',
  'Pool Cleaners',
  'Pest Control',
  'Locksmiths',
];
