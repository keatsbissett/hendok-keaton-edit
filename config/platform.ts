/**
 * Nucleus AI Platform Configuration
 * Design Guide §12 — all configuration variables in one place.
 * To create a new client portal: copy this file and update the values below.
 * Never hard-code these values in components.
 */

// === Portal identity (§12A) ===
export const platformConfig = {
  platformName: 'Nucleus AI',
  platformShortName: 'N',

  // Active client portal
  clientName: 'Hendok Group',
  clientShortName: 'H',
  portalName: 'Intelligence Workspace',
  portalSubtitle: 'Daily operational intelligence for Hendok Group',

  // Branding
  logoMark: null as string | null,     // path to logo image if available
  brandVoice: 'Direct, calm, and intelligence-first.',

  // === Environment (§12H) ===
  environment: 'development' as 'development' | 'staging' | 'production',
  showEnvironmentBadge: true,

  // === Theme (§12C) ===
  theme: {
    modeDefault: 'dark' as 'dark' | 'light' | 'system',
    primaryColor: '#C0392B',   // Hendok red — overrides guide default #FF7A4D
    accentColor:  '#8E75FF',   // Purple from design guide §6
    headingFont:  'DM Sans',   // Guide-approved (§7): similar to Manrope
    bodyFont:     'DM Sans',
    monoFont:     'DM Mono',
    density:      'standard' as 'compact' | 'standard' | 'spacious',
    neutralPalette: 'dark-cool' as const,
  },

  // === Navigation (§12B) ===
  hasParentPortal: true,
  defaultModule: 'intelligence' as const,
  primaryAction: { label: 'New Analysis', page: 'new-analysis' as const },

  // === Inputs and sources (§12E) ===
  sourceTypes: ['Price Alert', 'Sage Export', 'Screenshot/Vision', 'Logistics Report', 'Stock Take'],
  supportedExtensions: ['XLSX', 'CSV', 'EML', 'PNG', 'JPG', 'WEBP'],
  uploadCopy: 'Upload any operational document — price alerts, Sage exports, stock takes, screenshots, or logistics reports.',
  privacyNote: 'Documents are processed in-memory only. No data is written to disk, stored in a database, or retained by our AI provider.',
  processingSteps: [
    'Reading document...',
    'Analysing the full dataset...',
    'Deriving scoring model...',
    'Scoring each item...',
    'Writing your brief...',
    'Almost there...',
  ],

  // === AI outputs (§12F) ===
  outputTypes: ['Executive summary', 'Tier scores (MATERIAL/WATCH/SKIP)', 'Alert flags', 'Scoring model explanation'],
  scoreCategories: ['Price variance', 'Volume at risk', 'Customer pattern', 'Rep pattern', 'Region distribution'],
  flagTypes: ['Material — immediate review', 'Watch — monitor', 'Skip — within tolerance'],
  reviewWorkflow: 'Liam de Kock (operator) reviews all MATERIAL and WATCH items before acting.',

  // === Reports and exports (§12G) ===
  exportFormats: ['PDF', 'Excel', 'Copy summary', 'Email summary'] as const,
  scheduledReports: false,
  reportBranding: 'client' as 'client' | 'nucleus',

  // === Category colors (§9) — full family: strong/tint/border/text ===
  categoryColors: {
    financial:  { strong: '#14B8A6', tint: 'rgba(20,184,166,0.10)',  border: 'rgba(20,184,166,0.20)', text: '#5EEAD4' },
    market:     { strong: '#8E75FF', tint: 'rgba(142,117,255,0.10)', border: 'rgba(142,117,255,0.20)', text: '#A78BFA' },
    customer:   { strong: '#FF7A4D', tint: 'rgba(255,122,77,0.10)',  border: 'rgba(255,122,77,0.20)', text: '#FCA07A' },
    sectorFit:  { strong: '#F43F5E', tint: 'rgba(244,63,94,0.10)',   border: 'rgba(244,63,94,0.20)',  text: '#FB7185' },
    management: { strong: '#22C55E', tint: 'rgba(34,197,94,0.10)',   border: 'rgba(34,197,94,0.20)',  text: '#4ADE80' },
    risk:       { strong: '#F59E0B', tint: 'rgba(245,158,11,0.10)',  border: 'rgba(245,158,11,0.20)', text: '#FCD34D' },
    evidence:   { strong: '#3B7BF6', tint: 'rgba(59,123,246,0.10)',  border: 'rgba(59,123,246,0.20)', text: '#60A5FA' },
  },
} as const
