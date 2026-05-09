import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mike T.',
    role: 'Owner',
    company: 'Flow-Rite Plumbing',
    quote:
      "Our phone used to go quiet for days. Now the missed call text-back alone brings in 3-4 extra jobs a week. Best money I've ever spent on the business.",
    stars: 5,
  },
  {
    name: 'Sarah J.',
    role: 'Owner',
    company: 'Glow Studio Beauty',
    quote:
      "Since switching to WebLab's CRM, we've doubled our rebooking rate. The automated follow-ups are a game changer. Clients don't forget about us anymore.",
    stars: 5,
  },
  {
    name: 'David R.',
    role: 'Founder',
    company: 'GreenThumb Landscaping',
    quote:
      "Our old website was invisible on Google. Now we're ranking on page one for landscaping in our area. The leads just keep coming in.",
    stars: 5,
  },
  {
    name: 'Jessica M.',
    role: 'Owner',
    company: 'Paws & Claws Pet Grooming',
    quote:
      "We used to juggle five different apps to run the business. WebLab put everything in one place. Bookings, follow-ups, reviews, all of it.",
    stars: 5,
  },
  {
    name: 'Tom H.',
    role: 'Director',
    company: 'Bloom Interiors',
    quote:
      "Getting Google reviews used to be like pulling teeth. Now the system does it automatically and we've gone from 12 to over 80 five-star reviews.",
    stars: 5,
  },
  {
    name: 'Lisa K.',
    role: 'Director',
    company: 'Sparkle Cleaning Services',
    quote:
      "I was sceptical about the AI chatbot, but it booked 6 appointments in its first weekend. On a Sunday night. While I was asleep.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[var(--color-accent)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Real Results From Real Businesses
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join Sydney service businesses that are booking more clients and growing faster with WebLab.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/20 bg-white p-6 shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="pt-4 border-t-2 border-[var(--color-foreground)]/10">
                <p className="font-black text-[var(--color-text-primary)] text-sm">
                  {t.name}
                </p>
                <p className="text-[var(--color-text-muted)] text-xs font-medium">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
