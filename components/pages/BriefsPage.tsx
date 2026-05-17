import PageHeader from '@/components/ui/PageHeader'
import EmptyState from '@/components/ui/EmptyState'
import ExecSummary from '@/components/results/ExecSummary'
import StatBar from '@/components/results/StatBar'
import CopyBar from '@/components/results/CopyBar'
import type { AnalysisResult } from '@/lib/types'

interface BriefsPageProps {
  lastResult: AnalysisResult | null
  onNewBrief: () => void
}

const TIER_COLORS: Record<string, string> = {
  MATERIAL: 'text-[#e74c3c]',
  WATCH: 'text-[#e6a817]',
  SKIP: 'text-[#27ae60]',
}

export default function BriefsPage({ lastResult, onNewBrief }: BriefsPageProps) {
  return (
    <div className="px-6 py-7 max-w-3xl mx-auto">
      <PageHeader
        title="Briefs"
        description="Intelligence briefs generated this session. Documents are processed in-memory — no data is stored between sessions."
        badge={lastResult ? { text: '1 this session', color: 'text-white/50 border-white/10 bg-white/[0.04]' } : undefined}
      />

      {/* Privacy notice */}
      <div className="mb-6 flex items-start gap-2.5 px-4 py-3 rounded-[8px] bg-white/[0.03] border border-white/[0.06]">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-white/30 shrink-0 mt-0.5">
          <rect x="1.5" y="5.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1" />
          <path d="M4 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="currentColor" strokeWidth="1" />
          <circle cx="6.5" cy="9" r="0.8" fill="currentColor" />
        </svg>
        <p className="text-white/35 text-xs leading-relaxed">
          <span className="text-white/50 font-medium">In-memory processing only.</span>{' '}
          No document data is written to disk, stored in a database, or retained by Anthropic.
          Each session is ephemeral — briefs are lost when you close the tab.
        </p>
      </div>

      {lastResult ? (
        <div className="flex flex-col gap-5">
          {/* Brief card header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm font-medium">Session brief</span>
              <span className="px-2 py-0.5 rounded-pill text-[10px] font-mono bg-white/[0.05] text-white/40 border border-white/[0.06]">
                {lastResult.framework}
              </span>
            </div>
            <button
              onClick={onNewBrief}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              New brief
            </button>
          </div>

          <ExecSummary summary={lastResult.summary} />
          <StatBar counts={lastResult.counts} />

          {/* Alert summary table */}
          <div className="rounded-[10px] bg-[#1a1d27] border border-white/[0.07] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                Alert breakdown
              </span>
              <span className="text-white/25 text-xs font-mono">{lastResult.items.length} items</span>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {lastResult.items.slice(0, 8).map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className={`font-mono text-[11px] font-medium ${TIER_COLORS[item.tier]} w-16 shrink-0`}>
                    {item.tier}
                  </span>
                  <span className="text-white/70 text-sm flex-1 truncate">{item.customer}</span>
                  {item.product && (
                    <span className="text-white/30 text-xs truncate max-w-[120px] hidden sm:block">
                      {item.product}
                    </span>
                  )}
                  {item.unitPrice != null && item.msp != null && (
                    <span className="font-mono text-xs text-white/40 shrink-0">
                      R{item.unitPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
              {lastResult.items.length > 8 && (
                <div className="px-4 py-2.5 text-center text-white/25 text-xs">
                  +{lastResult.items.length - 8} more items — use New Brief to see full triage view
                </div>
              )}
            </div>
          </div>

          <CopyBar result={lastResult} />
        </div>
      ) : (
        <EmptyState
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2.5" y="2.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M6.5 8h7M6.5 11.5h7M6.5 15h4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          }
          title="No briefs this session"
          description="Upload an operational document and your intelligence brief will appear here. Briefs are in-memory only — they don't persist between sessions."
          action={
            <button
              onClick={onNewBrief}
              className="flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#C0392B] hover:bg-[#A93226] text-white text-sm font-medium transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Upload a document
            </button>
          }
        />
      )}
    </div>
  )
}
