'use client'

import { platformConfig } from '@/config/platform'

export default function SettingsPageNew() {
  return (
    <div className="p-6 space-y-6 max-w-[760px]">

      {/* Header */}
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">Settings</h2>
        <p className="text-muted-foreground text-[12px] mt-0.5">
          Workspace configuration for {platformConfig.clientName}.
        </p>
      </div>

      {/* Client identity */}
      <Section title="Client Identity">
        <Field label="Platform Name"    value={platformConfig.platformName} />
        <Field label="Client Name"      value={platformConfig.clientName} />
        <Field label="Portal Name"      value={platformConfig.portalName} />
        <Field label="Brand Voice"      value={platformConfig.brandVoice} />
      </Section>

      {/* Environment */}
      <Section title="Environment">
        <Field label="Environment" value={platformConfig.environment.toUpperCase()} accent />
        <Field label="Show Env Badge" value={platformConfig.showEnvironmentBadge ? 'Yes' : 'No'} />
      </Section>

      {/* Theme */}
      <Section title="Theme">
        <div className="px-4 py-3 border-b border-border last:border-0 flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-[12px]">Primary Colour</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border border-border" style={{ background: platformConfig.theme.primaryColor }} />
            <span className="text-foreground text-[12px] font-mono">{platformConfig.theme.primaryColor}</span>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-border last:border-0 flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-[12px]">Accent Colour</span>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md border border-border" style={{ background: platformConfig.theme.accentColor }} />
            <span className="text-foreground text-[12px] font-mono">{platformConfig.theme.accentColor}</span>
          </div>
        </div>
        <Field label="Heading Font" value={platformConfig.theme.headingFont} />
        <Field label="Body Font"    value={platformConfig.theme.bodyFont} />
        <Field label="Density"      value={platformConfig.theme.density} />
      </Section>

      {/* AI model */}
      <Section title="AI Model">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-foreground text-[12px] font-medium">claude-3-7-sonnet-20250219</span>
          </div>
          <p className="text-muted-foreground text-[11px]">
            Connected via Anthropic API. Data Privacy (ZDR) header active. Documents are not used for model training.
          </p>
        </div>
      </Section>

      {/* Privacy */}
      <Section title="Data Privacy">
        <div className="px-4 py-3">
          <p className="text-muted-foreground text-[12px] leading-relaxed">{platformConfig.privacyNote}</p>
        </div>
      </Section>

      {/* Danger zone */}
      <div className="bg-card border border-danger/20 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-danger/10">
          <span className="text-danger text-[13px] font-semibold">Danger Zone</span>
        </div>
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-foreground text-[12px] font-medium">Clear Session Data</p>
            <p className="text-muted-foreground text-[11px] mt-0.5">Removes all in-memory analyses and signals from this session.</p>
          </div>
          <button className="px-3 py-1.5 rounded-lg border border-danger/30 text-danger text-[12px] hover:bg-danger/10 transition-colors shrink-0">
            Clear Data
          </button>
        </div>
      </div>

    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border">
        <span className="text-foreground text-[12px] font-semibold">{title}</span>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </div>
  )
}

function Field({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[12px]">{label}</span>
      <span className={`text-[12px] font-medium ${accent ? 'text-warning' : 'text-foreground'}`}>{value}</span>
    </div>
  )
}
