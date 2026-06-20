'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

interface DataPoint {
  label: string
  value: number
  detail: string
}

interface DataType {
  color: string
  glowColor: string
  label: string
  total: string
  textColor: string
  points: DataPoint[]
}

const DATA_SET: Record<string, DataType> = {
  commits: {
    color: 'url(#emerald-grad)',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    label: 'Interactive Commits',
    total: '348 commits',
    textColor: 'text-emerald-400',
    points: [
      { label: 'Jan', value: 20, detail: '20 commits · scaffold init' },
      { label: 'Mar', value: 45, detail: '45 commits · database setup' },
      { label: 'May', value: 35, detail: '35 commits · grid structure' },
      { label: 'Jul', value: 70, detail: '70 commits · canvas components' },
      { label: 'Sep', value: 50, detail: '50 commits · custom shaders' },
      { label: 'Nov', value: 85, detail: '85 commits · hot reload sync' },
      { label: 'Dec', value: 98, detail: '98 commits · code optimization' },
    ],
  },
  hours: {
    color: 'url(#violet-grad)',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    label: 'Study Hours',
    total: '164.5 hrs',
    textColor: 'text-violet',
    points: [
      { label: 'Jan', value: 15, detail: '15 hrs · react basics' },
      { label: 'Mar', value: 28, detail: '28 hrs · advanced hooks' },
      { label: 'May', value: 22, detail: '22 hrs · performance tuning' },
      { label: 'Jul', value: 48, detail: '48 hrs · WebGL & Three.js' },
      { label: 'Sep', value: 32, detail: '32 hrs · gsap scrolltrigger' },
      { label: 'Nov', value: 58, detail: '58 hrs · server client hooks' },
      { label: 'Dec', value: 65, detail: '65 hrs · final review & ship' },
    ],
  },
  xp: {
    color: 'url(#amber-grad)',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    label: 'XP Points',
    total: '12,450 XP',
    textColor: 'text-amber',
    points: [
      { label: 'Jan', value: 500, detail: '500 XP · level 1 master' },
      { label: 'Mar', value: 1800, detail: '1,800 XP · database champion' },
      { label: 'May', value: 1400, detail: '1,400 XP · layout genius' },
      { label: 'Jul', value: 3200, detail: '3,200 XP · legendary renderer' },
      { label: 'Sep', value: 2200, detail: '2,200 XP · animation wizard' },
      { label: 'Nov', value: 3800, detail: '3,800 XP · cookie parser pro' },
      { label: 'Dec', value: 4800, detail: '4,800 XP · dashboard supreme' },
    ],
  },
}

export default function ActivityTile() {
  const [activeTab, setActiveTab] = useState<string>('commits')
  const [hoveredPoint, setHoveredPoint] = useState<(DataPoint & { x: number; y: number }) | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const areaRef = useRef<SVGPathElement>(null)

  const activeData = DATA_SET[activeTab]

  // Dimension coordinates
  const width = 640
  const height = 140
  const padding = 20

  const maxVal = Math.max(...activeData.points.map((p) => p.value))
  
  // Calculate coordinates
  const coordinates = activeData.points.map((p, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (activeData.points.length - 1)
    const y = height - padding - (p.value / maxVal) * (height - padding * 2)
    return { ...p, x, y }
  })

  // Build SVG Path string
  const pathD = coordinates.reduce((acc, curr, idx) => {
    if (idx === 0) return `M ${curr.x},${curr.y}`
    
    // Smooth Bezier Curve interpolation
    const prev = coordinates[idx - 1]
    const cpX1 = prev.x + (curr.x - prev.x) / 2
    const cpY1 = prev.y
    const cpX2 = prev.x + (curr.x - prev.x) / 2
    const cpY2 = curr.y
    
    return `${acc} C ${cpX1},${cpY1} ${cpX2},${cpY2} ${curr.x},${curr.y}`
  }, '')

  const areaD = `${pathD} L ${coordinates[coordinates.length - 1].x},${height} L ${coordinates[0].x},${height} Z`

  useEffect(() => {
    // GSAP path drawing animation on tab change
    if (pathRef.current && areaRef.current) {
      const length = pathRef.current.getTotalLength()
      
      gsap.fromTo(
        pathRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power3.out' }
      )
      
      gsap.fromTo(
        areaRef.current,
        { opacity: 0, scaleY: 0 },
        { opacity: 0.15, scaleY: 1, originY: 1, duration: 1.5, ease: 'power3.out' }
      )
    }
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="glass-sm p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-3 border border-white/5 bg-white/2 select-none relative overflow-hidden flex flex-col justify-between"
    >
      {/* Top Ambient Glow */}
      <div
        className="absolute top-[-80px] right-[-80px] w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: activeTab === 'commits' ? 'rgba(52, 211, 153, 0.15)' : activeTab === 'hours' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)' }}
      />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 relative z-10">
        <div>
          <h3 className="font-syne font-bold text-lg text-text mb-1">
            Learning Activity Stream
          </h3>
          <p className="text-xs font-space text-muted2">
            Futuristic analytics tracking your commits, hours, and experience points.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
          {Object.keys(DATA_SET).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-space tracking-wide transition-all duration-300 capitalize ${
                activeTab === tabKey
                  ? 'bg-white/10 text-white shadow-md'
                  : 'text-muted2 hover:text-text'
              }`}
            >
              {tabKey}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary View */}
      <div className="flex justify-between items-baseline mb-6 relative z-10">
        <span className="text-xs font-space text-muted2">{activeData.label}</span>
        <div className={`text-2xl font-syne font-bold ${activeData.textColor} tracking-tight`}>
          {activeData.total}
        </div>
      </div>

      {/* Interactive SVG Spline Viewport */}
      <div className="relative h-[150px] w-full flex items-center justify-center">
        {/* SVG Container */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="emerald-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="violet-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="amber-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>

          {/* Grid lines background */}
          <g className="opacity-10">
            <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#fff" strokeDasharray="4" />
            <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#fff" strokeDasharray="4" />
            <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#fff" strokeDasharray="4" />
          </g>

          {/* Glowing Area Fill Path */}
          <path
            ref={areaRef}
            d={areaD}
            fill={activeData.color}
            opacity="0.15"
            className="transition-all duration-500"
          />

          {/* Main Spline Neon line */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={activeData.color}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="transition-all duration-500 filter drop-shadow-[0_2px_8px_var(--tw-shadow-color)]"
            style={{
              '--tw-shadow-color': activeData.glowColor,
            } as React.CSSProperties}
          />

          {/* Active Nodes */}
          {coordinates.map((point, idx) => (
            <g key={idx}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#fff"
                className="transition-transform duration-300 hover:scale-150 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="none"
                stroke={activeTab === 'commits' ? '#10b981' : activeTab === 'hours' ? '#8b5cf6' : '#f59e0b'}
                strokeWidth="1.5"
                className="animate-pulse"
                opacity="0.6"
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute pointer-events-none bg-panel border border-border px-3 py-2 rounded-xl text-[10px] font-space shadow-xl z-30 flex flex-col gap-0.5"
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                top: `${(hoveredPoint.y / height) * 100 - 35}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <span className="font-semibold text-text font-jetbrains">{hoveredPoint.label}</span>
              <span className="text-muted2">{hoveredPoint.detail}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between items-center mt-3 text-[10px] font-jetbrains text-muted relative z-10 px-2">
        {activeData.points.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
    </div>
  )
}
