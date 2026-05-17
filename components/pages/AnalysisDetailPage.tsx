'use client'

import { MOCK_ANALYSES, MOCK_FLAGS } from '@/config/mockData'
import StatusBadge, { FrameworkBadge, TierBadge } from '@/components/ui/StatusBadge'
import type { Page } from '@/lib/types'

interface AnalysisDetailPageProps {
  onNavigate: (page: Page) => void
}

const MOCK_ITEMS = [
  { customer: 'Clear Creek Trading', product: 'Field Fence 2.5mm', unitPrice: 18.40, msp: 22.80, variance: -19.3, qty: 480, rep: 'Sipho Dlamini', tier: 'MATERIAL' as const },
  { customer: 'Sipho Dlamini Acc',   product: 'Galv Wire 2.5mm',   unitPrice: 14.20, msp: 16.50, variance: -13.9, qty: 200, rep: 'Sipho Dlamini', tier: 'MATERIAL' as const },
  { customer: 'Spa Warehouse Holdings', product: 'Field Fence 2.5mm', unitPrice: 21.10, msp: 22.80, variance: -7.5, qty: 120, rep: 'Thabo Nkosi', tier: 'MATERIAL' as const },
  { customer: 'Thekweni Reinforcing', product: 'Galv Wire 3.5mm',  unitPrice: 18.90, msp: 20.15, variance: -6.2, qty: 1240, rep: 'Andre Visser', tier: 'WATCH' as const },
  { customer: 'Buildmart SA',         product: 'Agric Wire 2.0mm', unitPrice: 11.30, msp: 11.65, variance: -3.0, qty: 80,  rep: 'Thabo Nkosi',  tier: 'WATCH' as const },
  { customer: 'African Mesh Dist',    product: 'Cap Tie',          unitPrice: 4.20,  msp: 4.10,  variance: +2.4, qty: 500, rep: 'Andre Visser', tier: 'SKIP' as const },
]

export default function AnalysisDetailPage({ onNavigate }: AnalysisDetailPageProps) {
  const analysis = MOCK_ANALYSES[0] // use the most recent

  return (
    <div className="p-6 space-y-5 max-w-[1100px]">

      {/* Breadcrumb + header */}
      <div>
        <button
          onClick={() => onNavigate('analyses')}
          className="text-muted-foreground text-[11px] hover:text-foreground flex items-center gap-1 mb-3"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 2L3 5l4 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Back to Analyses
        </button>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-foreground text-[18px] font-semibold">{analysis.filename}</h2>
              <StatusBadge status={analysis.status} />
              <FrameworkBadge framework={analysis.framework} />
            </div>
            <p className="text-muted-foreground text-[12px] mt-1">{analysis.date} · {analysis.operator}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground text-[12px] hover:text-foreground hover:bg-muted/40 transition-colors">
              Export PDF
            </button>
            <button className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-opacity">
              Mark Reviewed
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide mb-3">Executive Summary</p>
        <div className="space-y-2">
          {[
            'Three material price alerts require immediate review — Clear Creek Trading on Field Fence 2.5mm is the fourth occurrence this week.',
            'Sipho Dlamini generated three separate below-MSP orders on the same day, suggesting a systematic pricing override.',
            'Seven watch-level items remain within thresholds but warrant monitoring in the next cycle.',
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              <p className="text-foreground text-[13px] leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
          {[
            { label: 'Total Items', value: analysis.totalItems, color: 'text-foreground' },
            { label: 'Material',    value: analysis.material,   color: 'text-danger' },
            { label: 'Watch',       value: analysis.watch,      color: 'text-warning' },
            { label: 'Skip',        value: analysis.skip,       color: 'text-muted-foreground' },
          ].map((t) => (
            <div key={t.label} className="text-center">
              <p className={`text-[22px] font-bold ${t.color}`}>{t.value}</p>
              <p className="text-muted-foreground text-[10px]">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alert items table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-foreground text-[13px] font-semibold">Alert Items</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                {['Tier', 'Customer', 'Product', 'Unit Price', 'MSP', 'Variance', 'Qty', 'Rep'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_ITEMS.map((item, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <TierBadge tier={item.tier} />
                  </td>
                  <td className="px-4 py-3 text-foreground text-[12.5px] font-medium whitespace-nowrap">
                    {item.customer}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[12px] whitespace-nowrap">
                    {item.product}
                  </td>
                  <td className="px-4 py-3 text-foreground text-[12px] font-mono">
                    R{item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[12px] font-mono">
                    R{item.msp.toFixed(2)}
                  </td>
                  <td className={`px-4 py-3 text-[12px] font-semibold font-mono ${
                    item.variance < 0 ? 'text-danger' : 'text-success'
                  }`}>
                    {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[12px]">
                    {item.qty}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[12px]">
                    {item.rep}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoring model */}
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide mb-3">Scoring Model</p>
        <p className="text-foreground text-[13px] leading-relaxed">
          Claude evaluated each line item against the minimum selling price (MSP) in the price alert data. Items more than 10% below MSP were scored <strong className="text-danger">MATERIAL</strong>; items 5–10% below MSP were scored <strong className="text-warning">WATCH</strong>; items within 5% were scored <strong className="text-muted-foreground">SKIP</strong>. Volume at risk (variance × qty) was used as a tie-breaker.
        </p>
      </div>

    </div>
  )
}
