'use client'

import { useState } from 'react'
import { MOCK_ANALYSES } from '@/config/mockData'
import StatusBadge, { FrameworkBadge } from '@/components/ui/StatusBadge'
import type { Page } from '@/lib/types'

interface AnalysesPageProps {
  onNavigate: (page: Page) => void
}

export default function AnalysesPage({ onNavigate }: AnalysesPageProps) {
  const [filter, setFilter] = useState<string>('all')

  const filters = [
    { id: 'all',         label: 'All' },
    { id: 'flagged',     label: 'Flagged' },
    { id: 'review',      label: 'Needs Review' },
    { id: 'complete',    label: 'Complete' },
    { id: 'price-alert', label: 'Price Alert' },
    { id: 'logistics',   label: 'Logistics' },
    { id: 'sage-export', label: 'Sage' },
  ]

  const filtered = MOCK_ANALYSES.filter((a) => {
    if (filter === 'all') return true
    if (['flagged','review','complete','processing','draft'].includes(filter)) return a.status === filter
    return a.framework === filter
  })

  return (
    <div className="p-6 space-y-5 max-w-[1100px]">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-foreground text-[18px] font-semibold">Analyses</h2>
          <p className="text-muted-foreground text-[12px] mt-0.5">
            {MOCK_ANALYSES.length} analyses in session
          </p>
        </div>
        <button
          onClick={() => onNavigate('new-analysis')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-opacity"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          New Analysis
        </button>
      </div>

      {/* Filter chips */}
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

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              {['File', 'Framework', 'Date', 'Items', 'M / W', 'Status', ''].map((h) => (
                <th key={h} className="px-4 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((ana) => (
              <tr
                key={ana.id}
                onClick={() => onNavigate('analysis-detail')}
                className="hover:bg-muted/20 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="text-foreground text-[12.5px] font-medium">{ana.filename}</span>
                  <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-1 max-w-[280px]">{ana.summary}</p>
                </td>
                <td className="px-4 py-3">
                  <FrameworkBadge framework={ana.framework} />
                </td>
                <td className="px-4 py-3 text-muted-foreground text-[12px] whitespace-nowrap">
                  {ana.date}
                </td>
                <td className="px-4 py-3 text-foreground text-[12px] font-medium">
                  {ana.totalItems}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-danger text-[12px] font-semibold">{ana.material}</span>
                    <span className="text-muted-foreground/40 text-[10px]">/</span>
                    <span className="text-warning text-[12px]">{ana.watch}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={ana.status} />
                </td>
                <td className="px-4 py-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground/50">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-[13px]">No analyses match this filter.</p>
          </div>
        )}
      </div>

    </div>
  )
}
