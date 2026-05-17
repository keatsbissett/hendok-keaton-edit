'use client'

import type { AnalysisStatus } from '@/config/mockData'

const STATUS_CONFIG: Record<AnalysisStatus, { label: string; classes: string }> = {
  complete:   { label: 'Complete',   classes: 'bg-success/10 text-success border-success/20' },
  review:     { label: 'Review',     classes: 'bg-warning/10 text-warning border-warning/20' },
  flagged:    { label: 'Flagged',    classes: 'bg-danger/10 text-danger border-danger/20' },
  processing: { label: 'Processing', classes: 'bg-info/10 text-info border-info/20' },
  draft:      { label: 'Draft',      classes: 'bg-muted/60 text-muted-foreground border-border' },
}

export default function StatusBadge({ status }: { status: AnalysisStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.classes}`}>
      {cfg.label}
    </span>
  )
}

// Tier badges for MATERIAL / WATCH / SKIP
export function TierBadge({ tier }: { tier: 'MATERIAL' | 'WATCH' | 'SKIP' }) {
  const cfg = {
    MATERIAL: 'bg-danger/10 text-danger border-danger/20',
    WATCH:    'bg-warning/10 text-warning border-warning/20',
    SKIP:     'bg-muted/50 text-muted-foreground border-border',
  }[tier]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg}`}>
      {tier}
    </span>
  )
}

// Framework badges
export function FrameworkBadge({ framework }: { framework: string }) {
  const labels: Record<string, string> = {
    'price-alert': 'Price Alert',
    'sage-export': 'Sage Export',
    'screenshot': 'Screenshot',
    'logistics': 'Logistics',
    'stock-take': 'Stock Take',
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent border border-accent/20">
      {labels[framework] ?? framework}
    </span>
  )
}
