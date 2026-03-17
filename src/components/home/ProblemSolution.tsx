const painPoints = [
  'Missed calls turn into lost jobs, especially when you\'re on site',
  'Your website looks outdated and doesn\'t convert visitors into enquiries',
  'Leads go cold because you\'re too busy to follow up fast enough',
  'Competitors with worse service are ranking higher on Google',
  'You\'re spending hours manually booking, reminding, and following up',
  'No system to collect Google reviews, so you\'re invisible online',
];

const solutions = [
  'Missed call text-back fires in seconds, no lead left behind',
  'High-converting website built to book jobs on autopilot',
  'Automated follow-up sequences nurture leads while you work',
  'Local SEO and Google Business optimisation puts you on the map',
  'CRM automation handles bookings, reminders, and follow-ups for you',
  'Automated review requests turn happy customers into 5-star reviews',
];

const stats = [
  { value: '78%', label: 'of customers go with the first business to respond' },
  { value: '3×', label: 'more enquiries from an optimised Google Business Profile' },
  { value: '90%', label: 'of people read online reviews before choosing a tradie' },
];

export default function ProblemSolution() {
  return (
    <section className="bg-[#0A0A0A] border-t border-[#1F2937] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase mb-6 block">
            [THE PROBLEM]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] mb-4">
            Sound Familiar?
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            Most tradies and service businesses face the same problems. We fix all of them.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pain column */}
          <div className="rounded-2xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#EF4444]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#EF4444]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-[#F9FAFB] font-semibold text-lg">Without WebLab</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] flex-shrink-0 mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution column */}
          <div className="rounded-2xl border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-[#F9FAFB] font-semibold text-lg">With WebLab</h3>
            </div>
            <ul className="flex flex-col gap-3">
              {solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0 mt-1.5" />
                  {solution}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stat callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#1F2937] bg-[#111111] p-6 text-center"
            >
              <div className="text-4xl font-bold text-[#3B82F6] mb-2">{stat.value}</div>
              <p className="text-[#9CA3AF] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
