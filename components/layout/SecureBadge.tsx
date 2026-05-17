export default function SecureBadge() {
  return (
    <footer className="w-full border-t border-white/[0.08] py-4">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-2">
        {/* Lock icon */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="text-white/25"
        >
          <rect x="1.5" y="5" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <span className="text-white/25 text-xs">
          Processed in-memory only — no data stored
        </span>
      </div>
    </footer>
  )
}
