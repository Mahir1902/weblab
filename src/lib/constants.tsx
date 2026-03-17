import type { Service, NavLink, SiteConfig } from '@/types';
import { Globe, Zap, PhoneCall, Star, Bot, Search } from 'lucide-react';

export const SITE_CONFIG: SiteConfig = {
  name: 'WebLab',
  tagline: 'We Build Systems That Bring In Business While You Sleep',
  description:
    'Sydney-based software agency building smart websites, CRM automation, and lead capture systems for local service businesses.',
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
    icon: <Globe className="w-6 h-6" />,
    headline: 'Smart Websites',
    description:
      'Custom-built smart websites powered by AI chatbots, lead capture tools, automated follow-up, fast loading speeds, SEO optimisation, and full mobile responsiveness, engineered to turn visitors into booked clients.',
    outcome: 'More booked jobs from web traffic',
    keywords: ['website design Sydney', 'tradie website', 'local business website'],
  },
  {
    id: 'crm-automation',
    icon: <Zap className="w-6 h-6" />,
    headline: 'CRM & Lead Automation',
    description:
      'Never lose a lead again. We set up automated follow-up sequences, CRM pipelines, and lead nurturing flows so you can focus on the work, not chasing enquiries.',
    outcome: 'Zero leads fall through the cracks',
    keywords: ['CRM for tradies', 'automated follow-up Sydney', 'lead automation'],
  },
  {
    id: 'missed-call-textback',
    icon: <PhoneCall className="w-6 h-6" />,
    headline: 'Missed Call Text-Back',
    description:
      'When you miss a call on a job, our system automatically texts back within seconds, keeping the lead warm until you can respond. Never lose work because you were busy.',
    outcome: "Capture jobs even when you're on-site",
    keywords: ['missed call text back Sydney', 'auto reply SMS', 'call handling'],
  },
  {
    id: 'google-reviews',
    icon: <Star className="w-6 h-6" />,
    headline: 'Google Review Automation',
    description:
      'Automatically request 5-star Google reviews from happy customers after every completed job. Build your reputation on autopilot and dominate local search.',
    outcome: 'More 5-star reviews, less effort',
    keywords: ['Google reviews automation', 'review management Sydney', 'local SEO'],
  },
  {
    id: 'ai-chatbot',
    icon: <Bot className="w-6 h-6" />,
    headline: 'AI Chatbot & Live Chat',
    description:
      "A 24/7 AI assistant on your website that answers questions, qualifies leads, and books appointments, even at 2am on a Sunday when you're asleep.",
    outcome: '24/7 lead capture without you',
    keywords: ['AI chatbot for tradies', 'website chatbot Sydney', 'lead capture bot'],
  },
  {
    id: 'seo-local',
    icon: <Search className="w-6 h-6" />,
    headline: 'Local SEO & Google Business',
    description:
      'Get found when locals search for your trade. We optimise your Google Business Profile, build local citations, and improve rankings for high-intent keywords in your area.',
    outcome: 'Rank Higher for "[trade] near me"',
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
