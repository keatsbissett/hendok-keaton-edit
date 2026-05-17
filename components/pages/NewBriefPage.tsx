'use client'

import { useState } from 'react'
import UploadZone from '@/components/upload/UploadZone'
import ProcessingState from '@/components/processing/ProcessingState'
import ExecSummary from '@/components/results/ExecSummary'
import StatBar from '@/components/results/StatBar'
import TriageView from '@/components/results/TriageView'
import CopyBar from '@/components/results/CopyBar'
import PageHeader from '@/components/ui/PageHeader'
import type { AnalysisResult } from '@/lib/types'

type BriefState = 'idle' | 'processing' | 'results' | 'error'

interface NewBriefPageProps {
  onComplete?: (result: AnalysisResult) => void
}

const FRAMEWORKS = [
  {
    key: 'price-alert',
    label: 'Price Alert',
    desc: 'Sales orders below minimum selling price',
    formats: 'XLSX · CSV · EML',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v9M9 13.5v1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
    color: 'text-[#e74c3c]',
    bg: 'bg-[rgba(231,76,60,0.06)]',
    border: 'border-[rgba(231,76,60,0.15)]',
  },
  {
    key: 'sage-export',
    label: 'Sage Export',
    desc: 'Debtor ageing, invoices, financial exports',
    formats: 'XLSX · EML',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M2 7h14M6 7v8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.06]',
    border: 'border-blue-500/[0.15]',
  },
  {
    key: 'screenshot',
    label: 'Screenshot / Vision',
    desc: 'Dashboard screenshots, Qlik reports, meter readings',
    formats: 'PNG · JPG · WEBP',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3.5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1" />
        <path d="M6 3.5l1.5-2h3L12 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'text-purple-400',
    bg: 'bg-purple-500/[0.06]',
    border: 'border-purple-500/[0.15]',
  },
  {
    key: 'logistics',
    label: 'Logistics',
    desc: 'Fleet reports, CTrack exports, delivery summaries',
    formats: 'XLSX · CSV',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1.5" y="7" width="11" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
        <path d="M12.5 10h2.5l2 3H12.5V10z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        <circle cx="4.5" cy="14.5" r="1.2" stroke="currentColor" strokeWidth="1" />
        <circle cx="13.5" cy="14.5" r="1.2" stroke="currentColor" strokeWidth="1" />
        <path d="M1.5 7V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v3" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
    color: 'text-[#e6a817]',
    bg: 'bg-[rgba(230,168,23,0.06)]',
    border: 'border-[rgba(230,168,23,0.15)]',
  },
  {
    key: 'stock-take',
    label: 'Stock Take',
    desc: 'Inventory counts, DIMS reports, variance analysis',
    formats: 'XLSX · CSV',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.1" />
        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.1" />
        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.1" />
        <path d="M10 13h6M13 10v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    color: 'text-[#27ae60]',
    bg: 'bg-[rgba(39,174,96,0.06)]',
    border: 'border-[rgba(39,174,96,0.15)]',
  },
]

export default function NewBriefPage({ onComplete }: NewBriefPageProps) {
  const [briefState, setBriefState] = useState<BriefState>('idle')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFileUpload(file: File) {
    setBriefState('processing')
    setResult(null)
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/analyse', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Analysis failed')
      }

      const data: AnalysisResult = await res.json()
      setResult(data)
      setBriefState('results')
      onComplete?.(data)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
      setBriefState('error')
    }
  }

  function handleReset() {
    setBriefState('idle')
    setResult(null)
    setErrorMessage('')
  }

  return (
    <div className="px-6 py-7 max-w-3xl mx-auto">
      {briefState === 'idle' && (
        <>
          <PageHeader
            title="New Brief"
            description="Drop any operational document. Claude reads every line and returns a plain-English intelligence brief in under 30 seconds."
          />

          {/* Upload zone */}
          <UploadZone onFileSelected={handleFileUpload} />

          {/* How it works strip */}
          <div className="mt-5 flex items-center gap-2 text-white/30 text-xs">
            <Step n={1} label="Upload" />
            <Arrow />
            <Step n={2} label="Claude analyses" />
            <Arrow />
            <Step n={3} label="Read brief" />
            <Arrow />
            <Step n={4} label="Act or copy" />
          </div>

          {/* Framework cards */}
          <div className="mt-8">
            <p className="text-white/35 text-xs uppercase tracking-wider font-medium mb-3">
              Supported document types
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FRAMEWORKS.map((fw) => (
                <div
                  key={fw.key}
                  className={`flex items-start gap-3 p-3.5 rounded-[10px] border ${fw.border} ${fw.bg}`}
                >
                  <span className={`${fw.color} mt-0.5 shrink-0`}>{fw.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium ${fw.color}`}>{fw.label}</p>
                    <p className="text-white/40 text-xs mt-0.5 leading-snug">{fw.desc}</p>
                    <p className="text-white/25 text-[10px] font-mono mt-1">{fw.formats}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {briefState === 'processing' && <ProcessingState />}

      {briefState === 'error' && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-10 h-10 rounded-full bg-[rgba(231,76,60,0.1)] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-[#e74c3c]">
              <path d="M9 6v4M9 12.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[#e74c3c] font-medium text-sm">{errorMessage}</p>
            <p className="text-white/35 text-xs mt-1">Check that the file format is supported and try again.</p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-[6px] bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white/80 text-sm transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {briefState === 'results' && result && (
        <div className="flex flex-col gap-5">
          {/* Brief header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-semibold text-xl">Intelligence Brief</h1>
              <p className="text-white/40 text-xs mt-0.5">
                Framework: <span className="font-mono text-white/50">{result.framework}</span>
                <span className="mx-1.5 text-white/20">·</span>
                {result.counts.total} items analysed
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-white/35 hover:text-white/60 text-xs underline transition-colors"
            >
              New upload
            </button>
          </div>

          <ExecSummary summary={result.summary} />
          <StatBar counts={result.counts} />
          <TriageView items={result.items} framework={result.framework} />
          <CopyBar result={result} />

          {/* Scoring model disclosure */}
          <details className="group">
            <summary className="text-white/30 text-xs cursor-pointer hover:text-white/50 transition-colors select-none">
              Scoring model used for this brief
            </summary>
            <div className="mt-2 p-4 rounded-[8px] bg-white/[0.02] border border-white/[0.06] text-white/40 text-xs leading-relaxed">
              <p className="mb-1">{result.scoringModel.explanation}</p>
              <p><span className="text-[#e74c3c]/60">Material:</span> {result.scoringModel.materialThreshold}</p>
              <p className="mt-0.5"><span className="text-[#e6a817]/60">Watch:</span> {result.scoringModel.watchThreshold}</p>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-medium text-white/40 shrink-0">{n}</span>
      <span>{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/20 shrink-0">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
