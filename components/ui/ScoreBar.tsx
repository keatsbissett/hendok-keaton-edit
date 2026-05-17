'use client'

interface ScoreBarProps {
  score: number
  max?: number
  colorStrong: string
  colorTint: string
  height?: number
  showLabel?: boolean
}

export default function ScoreBar({
  score,
  max = 100,
  colorStrong,
  colorTint,
  height = 6,
  showLabel = false,
}: ScoreBarProps) {
  const pct = Math.min(100, Math.round((score / max) * 100))

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height, background: colorTint }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: colorStrong }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-semibold tabular-nums w-8 text-right" style={{ color: colorStrong }}>
          {score}
        </span>
      )}
    </div>
  )
}
