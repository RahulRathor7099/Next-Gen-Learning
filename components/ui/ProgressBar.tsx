'use client'

import { useEffect } from 'react'
import { useAnimate } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0 to 100
  colorClass?: string
}

export default function ProgressBar({ value, colorClass = 'from-violet to-blue' }: ProgressBarProps) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(scope.current, { scaleX: value / 100 }, {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.3
    })
  }, [value, animate, scope])

  return (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <div
        ref={scope}
        className={`h-full rounded-full origin-left bg-gradient-to-r ${colorClass}`}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
