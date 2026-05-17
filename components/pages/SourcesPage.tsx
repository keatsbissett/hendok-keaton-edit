'use client'

import { MOCK_SOURCES } from '@/config/mockData'

export default function SourcesPage() {
  return (
    <div className="p-6 space-y-5 max-w-[900px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Sources</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          Document types accepted by the Nucleus AI analysis engine for Hendok Group.
        </p>
      </div>

      {/* Sources grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOCK_SOURCES.map((src) => {
          const isComingSoon = src.status === 'coming-soon'
          return (
            <div
              key={src.id}
              className={`bg-card border rounded-xl p-4 space-y-3 transition-colors ${
                isComingSoon ? 'border-border opacity-60' : 'border-border hover:border-primary/25'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-foreground text-[13px] font-semibold">{src.name}</span>
                    {isComingSoon ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-muted/60 text-muted-foreground border border-border">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-success/10 text-success border border-success/20">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-[12px] mt-1 leading-snug">{src.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {src.formats.map((fmt) => (
                  <span key={fmt} className="px-2 py-0.5 rounded-md bg-muted/50 border border-border text-muted-foreground text-[10px] font-medium">
                    {fmt}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-[11px] text-muted-foreground">
                  {src.lastProcessed ? (
                    <span>Last processed: <span className="text-foreground">{src.lastProcessed}</span></span>
                  ) : (
                    <span>Not yet processed</span>
                  )}
                </div>
                {src.runCount > 0 && (
                  <span className="text-[11px] text-muted-foreground">
                    <span className="text-foreground font-medium">{src.runCount}</span> runs
                  </span>
                )}
              </div>

              {!isComingSoon && (
                <button className="w-full py-2 rounded-lg border border-border text-muted-foreground text-[12px] hover:text-foreground hover:bg-muted/40 transition-colors">
                  Upload Document
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Footnote */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-muted/30 border border-border">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground/50 mt-0.5 shrink-0">
          <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="0.9"/>
          <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="0.9"/>
        </svg>
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          All documents are processed in-memory only. No data is written to disk, stored in a database, or retained after your session ends.
        </p>
      </div>

    </div>
  )
}
