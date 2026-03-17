import { Bell, MessageSquare, LayoutDashboard, Calendar, Star, Smartphone } from 'lucide-react';

const appFeatures = [
  {
    icon: Bell,
    text: 'Instant push notifications the moment a new lead comes in',
  },
  {
    icon: MessageSquare,
    text: 'Respond via SMS, email, or call directly from your phone',
  },
  {
    icon: LayoutDashboard,
    text: 'View and manage your full CRM pipeline on the go',
  },
  {
    icon: Calendar,
    text: 'Drag leads between stages, assign tasks, book appointments',
  },
  {
    icon: Star,
    text: 'Monitor Google reviews and respond instantly',
  },
  {
    icon: Smartphone,
    text: 'Available on iOS and Android, included at no extra cost',
  },
];

export default function MobileAppSection() {
  return (
    <section className="bg-[#111111] border-t border-[#1F2937] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase mb-6 block">
              [MANAGE EVERYTHING FROM YOUR PHONE]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] mb-4 mt-2">
              Your Business in Your Pocket
            </h2>
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-8">
              The LeadConnector mobile app puts your entire CRM, inbox, and lead pipeline right in your hand, so you never miss an opportunity, even on the job.
            </p>
            <ul className="flex flex-col gap-4">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.text} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-[#3B82F6]" />
                    </div>
                    <span className="text-[#D1D5DB] text-sm leading-relaxed">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-64 h-[520px] rounded-[3rem] border-2 border-[#1F2937] bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <span className="text-[#9CA3AF] text-xs">9:41</span>
                  <div className="w-20 h-5 rounded-full bg-[#111111] border border-[#1F2937]" />
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-[#1F2937]" />
                    <div className="w-3 h-3 rounded-sm bg-[#1F2937]" />
                  </div>
                </div>
                {/* App header */}
                <div className="px-4 py-3 border-b border-[#1F2937]">
                  <p className="text-[#F9FAFB] font-semibold text-sm">LeadConnector</p>
                  <p className="text-[#60A5FA] text-xs">3 new leads today</p>
                </div>
                {/* Notification cards */}
                <div className="flex flex-col gap-2 p-4">
                  {[
                    { name: 'John S.', msg: 'Interested in plumbing quote', time: '2m ago', hot: true },
                    { name: 'Sarah M.', msg: 'Booked via chatbot', time: '15m ago', hot: false },
                    { name: 'Mike T.', msg: 'Left 5★ review', time: '1h ago', hot: false },
                  ].map((lead) => (
                    <div
                      key={lead.name}
                      className="rounded-xl border border-[#1F2937] bg-[#111111] p-3"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA] text-xs font-bold flex-shrink-0">
                            {lead.name[0]}
                          </div>
                          <span className="text-[#F9FAFB] text-xs font-medium">{lead.name}</span>
                        </div>
                        {lead.hot && (
                          <span className="text-[#10B981] text-[10px] font-medium bg-[#10B981]/10 px-1.5 py-0.5 rounded-full">
                            Hot
                          </span>
                        )}
                      </div>
                      <p className="text-[#9CA3AF] text-[11px] ml-8">{lead.msg}</p>
                      <p className="text-[#6B7280] text-[10px] ml-8 mt-1">{lead.time}</p>
                    </div>
                  ))}
                </div>
                {/* Bottom nav bar */}
                <div className="mt-auto border-t border-[#1F2937] flex items-center justify-around px-4 py-3">
                  {['inbox', 'leads', 'calendar', 'more'].map((tab) => (
                    <div key={tab} className="flex flex-col items-center gap-0.5">
                      <div className={`w-5 h-5 rounded bg-[#1F2937] ${tab === 'inbox' ? 'bg-[#3B82F6]/30' : ''}`} />
                      <span className={`text-[9px] capitalize ${tab === 'inbox' ? 'text-[#60A5FA]' : 'text-[#6B7280]'}`}>{tab}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
