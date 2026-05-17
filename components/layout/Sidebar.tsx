'use client'

import type { Page } from '@/lib/types'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  collapsed: boolean
}

interface NavItem {
  id: Page
  label: string
  icon: React.ReactNode
  highlight?: boolean
}

const NAV_MAIN: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    id: 'new-brief',
    label: 'New Brief',
    highlight: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'briefs',
    label: 'Briefs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1.5" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M4.5 5.5h5M4.5 8h5M4.5 10.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="13" cy="13" r="2.5" fill="#1a1d27" stroke="currentColor" strokeWidth="1" />
        <path d="M13 11.5v1.5l1 1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'kpi',
    label: 'KPI Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1.5 12.5L5 8.5l3 2.5 3-5 3 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.5 14.5h13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
]

const NAV_BOTTOM: NavItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.1" />
        <path
          d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.34 3.34l.92.92M11.74 11.74l.92.92M3.34 12.66l.92-.92M11.74 4.26l.92-.92"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export default function Sidebar({ currentPage, onNavigate, collapsed }: SidebarProps) {
  return (
    <aside
      className={`
        shrink-0 flex flex-col bg-[#1a1d27] border-r border-white/[0.07]
        transition-all duration-200 ease-in-out overflow-hidden
        ${collapsed ? 'w-[56px]' : 'w-[220px]'}
      `}
    >
      {/* Divider after topbar */}
      <div className="h-px bg-white/[0.04] mx-2 mt-2" />

      {/* Main nav */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        {NAV_MAIN.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={currentPage === item.id}
            collapsed={collapsed}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="pb-3 px-2 flex flex-col gap-0.5">
        <div className="h-px bg-white/[0.05] mb-2" />
        {NAV_BOTTOM.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={currentPage === item.id}
            collapsed={collapsed}
            onClick={() => onNavigate(item.id)}
          />
        ))}

        {/* Privacy micro-badge */}
        {!collapsed && (
          <div className="mt-3 px-3 flex items-start gap-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-white/20 shrink-0 mt-0.5">
              <rect x="1" y="4.5" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="0.8" />
              <path d="M3 4.5V3a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <span className="text-white/20 text-[10px] leading-snug">
              In-memory only —<br />no data stored
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

function NavButton({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`
        w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-left
        transition-colors duration-100
        ${
          active
            ? 'bg-white/[0.08] text-white'
            : item.highlight && !active
            ? 'text-[#C0392B]/80 hover:text-[#C0392B] hover:bg-[#C0392B]/[0.08]'
            : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
        }
      `}
    >
      <span className={`shrink-0 transition-colors ${active ? 'text-white/80' : ''}`}>
        {item.icon}
      </span>
      {!collapsed && (
        <span className="text-[13px] font-medium truncate leading-none">{item.label}</span>
      )}
      {!collapsed && active && (
        <span className="ml-auto w-1 h-1 rounded-full bg-white/40 shrink-0" />
      )}
    </button>
  )
}
