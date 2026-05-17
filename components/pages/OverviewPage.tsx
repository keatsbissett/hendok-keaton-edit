'use client'

import { MOCK_ANALYSES, MOCK_FLAGS, MOCK_SCORECARD } from '@/config/mockData'
import type { CategoryColorKey } from '@/config/mockData'
import { platformConfig } from '@/config/platform'
import StatusBadge, { FrameworkBadge } from '@/components/ui/StatusBadge'
import ScoreBar from '@/components/ui/ScoreBar'
import type { Page } from '@/lib/types'

interface OverviewPageProps {
  onNavigate: (page: Page) => void
}

export default function OverviewPage({ onNavigate }: OverviewPageProps) {
  const recent = MOCK_ANALYSES.slice(0, 4)
  const openFlags = MOCK_FLAGS.filter((f) => f.severity === 'showstopper' || f.severity === 'warning')

  const totalToday = MOCK_ANALYSES.filter((a) => a.date === '17 May 2026').reduce((s, a) => s + a.totalItems, 0)
  const materialToday = MOCK_ANALYSES.filter((a) => a.date === '17 May 2026').reduce((s, a) => s + a.material, 0)

  return (
    <div className="p-6 space-y-6 max-w-[1200px]">

      {/* ── Greeting ─────────────────────────────────────── */}
      <div>
        <h1 className="text-foreground text-[22px] font-semibold tracking-tight">
          Good morning, L. de Kock
        </h1>
        <p className="text-muted-foreground text-[13px] mt-0.5">
          Here's your operational intelligence briefing for 17 May 2026.
        </p>
      </div>

      {/* ── Daily story banner ───────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-4 flex gap-3">
        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-primary">
            <path d="M6.5 1l1 2.1 2.3.3-1.65 1.6.39 2.3L6.5 6.2 4.46 7.3l.39-2.3L3.2 3.4l2.3-.3z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
            <path d="M2 10h9M3.5 12h6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Today&#39;s story — AI generated</p>
          <p className="text-foreground text-[13px] leading-relaxed">
            Revenue is tracking <span className="font-semibold">R22.6M for May</span>, up R1.2M on April — field fence is driving the gain.
            {' '}<span className="text-danger font-semibold">43 material alerts</span> remain open this month; 12 are repeat offenders, with Clear Creek Trading flagged again on field fence pricing.
            {' '}Compliance sits at <span className="font-semibold">76%</span>, above the 70% target, but 3 reps have unactioned alerts older than 5 days.
          </p>
          <p className="text-muted-foreground text-[11px] mt-1.5">Generated 17 May 2026, 07:02 · Based on price alert, Sage export, and logistics data</p>
        </div>
      </div>

      {/* ── KPI strip ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Revenue (May MTD)',
            value: 'R22.6M',
            sub: '↑ R1.2M vs April — field fence leading',
            accent: false,
            subColor: 'text-success',
          },
          {
            label: 'Tonnage Shipped (MTD)',
            value: '1,840t',
            sub: '↓ 3% vs plan — Joburg route delays',
            accent: false,
            subColor: 'text-danger',
          },
          {
            label: 'Compliance (May)',
            value: '76%',
            sub: 'Target 70% · 3 reps unactioned >5 days',
            accent: false,
            subColor: 'text-warning',
          },
          {
            label: 'Material Alerts',
            value: materialToday.toString(),
            sub: '12 repeat offenders — Clear Creek flagged again',
            accent: true,
            subColor: 'text-danger',
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide">{kpi.label}</p>
            <p className={`text-[28px] font-bold leading-none mt-1 ${kpi.accent ? 'text-danger' : 'text-foreground'}`}>
              {kpi.value}
            </p>
            <p className={`text-[11px] mt-1 leading-snug ${kpi.subColor}`}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">

        {/* ── Recent analyses ──────────────────────────────── */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-foreground text-[13px] font-semibold">Recent Analyses</span>
            <button
              onClick={() => onNavigate('analyses')}
              className="text-[11px] text-accent hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-border">
            {recent.map((ana) => (
              <div
                key={ana.id}
                onClick={() => onNavigate('analysis-detail')}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-foreground text-[12.5px] font-medium truncate">{ana.filename}</span>
                    <StatusBadge status={ana.status} />
                    <FrameworkBadge framework={ana.framework} />
                  </div>
                  <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-1">{ana.summary}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-danger text-[11px] font-semibold">{ana.material}M</span>
                    <span className="text-muted-foreground/40 text-[10px]">/</span>
                    <span className="text-warning text-[11px]">{ana.watch}W</span>
                  </div>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{ana.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────── */}
        <div className="space-y-4">

          {/* Open signals */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-[13px] font-semibold">Open Signals</span>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-danger/15 text-danger">
                  {openFlags.length}
                </span>
              </div>
              <button onClick={() => onNavigate('signals')} className="text-[11px] text-accent hover:underline">
                All signals →
              </button>
            </div>
            <div className="divide-y divide-border">
              {openFlags.slice(0, 3).map((flag) => (
                <div key={flag.id} className="px-4 py-3 flex items-start gap-2.5">
                  <span className={`mt-0.5 shrink-0 w-2 h-2 rounded-full ${
                    flag.severity === 'showstopper' ? 'bg-danger' : 'bg-warning'
                  }`} />
                  <div className="min-w-0">
                    <p className="text-foreground text-[12px] font-medium line-clamp-1">{flag.title}</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5 line-clamp-2">{flag.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scorecard snapshot */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-foreground text-[13px] font-semibold">Scorecard Snapshot</span>
              <button onClick={() => onNavigate('scorecards')} className="text-[11px] text-accent hover:underline">
                Full view →
              </button>
            </div>
            <div className="px-4 py-3 space-y-3">
              {MOCK_SCORECARD.slice(0, 4).map((cat) => {
                const colors = platformConfig.categoryColors[cat.colorKey as CategoryColorKey]
                return (
                  <div key={cat.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground truncate">{cat.label}</span>
                      <span className="text-[11px] font-semibold ml-2 shrink-0" style={{ color: colors.text }}>
                        {cat.score}
                      </span>
                    </div>
                    <ScoreBar
                      score={cat.score}
                      colorStrong={colors.strong}
                      colorTint={colors.tint}
                      height={5}
                    />
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Analysis',     icon: '+',  page: 'new-analysis' as Page, primary: true },
          { label: 'Browse Analyses',  icon: '≡',  page: 'analyses'     as Page, primary: false },
          { label: 'View Signals',     icon: '⚡', page: 'signals'      as Page, primary: false },
          { label: 'Export Report',    icon: '↓',  page: 'exports'      as Page, primary: false },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.page)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[12px] font-medium transition-colors ${
              action.primary
                ? 'bg-primary text-primary-foreground border-primary hover:opacity-90'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <span className="text-[14px]">{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>

    </div>
  )
}
