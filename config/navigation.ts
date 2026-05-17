/**
 * Nucleus AI Platform — Navigation Configuration
 * Design Guide §4, §12B
 * Centralises portal modules and app-level pages.
 * To create a new client portal: update modules and pages here.
 */

import type { Page, PortalModule } from '@/lib/types'

// === Parent portal modules (far-left nav) ===
export interface NavModule {
  id: PortalModule
  label: string
  shortLabel: string
  defaultPage: Page
  badge?: string
}

export const PORTAL_MODULES: NavModule[] = [
  {
    id: 'intelligence',
    label: 'Intelligence Workspace',
    shortLabel: 'Intel',
    defaultPage: 'overview',
  },
  {
    id: 'kpi',
    label: 'KPI Dashboard',
    shortLabel: 'KPI',
    defaultPage: 'kpi',
    badge: 'Preview',
  },
  {
    id: 'knowledge',
    label: 'Knowledge Base',
    shortLabel: 'KB',
    defaultPage: 'overview',
    badge: 'Soon',
  },
  {
    id: 'reports',
    label: 'Reports',
    shortLabel: 'Rpts',
    defaultPage: 'exports',
  },
  {
    id: 'portal-settings',
    label: 'Platform Settings',
    shortLabel: 'Set',
    defaultPage: 'settings',
  },
]

// === App sidebar pages per module ===
export interface NavPage {
  id: Page
  label: string
  group?: 'primary' | 'secondary'
  badge?: string
}

export const MODULE_PAGES: Record<PortalModule, NavPage[]> = {
  intelligence: [
    { id: 'overview',       label: 'Overview',      group: 'primary' },
    { id: 'new-analysis',   label: 'New Analysis',  group: 'primary' },
    { id: 'analyses',       label: 'Analyses',      group: 'primary' },
    { id: 'scorecards',     label: 'Scorecards',    group: 'primary' },
    { id: 'signals',        label: 'Signals',       group: 'primary', badge: '43' },
    { id: 'sources',        label: 'Sources',       group: 'secondary' },
    { id: 'exports',        label: 'Exports',       group: 'secondary' },
    { id: 'settings',       label: 'Settings',      group: 'secondary' },
    { id: 'brand-config',   label: 'Brand Config',  group: 'secondary' },
  ],
  kpi: [
    { id: 'kpi',            label: 'Dashboard',     group: 'primary' },
  ],
  knowledge: [
    { id: 'overview',       label: 'Overview',      group: 'primary' },
  ],
  reports: [
    { id: 'exports',        label: 'Reports',       group: 'primary' },
  ],
  'portal-settings': [
    { id: 'settings',       label: 'Settings',      group: 'primary' },
    { id: 'brand-config',   label: 'Brand Config',  group: 'primary' },
  ],
}
