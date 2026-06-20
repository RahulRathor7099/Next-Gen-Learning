'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const

export default function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
    >
      {children}
    </motion.div>
  )
}
