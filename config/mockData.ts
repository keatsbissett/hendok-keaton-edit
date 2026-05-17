/**
 * Centralised mock data for visual prototype.
 * Replace with real API data when backend is connected.
 * All names / figures are synthetic Hendok data from the project brief.
 */

// === Recent analyses ===
export type AnalysisStatus = 'complete' | 'review' | 'flagged' | 'processing' | 'draft'
export type AnalysisTier = 'MATERIAL' | 'WATCH' | 'SKIP'

export interface MockAnalysis {
  id: string
  framework: string
  filename: string
  date: string
  status: AnalysisStatus
  totalItems: number
  material: number
  watch: number
  skip: number
  operator: string
  summary: string
}

export const MOCK_ANALYSES: MockAnalysis[] = [
  {
    id: 'ana-001',
    framework: 'price-alert',
    filename: 'price-alerts-17may.csv',
    date: '17 May 2026',
    status: 'review',
    totalItems: 43,
    material: 3,
    watch: 7,
    skip: 33,
    operator: 'L. de Kock',
    summary: 'Three material alerts require immediate review. Clear Creek Trading on Field Fence 2.5mm is the fourth occurrence this week.',
  },
  {
    id: 'ana-002',
    framework: 'logistics',
    filename: 'ctrack-export-16may.xlsx',
    date: '16 May 2026',
    status: 'flagged',
    totalItems: 35,
    material: 5,
    watch: 8,
    skip: 22,
    operator: 'L. de Kock',
    summary: 'Five material delivery exceptions. KZN Inner route showing 34% on-time rate — below the 85% threshold.',
  },
  {
    id: 'ana-003',
    framework: 'sage-export',
    filename: 'debtor-ageing-16may.xlsx',
    date: '16 May 2026',
    status: 'complete',
    totalItems: 28,
    material: 1,
    watch: 4,
    skip: 23,
    operator: 'L. de Kock',
    summary: 'One material debtor — Zimsteel Trading at 93 days overdue on R142k. Four watch items in 60–90 day band.',
  },
  {
    id: 'ana-004',
    framework: 'screenshot',
    filename: 'qlik-dashboard-15may.png',
    date: '15 May 2026',
    status: 'complete',
    totalItems: 12,
    material: 0,
    watch: 2,
    skip: 10,
    operator: 'L. de Kock',
    summary: 'Clean day. Field Fence margin at 24.3% — just below 26% target. Sales captured within normal range.',
  },
  {
    id: 'ana-005',
    framework: 'stock-take',
    filename: 'dims-stock-14may.xlsx',
    date: '14 May 2026',
    status: 'complete',
    totalItems: 19,
    material: 1,
    watch: 3,
    skip: 15,
    operator: 'L. de Kock',
    summary: 'Galvanised wire variance at −8.2% — above tolerance. Three other SKUs in watch band.',
  },
  {
    id: 'ana-006',
    framework: 'price-alert',
    filename: 'price-alerts-13may.csv',
    date: '13 May 2026',
    status: 'complete',
    totalItems: 67,
    material: 5,
    watch: 11,
    skip: 51,
    operator: 'L. de Kock',
    summary: 'Heavy day. Sipho Dlamini has three alerts on the same day. Spa Warehouse and Clear Creek Trading both below MSP on field fence simultaneously.',
  },
]

// === Scorecard categories ===
export type CategoryColorKey = 'financial' | 'market' | 'customer' | 'sectorFit' | 'management' | 'risk' | 'evidence'

export interface ScorecardCategory {
  key: string
  label: string
  score: number
  max: number
  colorKey: CategoryColorKey
  note: string
}

export const MOCK_SCORECARD: ScorecardCategory[] = [
  { key: 'financial',  label: 'Price Compliance & Margin',       score: 72, max: 100, colorKey: 'financial',  note: '3 material breaches this week' },
  { key: 'customer',   label: 'Customer Variance',               score: 58, max: 100, colorKey: 'customer',   note: 'Clear Creek recurring pattern' },
  { key: 'management', label: 'Rep Performance',                 score: 81, max: 100, colorKey: 'management', note: '4 reps within tolerance' },
  { key: 'market',     label: 'Regional Distribution',           score: 66, max: 100, colorKey: 'market',     note: 'Inner KZN over-weight' },
  { key: 'risk',       label: 'Repeat-Offender Risk',            score: 44, max: 100, colorKey: 'risk',       note: '2 customers with 3+ occurrences' },
  { key: 'evidence',   label: 'Data Completeness',               score: 88, max: 100, colorKey: 'evidence',   note: 'All fields populated' },
]

// === Signals / flags ===
export type FlagSeverity = 'showstopper' | 'warning' | 'cleared' | 'question'

export interface MockFlag {
  id: string
  severity: FlagSeverity
  title: string
  description: string
  evidence?: string
  customer?: string
}

export const MOCK_FLAGS: MockFlag[] = [
  {
    id: 'f1',
    severity: 'showstopper',
    title: 'Clear Creek Trading — 4th occurrence this week',
    description: 'Field Fence 2.5mm sold at R18.40 vs MSP of R22.80 — 19.3% below MSP. This is the fourth occurrence in 5 days from the same customer.',
    evidence: 'Doc #HK-PC307-4418, Rep: Sipho Dlamini',
    customer: 'Clear Creek Trading',
  },
  {
    id: 'f2',
    severity: 'showstopper',
    title: 'Sipho Dlamini — 3 alerts same day',
    description: 'Three separate below-MSP orders on 17 May from the same rep. Pattern suggests systematic pricing override rather than negotiated exceptions.',
    evidence: 'Docs #4418, #4421, #4425',
    customer: 'Multiple',
  },
  {
    id: 'f3',
    severity: 'warning',
    title: 'Spa Warehouse Holdings — Field Fence below MSP',
    description: 'R21.10 vs MSP of R22.80 — 7.5% below. Watch threshold. Second occurrence this month.',
    evidence: 'Doc #HK-DIST1-2091',
    customer: 'Spa Warehouse Holdings',
  },
  {
    id: 'f4',
    severity: 'warning',
    title: 'Thekweni Reinforcing — Galvanised wire',
    description: 'Pricing 6.2% below MSP. Volume order of 12.4 tonnes makes this material in absolute terms despite moderate percentage.',
    evidence: 'Doc #HK-GAU01-0887',
    customer: 'Thekweni Reinforcing',
  },
  {
    id: 'f5',
    severity: 'cleared',
    title: 'Buildmart SA — Agricultural wire',
    description: 'Pricing at 3.1% below MSP — within skip threshold. No further action required.',
    customer: 'Buildmart SA',
  },
  {
    id: 'f6',
    severity: 'cleared',
    title: 'African Mesh Distributors — Cap tie',
    description: 'Order within MSP. No variance detected.',
    customer: 'African Mesh Distributors',
  },
  {
    id: 'f7',
    severity: 'question',
    title: 'Is the Clear Creek Trading relationship internal?',
    description: 'Clear Creek Trading (CC001) is referenced in system prompts as a potential sister company. Internal pricing arrangements should be flagged separately.',
  },
  {
    id: 'f8',
    severity: 'question',
    title: 'Why are three Sipho Dlamini orders on the same day?',
    description: 'Unusual pattern — three below-MSP orders in a single day from one rep. Recommend checking if these are split orders from a single negotiation.',
  },
]

// === Sources ===
export interface MockSource {
  id: string
  name: string
  framework: string
  formats: string[]
  status: 'connected' | 'manual' | 'coming-soon'
  lastProcessed: string | null
  description: string
  runCount: number
}

export const MOCK_SOURCES: MockSource[] = [
  {
    id: 'src-1',
    name: 'Price Alert Emails',
    framework: 'price-alert',
    formats: ['XLSX', 'CSV', 'EML'],
    status: 'manual',
    lastProcessed: '17 May 2026',
    description: 'Sales orders placed below regional minimum selling price. Forwarded daily by the sales system.',
    runCount: 24,
  },
  {
    id: 'src-2',
    name: 'Sage Debtor Exports',
    framework: 'sage-export',
    formats: ['XLSX', 'EML'],
    status: 'manual',
    lastProcessed: '16 May 2026',
    description: 'Debtor ageing reports and invoice-level financial data from Sage accounting system.',
    runCount: 8,
  },
  {
    id: 'src-3',
    name: 'Qlik Dashboard Screenshots',
    framework: 'screenshot',
    formats: ['PNG', 'JPG'],
    status: 'manual',
    lastProcessed: '15 May 2026',
    description: 'Operational dashboard screenshots from Qlik, meter readings, and any visual report snapshot.',
    runCount: 12,
  },
  {
    id: 'src-4',
    name: 'CTrack Fleet Reports',
    framework: 'logistics',
    formats: ['XLSX', 'CSV'],
    status: 'manual',
    lastProcessed: '16 May 2026',
    description: 'Fleet position and delivery performance exports from CTrack / Vantage logistics system.',
    runCount: 6,
  },
  {
    id: 'src-5',
    name: 'DIMS Stock Take',
    framework: 'stock-take',
    formats: ['XLSX', 'CSV'],
    status: 'manual',
    lastProcessed: '14 May 2026',
    description: 'Inventory count and variance reports from the DIMS warehouse management system.',
    runCount: 4,
  },
  {
    id: 'src-6',
    name: 'Live API Integration',
    framework: 'all',
    formats: ['API'],
    status: 'coming-soon',
    lastProcessed: null,
    description: 'Direct connection to Sage, CTrack, and Qlik for automated daily brief generation without manual uploads.',
    runCount: 0,
  },
]

// === Export templates ===
export interface ExportTemplate {
  id: string
  name: string
  format: string
  description: string
  available: boolean
}

export const EXPORT_TEMPLATES: ExportTemplate[] = [
  { id: 'et-1', name: 'Executive PDF Brief', format: 'PDF', description: 'Full analysis with summary, tier breakdown, and all alerts. Hendok-branded header.', available: true },
  { id: 'et-2', name: 'Excel Alert Export', format: 'Excel', description: 'All MATERIAL and WATCH items in spreadsheet format, sortable by customer, rep, or variance.', available: true },
  { id: 'et-3', name: 'Plain-text Summary', format: 'Text', description: 'Copy-pasteable plain English summary for email or messaging.', available: true },
  { id: 'et-4', name: 'Scheduled Daily Digest', format: 'Email', description: 'Automatic email summary at 07:00 each morning — requires Sendgrid integration.', available: false },
  { id: 'et-5', name: 'CSV Data Export', format: 'CSV', description: 'Raw scored data for downstream analysis or BI tools.', available: false },
]
