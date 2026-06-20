'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Check, Loader2 } from 'lucide-react'
import { Course } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import BentoGrid from '@/components/bento/BentoGrid'
import HeroTile from '@/components/bento/HeroTile'
import CourseCard from '@/components/bento/CourseCard'
import ActivityTile from '@/components/bento/ActivityTile'

interface DashboardClientProps {
  initialCourses: Course[]
  isOffline: boolean
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

export default function DashboardClient({ initialCourses, isOffline: initialOffline }: DashboardClientProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [isOffline, setIsOffline] = useState(initialOffline)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Form states
  const [title, setTitle] = useState('')
  const [progress, setProgress] = useState(50)
  const [iconName, setIconName] = useState('Code2')

  const availableIcons = ['Code2', 'FileType', 'Layers', 'Database']

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setLoading(true)
    const newCourseObj = {
      title: title.trim(),
      progress,
      icon_name: iconName,
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('courses')
        .insert([newCourseObj])
        .select()

      if (error) {
        throw new Error(error.message)
      }

      if (data && data.length > 0) {
        setCourses((prev) => [...prev, data[0]])
      } else {
        // Fallback if insert succeeded but returned no data
        setCourses((prev) => [...prev, { id: Math.random().toString(), ...newCourseObj }])
      }
      setIsOffline(false)
    } catch (err) {
      console.warn('Supabase insert failed, adding to local state only:', err)
      // Local state fallback for offline mode
      setCourses((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          ...newCourseObj,
        },
      ])
      setIsOffline(true)
    } finally {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setIsAddModalOpen(false)
        setTitle('')
        setProgress(50)
        setIconName('Code2')
      }, 1500)
    }
  }

  return (
    <div className="space-y-8 select-none relative">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-jetbrains tracking-widest text-cyan uppercase font-semibold">
            {isOffline ? 'Offline Session' : 'System Synchronized'}
          </span>
          <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber' : 'bg-green'} animate-pulse`} />
        </div>
        <h2 className="font-syne font-bold text-3xl text-text tracking-tight">
          Next-Gen Learning Dashboard
        </h2>
      </div>

      {/* Bento Layout */}
      <BentoGrid>
        <HeroTile />

        {courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <ActivityTile />
      </BentoGrid>
    </div>
  )
}
