'use client'

import { useState } from 'react'
import AppShell from '@/components/shell/AppShell'
import OverviewPage from '@/components/pages/OverviewPage'
import NewAnalysisPage from '@/components/pages/NewAnalysisPage'
import AnalysesPage from '@/components/pages/AnalysesPage'
import AnalysisDetailPage from '@/components/pages/AnalysisDetailPage'
import ScorecardsPage from '@/components/pages/ScorecardsPage'
import SignalsPage from '@/components/pages/SignalsPage'
import SourcesPage from '@/components/pages/SourcesPage'
import ExportsPage from '@/components/pages/ExportsPage'
import SettingsPageNew from '@/components/pages/SettingsPageNew'
import BrandConfigPage from '@/components/pages/BrandConfigPage'
import KpiDashboardPage from '@/components/pages/KpiDashboardPage'
import type { Page, PortalModule } from '@/lib/types'
import { platformConfig } from '@/config/platform'

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<PortalModule>(platformConfig.defaultModule)
  const [activePage, setActivePage] = useState<Page>('overview')

  function handleNavigate(page: Page) {
    setActivePage(page)
  }

  function handleModuleChange(module: PortalModule, defaultPage: Page) {
    setActiveModule(module)
    setActivePage(defaultPage)
  }

  const pageContent: Partial<Record<Page, React.ReactNode>> = {
    overview: (
      <OverviewPage onNavigate={handleNavigate} />
    ),
    'new-analysis': (
      <NewAnalysisPage />
    ),
    analyses: (
      <AnalysesPage onNavigate={handleNavigate} />
    ),
    'analysis-detail': (
      <AnalysisDetailPage onNavigate={handleNavigate} />
    ),
    scorecards: (
      <ScorecardsPage />
    ),
    signals: (
      <SignalsPage />
    ),
    sources: (
      <SourcesPage />
    ),
    exports: (
      <ExportsPage />
    ),
    settings: (
      <SettingsPageNew />
    ),
    'brand-config': (
      <BrandConfigPage />
    ),
    kpi: (
      <KpiDashboardPage />
    ),
  }

  return (
    <AppShell
      activeModule={activeModule}
      activePage={activePage}
      onNavigate={handleNavigate}
      onModuleChange={handleModuleChange}
    >
      {pageContent[activePage] ?? (
        <div className="p-6">
          <p className="text-muted-foreground text-[13px]">Page not found.</p>
        </div>
      )}
    </AppShell>
  )
}
