'use client'

import { motion } from 'framer-motion'
import { Course } from '@/lib/types'
import DynamicIcon from '../ui/DynamicIcon'
import ProgressBar from '../ui/ProgressBar'

interface CourseCardProps {
  course: Course
}

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

export default function CourseCard({ course }: CourseCardProps) {
  // Determine gradient color based on progress
  let progressColor = 'from-blue to-cyan'
  if (course.progress > 80) progressColor = 'from-green to-cyan'
  if (course.progress < 40) progressColor = 'from-rose to-violet'

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        boxShadow:
          '0 0 0 1px rgba(139, 92, 246, 0.4), 0 12px 40px rgba(139, 92, 246, 0.15)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-sm p-6 rounded-2xl flex flex-col justify-between h-[180px] cursor-pointer relative overflow-hidden group select-none"
    >
      {/* Premium grain/glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/[0.02] pointer-events-none" />
      <div className="absolute -inset-px bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start relative z-10">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-cyan group-hover:text-violet transition-colors duration-300">
          <DynamicIcon name={course.icon_name} size={22} />
        </div>
        <span className="text-[10px] font-jetbrains tracking-widest text-muted2 uppercase font-medium">
          Module
        </span>
      </div>

      {/* Footer Info */}
      <div className="relative z-10">
        <h3 className="font-syne font-semibold text-[15px] leading-snug text-text mb-4 group-hover:text-white transition-colors duration-200">
          {course.title}
        </h3>

        <div className="space-y-2">
          <ProgressBar value={course.progress} colorClass={progressColor} />

          <div className="flex justify-between items-center text-xs font-jetbrains">
            <span className="text-muted2">Progress</span>
            <span className="text-text font-semibold">{course.progress}%</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
