'use client'

import { platformConfig } from '@/config/platform'

export default function BrandConfigPage() {
  const categories = Object.entries(platformConfig.categoryColors)

  return (
    <div className="p-6 space-y-6 max-w-[800px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Brand Config</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          Live design token preview for this client portal. Edit <code className="text-accent text-[11px] bg-accent/10 px-1 rounded">config/platform.ts</code> to update.
        </p>
      </div>

      {/* Portal identity */}
      <Section title="Portal Identity">
        <div className="px-5 py-4 grid grid-cols-2 gap-4">
          {/* Platform mark */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium">Platform Mark</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-[16px]">{platformConfig.platformShortName}</span>
              </div>
              <div>
                <p className="text-foreground text-[13px] font-semibold">{platformConfig.platformName}</p>
                <p className="text-muted-foreground text-[11px]">{platformConfig.clientName}</p>
              </div>
            </div>
          </div>
          {/* Client mark */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium">Client Mark</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
                <span className="text-primary font-bold text-[16px]">{platformConfig.clientShortName}</span>
              </div>
              <div>
                <p className="text-foreground text-[13px] font-semibold">{platformConfig.portalName}</p>
                <p className="text-muted-foreground text-[11px]">{platformConfig.clientName}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="px-5 py-4 space-y-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium">Display / Heading</p>
            <p className="text-foreground text-[28px] font-semibold leading-tight">Intelligence Workspace</p>
            <p className="text-muted-foreground text-[11px]">{platformConfig.theme.headingFont} — 28px Semibold</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium">Body</p>
            <p className="text-foreground text-[14px] leading-relaxed">
              Nucleus AI is the operational intelligence layer for Hendok Group — turning raw exports and alerts into structured, actionable briefs.
            </p>
            <p className="text-muted-foreground text-[11px]">{platformConfig.theme.bodyFont} — 14px Regular</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium">Mono / Code</p>
            <p className="text-foreground text-[13px] font-mono">R18.40 · −19.3% · MATERIAL</p>
            <p className="text-muted-foreground text-[11px]">{platformConfig.theme.monoFont} — 13px</p>
          </div>
        </div>
      </Section>

      {/* Colour system */}
      <Section title="Colour System">
        <div className="px-5 py-4 space-y-5">
          {/* Primary palette */}
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium mb-3">Brand Palette</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Primary',    bg: platformConfig.theme.primaryColor, text: '#FFFFFF' },
                { name: 'Accent',     bg: platformConfig.theme.accentColor,  text: '#FFFFFF' },
                { name: 'Background', bg: '#0D1117',                         text: '#EFF3F8' },
                { name: 'Card',       bg: '#1C222D',                         text: '#EFF3F8' },
              ].map((c) => (
                <div key={c.name} className="rounded-xl overflow-hidden border border-border w-[90px]">
                  <div className="h-12" style={{ background: c.bg }} />
                  <div className="px-2 py-1.5 bg-card">
                    <p className="text-[10px] font-medium text-foreground">{c.name}</p>
                    <p className="text-[9px] text-muted-foreground font-mono">{c.bg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic colours */}
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium mb-3">Semantic Colours</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Success',  bg: '#26 9A 6F', hex: '#269A6F' },
                { name: 'Warning',  bg: '#E0 82 24', hex: '#E08224' },
                { name: 'Danger',   bg: '#CA 32 4C', hex: '#CA324C' },
                { name: 'Info',     bg: '#3B 7B F6', hex: '#3B7BF6' },
              ].map((c) => (
                <div key={c.name} className="rounded-xl overflow-hidden border border-border w-[90px]">
                  <div className="h-12" style={{ background: c.hex }} />
                  <div className="px-2 py-1.5 bg-card">
                    <p className="text-[10px] font-medium text-foreground">{c.name}</p>
                    <p className="text-[9px] text-muted-foreground font-mono">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category colours */}
          <div>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wide font-medium mb-3">Category Colours</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map(([key, val]) => (
                <div key={key} className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-card/50">
                  <div className="w-8 h-8 rounded-lg shrink-0" style={{ background: val.tint, border: `1px solid ${val.border}` }}>
                    <div className="w-full h-full rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full" style={{ background: val.strong }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-[12px] font-medium capitalize">{key}</p>
                    <p className="text-muted-foreground text-[10px] font-mono">{val.strong}</p>
                  </div>
                  <div className="flex gap-1">
                    {[val.strong, val.text, val.tint].map((c, i) => (
                      <div key={i} className="w-4 h-4 rounded-sm border border-border/50" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Tier scale */}
      <Section title="Tier Colour Scale">
        <div className="px-5 py-4 space-y-3">
          {[
            { tier: 'MATERIAL', desc: 'Immediate review required — material business risk', classes: 'bg-danger/10 text-danger border-danger/20' },
            { tier: 'WATCH',    desc: 'Monitor — approaching threshold or pattern forming',  classes: 'bg-warning/10 text-warning border-warning/20' },
            { tier: 'SKIP',     desc: 'Within tolerance — no action required',               classes: 'bg-muted/50 text-muted-foreground border-border' },
          ].map((t) => (
            <div key={t.tier} className="flex items-center gap-4">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold border w-28 justify-center shrink-0 ${t.classes}`}>
                {t.tier}
              </span>
              <p className="text-muted-foreground text-[12px]">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-2.5 border-b border-border">
        <span className="text-foreground text-[12px] font-semibold">{title}</span>
      </div>
      {children}
    </div>
  )
}
