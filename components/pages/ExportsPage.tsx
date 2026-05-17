'use client'

import { EXPORT_TEMPLATES } from '@/config/mockData'
import { MOCK_ANALYSES } from '@/config/mockData'
import StatusBadge, { FrameworkBadge } from '@/components/ui/StatusBadge'

export default function ExportsPage() {
  const exportable = MOCK_ANALYSES.filter((a) => a.status === 'complete' || a.status === 'review')

  return (
    <div className="p-6 space-y-6 max-w-[900px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Exports</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          Export your analyses in multiple formats for reporting or downstream tooling.
        </p>
      </div>

      {/* Templates */}
      <div>
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide mb-3">Export Templates</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPORT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`bg-card border rounded-xl p-4 flex items-start gap-3 transition-colors ${
                tmpl.available ? 'border-border hover:border-primary/25' : 'border-border opacity-50'
              }`}
            >
              {/* Format badge */}
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <span className="text-accent text-[10px] font-bold">{tmpl.format}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-[12.5px] font-semibold">{tmpl.name}</span>
                  {!tmpl.available && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-muted/60 text-muted-foreground border border-border">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-[11px] mt-0.5 leading-snug">{tmpl.description}</p>
                {tmpl.available && (
                  <button className="mt-2 text-[11px] text-primary hover:underline">
                    Export →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exportable analyses */}
      <div>
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide mb-3">
          Ready to Export ({exportable.length})
        </p>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                {['File', 'Framework', 'Date', 'M / W', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {exportable.map((ana) => (
                <tr key={ana.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-foreground text-[12.5px] font-medium">{ana.filename}</span>
                  </td>
                  <td className="px-4 py-3">
                    <FrameworkBadge framework={ana.framework} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[12px] whitespace-nowrap">
                    {ana.date}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-danger text-[12px] font-semibold">{ana.material}</span>
                    <span className="text-muted-foreground/40 text-[10px] mx-1">/</span>
                    <span className="text-warning text-[12px]">{ana.watch}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ana.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-[11px] hover:text-foreground hover:bg-muted/40 transition-colors">
                        PDF
                      </button>
                      <button className="px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-[11px] hover:text-foreground hover:bg-muted/40 transition-colors">
                        Excel
                      </button>
                      <button className="px-2.5 py-1 rounded-lg border border-border text-muted-foreground text-[11px] hover:text-foreground hover:bg-muted/40 transition-colors">
                        Copy
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
