import StatCard from '@/components/ui/StatCard'
import EmptyState from '@/components/ui/EmptyState'
import type { AnalysisResult } from '@/lib/types'

interface DashboardPageProps {
  onNewBrief: () => void
  lastResult: AnalysisResult | null
}

const FRAMEWORK_CARDS = [
  {
    key: 'price-alert',
    label: 'Price Alert',
    desc: 'Sales orders below minimum selling price across all reps and regions.',
    formats: ['XLSX', 'CSV', 'EML'],
    color: 'text-[#e74c3c]',
    border: 'border-[rgba(231,76,60,0.15)]',
    dot: 'bg-[#e74c3c]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 2v6.5M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: 'sage-export',
    label: 'Sage Export',
    desc: 'Debtor ageing reports and invoice-level financial exports from Sage.',
    formats: ['XLSX', 'EML'],
    color: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <path d="M1.5 6h12M5 6v6.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'screenshot',
    label: 'Vision / Screenshot',
    desc: 'Qlik dashboards, meter readings, or any operational screenshot.',
    formats: ['PNG', 'JPG', 'WEBP'],
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    dot: 'bg-purple-400',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    key: 'logistics',
    label: 'Logistics',
    desc: 'Fleet reports, CTrack exports, and delivery schedule summaries.',
    formats: ['XLSX', 'CSV'],
    color: 'text-[#e6a817]',
    border: 'border-[rgba(230,168,23,0.2)]',
    dot: 'bg-[#e6a817]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="6" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M10 8h2l2 3H10V8z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="3.5" cy="12.5" r="1" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="11.5" cy="12.5" r="1" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    key: 'stock-take',
    label: 'Stock Take',
    desc: 'Inventory variance reports and DIMS-format stock count exports.',
    formats: ['XLSX', 'CSV'],
    color: 'text-[#27ae60]',
    border: 'border-[rgba(39,174,96,0.2)]',
    dot: 'bg-[#27ae60]',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
        <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M8.5 11h5M11 8.5v5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    ),
  },
]

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function DashboardPage({ onNewBrief, lastResult }: DashboardPageProps) {
  const hasResult = lastResult !== null

  return (
    <div className="px-6 py-7 max-w-4xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-white font-semibold text-2xl">{getGreeting()}.</h1>
        <p className="text-white/35 text-sm mt-0.5">{getFormattedDate()}</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Briefs this session"
          value={hasResult ? '1' : '—'}
          color={hasResult ? 'text-white' : 'text-white/25'}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1" />
              <path d="M4 5h5M4 7.5h5M4 10h3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Total alerts"
          value={hasResult ? lastResult.counts.total : '—'}
          color={hasResult ? 'text-white' : 'text-white/25'}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5v7M7 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          }
        />
        <StatCard
          label="Material"
          value={hasResult ? lastResult.counts.material : '—'}
          color={hasResult && lastResult.counts.material > 0 ? 'text-[#e74c3c]' : 'text-white/25'}
          bg={hasResult && lastResult.counts.material > 0 ? 'bg-[rgba(231,76,60,0.06)]' : undefined}
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2l1.8 3.6L13 6.5l-3 2.9.7 4.1L7 11.5l-3.7 1.9.7-4.1-3-2.9 4.2-.9z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label="Framework"
          value={hasResult ? lastResult.framework : '—'}
          color="text-white/50"
          icon={
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="0.9" />
              <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="0.9" />
              <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="0.9" />
              <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="0.9" />
            </svg>
          }
        />
      </div>

      {/* Quick start hero */}
      <div className="mb-8 rounded-[12px] bg-[#1a1d27] border border-white/[0.07] overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold text-base">Start a new brief</h2>
            <p className="text-white/40 text-sm mt-1 max-w-md">
              Upload any operational document — price alerts, Sage exports, stock takes,
              screenshots, or logistics reports. Claude reads every line and returns a
              plain-English brief you can act on.
            </p>
          </div>
          <button
            onClick={onNewBrief}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#C0392B] hover:bg-[#A93226] text-white text-sm font-medium transition-colors shrink-0"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            New Brief
          </button>
        </div>
        {/* Bottom strip */}
        <div className="border-t border-white/[0.05] px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/25 text-xs">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.9" />
              <path d="M6 3v3.5l2 1.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            10–30 seconds per brief
          </div>
          <div className="flex items-center gap-1.5 text-white/25 text-xs">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1.5" y="4" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="0.9" />
              <path d="M4 4V3a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="0.9" />
            </svg>
            In-memory only — nothing stored
          </div>
          <div className="flex items-center gap-1.5 text-white/25 text-xs">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.3 2.6L10 4.1 8 6l.5 3L6 7.7 3.5 9l.5-3L2 4.1l2.7-.5z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
            </svg>
            Claude Sonnet · ZDR enabled
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mb-8">
        <p className="text-white/35 text-xs uppercase tracking-wider font-medium mb-3">
          Recent activity
        </p>
        {hasResult ? (
          <div className="rounded-[10px] bg-[#1a1d27] border border-white/[0.07] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm font-medium">Latest brief</span>
                <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono bg-white/[0.05] text-white/40 border border-white/[0.06]">
                  {lastResult.framework}
                </span>
              </div>
              <span className="text-white/25 text-xs">This session</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-white/40 text-xs">Total</span>
                <span className="font-mono text-white/60 text-sm">{lastResult.counts.total}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e74c3c]" />
                <span className="font-mono text-[#e74c3c]/80 text-sm">{lastResult.counts.material}</span>
                <span className="text-white/30 text-xs">material</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e6a817]" />
                <span className="font-mono text-[#e6a817]/80 text-sm">{lastResult.counts.watch}</span>
                <span className="text-white/30 text-xs">watch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27ae60]" />
                <span className="font-mono text-[#27ae60]/80 text-sm">{lastResult.counts.skip}</span>
                <span className="text-white/30 text-xs">skip</span>
              </div>
            </div>
            <p className="text-white/50 text-xs mt-2.5 leading-relaxed line-clamp-2">
              {lastResult.summary[0]}
            </p>
          </div>
        ) : (
          <EmptyState
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 7h6M6 10h6M6 13h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            }
            title="No briefs yet this session"
            description="Upload any operational document above and your brief will appear here."
            action={
              <button
                onClick={onNewBrief}
                className="px-4 py-2 rounded-[6px] bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white/50 hover:text-white/70 text-sm transition-colors"
              >
                Upload a document
              </button>
            }
          />
        )}
      </div>

      {/* Frameworks grid */}
      <div>
        <p className="text-white/35 text-xs uppercase tracking-wider font-medium mb-3">
          Document frameworks
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {FRAMEWORK_CARDS.map((fw) => (
            <div
              key={fw.key}
              className={`rounded-[10px] bg-[#1a1d27] border ${fw.border} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={fw.color}>{fw.icon}</span>
                <span className={`text-sm font-medium ${fw.color}`}>{fw.label}</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-2">{fw.desc}</p>
              <div className="flex gap-1 flex-wrap">
                {fw.formats.map((f) => (
                  <span
                    key={f}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-white/30 border border-white/[0.06]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
