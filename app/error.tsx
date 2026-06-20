'use client'

import { useEffect } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 select-none">
      <div className="glass-md max-w-md p-8 rounded-2xl border border-rose/25 bg-rose/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-rose/10 border border-rose/20 flex items-center justify-center text-rose mx-auto mb-6">
          <AlertCircle size={28} />
        </div>

        <h2 className="font-syne font-bold text-2xl text-text mb-3 tracking-tight">
          System Sync Interrupted
        </h2>
        
        <p className="text-muted2 font-space text-sm leading-relaxed mb-8">
          The application encountered a database connection failure. Please verify that your Supabase credentials are configured correctly and the <code className="bg-white/5 px-1.5 py-0.5 rounded text-rose border border-white/5 font-jetbrains text-xs">courses</code> database table exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-text font-medium text-sm transition-all duration-200"
          >
            <RotateCcw size={16} />
            Try Reconnecting
          </button>
        </div>
      </div>
    </div>
  )
}
