'use client'

import { platformConfig } from '@/config/platform'
import { PORTAL_MODULES } from '@/config/navigation'
import type { Page, PortalModule } from '@/lib/types'

interface ParentPortalNavProps {
  activeModule: PortalModule
  onModuleSelect: (module: PortalModule, defaultPage: Page) => void
  collapsed: boolean
  onToggle: () => void
}

// Module icons (inline SVG, 16×16)
function ModuleIcon({ id }: { id: PortalModule }) {
  const icons: Record<PortalModule, React.ReactNode> = {
    intelligence: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <rect x="8.5" y="1.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <rect x="1.5" y="8.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
        <path d="M9 11.5h4M11 9.5v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    kpi: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1.5 11L5 7l2.5 2.5L10 5l3.5 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.5 13h12" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      </svg>
    ),
    knowledge: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="2" y="1.5" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M4.5 5h4M4.5 7.5h4M4.5 10h2.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
        <path d="M11 4v7" stroke="currentColor" strokeWidth="1"/>
        <path d="M13 4v7" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    reports: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="2" y="2" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1"/>
        <path d="M5 9V6M7.5 9V4.5M10 9V7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    'portal-settings': (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1"/>
        <path d="M7.5 1.5v1.2M7.5 12.3v1.2M1.5 7.5h1.2M12.3 7.5h1.2M3.43 3.43l.85.85M10.72 10.72l.85.85M3.43 11.57l.85-.85M10.72 4.28l.85-.85"
          stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
  }
  return <span className="shrink-0">{icons[id]}</span>
}

export default function ParentPortalNav({
  activeModule,
  onModuleSelect,
  collapsed,
  onToggle,
}: ParentPortalNavProps) {
  return (
    <aside
      className={`
        shrink-0 flex flex-col h-full
        bg-surface border-r border-border
        transition-all duration-200 ease-in-out
        ${collapsed ? 'w-[56px]' : 'w-[220px]'}
      `}
    >
      {/* ── Logo / Header ─────────────────────────────── */}
      <div className={`flex items-center h-14 border-b border-border px-3 gap-2.5 shrink-0`}>
        {/* Nucleus mark */}
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
          title="Toggle navigation"
        >
          <span className="text-primary-foreground font-bold text-[13px] select-none">
            {platformConfig.platformShortName}
          </span>
        </button>

        {!collapsed && (
          <div className="min-w-0">
            <p className="text-foreground font-semibold text-[13px] leading-none truncate">
              {platformConfig.platformName}
            </p>
            <p className="text-muted-foreground text-[10px] mt-0.5 truncate">
              {platformConfig.clientName}
            </p>
          </div>
        )}
      </div>

      {/* ── Search (expanded only) ────────────────────── */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground shrink-0">
              <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1"/>
              <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
            <span className="text-muted-foreground text-[11px]">Search modules…</span>
          </div>
        </div>
      )}

      {/* ── Modules ───────────────────────────────────── */}
      <nav className="flex-1 py-2 px-2 flex flex-col gap-0.5 overflow-y-auto">
        {PORTAL_MODULES.map((mod) => {
          const isActive = activeModule === mod.id
          const isSoon = mod.badge === 'Soon'

          return (
            <button
              key={mod.id}
              onClick={() => !isSoon && onModuleSelect(mod.id, mod.defaultPage)}
              title={collapsed ? mod.label : undefined}
              disabled={isSoon}
              className={`
                w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left
                transition-colors duration-100
                ${isSoon ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent'
                }
              `}
            >
              {/* Active dot or module icon */}
              <span className={`shrink-0 transition-colors ${isActive ? 'text-primary' : ''}`}>
                <ModuleIcon id={mod.id} />
              </span>

              {!collapsed && (
                <>
                  <span className="flex-1 text-[12px] font-medium truncate leading-none">
                    {mod.label}
                  </span>
                  {mod.badge && (
                    <span className={`
                      text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0
                      ${mod.badge === 'Soon'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-accent/15 text-accent'
                      }
                    `}>
                      {mod.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* ── Bottom — user avatar ──────────────────────── */}
      <div className="border-t border-border p-3 shrink-0">
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <span className="text-primary text-[11px] font-semibold">L</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-foreground text-[12px] font-medium truncate">L. de Kock</p>
              <p className="text-muted-foreground text-[10px] truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
