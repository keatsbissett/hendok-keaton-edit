const FILE_TYPES = [
  { label: 'XLSX', desc: 'Price alerts, Sage exports, stock takes' },
  { label: 'CSV', desc: 'Any tabular export' },
  { label: 'EML', desc: 'Email price alert forwards' },
  { label: 'PNG / JPG', desc: 'Dashboard screenshots, meter readings' },
]

export default function FileTypeList() {
  return (
    <div className="flex flex-wrap gap-2">
      {FILE_TYPES.map((ft) => (
        <div
          key={ft.label}
          className="flex items-center gap-2 px-3 py-1.5 rounded-pill bg-white/[0.04] border border-white/[0.08]"
        >
          <span className="font-mono text-xs text-[#C0392B] font-medium">{ft.label}</span>
          <span className="text-white/35 text-xs">{ft.desc}</span>
        </div>
      ))}
    </div>
  )
}
