interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  badge?: { text: string; color?: string }
}

export default function PageHeader({ title, description, action, badge }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-7 gap-4">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <h1 className="text-white font-semibold text-xl">{title}</h1>
          {badge && (
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-pill border ${badge.color ?? 'text-white/40 border-white/10 bg-white/[0.04]'}`}>
              {badge.text}
            </span>
          )}
        </div>
        {description && (
          <p className="text-white/45 text-sm leading-relaxed max-w-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
