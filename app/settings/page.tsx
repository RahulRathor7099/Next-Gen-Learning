'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Settings, ArrowLeft, User, Bell, X, Check, Link2, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const sections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Configure email address, avatar, display names, and details.',
      icon: <User size={18} className="text-cyan" />,
      content: (
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-xs font-jetbrains text-muted2 block mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="Rahul Rathor"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-violet/50"
            />
          </div>
          <div>
            <label className="text-xs font-jetbrains text-muted2 block mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="rahul.rathor@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-violet/50"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Choose alerts for streaks, deadlines, and dashboard status.',
      icon: <Bell size={18} className="text-amber" />,
      content: (
        <div className="space-y-3 mt-4">
          <label className="flex items-center gap-3 cursor-pointer py-1 select-none">
            <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-violet focus:ring-violet/20" />
            <span className="text-sm text-text">Daily streak reminders</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer py-1 select-none">
            <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-violet focus:ring-violet/20" />
            <span className="text-sm text-text">Course progress notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer py-1 select-none">
            <input type="checkbox" className="rounded border-white/10 bg-white/5 text-violet focus:ring-violet/20" />
            <span className="text-sm text-text">Weekly performance digest</span>
          </label>
        </div>
      ),
    },
    {
      id: 'developer',
      title: 'Connect with Developer',
      description: 'Visit the developer profile on LinkedIn for collaboration.',
      icon: <Link2 size={18} className="text-blue" />,
      content: (
        <div className="space-y-4 mt-4 text-center">
          <div className="w-16 h-16 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center text-blue mx-auto mb-2 shadow-lg shadow-blue/10 animate-pulse">
            <User size={24} />
          </div>
          <h4 className="font-syne font-bold text-text text-base">Rahul Rathor</h4>
          <p className="text-xs font-space text-muted2">Web & Database Software Engineer</p>
          <div className="pt-2">
            <a
              href="https://www.linkedin.com/in/rahul-rathor-aa0330284?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue hover:bg-blue/90 text-white font-semibold text-xs shadow-lg shadow-blue/25 transition-all duration-200"
            >
              <Link2 size={14} /> Open LinkedIn Profile <ExternalLink size={12} />
            </a>
          </div>
        </div>
      ),
    },
  ]

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setActiveModal(null)
    }, 1500)
  }

  const activeSection = sections.find((s) => s.id === activeModal)

  return (
    <div className="space-y-8 select-none relative">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-jetbrains text-muted2 hover:text-text transition-colors duration-200"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center text-violet">
            <Settings size={20} />
          </div>
          <h2 className="font-syne font-bold text-3xl text-text tracking-tight">
            Account Settings
          </h2>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {sections.map((sec) => (
          <div
            key={sec.id}
            onClick={() => setActiveModal(sec.id)}
            className="glass-sm p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors duration-200">
                {sec.icon}
              </div>
              <div>
                <h3 className="font-syne font-semibold text-text text-base group-hover:text-white transition-colors duration-200">
                  {sec.title}
                </h3>
                <p className="text-xs font-space text-muted2 mt-1">{sec.description}</p>
              </div>
            </div>
            <span className="text-muted group-hover:text-text font-jetbrains text-xs transition-colors duration-200">
              Configure →
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Settings Modal Overlay */}
      <AnimatePresence>
        {activeModal && activeSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="glass-md w-full max-w-md p-6 rounded-2xl border border-white/12 bg-panel relative z-10 shadow-2xl overflow-hidden"
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet via-cyan to-blue" />

              {/* Title Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    {activeSection.icon}
                  </div>
                  <h3 className="font-syne font-bold text-lg text-text">
                    {activeSection.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-muted2 hover:text-text transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="py-2">
                {activeSection.content}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-3">
                {activeModal === 'developer' ? (
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet to-blue hover:from-violet/90 hover:to-blue/90 text-white transition-all duration-200"
                  >
                    Done
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-muted2 hover:text-text hover:bg-white/5 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet to-blue hover:from-violet/90 hover:to-blue/90 text-white flex items-center gap-2 shadow-lg shadow-violet/25 transition-all duration-200"
                      disabled={saveSuccess}
                    >
                      {saveSuccess ? (
                        <>
                          <Check size={14} /> Saved Changes
                        </>
                      ) : (
                        'Save Configurations'
                      )}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
