'use client'

import { useState, useCallback, useRef } from 'react'

interface UploadZoneProps {
  onFileSelected: (file: File) => void
}

const ACCEPTED_TYPES = [
  '.xlsx', '.csv', '.eml',
  'image/png', 'image/jpeg', 'image/jpg', 'image/webp',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'message/rfc822',
]

export default function UploadZone({ onFileSelected }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    onFileSelected(file)
  }, [onFileSelected])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    // only clear if truly leaving the zone (not entering a child)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // reset input so same file can be re-uploaded
    e.target.value = ''
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        relative w-full rounded-[12px] border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center gap-5 py-14 px-8
        transition-all duration-150 select-none
        ${isDragging
          ? 'border-[#C0392B]/60 bg-[#C0392B]/[0.04]'
          : 'border-white/[0.10] hover:border-white/[0.20] bg-[#1a1d27] hover:bg-[#1c2030]'
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={onInputChange}
      />

      {/* Icon */}
      <div
        className={`
          w-14 h-14 rounded-[12px] flex items-center justify-center transition-all
          ${isDragging ? 'bg-[#C0392B]/15 scale-110' : 'bg-white/[0.05]'}
        `}
      >
        {isDragging ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C0392B]/80">
            <path d="M12 3l7 7-7 7M5 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="text-center">
        <p className={`font-medium text-sm transition-colors ${isDragging ? 'text-white/90' : 'text-white/70'}`}>
          {isDragging ? 'Release to analyse' : 'Drop your document here'}
        </p>
        <p className="text-white/30 text-sm mt-1">
          or <span className="text-white/50 underline underline-offset-2">browse to upload</span>
        </p>
      </div>

      {/* Format hint */}
      <div className="flex items-center gap-1.5">
        {['XLSX', 'CSV', 'EML', 'PNG', 'JPG'].map((fmt) => (
          <span
            key={fmt}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
              isDragging
                ? 'bg-[#C0392B]/10 text-[#C0392B]/60 border border-[#C0392B]/20'
                : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
            }`}
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  )
}
