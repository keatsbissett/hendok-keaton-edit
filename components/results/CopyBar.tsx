'use client'

import { useState } from 'react'
import type { AnalysisResult } from '@/lib/types'

interface CopyBarProps {
  result: AnalysisResult
}

function resultToText(result: AnalysisResult): string {
  const lines: string[] = [
    `HENDOK DAILY INTELLIGENCE BRIEF`,
    ``,
    `SUMMARY`,
    ...result.summary.map((s) => `• ${s}`),
    ``,
    `COUNTS: Total ${result.counts.total} | Material ${result.counts.material} | Watch ${result.counts.watch} | Skip ${result.counts.skip}`,
    ``,
    `ALERTS`,
  ]

  for (const item of result.items) {
    if (item.tier === 'SKIP') continue
    lines.push(``)
    lines.push(`[${item.tier}] ${item.customer}${item.product ? ` — ${item.product}` : ''}`)
    if (item.region) lines.push(`Region: ${item.region} | Rep: ${item.rep ?? 'N/A'}`)
    lines.push(item.story)
  }

  return lines.join('\n')
}

export default function CopyBar({ result }: CopyBarProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(resultToText(result))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] transition-all text-sm text-white/60 hover:text-white/80"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#27ae60]">
            <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied to clipboard
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" fill="none" />
          </svg>
          Copy brief to clipboard
        </>
      )}
    </button>
  )
}
