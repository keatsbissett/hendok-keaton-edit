'use client'

import { useState } from 'react'
import type { AlertItem as AlertItemType, Tier } from '@/lib/types'

interface AlertItemProps {
  item: AlertItemType
}

const tierStyles: Record<Tier, { badge: string; bg: string; border: string }> = {
  MATERIAL: {
    badge: 'bg-[rgba(231,76,60,0.15)] text-[#e74c3c]',
    bg: 'bg-[rgba(231,76,60,0.04)]',
    border: 'border-[rgba(231,76,60,0.2)]',
  },
  WATCH: {
    badge: 'bg-[rgba(230,168,23,0.15)] text-[#e6a817]',
    bg: 'bg-[rgba(230,168,23,0.04)]',
    border: 'border-[rgba(230,168,23,0.2)]',
  },
  SKIP: {
    badge: 'bg-[rgba(39,174,96,0.12)] text-[#27ae60]',
    bg: 'bg-transparent',
    border: 'border-white/[0.06]',
  },
}

function fmt(n?: number) {
  if (n == null) return null
  return new Intl.NumberFormat('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

export default function AlertItem({ item }: AlertItemProps) {
  const [expanded, setExpanded] = useState(item.tier !== 'SKIP')
  const styles = tierStyles[item.tier]

  return (
    <div
      className={`rounded-[10px] border ${styles.border} ${styles.bg} overflow-hidden transition-all`}
    >
      {/* Header row — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/[0.02] transition-colors"
      >
        {/* Tier badge */}
        <span className={`px-2 py-0.5 rounded-pill text-xs font-medium font-mono ${styles.badge}`}>
          {item.tier}
        </span>

        {/* Customer + product */}
        <div className="flex-1 min-w-0">
          <span className="text-white/85 text-sm font-medium truncate">{item.customer}</span>
          {item.product && (
            <span className="text-white/40 text-sm ml-2">{item.product}</span>
          )}
        </div>

        {/* Price vs MSP */}
        {item.unitPrice != null && item.msp != null && (
          <div className="text-right shrink-0">
            <span className="font-mono text-sm text-white/60">
              R{fmt(item.unitPrice)}{' '}
            </span>
            <span className="font-mono text-xs text-white/30">
              / R{fmt(item.msp)}
            </span>
          </div>
        )}

        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`text-white/30 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/[0.06]">
          {/* Metadata row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 mb-3">
            {item.region && <Meta label="Region" value={item.region} />}
            {item.rep && <Meta label="Rep" value={item.rep} />}
            {item.account && <Meta label="Account" value={item.account} />}
            {item.itemCode && <Meta label="Code" value={item.itemCode} mono />}
            {item.qty != null && <Meta label="Qty" value={`${item.qty} t`} mono />}
            {item.occurrences != null && item.occurrences > 1 && (
              <Meta label="Occurrences" value={`${item.occurrences}× today`} />
            )}
          </div>

          {/* Story */}
          <p className="text-white/65 text-sm leading-relaxed">{item.story}</p>
        </div>
      )}
    </div>
  )
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-white/30 text-xs">{label}</span>
      <span className={`text-white/60 text-xs ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}
