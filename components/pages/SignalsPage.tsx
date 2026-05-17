'use client'

import { useState } from 'react'
import { MOCK_FLAGS, type FlagSeverity } from '@/config/mockData'

const SEVERITY_CONFIG: Record<FlagSeverity, { label: string; dot: string; badge: string }> = {
  showstopper: { label: 'Showstopper', dot: 'bg-danger', badge: 'bg-danger/10 text-danger border-danger/20' },
  warning:     { label: 'Warning',     dot: 'bg-warning', badge: 'bg-warning/10 text-warning border-warning/20' },
  cleared:     { label: 'Cleared',     dot: 'bg-success', badge: 'bg-success/10 text-success border-success/20' },
  question:    { label: 'Question',    dot: 'bg-info',    badge: 'bg-info/10 text-info border-info/20' },
}

export default function SignalsPage() {
  const [filter, setFilter] = useState<FlagSeverity | 'all'>('all')

  const filters: Array<{ id: FlagSeverity | 'all'; label: string }> = [
    { id: 'all',         label: `All (${MOCK_FLAGS.length})` },
    { id: 'showstopper', label: `Showstopper (${MOCK_FLAGS.filter(f => f.severity === 'showstopper').length})` },
    { id: 'warning',     label: `Warning (${MOCK_FLAGS.filter(f => f.severity === 'warning').length})` },
    { id: 'question',    label: `Question (${MOCK_FLAGS.filter(f => f.severity === 'question').length})` },
    { id: 'cleared',     label: `Cleared (${MOCK_FLAGS.filter(f => f.severity === 'cleared').length})` },
  ]

  const visible = filter === 'all' ? MOCK_FLAGS : MOCK_FLAGS.filter(f => f.severity === filter)

  return (
    <div className="p-6 space-y-5 max-w-[900px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Signals</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          AI-generated intelligence signals from the most recent analysis session.
        </p>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Showstoppers', count: MOCK_FLAGS.filter(f => f.severity === 'showstopper').length, color: 'bg-danger/10 text-danger border-danger/20' },
          { label: 'Warnings',     count: MOCK_FLAGS.filter(f => f.severity === 'warning').length,     color: 'bg-warning/10 text-warning border-warning/20' },
          { label: 'Questions',    count: MOCK_FLAGS.filter(f => f.severity === 'question').length,    color: 'bg-info/10 text-info border-info/20' },
          { label: 'Cleared',      count: MOCK_FLAGS.filter(f => f.severity === 'cleared').length,     color: 'bg-success/10 text-success border-success/20' },
        ].map((c) => (
          <div key={c.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${c.color}`}>
            <span className="text-[20px] font-bold leading-none">{c.count}</span>
            <span className="text-[11px] font-medium">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
              filter === f.id
                ? 'bg-primary/10 text-primary border-primary/25'
                : 'bg-card border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Signals list */}
      <div className="space-y-3">
        {visible.map((flag) => {
          const cfg = SEVERITY_CONFIG[flag.severity]
          return (
            <div
              key={flag.id}
              className="bg-card border border-border rounded-xl p-4 space-y-2 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${cfg.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    {flag.customer && (
                      <span className="text-muted-foreground text-[11px]">{flag.customer}</span>
                    )}
                  </div>
                  <p className="text-foreground text-[13px] font-semibold">{flag.title}</p>
                  <p className="text-muted-foreground text-[12px] mt-1 leading-relaxed">{flag.description}</p>
                  {flag.evidence && (
                    <p className="text-muted-foreground/60 text-[11px] mt-1.5 font-mono">{flag.evidence}</p>
                  )}
                </div>
                {flag.severity !== 'cleared' && (
                  <div className="flex gap-1.5 shrink-0">
                    <button className="px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-[11px] hover:text-foreground hover:bg-muted/40 transition-colors">
                      Dismiss
                    </button>
                    {flag.severity !== 'question' && (
                      <button className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/25 text-primary text-[11px] font-medium hover:bg-primary/20 transition-colors">
                        Review
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
