'use client'

import { platformConfig } from '@/config/platform'
import type { Page, PortalModule } from '@/lib/types'

const PAGE_LABELS: Record<Page, string> = {
  overview:          'Overview',
  'new-analysis':    'New Analysis',
  analyses:          'Analyses',
  'analysis-detail': 'Analysis Detail',
  scorecards:        'Scorecards',
  signals:           'Signals',
  sources:           'Sources',
  exports:           'Exports',
  settings:          'Settings',
  'brand-config':    'Brand Config',
  kpi:               'KPI Dashboard',
}

const MODULE_LABELS: Record<PortalModule, string> = {
  intelligence:      'Intelligence Workspace',
  kpi:               'KPI Dashboard',
  knowledge:         'Knowledge Base',
  reports:           'Reports',
  'portal-settings': 'Platform Settings',
}

interface TopBarProps {
  activeModule: PortalModule
  activePage: Page
  onPrimaryAction: () => void
}

export default function TopBar({ activeModule, activePage, onPrimaryAction }: TopBarProps) {
  const ENV = platformConfig.environment

  return (
    <header className="h-12 shrink-0 flex items-center justify-between gap-4 px-5 border-b border-border bg-card/60">

      {/* ── Left: breadcrumb ─────────────────────────── */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-muted-foreground text-[12px] hidden sm:block truncate">
          {MODULE_LABELS[activeModule]}
        </span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-muted-foreground/40 shrink-0 hidden sm:block">
          <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-foreground text-[12px] font-medium truncate">
          {PAGE_LABELS[activePage]}
        </span>
      </div>

      {/* ── Right: search + badges + actions ─────────── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-muted/40 border border-border w-[160px]">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-muted-foreground shrink-0">
            <circle cx="4.5" cy="4.5" r="3" stroke="currentColor" strokeWidth="1"/>
            <path d="M7 7l2 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <span className="text-muted-foreground text-[11px]">Search…</span>
        </div>

        {/* Environment badge */}
        {platformConfig.showEnvironmentBadge && (
          <span className={`
            hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border
            ${ENV === 'development'
              ? 'text-warning bg-warning/10 border-warning/20'
              : ENV === 'staging'
              ? 'text-info bg-info/10 border-info/20'
              : 'text-success bg-success/10 border-success/20'
            }
          `}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              ENV === 'development' ? 'bg-warning' : ENV === 'staging' ? 'bg-info' : 'bg-success'
            }`}/>
            {ENV === 'development' ? 'DEV' : ENV === 'staging' ? 'STAGING' : 'PRODUCTION'}
          </span>
        )}

        {/* Notifications */}
        <button className="relative w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5a3.5 3.5 0 0 0-3.5 3.5v2L2 9h10l-1.5-2V5A3.5 3.5 0 0 0 7 1.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
            <path d="M5.5 9.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1"/>
          </svg>
          {/* Unread dot */}
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-danger" />
        </button>

        {/* Primary action */}
        <button
          onClick={onPrimaryAction}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:opacity-90 text-primary-foreground text-[12px] font-semibold transition-opacity"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <span className="hidden sm:block">{platformConfig.primaryAction.label}</span>
        </button>
      </div>
    </header>
  )
}
