interface StatBarProps {
  counts: {
    total: number
    material: number
    watch: number
    skip: number
  }
}

const stats = [
  { key: 'total', label: 'Total', color: 'text-white/70', bg: 'bg-white/[0.04]' },
  { key: 'material', label: 'Material', color: 'text-[#e74c3c]', bg: 'bg-[rgba(231,76,60,0.10)]' },
  { key: 'watch', label: 'Watch', color: 'text-[#e6a817]', bg: 'bg-[rgba(230,168,23,0.10)]' },
  { key: 'skip', label: 'Skip', color: 'text-[#27ae60]', bg: 'bg-[rgba(39,174,96,0.08)]' },
] as const

export default function StatBar({ counts }: StatBarProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className={`${stat.bg} rounded-[10px] border border-white/[0.08] p-4 flex flex-col gap-1`}
        >
          <span className={`font-mono font-medium text-2xl ${stat.color}`}>
            {counts[stat.key]}
          </span>
          <span className="text-white/40 text-xs uppercase tracking-wider">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
