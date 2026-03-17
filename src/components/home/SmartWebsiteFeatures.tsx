import { Bot, Target, Zap, Search, Smartphone, Mail } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: 'Instant customer support 24/7, captures leads and books appointments even at 2am.',
  },
  {
    icon: Target,
    title: 'Lead Capture Tools',
    description: 'Smart forms, pop-ups, and lead magnets convert anonymous visitors into real prospects.',
  },
  {
    icon: Mail,
    title: 'AI-Powered Follow-Up',
    description: 'Automated email and SMS sequences nurture leads without you lifting a finger.',
  },
  {
    icon: Search,
    title: 'SEO Optimised',
    description: 'Strategic keywords and on-page enhancements help you rank higher on Google.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Core Web Vitals optimised for speed, reducing bounce and improving rankings.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Looks and works perfectly on every screen size, from phone to desktop.',
  },
];

export default function SmartWebsiteFeatures() {
  return (
    <section className="bg-[#111111] border-t border-[#1F2937] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase mb-6 block">
            [WHAT IS A SMART WEBSITE?]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] mb-4 mt-2">
            More Than Just a Pretty Page
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            A Smart Website works around the clock, capturing leads, answering questions, and booking jobs while you focus on what you do best.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-[#1F2937] bg-[#0A0A0A] p-6 hover:border-[#3B82F6] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h3 className="text-[#F9FAFB] font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
