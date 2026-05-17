// AUTH TEMPORARILY DISABLED — remove this component when re-enabling auth
// To re-enable: delete this file, remove <DevAuthBanner /> from brief/page.tsx,
// and uncomment all -- DISABLED blocks in middleware.ts, route.ts, and brief/page.tsx

export default function DevAuthBanner() {
  return (
    <div className="w-full bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-center gap-2">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="text-amber-400 shrink-0"
      >
        <path
          d="M7 1L13 12H1L7 1Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="7" cy="10.5" r="0.6" fill="currentColor" />
      </svg>
      <span className="text-amber-400 text-xs font-medium">
        Auth disabled — development mode only
      </span>
    </div>
  )
}
