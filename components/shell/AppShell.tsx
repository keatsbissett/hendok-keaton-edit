'use client'

import { useState } from 'react'
import ParentPortalNav from './ParentPortalNav'
import AppSidebar from './AppSidebar'
import TopBar from './TopBar'
import type { Page, PortalModule } from '@/lib/types'
import { platformConfig } from '@/config/platform'
import { PORTAL_MODULES } from '@/config/navigation'

interface AppShellProps {
  activePage: Page
  activeModule: PortalModule
  onNavigate: (page: Page) => void
  onModuleChange: (module: PortalModule, defaultPage: Page) => void
  children: React.ReactNode
}

export default function AppShell({
  activePage,
  activeModule,
  onNavigate,
  onModuleChange,
  children,
}: AppShellProps) {
  const [portalNavCollapsed, setPortalNavCollapsed] = useState(false)

  function handlePrimaryAction() {
    onNavigate(platformConfig.primaryAction.page)
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* ── Left 1: Parent portal nav ──────────────────── */}
      <ParentPortalNav
        activeModule={activeModule}
        onModuleSelect={onModuleChange}
        collapsed={portalNavCollapsed}
        onToggle={() => setPortalNavCollapsed((c) => !c)}
      />

      {/* ── Left 2: App sidebar ────────────────────────── */}
      <AppSidebar
        activeModule={activeModule}
        activePage={activePage}
        onNavigate={onNavigate}
      />

      {/* ── Right: main content frame ──────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          activeModule={activeModule}
          activePage={activePage}
          onPrimaryAction={handlePrimaryAction}
        />
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>

    </div>
  )
}
