import AlertItem from './AlertItem'
import type { AlertItem as AlertItemType, FrameworkType } from '@/lib/types'

interface TriageViewProps {
  items: AlertItemType[]
  framework: FrameworkType
}

export default function TriageView({ items, framework }: TriageViewProps) {
  const material = items.filter((i) => i.tier === 'MATERIAL')
  const watch = items.filter((i) => i.tier === 'WATCH')
  const skip = items.filter((i) => i.tier === 'SKIP')

  return (
    <div className="flex flex-col gap-6">
      {material.length > 0 && (
        <Section label="Material" count={material.length} color="text-[#e74c3c]">
          {material.map((item, i) => <AlertItem key={i} item={item} />)}
        </Section>
      )}
      {watch.length > 0 && (
        <Section label="Watch" count={watch.length} color="text-[#e6a817]">
          {watch.map((item, i) => <AlertItem key={i} item={item} />)}
        </Section>
      )}
      {skip.length > 0 && (
        <Section label="Skip" count={skip.length} color="text-[#27ae60]">
          {skip.map((item, i) => <AlertItem key={i} item={item} />)}
        </Section>
      )}
    </div>
  )
}

function Section({
  label,
  count,
  color,
  children,
}: {
  label: string
  count: number
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs font-medium uppercase tracking-wider ${color}`}>{label}</span>
        <span className="text-white/25 text-xs font-mono">{count}</span>
      </div>
      {children}
    </div>
  )
}
