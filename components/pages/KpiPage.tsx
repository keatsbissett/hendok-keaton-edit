import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'

/* ─── Synthetic Hendok data (Phase E concept preview) ─── */

const KPI_STATS = [
  {
    label: 'Daily Sales Captured',
    value: 'R 2.41M',
    sub: 'vs R 2.18M yesterday',
    color: 'text-white',
    pill: { text: '+10.5%', color: 'text-[#27ae60] bg-[rgba(39,174,96,0.1)] border border-[rgba(39,174,96,0.2)]' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10l3-3.5 2.5 2L10 5l2 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Daily Sales Dispatched',
    value: 'R 1.84M',
    sub: 'vs R 2.01M yesterday',
    color: 'text-white',
    pill: { text: '-8.5%', color: 'text-[#e74c3c] bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.2)]' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="5" width="8" height="5.5" rx="1" stroke="currentColor" strokeWidth="1" />
        <path d="M9 6.5h1.5L12 9H9V6.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="3" cy="11" r="1" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="10" cy="11" r="1" stroke="currentColor" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    label: 'Field Fence Margin',
    value: '24.3%',
    sub: 'Target: 26% — watch zone',
    color: 'text-[#e6a817]',
    bg: 'bg-[rgba(230,168,23,0.05)]',
    pill: { text: '-1.7pp', color: 'text-[#e6a817] bg-[rgba(230,168,23,0.1)] border border-[rgba(230,168,23,0.2)]' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10L7 4l2.5 3L12 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="3" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Active Price Alerts',
    value: '7',
    sub: '3 material · 4 watch',
    color: 'text-[#e74c3c]',
    bg: 'bg-[rgba(231,76,60,0.05)]',
    pill: { text: '+2 today', color: 'text-[#e74c3c] bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.2)]' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5v5.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
]

const REGIONAL_DATA = [
  { region: 'Inner KZN', value: 38, amount: 'R 915k', color: 'bg-[#C0392B]' },
  { region: 'Gauteng', value: 27, amount: 'R 650k', color: 'bg-[#C0392B]/80' },
  { region: 'Cape Town', value: 14, amount: 'R 337k', color: 'bg-[#C0392B]/60' },
  { region: 'Outer KZN', value: 10, amount: 'R 241k', color: 'bg-white/20' },
  { region: 'Zimbabwe', value: 6, amount: 'R 145k', color: 'bg-white/15' },
  { region: 'Botswana', value: 4, amount: 'R 96k', color: 'bg-white/10' },
  { region: 'Lesotho', value: 1, amount: 'R 24k', color: 'bg-white/[0.07]' },
]

const CUSTOMER_VARIANCE = [
  { customer: 'Thekweni Reinforcing', account: 'TH0110', v2024: 'R 318k', v2025: 'R 391k', delta: '+22.9%', up: true },
  { customer: 'Buildmart SA', account: 'BM220', v2024: 'R 204k', v2025: 'R 247k', delta: '+21.1%', up: true },
  { customer: 'African Mesh Distributors', account: 'AM088', v2024: 'R 176k', v2025: 'R 163k', delta: '-7.4%', up: false },
  { customer: 'Clear Creek Trading', account: 'CC001', v2024: 'R 289k', v2025: 'R 261k', delta: '-9.7%', up: false },
  { customer: 'Spa Warehouse Holdings', account: 'SW041', v2024: 'R 142k', v2025: 'R 118k', delta: '-16.9%', up: false },
  { customer: 'Durban Hardware Supplies', account: 'DH019', v2024: 'R 87k', v2025: 'R 112k', delta: '+28.7%', up: true },
  { customer: 'Lesotho Building Materials', account: 'LB203', v2024: 'R 63k', v2025: 'R 71k', delta: '+12.7%', up: true },
  { customer: 'Zimsteel Trading', account: 'ZS301', v2024: 'R 94k', v2025: 'R 77k', delta: '-18.1%', up: false },
]

export default function KpiPage() {
  return (
    <div className="px-6 py-7 max-w-4xl mx-auto">
      <PageHeader
        title="KPI Dashboard"
        description="Concept preview using synthetic Hendok data. Live figures will connect once data integrations are configured."
        badge={{ text: 'Preview — synthetic data', color: 'text-amber-400/70 border-amber-500/20 bg-amber-500/[0.06]' }}
      />

      {/* Stat row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {KPI_STATS.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            sub={s.sub}
            color={s.color}
            bg={s.bg}
            icon={s.icon}
            pill={s.pill}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Regional bar chart */}
        <div className="lg:col-span-3 rounded-[10px] bg-[#1a1d27] border border-white/[0.07] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-white/70 text-sm font-medium">Regional Sales</p>
              <p className="text-white/30 text-xs mt-0.5">Week to date · All products</p>
            </div>
            <span className="text-white/25 text-xs font-mono">R 2.41M total</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {REGIONAL_DATA.map((r) => (
              <div key={r.region} className="flex items-center gap-3">
                <span className="text-white/40 text-[11px] w-[100px] shrink-0 truncate">{r.region}</span>
                <div className="flex-1 h-5 rounded bg-white/[0.04] overflow-hidden">
                  <div
                    className={`h-full rounded ${r.color} transition-all`}
                    style={{ width: `${r.value}%` }}
                  />
                </div>
                <span className="text-white/40 text-[11px] font-mono w-14 text-right shrink-0">{r.amount}</span>
                <span className="text-white/25 text-[10px] w-7 text-right shrink-0">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product mix donut placeholder */}
        <div className="lg:col-span-2 rounded-[10px] bg-[#1a1d27] border border-white/[0.07] p-5 flex flex-col">
          <div className="mb-4">
            <p className="text-white/70 text-sm font-medium">Product Mix</p>
            <p className="text-white/30 text-xs mt-0.5">Revenue share · MTD</p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            {[
              { product: 'Field Fence', pct: 34, color: 'bg-[#C0392B]' },
              { product: 'Agricultural Wire', pct: 22, color: 'bg-[#C0392B]/70' },
              { product: 'Galvanised Wire', pct: 16, color: 'bg-white/30' },
              { product: 'Wire Mesh', pct: 12, color: 'bg-white/20' },
              { product: 'Other', pct: 16, color: 'bg-white/[0.1]' },
            ].map((p) => (
              <div key={p.product} className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-sm ${p.color} shrink-0`} />
                <span className="text-white/45 text-xs flex-1">{p.product}</span>
                <span className="font-mono text-white/50 text-xs">{p.pct}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-white/[0.05] text-center">
            <p className="text-white/20 text-[10px]">Live chart — coming with data integration</p>
          </div>
        </div>
      </div>

      {/* Customer variance table */}
      <div className="rounded-[10px] bg-[#1a1d27] border border-white/[0.07] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm font-medium">Customer Revenue Variance</p>
            <p className="text-white/30 text-xs mt-0.5">2024 vs 2025 · Same period</p>
          </div>
          <span className="text-white/20 text-xs">Synthetic data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left px-5 py-2.5 text-white/30 text-xs font-medium uppercase tracking-wider">Customer</th>
                <th className="text-left px-3 py-2.5 text-white/30 text-xs font-medium uppercase tracking-wider hidden sm:table-cell">Account</th>
                <th className="text-right px-3 py-2.5 text-white/30 text-xs font-medium uppercase tracking-wider">2024</th>
                <th className="text-right px-3 py-2.5 text-white/30 text-xs font-medium uppercase tracking-wider">2025</th>
                <th className="text-right px-5 py-2.5 text-white/30 text-xs font-medium uppercase tracking-wider">Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {CUSTOMER_VARIANCE.map((row) => (
                <tr key={row.account} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-white/70 text-sm">{row.customer}</td>
                  <td className="px-3 py-3 text-white/30 text-xs font-mono hidden sm:table-cell">{row.account}</td>
                  <td className="px-3 py-3 text-white/40 text-sm font-mono text-right">{row.v2024}</td>
                  <td className="px-3 py-3 text-white/60 text-sm font-mono text-right">{row.v2025}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`text-sm font-mono font-medium ${
                        row.up ? 'text-[#27ae60]' : 'text-[#e74c3c]'
                      }`}
                    >
                      {row.delta}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/[0.05] flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-white/20">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="0.9" />
            <path d="M5.5 3v3M5.5 7.5v.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          </svg>
          <p className="text-white/20 text-[10px]">
            All figures are synthetic and for concept demonstration only. Connect live data via Settings.
          </p>
        </div>
      </div>
    </div>
  )
}
