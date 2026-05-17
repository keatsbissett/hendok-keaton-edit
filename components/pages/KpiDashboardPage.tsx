'use client'

import { platformConfig } from '@/config/platform'
import ScoreBar from '@/components/ui/ScoreBar'

// KPI mock data
const KPI_METRICS = [
  { label: 'Price Compliance Rate', value: '76%', change: '+3%', positive: true,  sub: 'vs. last 30 days' },
  { label: 'Material Alerts/Week',  value: '8',   change: '-2',  positive: true,  sub: 'vs. 10 last week' },
  { label: 'On-Time Delivery',      value: '82%', change: '-5%', positive: false, sub: 'KZN Inner at 34%' },
  { label: 'Debtor Days (Avg)',      value: '47',  change: '+4',  positive: false, sub: '93d max — Zimsteel' },
  { label: 'Reps in Tolerance',      value: '4/5', change: '±0',  positive: true,  sub: 'Sipho Dlamini flagged' },
  { label: 'Data Completeness',      value: '88%', change: '+2%', positive: true,  sub: 'All fields populated' },
]

const TREND_DATA = [
  { week: 'W18', compliance: 68, alerts: 14 },
  { week: 'W19', compliance: 70, alerts: 11 },
  { week: 'W20', compliance: 73, alerts: 10 },
  { week: 'W21', compliance: 71, alerts: 12 },
  { week: 'W22', compliance: 76, alerts: 8  },
]

const REGIONAL = [
  { region: 'Gauteng',    compliance: 82, volume: 35 },
  { region: 'KZN Outer',  compliance: 78, volume: 28 },
  { region: 'Western Cape', compliance: 75, volume: 20 },
  { region: 'Eastern Cape', compliance: 71, volume: 10 },
  { region: 'KZN Inner',  compliance: 52, volume: 7  },
]

export default function KpiDashboardPage() {
  const maxVol = Math.max(...REGIONAL.map((r) => r.volume))

  return (
    <div className="p-6 space-y-6 max-w-[1100px]">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-foreground text-[18px] font-semibold">KPI Dashboard</h2>
          <p className="text-muted-foreground text-[12px] mt-0.5">
            Rolling intelligence metrics for Hendok Group — last 30 days.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-semibold">
          Preview
        </span>
      </div>

      {/* KPI metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {KPI_METRICS.map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wide">{kpi.label}</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-[28px] font-bold text-foreground leading-none">{kpi.value}</span>
              <span className={`text-[11px] font-semibold mb-0.5 ${kpi.positive ? 'text-success' : 'text-danger'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-muted-foreground text-[10px] mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">

        {/* Compliance trend */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-foreground text-[13px] font-semibold">Compliance Trend</span>
          </div>
          <div className="p-4">
            {/* Bar chart simulation */}
            <div className="flex items-end gap-3 h-32">
              {TREND_DATA.map((d) => (
                <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground font-medium">{d.compliance}%</span>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${(d.compliance / 100) * 100}%`,
                      background: platformConfig.categoryColors.financial.strong,
                      opacity: 0.7,
                    }}
                  />
                  <span className="text-[9px] text-muted-foreground">{d.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regional breakdown */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-foreground text-[13px] font-semibold">Regional Compliance</span>
          </div>
          <div className="px-4 py-3 space-y-3">
            {REGIONAL.map((r) => {
              const colors = platformConfig.categoryColors.market
              const atRisk = r.compliance < 65
              return (
                <div key={r.region}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-foreground">{r.region}</span>
                    <span className={`text-[11px] font-semibold ${atRisk ? 'text-danger' : 'text-foreground'}`}>
                      {r.compliance}%
                    </span>
                  </div>
                  <ScoreBar
                    score={r.compliance}
                    colorStrong={atRisk ? '#CA324C' : colors.strong}
                    colorTint={atRisk ? 'rgba(202,50,76,0.10)' : colors.tint}
                    height={6}
                  />
                  <div className="flex justify-end mt-0.5">
                    <span className="text-[9px] text-muted-foreground">{r.volume}% of volume</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Alert trend */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-foreground text-[13px] font-semibold">Weekly Material Alert Count</span>
        </div>
        <div className="p-4 flex items-end gap-4 h-24">
          {TREND_DATA.map((d) => (
            <div key={d.week} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-danger font-semibold">{d.alerts}</span>
              <div
                className="w-full rounded-t-md bg-danger/40"
                style={{ height: `${(d.alerts / 15) * 80}%` }}
              />
              <span className="text-[9px] text-muted-foreground">{d.week}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
