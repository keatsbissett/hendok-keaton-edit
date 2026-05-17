'use client'

import { platformConfig } from '@/config/platform'
import { MODULE_PAGES, PORTAL_MODULES } from '@/config/navigation'
import type { Page, PortalModule } from '@/lib/types'

interface AppSidebarProps {
  activeModule: PortalModule
  activePage: Page
  onNavigate: (page: Page) => void
}

// Page icons (16×16)
function PageIcon({ id }: { id: Page }) {
  const icons: Record<Page, React.ReactNode> = {
    overview: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <rect x="7.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <rect x="1.5" y="7.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <rect x="7.5" y="7.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    'new-analysis': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M7 4.5v5M4.5 7h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    analyses: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="2" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M4 5.5h4M4 8h4M4 10.5h2.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <circle cx="11.5" cy="11.5" r="2" fill="rgb(var(--card))" stroke="currentColor" strokeWidth="0.9"/>
        <path d="M11.5 10.5v1l.7.7" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
    ),
    'analysis-detail': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    ),
    scorecards: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10.5L4.5 7l2 2L9 5.5l3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12.5h10" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    ),
    signals: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5v5.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    sources: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <ellipse cx="7" cy="4.5" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M2 4.5v5c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5v-5" stroke="currentColor" strokeWidth="1"/>
        <path d="M2 7c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    exports: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 9.5v2a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M7 1.5v7M4.5 6.5l2.5 2 2.5-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    settings: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1"/>
        <path d="M7 1.5v1.1M7 11.4v1.1M1.5 7h1.1M11.4 7h1.1M3.31 3.31l.78.78M9.91 9.91l.78.78M3.31 10.69l.78-.78M9.91 4.09l.78-.78"
          stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    'brand-config': (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M4.5 7a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="5.5" cy="5.5" r="0.8" fill="currentColor"/>
        <circle cx="8.5" cy="5.5" r="0.8" fill="currentColor"/>
      </svg>
    ),
    kpi: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 10L5 6.5l2 2.5L9.5 4l2.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12h10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
    ),
  }
  return <span className="shrink-0">{icons[id] ?? null}</span>
}

export default function AppSidebar({ activeModule, activePage, onNavigate }: AppSidebarProps) {
  const pages = MODULE_PAGES[activeModule] ?? []
  const primaryPages = pages.filter((p) => p.group !== 'secondary')
  const secondaryPages = pages.filter((p) => p.group === 'secondary')

  const mod = PORTAL_MODULES.find((m) => m.id === activeModule)

  return (
    <aside className="w-[200px] shrink-0 flex flex-col h-full bg-surface border-r border-border">

      {/* ── Module header ──────────────────────────────── */}
      <div className="h-14 flex items-center gap-2.5 px-4 border-b border-border shrink-0">
        <div className="w-6 h-6 rounded-md bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-[10px]">
            {platformConfig.clientShortName}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-foreground text-[12px] font-semibold truncate leading-tight">
            {mod?.label ?? 'Module'}
          </p>
          <p className="text-muted-foreground text-[10px] truncate">
            {platformConfig.clientName}
          </p>
        </div>
      </div>

      {/* ── Upload CTA ─────────────────────────────────── */}
      <div className="px-2 pt-2 pb-1">
        <button
          onClick={() => {}}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-[12px] font-semibold hover:opacity-90 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v7M3 4l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.5 9.5v1a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Upload document
        </button>
      </div>

      {/* ── Primary nav ────────────────────────────────── */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {primaryPages.map((page) => (
          <NavItem
            key={page.id}
            page={page}
            active={activePage === page.id}
            onClick={() => onNavigate(page.id)}
          />
        ))}
      </nav>

      {/* ── Secondary nav ──────────────────────────────── */}
      {secondaryPages.length > 0 && (
        <div className="pb-3 px-2 flex flex-col gap-0.5 border-t border-border pt-2">
          {secondaryPages.map((page) => (
            <NavItem
              key={page.id}
              page={page}
              active={activePage === page.id}
              onClick={() => onNavigate(page.id)}
            />
          ))}

          {/* Privacy micro-note */}
          <div className="mt-2 px-2.5 flex items-start gap-1.5">
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-muted-foreground/40 shrink-0 mt-0.5">
              <rect x="1" y="3.5" width="7" height="4.5" rx="1" stroke="currentColor" strokeWidth="0.7"/>
              <path d="M2.5 3.5V2.5a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="0.7"/>
            </svg>
            <span className="text-muted-foreground/40 text-[9px] leading-snug">
              In-memory only
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}

function NavItem({
  page,
  active,
  onClick,
}: {
  page: { id: Page; label: string; badge?: string }
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left
        transition-colors duration-100
        ${active
          ? 'bg-card text-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }
      `}
    >
      <span className={`transition-colors ${active ? 'text-primary' : ''}`}>
        <PageIcon id={page.id} />
      </span>
      <span className="flex-1 text-[12.5px] font-medium truncate">{page.label}</span>
      {page.badge && (
        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
          /^\d+$/.test(page.badge)
            ? 'bg-danger/15 text-danger'
            : 'bg-accent/15 text-accent'
        }`}>
          {page.badge}
        </span>
      )}
      {active && (
        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
      )}
    </button>
  )
}
