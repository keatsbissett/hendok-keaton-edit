'use client'

import { useState, useRef } from 'react'
import { platformConfig } from '@/config/platform'
import type { AnalysisResult } from '@/lib/types'

interface NewAnalysisPageProps {
  onComplete?: (result: AnalysisResult) => void
}

type ProcessingStage = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

export default function NewAnalysisPage({ onComplete }: NewAnalysisPageProps) {
  const [stage, setStage] = useState<ProcessingStage>('idle')
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const frameworks = [
    {
      id: 'price-alert',
      label: 'Price Alert',
      desc: 'CSV / Excel price alert exports from your sales system.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 15L7 9l3 3 3.5-5.5L19 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 17h16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'sage-export',
      label: 'Sage Export',
      desc: 'Debtor ageing reports and invoice-level data from Sage.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M6 8h6M6 11h6M6 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'screenshot',
      label: 'Screenshot',
      desc: 'Qlik dashboards, meter readings, or any visual report.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ),
    },
    {
      id: 'logistics',
      label: 'Logistics',
      desc: 'CTrack / Vantage fleet position and delivery exceptions.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2 13h11V5H2v8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M13 8h3l2 3v2h-5V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
          <circle cx="5.5" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="14.5" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ),
    },
    {
      id: 'stock-take',
      label: 'Stock Take',
      desc: 'DIMS inventory variance and cycle count reports.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M7 7h6M7 10.5h6M7 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ]

  function handleFileSelect(file: File) {
    setSelectedFile(file)
    setStage('uploading')
    simulateProcessing()
  }

  function simulateProcessing() {
    setStage('processing')
    let i = 0
    const steps = platformConfig.processingSteps
    const tick = () => {
      if (i < steps.length - 1) {
        i++
        setStepIdx(i)
        setTimeout(tick, 900 + Math.random() * 400)
      } else {
        setTimeout(() => setStage('done'), 800)
      }
    }
    setTimeout(tick, 700)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  if (stage === 'processing' || stage === 'uploading') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-primary font-bold text-xl">N</span>
        </div>
        <div className="text-center">
          <p className="text-foreground text-[16px] font-semibold">Analysing document…</p>
          <p className="text-muted-foreground text-[13px] mt-1">
            {selectedFile?.name}
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          {platformConfig.processingSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                idx < stepIdx
                  ? 'bg-success/20 border border-success/30'
                  : idx === stepIdx
                  ? 'bg-primary/20 border border-primary/30 animate-pulse'
                  : 'bg-muted/50 border border-border'
              }`}>
                {idx < stepIdx ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                ) : idx === stepIdx ? (
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                ) : null}
              </div>
              <span className={`text-[12px] transition-colors ${
                idx < stepIdx ? 'text-muted-foreground line-through' :
                idx === stepIdx ? 'text-foreground font-medium' : 'text-muted-foreground/50'
              }`}>{step}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/50 text-[10px] max-w-xs text-center">
          {platformConfig.privacyNote}
        </p>
      </div>
    )
  }

  if (stage === 'done') {
    return (
      <div className="p-6 max-w-[700px] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-success/15 border border-success/25 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l3 3 7-7" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 className="text-foreground text-[16px] font-semibold">Analysis complete</h2>
            <p className="text-muted-foreground text-[12px]">{selectedFile?.name}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <p className="text-muted-foreground text-[12px] font-medium uppercase tracking-wide">Executive Summary</p>
          <div className="space-y-2">
            {[
              'Three material price alerts were detected, led by Clear Creek Trading on Field Fence 2.5mm — the fourth occurrence this week.',
              'Sipho Dlamini generated three separate below-MSP orders on the same day, suggesting a systematic pricing pattern.',
              'Seven watch-level items remain within thresholds but warrant monitoring in the next daily review cycle.',
            ].map((sentence, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <p className="text-foreground text-[13px] leading-relaxed">{sentence}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
            {[
              { label: 'Material', value: '3', color: 'text-danger' },
              { label: 'Watch',    value: '7', color: 'text-warning' },
              { label: 'Skip',     value: '33', color: 'text-muted-foreground' },
            ].map((t) => (
              <div key={t.label} className="text-center">
                <p className={`text-[24px] font-bold ${t.color}`}>{t.value}</p>
                <p className="text-muted-foreground text-[11px]">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setStage('idle'); setSelectedFile(null); setStepIdx(0) }}
            className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground text-[13px] hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            Run Another Analysis
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity"
          >
            View Full Brief →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[760px] space-y-6">
      <div>
        <h2 className="text-foreground text-[18px] font-semibold">New Analysis</h2>
        <p className="text-muted-foreground text-[13px] mt-1">{platformConfig.uploadCopy}</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`
          border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer
          transition-colors duration-150
          ${dragOver
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/20'
          }
        `}
      >
        <div className="w-14 h-14 rounded-2xl bg-muted/60 border border-border flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M17 8l-5-5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-foreground text-[14px] font-medium">Drop your file here</p>
          <p className="text-muted-foreground text-[12px] mt-0.5">or click to browse</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {platformConfig.supportedExtensions.map((ext) => (
            <span key={ext} className="px-2 py-0.5 rounded-md bg-muted/60 border border-border text-muted-foreground text-[10px] font-medium">
              {ext}
            </span>
          ))}
        </div>
        <input
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
      </div>

      {/* Framework cards */}
      <div>
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wide mb-3">
          Supported Frameworks
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {frameworks.map((fw) => (
            <div
              key={fw.id}
              className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">
                {fw.icon}
              </div>
              <div className="min-w-0">
                <p className="text-foreground text-[12.5px] font-semibold">{fw.label}</p>
                <p className="text-muted-foreground text-[11px] mt-0.5 leading-snug">{fw.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-muted/30 border border-border">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground/50 mt-0.5 shrink-0">
          <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="0.9"/>
          <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="0.9"/>
        </svg>
        <p className="text-muted-foreground text-[11px] leading-relaxed">{platformConfig.privacyNote}</p>
      </div>

    </div>
  )
}
