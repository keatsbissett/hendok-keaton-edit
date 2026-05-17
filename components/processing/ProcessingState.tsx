'use client'

import { useEffect, useState } from 'react'

const STATUS_MESSAGES = [
  'Reading document...',
  'Analysing the full dataset...',
  'Deriving scoring model...',
  'Scoring each alert...',
  'Writing your brief...',
  'Almost there...',
]

export default function ProcessingState() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % STATUS_MESSAGES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24">
      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-white/[0.08]" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#C0392B] animate-spin" />
      </div>

      {/* Status message */}
      <div className="text-center">
        <p
          key={messageIndex}
          className="text-white/70 font-medium text-sm animate-pulse"
        >
          {STATUS_MESSAGES[messageIndex]}
        </p>
        <p className="text-white/30 text-xs mt-2">
          This takes 10–30 seconds — Claude is reading every line.
        </p>
      </div>
    </div>
  )
}
