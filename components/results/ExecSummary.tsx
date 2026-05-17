interface ExecSummaryProps {
  summary: string[]
}

export default function ExecSummary({ summary }: ExecSummaryProps) {
  return (
    <div className="rounded-[10px] bg-[#1a1d27] border-l-2 border-[#C0392B] border-t border-r border-b border-white/[0.08] p-6">
      <p className="text-white/45 text-xs font-medium uppercase tracking-wider mb-4">
        Executive Summary
      </p>
      <div className="flex flex-col gap-2">
        {summary.map((sentence, i) => (
          <p key={i} className="text-white/85 text-sm leading-relaxed">
            {sentence}
          </p>
        ))}
      </div>
    </div>
  )
}
