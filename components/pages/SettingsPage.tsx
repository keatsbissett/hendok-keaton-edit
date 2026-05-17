import PageHeader from '@/components/ui/PageHeader'
import { clientConfig } from '@/config/client'

const FRAMEWORKS = [
  { key: 'price-alert', label: 'Price Alert', desc: 'Detects orders placed below minimum selling price', status: 'active' },
  { key: 'sage-export', label: 'Sage Export', desc: 'Parses Sage debtor ageing and invoice exports', status: 'active' },
  { key: 'screenshot', label: 'Screenshot / Vision', desc: 'Reads operational screenshots using Claude vision', status: 'active' },
  { key: 'logistics', label: 'Logistics', desc: 'Analyses fleet and delivery reports (CTrack, Vantage)', status: 'active' },
  { key: 'stock-take', label: 'Stock Take', desc: 'Processes inventory counts and DIMS variance reports', status: 'active' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="text-white/35 text-xs uppercase tracking-wider font-medium mb-3">{title}</p>
      <div className="rounded-[10px] bg-[#1a1d27] border border-white/[0.07] overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function Row({ label, value, sub, badge }: { label: string; value: string; sub?: string; badge?: { text: string; color: string } }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3.5 border-b border-white/[0.05] last:border-b-0">
      <div>
        <p className="text-white/60 text-sm">{label}</p>
        {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {badge && (
          <span className={`text-[10px] px-2 py-0.5 rounded-pill font-medium ${badge.color}`}>
            {badge.text}
          </span>
        )}
        <span className="text-white/40 text-sm text-right">{value}</span>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="px-6 py-7 max-w-2xl mx-auto">
      <PageHeader
        title="Settings"
        description="Platform configuration and status. Most settings are managed via environment variables."
      />

      {/* Client configuration */}
      <Section title="Client configuration">
        <Row label="Client name" value={clientConfig.name} />
        <Row label="Industry" value={clientConfig.context.industry} />
        <Row label="Location" value={clientConfig.context.location} />
        <Row label="Currency" value={clientConfig.context.currency} />
        <Row label="Units" value={clientConfig.context.units} />
        <Row
          label="Domain"
          value={clientConfig.domain}
          sub="Target production domain"
        />
        <Row
          label="Powered by"
          value={clientConfig.poweredBy}
        />
      </Section>

      {/* Document frameworks */}
      <Section title="Document frameworks">
        {FRAMEWORKS.map((fw) => (
          <div
            key={fw.key}
            className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/[0.05] last:border-b-0"
          >
            <div>
              <p className="text-white/60 text-sm">{fw.label}</p>
              <p className="text-white/30 text-xs mt-0.5">{fw.desc}</p>
            </div>
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27ae60]" />
              <span className="text-[#27ae60]/70 text-xs">Active</span>
            </span>
          </div>
        ))}
      </Section>

      {/* AI model */}
      <Section title="AI model">
        <Row
          label="Model"
          value="claude-sonnet-4-20250514"
          sub="Locked — do not change without reviewing prompts"
        />
        <Row
          label="Max tokens"
          value="4,096"
        />
        <Row
          label="Zero data retention"
          value="Enabled"
          badge={{ text: 'anthropic-beta: data-privacy', color: 'text-[#27ae60]/70 bg-[rgba(39,174,96,0.08)] border border-[rgba(39,174,96,0.15)]' }}
          sub="ZDR header on every API call — Anthropic does not retain your data"
        />
        <Row
          label="Processing"
          value="In-memory only"
          sub="No document data written to disk, database, or cloud storage"
        />
      </Section>

      {/* Authentication */}
      <Section title="Authentication">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-white/60 text-sm">Provider</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-amber-400/70 text-xs">Disabled</span>
            </div>
          </div>
          <p className="text-white/30 text-xs">Microsoft Entra ID (Azure AD)</p>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-start gap-2.5 p-3 rounded-[6px] bg-amber-500/[0.06] border border-amber-500/[0.15]">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-amber-400/70 shrink-0 mt-0.5">
              <path d="M6.5 1.5l5 9H1.5l5-9z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
              <path d="M6.5 5v2.5M6.5 9v.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-amber-400/80 text-xs font-medium mb-0.5">Authentication is disabled</p>
              <p className="text-amber-400/50 text-xs leading-relaxed">
                This is a development build. Authentication will be re-enabled once Azure AD credentials
                are configured in Vercel environment variables and the auth flow has been tested.
              </p>
              <p className="text-amber-400/40 text-[10px] mt-1.5 font-mono">
                Required: AZURE_AD_CLIENT_ID · AZURE_AD_CLIENT_SECRET · AZURE_AD_TENANT_ID · NEXTAUTH_SECRET
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Regions and products */}
      <Section title="Business context">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Products</p>
          <div className="flex flex-wrap gap-1.5">
            {clientConfig.context.products.map((p) => (
              <span key={p} className="px-2 py-0.5 rounded text-xs bg-white/[0.04] text-white/40 border border-white/[0.06] font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Regions</p>
          <div className="flex flex-wrap gap-1.5">
            {clientConfig.context.regions.map((r) => (
              <span key={r} className="px-2 py-0.5 rounded text-xs bg-white/[0.04] text-white/40 border border-white/[0.06]">
                {r}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* About */}
      <Section title="About">
        <Row label="Template" value="nucleus-platform" />
        <Row label="Version" value="0.1.0" />
        <Row label="Next.js" value="14 (App Router)" />
        <Row label="Build" value="Vercel — serverless" />
        <div className="px-5 py-3.5 flex items-center justify-between">
          <p className="text-white/30 text-xs">Nucleus AI</p>
          <p className="text-white/20 text-xs">nucleusai.co.za</p>
        </div>
      </Section>
    </div>
  )
}
