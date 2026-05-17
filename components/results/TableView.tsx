import type { AnalysisResult } from '@/lib/types'

interface TableViewProps {
  result: AnalysisResult
}

// Framework 3/4/5 — extracted table + anomalies
export default function TableView({ result }: TableViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[10px] bg-[#1a1d27] border border-white/[0.08] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="px-4 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Metric</th>
              <th className="px-4 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Finding</th>
              <th className="px-4 py-3 text-left text-white/40 text-xs font-medium uppercase tracking-wider">Tier</th>
            </tr>
          </thead>
          <tbody>
            {result.items.map((item, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 text-white/70 font-medium">{item.product ?? item.customer}</td>
                <td className="px-4 py-3 text-white/55 text-sm leading-relaxed">{item.story}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-pill text-xs font-medium font-mono ${
                      item.tier === 'MATERIAL'
                        ? 'bg-[rgba(231,76,60,0.15)] text-[#e74c3c]'
                        : item.tier === 'WATCH'
                        ? 'bg-[rgba(230,168,23,0.15)] text-[#e6a817]'
                        : 'bg-[rgba(39,174,96,0.12)] text-[#27ae60]'
                    }`}
                  >
                    {item.tier}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
