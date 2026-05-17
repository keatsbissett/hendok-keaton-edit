interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="w-12 h-12 rounded-[10px] bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/25">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-white/60 font-medium text-sm">{title}</p>
        <p className="text-white/30 text-xs max-w-[280px] mx-auto leading-relaxed">{description}</p>
      </div>
      {action}
    </div>
  )
}
