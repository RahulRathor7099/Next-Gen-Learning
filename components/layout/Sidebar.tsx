'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Terminal
} from 'lucide-react'
import NavItem from './NavItem'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { href: '/courses', label: 'My Courses', icon: <GraduationCap size={20} /> },
    { href: '/analytics', label: 'Performance', icon: <Activity size={20} /> },
    { href: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  return (
    <motion.aside
      className="glass-md h-[calc(100vh-48px)] my-6 ml-6 flex flex-col justify-between border border-white/10 rounded-2xl relative z-30 flex-shrink-0"
      animate={{ width: collapsed ? '80px' : '260px' }}
      transition={{ type: 'spring', stiffness: 280, damping: 25 }}
    >
      <div className="flex flex-col p-4 gap-8">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 h-10">
          {!collapsed && (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet to-blue flex items-center justify-center text-white shadow-lg shadow-violet/25">
                <Terminal size={16} />
              </div>
              <span className="font-syne font-bold text-lg tracking-tight bg-gradient-to-r from-white to-muted2 bg-clip-text text-transparent">
                Pro Max
              </span>
            </motion.div>
          )}

          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet to-blue flex items-center justify-center text-white mx-auto shadow-lg shadow-violet/25">
              <Terminal size={16} />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* Collapse Toggle Button */}
      <div className="p-4 border-t border-white/5 flex items-center justify-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 text-muted2 hover:text-text flex items-center justify-center transition-all duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </motion.aside>
  )
}
