'use client'

import { useState } from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import type { Page } from '@/lib/types'

interface AppShellProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  children: React.ReactNode
}

export default function AppShell({ currentPage, onNavigate, children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-[#0f1117] overflow-hidden">
      <TopBar
        onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        onNewBrief={() => onNavigate('new-brief')}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          collapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
