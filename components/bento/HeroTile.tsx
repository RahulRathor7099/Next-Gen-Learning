'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Flame, ArrowUpRight } from 'lucide-react'

const HeroScene = dynamic(() => import('../three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-xs font-jetbrains text-muted">
      Initializing 3D Core...
    </div>
  ),
})

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
} as const

export default function HeroTile() {
  return (
    <motion.section
      variants={itemVariants}
      className="glass-sm p-8 rounded-2xl md:col-span-2 lg:col-span-2 min-h-[300px] flex flex-col md:flex-row gap-6 relative overflow-hidden select-none"
    >
      {/* Content Side */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4 text-violet">
            <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse-dot" />
            <span className="text-[10px] font-jetbrains tracking-widest uppercase font-semibold">
              Live Session
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-syne font-bold text-3xl md:text-4xl text-text leading-tight mb-2 tracking-tight">
            Hello, <span className="bg-gradient-to-r from-violet via-cyan to-blue bg-clip-text text-transparent">Developer</span>
          </h1>
          <p className="text-muted2 font-space text-sm leading-relaxed max-w-[340px]">
            You&apos;re on a roll! Keep expanding your engineering skills and complete your daily goals.
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 mt-6">
          {/* Streak Stat */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center text-amber">
              <Flame size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-jetbrains text-muted">Daily Streak</span>
              <span className="text-sm font-space font-bold text-text">7 Days</span>
            </div>
          </div>

          {/* Progress Stat */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center text-green">
              <ArrowUpRight size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-jetbrains text-muted">Goal Completion</span>
              <span className="text-sm font-space font-bold text-text">84%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Scene Side */}
      <div className="w-full md:w-[220px] lg:w-[260px] h-[220px] md:h-auto relative z-10 flex-shrink-0">
        <HeroScene />
      </div>
    </motion.section>
  )
}
