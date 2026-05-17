'use client'

import { MOCK_SCORECARD } from '@/config/mockData'
import type { CategoryColorKey } from '@/config/mockData'
import { platformConfig } from '@/config/platform'
import ScoreBar from '@/components/ui/ScoreBar'

export default function ScorecardsPage() {
  const overallScore = Math.round(MOCK_SCORECARD.reduce((s, c) => s + c.score, 0) / MOCK_SCORECARD.length)

  return (
    <div className="p-6 space-y-6 max-w-[900px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Scorecards</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          Composite intelligence scorecard across all active frameworks. Last updated 17 May 2026.
        </p>
      </div>

      {/* Overall score ring */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-8">
        {/* Ring */}
        <div className="relative shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* Track */}
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(47 55 70)" strokeWidth="10"/>
            {/* Progress */}
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="#C0392B"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[32px] font-bold text-foreground leading-none">{overallScore}</span>
            <span className="text-muted-foreground text-[10px] mt-0.5">/ 100</span>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-foreground text-[16px] font-semibold">Overall Intelligence Score</p>
          <p className="text-muted-foreground text-[13px]">
            Composite of 6 categories weighted by operational priority for Hendok Group.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: 'Strong (80+)', color: 'bg-success/15 text-success border-success/20' },
              { label: 'Moderate (60–79)', color: 'bg-warning/15 text-warning border-warning/20' },
              { label: 'At Risk (<60)', color: 'bg-danger/15 text-danger border-danger/20' },
            ].map((l) => (
              <span key={l.label} className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${l.color}`}>
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_SCORECARD.map((cat) => {
          const colors = platformConfig.categoryColors[cat.colorKey as CategoryColorKey]
          const band = cat.score >= 80 ? 'Strong' : cat.score >= 60 ? 'Moderate' : 'At Risk'
          const bandColor = cat.score >= 80 ? 'text-success' : cat.score >= 60 ? 'text-warning' : 'text-danger'

          return (
            <div key={cat.key} className="bg-card border border-border rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-foreground text-[13px] font-semibold">{cat.label}</p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">{cat.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[22px] font-bold" style={{ color: colors.text }}>
                    {cat.score}
                  </span>
                  <p className={`text-[10px] font-medium ${bandColor}`}>{band}</p>
                </div>
              </div>
              <ScoreBar
                score={cat.score}
                colorStrong={colors.strong}
                colorTint={colors.tint}
                height={8}
              />
              {/* History sparkline placeholder */}
              <div className="flex items-end gap-1 h-8">
                {[65, 70, 68, 72, 71, 74, cat.score].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm opacity-60"
                    style={{
                      height: `${(v / 100) * 100}%`,
                      background: colors.strong,
                    }}
                  />
                ))}
              </div>
              <p className="text-muted-foreground/50 text-[9px]">7-day trend</p>
            </div>
          )
        })}
      </div>

      {/* Footnote */}
      <p className="text-muted-foreground/50 text-[10px]">
        Scores are derived from the most recent analysis session and reset with each new upload. Historical trend data is illustrative for the prototype.
      </p>

    </div>
  )
}
