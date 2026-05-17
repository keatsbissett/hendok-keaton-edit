// ============================================================
// Core analysis types — used by AI processing pipeline
// ============================================================

export type Tier = 'MATERIAL' | 'WATCH' | 'SKIP'

export type FrameworkType =
  | 'price-alert'
  | 'sage-export'
  | 'screenshot'
  | 'logistics'
  | 'stock-take'

export interface AlertItem {
  tier: Tier
  customer: string
  account?: string
  region?: string
  product?: string
  itemCode?: string
  docType?: string
  unitPrice?: number
  msp?: number
  qty?: number
  rep?: string
  occurrences?: number
  story: string
}

export interface ScoringModel {
  explanation: string
  materialThreshold: string
  watchThreshold: string
}

export interface AnalysisResult {
  framework: FrameworkType
  summary: string[]           // 3 plain-English sentences for exec summary
  scoringModel: ScoringModel  // How Claude derived the thresholds
  counts: {
    total: number
    material: number
    watch: number
    skip: number
  }
  items: AlertItem[]
}

// ============================================================
// Navigation types — used by shell and page components
// Design Guide §4, §12B
// ============================================================

/** App-level pages within a module */
export type Page =
  | 'overview'
  | 'new-analysis'
  | 'analyses'
  | 'analysis-detail'
  | 'scorecards'
  | 'signals'
  | 'sources'
  | 'exports'
  | 'settings'
  | 'brand-config'
  | 'kpi'
  | 'new-brief'
  | 'briefs'

/** Parent portal modules (far-left nav) */
export type PortalModule =
  | 'intelligence'
  | 'kpi'
  | 'knowledge'
  | 'reports'
  | 'portal-settings'
