import { clientConfig } from '@/config/client'

interface TopBarProps {
  onToggleSidebar: () => void
  onNewBrief: () => void
}

export default function TopBar({ onToggleSidebar, onNewBrief }: TopBarProps) {
  return (
    <header className="w-full border-b border-white/[0.07] bg-[#1a1d27] shrink-0 z-10">
      <div className="h-14 px-3 flex items-center justify-between gap-4">

        {/* Left: toggle + logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="w-8 h-8 rounded-[6px] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3.5h11M2 7.5h11M2 11.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5 ml-1">
            {/* Hendok mark */}
            <div className="w-7 h-7 rounded-[6px] bg-[#C0392B] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-[11px] select-none tracking-tight">H</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm tracking-tight">
                {clientConfig.shortName}
              </span>
              <span className="text-white/[0.18] text-sm hidden sm:block">·</span>
              <span className="text-white/35 text-[13px] hidden sm:block">Daily Intelligence Brief</span>
            </div>
          </div>
        </div>

        {/* Right: dev badge + new brief CTA */}
        <div className="flex items-center gap-2.5">
          {/* Dev mode indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-pill bg-amber-500/[0.08] border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 shrink-0" />
            <span className="text-amber-400/70 text-[10px] font-medium tracking-wide">DEV MODE</span>
          </div>

          {/* New Brief button */}
          <button
            onClick={onNewBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#C0392B] hover:bg-[#A93226] text-white text-[13px] font-medium transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:block">New Brief</span>
          </button>
        </div>

      </div>
    </header>
  )
}
