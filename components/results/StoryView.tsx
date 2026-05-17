import type { AnalysisResult } from '@/lib/types'

interface StoryViewProps {
  result: AnalysisResult
}

// Framework 2 — story-first financial output (Sage export)
export default function StoryView({ result }: StoryViewProps) {
  return (
    <div className="flex flex-col gap-4">
      {result.items.map((item, i) => (
        <div
          key={i}
          className="rounded-[10px] bg-[#1a1d27] border border-white/[0.08] p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white/80 font-medium text-sm">{item.customer}</span>
            {item.account && (
              <span className="font-mono text-xs text-white/30">{item.account}</span>
            )}
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{item.story}</p>
        </div>
      ))}
    </div>
  )
}
