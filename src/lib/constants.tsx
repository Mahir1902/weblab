import type { Service, NavLink, SiteConfig, ServicePageData, Feature } from '@/types';
import { Globe, Zap, PhoneCall, Star, Bot, Search, CalendarCheck, Inbox, Kanban, Smartphone, Receipt } from 'lucide-react';

export const SITE_CONFIG: SiteConfig = {
  name: 'WebLab',
  tagline: 'We Build Systems That Bring In Business While You Sleep',
  description:
    'Sydney-based software agency building smart websites, CRM automation, and lead capture systems for local service businesses.',
  url: 'https://webl4b.com',
  location: 'Sydney, NSW, Australia',
  abn: '49 830 374 904',
  email: 'solutions.webl4b@gmail.com',
  phone: '+61 468 094 066',
  socials: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
  },
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Smart Websites', href: '/services/website-design' },
      { label: 'CRM & Lead Automation', href: '/services/crm-automation' },
      { label: 'Missed Call Text-Back', href: '/services/missed-call-textback' },
      { label: 'Google Review Automation', href: '/services/google-reviews' },
      { label: 'AI Chatbot & Live Chat', href: '/services/ai-chatbot' },
      { label: 'Local SEO & Google Business', href: '/services/seo-local' },
    ],
  },
  {
    label: 'Features',
    href: '/features',
    children: [
      { label: 'Online Booking', href: '/features/online-booking' },
      { label: 'Unified Inbox', href: '/features/unified-inbox' },
      { label: 'Sales Pipeline', href: '/features/sales-pipeline' },
      { label: 'Mobile App', href: '/features/mobile-app' },
      { label: 'Invoicing & Payments', href: '/features/invoicing-payments' },
    ],
  },
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
    keywords: ['website design Sydney', 'service business website', 'local business website'],
  },
  {
    id: 'crm-automation',
    icon: <Zap className="w-6 h-6" />,
    headline: 'CRM & Lead Automation',
    description:
      'Never lose a lead again. We set up automated follow-up sequences, CRM pipelines, and lead nurturing flows so you can focus on the work, not chasing enquiries.',
    outcome: 'Zero leads fall through the cracks',
    keywords: ['CRM for service businesses', 'automated follow-up Sydney', 'lead automation'],
  },
  {
    id: 'missed-call-textback',
    icon: <PhoneCall className="w-6 h-6" />,
    headline: 'Missed Call Text-Back',
    description:
      'When you miss a call, our system automatically texts back within seconds, keeping the lead warm until you can respond. Never lose a lead because you were busy.',
    outcome: "Capture leads even when you're busy",
    keywords: ['missed call text back Sydney', 'auto reply SMS', 'call handling'],
  },
  {
    id: 'google-reviews',
    icon: <Star className="w-6 h-6" />,
    headline: 'Google Review Automation',
    description:
      'Automatically request 5-star Google reviews from happy customers after every appointment. Build your reputation on autopilot and dominate local search.',
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
    keywords: ['AI chatbot for service businesses', 'website chatbot Sydney', 'lead capture bot'],
  },
  {
    id: 'seo-local',
    icon: <Search className="w-6 h-6" />,
    headline: 'Local SEO & Google Business',
    description:
      'Get found when locals search for your services. We optimise your Google Business Profile, build local citations, and improve rankings for high-intent keywords in your area.',
    outcome: 'Rank higher for "your service near me"',
    keywords: ['local SEO Sydney', 'Google Business optimisation', 'service business SEO'],
  },
];

export const SERVICE_PAGE_DATA: Record<string, ServicePageData> = {
  'website-design': {
    longDescription:
      'Most business websites are glorified brochures — they look decent but do nothing to bring in work. Your website should be your hardest-working employee: capturing leads at 2am, following up automatically, and converting visitors into booked jobs without you lifting a finger.\n\nWe build smart websites specifically for local service businesses in Sydney. Every site comes with built-in AI chat, lead capture forms, automated follow-up, lightning-fast load speeds, and full SEO optimisation — all engineered to turn traffic into revenue.',
    features: [
      {
        title: 'Built to Convert, Not Just Look Pretty',
        description:
          'Every element is placed with purpose — clear calls to action, trust signals, and lead capture tools that turn casual visitors into paying clients.',
      },
      {
        title: 'Lightning-Fast & Mobile-First',
        description:
          'Over 70% of your customers search on their phone. Your site loads in under 2 seconds and looks flawless on every device.',
      },
      {
        title: 'SEO Baked In From Day One',
        description:
          'We optimise every page for local search so you rank for the keywords your customers are actually typing into Google.',
      },
      {
        title: 'AI Chat & Lead Capture Included',
        description:
          'A 24/7 chatbot answers questions and captures enquiries while you sleep — plus smart forms that feed directly into your CRM.',
      },
    ],
    faqs: [
      {
        q: 'How long does it take to build my website?',
        a: 'Most projects go live within 2-3 weeks from kickoff. We handle everything — design, development, content, and launch — so you can focus on your business.',
      },
      {
        q: 'Will I be able to update the website myself?',
        a: 'Absolutely. We build on platforms that are easy to manage, and we provide training. But most clients prefer our ongoing support plans so they never have to worry about it.',
      },
      {
        q: 'What if I already have a website?',
        a: "We can rebuild it from scratch or upgrade your existing site with our smart features. Either way, we'll make sure it's actually working to bring in business.",
      },
    ],
    ctaHeadline: 'Ready for a Website That Actually Works?',
    ctaSubtext:
      "Book a free strategy call and we'll show you exactly how a smart website can start bringing in more clients within weeks.",
  },
  'crm-automation': {
    longDescription:
      "You're getting leads — but how many are slipping through the cracks? If you're still managing enquiries in your head, a spreadsheet, or a pile of missed voicemails, you're leaving money on the table every single day.\n\nWe set up a complete CRM and automation system tailored to your business. Every lead gets captured, categorised, and followed up with automatically — so you never lose a job because you forgot to call someone back.",
    features: [
      {
        title: 'Automated Follow-Up Sequences',
        description:
          'The moment a lead comes in, your system sends a text, email, or both — instantly. No more chasing, no more forgotten callbacks.',
      },
      {
        title: 'Pipeline Management',
        description:
          'See every lead, every job, and every opportunity in one dashboard. Know exactly where every prospect sits and what needs attention.',
      },
      {
        title: 'Multi-Channel Inbox',
        description:
          'SMS, email, Facebook messages, website chat — all in one place. Reply from anywhere without switching between apps.',
      },
      {
        title: 'Smart Lead Nurturing',
        description:
          "Not every lead books straight away. Automated drip campaigns keep you top-of-mind until they're ready, without you doing a thing.",
      },
    ],
    faqs: [
      {
        q: 'What CRM platform do you use?',
        a: 'We build on GoHighLevel, a platform purpose-built for service businesses. It combines CRM, automation, messaging, and booking into one system — no need for 5 different tools.',
      },
      {
        q: 'Will this work with my existing tools?',
        a: 'Yes. We integrate with your calendar, email, phone system, and most other tools you already use. The goal is to simplify, not add more complexity.',
      },
      {
        q: 'How quickly will I see results?',
        a: "Most clients see a noticeable improvement in lead response time and conversion within the first 2 weeks. The system starts working the moment it's set up.",
      },
    ],
    ctaHeadline: 'Stop Losing Leads to Slow Follow-Up',
    ctaSubtext:
      "Book a free call and we'll map out an automation system that captures every lead and follows up instantly — so you can focus on the work.",
  },
  'missed-call-textback': {
    longDescription:
      "You're with a client, hands full, phone ringing. By the time you check, the customer has already called your competitor. Sound familiar? For service businesses, a missed call is a missed opportunity — and it happens dozens of times a week.\n\nOur missed call text-back system responds to every unanswered call within seconds with a personalised SMS. It keeps the lead warm, lets them know you'll call back, and even lets them book a time — all automatically.",
    features: [
      {
        title: 'Instant SMS Response',
        description:
          'Within seconds of a missed call, your customer gets a friendly text letting them know you saw their call and will get back to them.',
      },
      {
        title: 'Customisable Messages',
        description:
          "Tailor the text-back message to match your brand voice. Include your name, business hours, or a direct booking link — whatever works for your business.",
      },
      {
        title: 'Direct Booking Integration',
        description:
          'Include a link in the text that lets customers book a time that suits them. They pick a slot, it goes straight into your calendar.',
      },
      {
        title: 'Works With Your Existing Number',
        description:
          "No need to change your phone number. We set this up to work with the number your customers already know and trust.",
      },
    ],
    faqs: [
      {
        q: 'Does it work if I reject a call?',
        a: 'It triggers on any unanswered call — whether you miss it, reject it, or are simply on another call. Every missed call gets a response.',
      },
      {
        q: 'Can I customise the text message?',
        a: "Absolutely. You choose the wording, the tone, and what links to include. We'll help you craft a message that converts.",
      },
      {
        q: 'Will it text back spam or wrong numbers?',
        a: "The system is smart enough to filter known spam numbers. And if someone texts back saying they didn't call, we can handle that too.",
      },
    ],
    ctaHeadline: 'Never Lose a Job to a Missed Call Again',
    ctaSubtext:
      "Book a free call and we'll set up your missed call text-back system — most clients are live within 24 hours.",
  },
  'google-reviews': {
    longDescription:
      "When was the last time you hired someone without checking their reviews first? Your customers are no different. A strong Google review profile is your most powerful sales tool — it builds trust before a customer even picks up the phone.\n\nBut asking for reviews manually is awkward and easy to forget. Our system automates the entire process — sending a review request at the perfect moment after every completed appointment, so your 5-star reputation builds on autopilot.",
    features: [
      {
        title: 'Automated Review Requests',
        description:
          'After every appointment, your customer gets a friendly SMS or email with a direct link to leave a Google review. No awkward asking required.',
      },
      {
        title: 'Smart Timing',
        description:
          "Requests go out when the customer is happiest — right after a great experience. That's when you get the best reviews, not three weeks later.",
      },
      {
        title: 'Negative Feedback Filtering',
        description:
          'Unhappy customers are routed to a private feedback form first, giving you a chance to resolve the issue before it becomes a public review.',
      },
      {
        title: 'Reputation Dashboard',
        description:
          'Track your review count, average rating, and response rate in one place. See exactly how your online reputation is growing.',
      },
    ],
    faqs: [
      {
        q: "Is this against Google's terms of service?",
        a: "No. Google encourages businesses to ask customers for reviews. What's not allowed is incentivising reviews or filtering by sentiment before posting — we don't do either.",
      },
      {
        q: 'What if I get a negative review?',
        a: 'Our system routes potentially negative feedback to a private form first. If a negative review does go public, we help you craft a professional response that actually builds trust.',
      },
      {
        q: 'How many more reviews can I expect?',
        a: "Most clients see a 3-5x increase in monthly reviews within the first month. The key is consistency — every completed appointment triggers a request, so reviews accumulate steadily.",
      },
    ],
    ctaHeadline: 'Build a 5-Star Reputation on Autopilot',
    ctaSubtext:
      "Book a free call and we'll show you how automated review requests can transform your Google presence and bring in more work.",
  },
  'ai-chatbot': {
    longDescription:
      "Most website visitors leave without doing anything — not because they're not interested, but because they had a question and no one was there to answer it. At 9pm on a Tuesday, your competitors aren't answering either. But your AI chatbot is.\n\nOur AI chatbot sits on your website 24/7, answering common questions, qualifying leads, and booking appointments directly into your calendar. It's like having a receptionist who never sleeps, never takes a break, and never forgets to follow up.",
    features: [
      {
        title: 'Trained on Your Business',
        description:
          "The chatbot knows your services, pricing, service areas, and FAQs. It answers like someone who actually works for you — because it's trained on your real business info.",
      },
      {
        title: '24/7 Lead Qualification',
        description:
          "It asks the right questions to qualify leads before they reach you — service needed, location, budget, timeline. You only deal with serious enquiries.",
      },
      {
        title: 'Direct Calendar Booking',
        description:
          "Qualified leads can book a time with you right from the chat. No back-and-forth texts, no phone tag — they pick a slot and it's done.",
      },
      {
        title: 'Seamless CRM Integration',
        description:
          'Every conversation and lead is automatically logged in your CRM. No manual data entry, no leads lost in chat history.',
      },
    ],
    faqs: [
      {
        q: 'Will the chatbot sound robotic?',
        a: "Not at all. We train it on your brand voice and real customer conversations. Most visitors won't realise they're chatting with AI — and even if they do, they'll get their answer faster than waiting for a callback.",
      },
      {
        q: 'What happens if the chatbot can\'t answer a question?',
        a: "It gracefully hands off to you via SMS or email notification, so you can jump in when needed. The customer gets a message that a real person will follow up shortly.",
      },
      {
        q: 'Can I see what the chatbot is saying to customers?',
        a: 'Every conversation is logged and accessible in your dashboard. You can review chats, refine responses, and see exactly how leads are being handled.',
      },
    ],
    ctaHeadline: 'Capture Leads While You Sleep',
    ctaSubtext:
      "Book a free call and we'll show you how an AI chatbot can turn your website into a 24/7 lead generation machine.",
  },
  'seo-local': {
    longDescription:
      'When someone in your area searches "interior designer near me" or "dog groomer Sydney," do they find you — or your competitor? If you\'re not showing up in the top 3 Google Map results, you\'re invisible to the customers who are ready to book right now.\n\nWe handle everything that makes your business visible locally — Google Business Profile optimisation, local citations, keyword targeting, and content that ranks. No jargon, no vanity metrics — just more calls from customers in your area.',
    features: [
      {
        title: 'Google Business Profile Optimisation',
        description:
          "We fully optimise your GBP with the right categories, services, photos, and posts — so Google knows exactly what you do and where you do it.",
      },
      {
        title: 'Local Keyword Targeting',
        description:
          "We find the exact search terms your customers use — like 'best hair salon Parramatta' — and make sure your website ranks for them.",
      },
      {
        title: 'Citation Building & Cleanup',
        description:
          'We list your business on the directories that actually matter and fix any inconsistent information that could be hurting your rankings.',
      },
      {
        title: 'Monthly Reporting',
        description:
          "No guesswork. You get a clear monthly report showing your rankings, traffic, and calls — so you know exactly what you're getting for your investment.",
      },
    ],
    faqs: [
      {
        q: 'How long does SEO take to work?',
        a: "SEO is a long game, but you'll typically see meaningful improvements in local rankings within 2-3 months. Some quick wins — like GBP optimisation — can show results within weeks.",
      },
      {
        q: "Do I need a website for local SEO?",
        a: "A website helps significantly, but we can still improve your visibility through Google Business Profile optimisation and local citations alone. If you need a website, we build those too.",
      },
      {
        q: 'What areas do you cover?',
        a: "We work with service businesses across Greater Sydney and NSW. Whether you serve one suburb or the whole metro area, we tailor the strategy to your service region.",
      },
    ],
    ctaHeadline: 'Get Found by Customers in Your Area',
    ctaSubtext:
      "Book a free call and we'll audit your local search presence — we'll show you exactly where you stand and how to start ranking higher.",
  },
};

export const FEATURES: Feature[] = [
  {
    id: 'online-booking',
    icon: <CalendarCheck className="w-6 h-6" />,
    headline: 'Online Booking',
    description:
      'Let customers book appointments directly from your website, 24/7. Syncs with your calendar, sends automatic reminders, and eliminates the back-and-forth.',
    outcome: 'More bookings, zero phone tag',
    keywords: ['online booking system Sydney', 'appointment scheduling service businesses', 'automated booking'],
  },
  {
    id: 'unified-inbox',
    icon: <Inbox className="w-6 h-6" />,
    headline: 'Unified Inbox',
    description:
      'SMS, email, Facebook DMs, web chat, and Google messages — all in one feed. Reply to every customer from a single dashboard without switching apps.',
    outcome: 'Every message, one place',
    keywords: ['unified inbox CRM', 'business messaging platform', 'multi-channel inbox Sydney'],
  },
  {
    id: 'sales-pipeline',
    icon: <Kanban className="w-6 h-6" />,
    headline: 'Sales Pipeline',
    description:
      'A visual drag-and-drop board that tracks every lead from first enquiry to paid job. See your entire pipeline at a glance and never wonder where a lead stands.',
    outcome: 'Total visibility over every deal',
    keywords: ['sales pipeline CRM', 'lead tracking service businesses', 'deal management Sydney'],
  },
  {
    id: 'mobile-app',
    icon: <Smartphone className="w-6 h-6" />,
    headline: 'Mobile App',
    description:
      'Run your entire business from your phone. Get push notifications for new leads, reply to messages, manage your pipeline, and check reviews — all from the job site.',
    outcome: 'Your business in your pocket',
    keywords: ['CRM mobile app', 'business management app service businesses', 'mobile CRM Sydney'],
  },
  {
    id: 'invoicing-payments',
    icon: <Receipt className="w-6 h-6" />,
    headline: 'Invoicing & Payments',
    description:
      'Send professional invoices and collect payments directly through the platform. Track who has paid, automate payment reminders, and get paid faster.',
    outcome: 'Get paid faster, chase less',
    keywords: ['invoicing for service businesses', 'online payments service business', 'automated invoicing Sydney'],
  },
];

export const FEATURE_PAGE_DATA: Record<string, ServicePageData> = {
  'online-booking': {
    longDescription:
      "How many jobs have you lost because a customer couldn't get through, gave up, and called someone else? Every time a potential client has to wait for a callback to book, you risk losing them.\n\nWith online booking, your customers pick a time that works for them — directly from your website, 24/7. It syncs with your real calendar so there are no double-bookings, and both you and the customer get automatic confirmations and reminders. No more phone tag, no more missed opportunities.",
    features: [
      {
        title: '24/7 Self-Service Scheduling',
        description:
          'Customers book appointments any time of day or night — even when you\'re busy, asleep, or on holiday. Your calendar fills itself.',
      },
      {
        title: 'Calendar Sync',
        description:
          'Connects to Google Calendar, Outlook, or Apple Calendar. Availability updates in real time so customers only see open slots.',
      },
      {
        title: 'Automated Reminders',
        description:
          'SMS and email reminders go out automatically before every appointment. Reduce no-shows without lifting a finger.',
      },
      {
        title: 'Custom Booking Pages',
        description:
          'Branded booking pages that match your website. Add service types, durations, and buffer times between appointments.',
      },
    ],
    faqs: [
      {
        q: 'Can customers choose specific services when booking?',
        a: 'Yes. You define your service types, durations, and availability. Customers pick the service they need and see only the available slots for that service.',
      },
      {
        q: 'What if I need to reschedule or cancel?',
        a: 'You can reschedule or cancel from the dashboard or the mobile app. The customer gets an automatic notification with the updated details.',
      },
      {
        q: 'Does it work with my existing calendar?',
        a: 'Absolutely. It syncs with Google Calendar, Outlook, and Apple Calendar in real time — so your availability is always accurate.',
      },
    ],
    ctaHeadline: 'Fill Your Calendar on Autopilot',
    ctaSubtext:
      "Book a free call and we'll set up an online booking system that lets customers schedule with you 24/7 — no phone calls needed.",
  },
  'unified-inbox': {
    longDescription:
      "Your customers reach out everywhere — text messages, emails, Facebook DMs, web chat, Google Business messages. If you're checking five different apps to keep up, messages slip through the cracks. And a slow reply to a lead is almost as bad as no reply at all.\n\nThe unified inbox pulls every conversation into a single feed. One place to read, reply, and manage every customer interaction — whether it came in via SMS, email, social media, or your website chat. Your team can see the full conversation history for every contact, so no one ever asks \"did someone already respond to this?\"",
    features: [
      {
        title: 'Every Channel, One Feed',
        description:
          'SMS, email, Facebook Messenger, Instagram DMs, Google Business messages, and web chat — all in one scrollable inbox.',
      },
      {
        title: 'Full Conversation History',
        description:
          'See every interaction with a contact across all channels in one timeline. No more digging through email threads or message apps.',
      },
      {
        title: 'Team Collaboration',
        description:
          'Assign conversations to team members, leave internal notes, and see who responded last. Nothing falls through the cracks.',
      },
      {
        title: 'Reply From Anywhere',
        description:
          'Respond to any channel from the inbox — send a text reply to a Facebook message, or an email reply to a web chat. The customer gets it on their original channel.',
      },
    ],
    faqs: [
      {
        q: 'Which messaging channels are supported?',
        a: 'SMS, email, Facebook Messenger, Instagram DMs, Google Business messages, and your website live chat. We can add more channels as your business needs grow.',
      },
      {
        q: 'Can multiple team members use the inbox?',
        a: 'Yes. You can assign conversations, add internal notes, and see which team member last responded — so everyone stays on the same page.',
      },
      {
        q: 'Will customers know all their messages go to one place?',
        a: "No. From the customer's perspective, nothing changes. They message you on Facebook, they get a reply on Facebook. They text you, they get a text back. It's seamless.",
      },
    ],
    ctaHeadline: 'Stop Juggling Five Apps',
    ctaSubtext:
      "Book a free call and we'll show you how a unified inbox can simplify your customer communication and speed up your response time.",
  },
  'sales-pipeline': {
    longDescription:
      "If someone asked you right now how many active leads you have, could you answer? Most service business owners can't. Leads live in text threads, scribbled notes, email chains, and memory — and when things get busy, they disappear.\n\nA sales pipeline gives you a visual board where every lead is tracked from first enquiry to paid job. Drag leads between stages, see what needs follow-up, and know exactly how much potential revenue is sitting in your pipeline. It's the difference between hoping you follow up and knowing you did.",
    features: [
      {
        title: 'Visual Drag-and-Drop Board',
        description:
          'See every lead as a card on a board. Drag them between stages — New Lead, Contacted, Quote Sent, Job Booked, Completed. Simple, visual, instant clarity.',
      },
      {
        title: 'Automated Stage Triggers',
        description:
          'When a lead moves to a new stage, the system can automatically send a follow-up text, assign a task, or trigger a reminder. No manual steps needed.',
      },
      {
        title: 'Revenue Tracking',
        description:
          'Attach a dollar value to each lead. See your total pipeline value, track win rates, and know exactly where your revenue is coming from.',
      },
      {
        title: 'Custom Stages',
        description:
          'Build your pipeline stages around how your business actually works. Whether you quote on-site or over the phone, the pipeline adapts to your process.',
      },
    ],
    faqs: [
      {
        q: 'Is this like a spreadsheet?',
        a: "It's much better. Think of it as a visual board (like Trello) specifically built for tracking leads and jobs. Drag-and-drop, automated triggers, and revenue tracking — things a spreadsheet can't do.",
      },
      {
        q: 'Can I have multiple pipelines?',
        a: 'Yes. You can create separate pipelines for different services, locations, or team members. Each pipeline has its own stages and automations.',
      },
      {
        q: 'Does it connect to the rest of the system?',
        a: "Everything is connected. When a new lead comes in through your website, chatbot, or missed call text-back, it's automatically added to your pipeline. Move it to 'Quote Sent' and the system follows up for you.",
      },
    ],
    ctaHeadline: 'Track Every Lead to the Bank',
    ctaSubtext:
      "Book a free call and we'll set up a visual pipeline that shows you exactly where every lead stands — and automates the follow-up.",
  },
  'mobile-app': {
    longDescription:
      "You're not sitting at a desk all day — you're with clients, on the road, running your business. But your business doesn't stop just because you're away from a computer. Leads come in, customers message, reviews drop, and appointments need confirming.\n\nThe mobile app puts your entire CRM in your pocket. Get instant push notifications when a new lead comes in. Reply to messages from any channel. Check your pipeline, update progress, and monitor reviews — all from your phone. It's like having your office with you everywhere you go.",
    features: [
      {
        title: 'Instant Push Notifications',
        description:
          'New lead? New message? New review? You know about it within seconds — not hours. Respond while the lead is still warm.',
      },
      {
        title: 'Reply on the Go',
        description:
          'Respond to SMS, email, Facebook messages, and web chat right from the app. One tap to call back a lead. No switching between apps.',
      },
      {
        title: 'Pipeline at a Glance',
        description:
          'See your full sales pipeline on your phone. Drag leads between stages, add notes, and update progress while you\'re between appointments.',
      },
      {
        title: 'Works on iOS & Android',
        description:
          'Available on both platforms at no extra cost. Download it, log in, and your entire business is on your phone in under a minute.',
      },
    ],
    faqs: [
      {
        q: 'Is the app free?',
        a: "Yes. The mobile app is included with your WebLab system at no extra cost. It's available on both the App Store and Google Play.",
      },
      {
        q: 'Can my team use the app too?',
        a: 'Absolutely. Every team member gets their own login. You can control permissions so each person sees only what they need.',
      },
      {
        q: 'Does it have all the same features as the desktop version?',
        a: "It covers the core features you need on the go — conversations, pipeline, calendar, contacts, and reviews. Some advanced settings are desktop-only, but day-to-day management is fully covered.",
      },
    ],
    ctaHeadline: 'Run Your Business From Your Phone',
    ctaSubtext:
      "Book a free call and we'll show you how the mobile app keeps you connected to every lead, message, and opportunity — wherever you are.",
  },
  'invoicing-payments': {
    longDescription:
      "You've done the work. Now you need to get paid. But chasing invoices, sending payment reminders, and tracking who owes what is a job in itself — one that doesn't earn you a cent.\n\nWith built-in invoicing and payments, you create and send professional invoices directly from the same platform you manage your leads and jobs in. Customers pay online with a single click. Overdue? The system sends reminders automatically. You spend less time chasing money and more time earning it.",
    features: [
      {
        title: 'One-Click Invoicing',
        description:
          'Create and send branded invoices in seconds. Pull job details and customer info directly from your CRM — no double data entry.',
      },
      {
        title: 'Online Payment Collection',
        description:
          'Customers pay via credit card or bank transfer with a single click from their invoice. Funds go straight to your account.',
      },
      {
        title: 'Automated Payment Reminders',
        description:
          'Overdue invoices trigger automatic SMS and email reminders. Polite, professional, and persistent — without you having to chase.',
      },
      {
        title: 'Payment Tracking Dashboard',
        description:
          'See outstanding invoices, paid invoices, and total revenue at a glance. Know exactly where your money is at all times.',
      },
    ],
    faqs: [
      {
        q: 'What payment methods do customers have?',
        a: 'Credit card, debit card, and bank transfer. Customers click a link in their invoice and pay in under 30 seconds.',
      },
      {
        q: 'Are there transaction fees?',
        a: 'Standard payment processing fees apply (similar to Stripe or Square). There are no additional fees from WebLab on top of that.',
      },
      {
        q: 'Can I customise invoice templates?',
        a: "Yes. Add your logo, business details, payment terms, and custom line items. Your invoices look professional and consistent every time.",
      },
    ],
    ctaHeadline: 'Get Paid Faster, Chase Less',
    ctaSubtext:
      "Book a free call and we'll set up invoicing and payments that work seamlessly with your CRM — so getting paid is as smooth as getting the lead.",
  },
};

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact';
export const GHL_WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL ?? '';

export const WAVE_COLORS = {
  dark: [
    { offset: 0,   amplitude: 70, frequency: 0.003, color: 'rgba(59,130,246,0.9)',  opacity: 0.40 },
    { offset: 0.8, amplitude: 55, frequency: 0.004, color: 'rgba(99,102,241,0.85)', opacity: 0.35 },
    { offset: 1.6, amplitude: 45, frequency: 0.005, color: 'rgba(96,165,250,0.8)',  opacity: 0.30 },
    { offset: 2.4, amplitude: 35, frequency: 0.003, color: 'rgba(147,197,253,0.6)', opacity: 0.25 },
    { offset: 3.2, amplitude: 60, frequency: 0.004, color: 'rgba(37,99,235,0.7)',   opacity: 0.38 },
  ],
  light: [
    { offset: 0,   amplitude: 70, frequency: 0.003, color: 'rgba(37,99,235,0.7)',   opacity: 0.35 },
    { offset: 0.8, amplitude: 55, frequency: 0.004, color: 'rgba(67,56,202,0.65)',  opacity: 0.30 },
    { offset: 1.6, amplitude: 45, frequency: 0.005, color: 'rgba(29,78,216,0.6)',   opacity: 0.25 },
    { offset: 2.4, amplitude: 35, frequency: 0.003, color: 'rgba(79,70,229,0.55)',  opacity: 0.20 },
    { offset: 3.2, amplitude: 60, frequency: 0.004, color: 'rgba(37,99,235,0.65)',  opacity: 0.32 },
  ],
  gradients: {
    dark:  { from: '#0A0A0A', to: '#0D0D16' },
    light: { from: '#FFFFFF', to: '#EFF6FF' },
  },
} as const

export const ANIMATION = {
  duration: {
    fast:     0.2,
    standard: 0.3,
    slow:     0.6,
  },
  ease: {
    easeOut:   [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    easeInOut: [0.42, 0,    0.58, 1   ] as [number, number, number, number],
  },
} as const

export const INDUSTRIES = [
  'Plumbers',
  'Electricians',
  'Interior Designers',
  'Landscapers',
  'Pet Groomers',
  'Beauty Salons',
  'Cleaning Services',
  'Personal Trainers',
  'Consultants',
  'Photographers',
  'Pest Control',
  'Locksmiths',
];
