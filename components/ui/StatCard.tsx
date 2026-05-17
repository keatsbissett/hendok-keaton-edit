interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  color?: string
  bg?: string
  icon?: React.ReactNode
  pill?: { text: string; color: string }
}

export default function StatCard({ label, value, sub, color = 'text-white', bg, icon, pill }: StatCardProps) {
  return (
    <div className={`${bg ?? 'bg-[#1a1d27]'} rounded-[10px] border border-white/[0.08] p-5 flex flex-col justify-between gap-3 min-h-[100px]`}>
      <div className="flex items-start justify-between">
        {icon && (
          <div className="w-8 h-8 rounded-[6px] bg-white/[0.05] flex items-center justify-center text-white/40">
            {icon}
          </div>
        )}
        {pill && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-pill ${pill.color}`}>
            {pill.text}
          </span>
        )}
      </div>
      <div>
        <div className={`font-mono font-medium text-2xl leading-none ${color}`}>{value}</div>
        <div className="text-white/40 text-xs uppercase tracking-wider mt-1.5">{label}</div>
        {sub && <div className="text-white/25 text-xs mt-1">{sub}</div>}
      </div>
    </div>
  )
}
