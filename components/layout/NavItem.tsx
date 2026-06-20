'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NavItemProps {
  href: string
  icon: ReactNode
  label: string
  isActive: boolean
  collapsed?: boolean
}

export default function NavItem({ href, icon, label, isActive, collapsed = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-200 group text-sm font-medium ${
        isActive ? 'text-text' : 'text-muted2 hover:text-text'
      }`}
    >
      {/* Active Indicator Sliding Pill */}
      {isActive && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-white/5 border border-white/8 rounded-xl z-0"
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 30,
          }}
        />
      )}

      {/* Icon and Label */}
      <span className="relative z-10 flex-shrink-0">{icon}</span>

      {!collapsed && (
        <span className="relative z-10 font-space tracking-wide whitespace-nowrap">
          {label}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-left bg-panel border border-border px-3 py-1.5 rounded-lg text-xs tracking-wider font-space text-text whitespace-nowrap z-50 shadow-xl">
          {label}
        </div>
      )}
    </Link>
  )
}
