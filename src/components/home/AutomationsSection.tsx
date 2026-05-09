import { PhoneOff, Inbox, CalendarCheck, Star, Bot, MessageSquare } from 'lucide-react';

const crmFeatures = [
  {
    icon: PhoneOff,
    title: 'Missed-Call Text Back',
    description:
      'Miss a call while you\'re busy? The system instantly texts them back so they don\'t call someone else.',
    tag: 'NEVER LOSE A LEAD',
  },
  {
    icon: Inbox,
    title: 'Unified Inbox',
    description:
      'See all your texts, emails, Facebook messages, and web chats in one single feed. No more app-switching.',
    tag: 'EVERYTHING IN ONE PLACE',
  },
  {
    icon: CalendarCheck,
    title: 'Automated Booking',
    description:
      'Let customers book directly on your site, syncing with your calendar. No back-and-forth texts needed.',
    tag: 'BOOK ON AUTOPILOT',
  },
  {
    icon: MessageSquare,
    title: 'Automated Follow-Up',
    description:
      'Every new enquiry triggers instant, personalised SMS and email sequences. Leads stay warm while you work.',
    tag: 'NO LEAD GOES COLD',
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    description:
      'A 24/7 assistant on your website that answers questions, qualifies leads, and books appointments — even at 2am.',
    tag: '24/7 LEAD CAPTURE',
  },
  {
    icon: Star,
    title: 'Review Automation',
    description:
      'Automatically request Google reviews from happy customers after every appointment. Build your reputation on autopilot.',
    tag: 'MORE 5-STAR REVIEWS',
  },
];

export default function AutomationsSection() {
  return (
    <section className="bg-[var(--color-surface)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
            THE WEBLAB CRM
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
            Ditch the 5 Apps. Use One.
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Everything you need to turn clicks into paying, happy customers — in one platform you can run from your phone.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crmFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border-2 border-[var(--color-foreground)] bg-white p-6 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-[var(--color-text-primary)] font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed flex-1">{feature.description}</p>
                <div className="mt-4 pt-3 border-t-2 border-[var(--color-foreground)]/10">
                  <span className="font-mono text-[10px] font-black text-[var(--color-accent)] tracking-widest uppercase">
                    {feature.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
