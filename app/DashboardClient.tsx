'use client'

import { useState } from 'react'
import { Course } from '@/lib/types'
import BentoGrid from '@/components/bento/BentoGrid'
import HeroTile from '@/components/bento/HeroTile'
import CourseCard from '@/components/bento/CourseCard'
import ActivityTile from '@/components/bento/ActivityTile'

interface DashboardClientProps {
  initialCourses: Course[]
  isOffline: boolean
}

export default function DashboardClient({ initialCourses, isOffline: initialOffline }: DashboardClientProps) {
  const [courses] = useState<Course[]>(initialCourses)
  const [isOffline] = useState(initialOffline)


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
