import Link from 'next/link'
import { GraduationCap, ArrowLeft, BookOpen } from 'lucide-react'

export default function CoursesPage() {
  const dummyCourses = [
    { title: 'Advanced React Patterns', level: 'Advanced', modules: 12, rating: 4.9 },
    { title: 'TypeScript Deep Dive', level: 'Intermediate', modules: 8, rating: 4.8 },
    { title: 'Next.js App Router Masterclass', level: 'Advanced', modules: 15, rating: 4.9 },
    { title: 'Supabase & PostgreSQL Fundamentals', level: 'Beginner', modules: 10, rating: 4.7 },
  ]

  return (
    <div className="space-y-8 select-none">
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
            <GraduationCap size={20} />
          </div>
          <h2 className="font-syne font-bold text-3xl text-text tracking-tight">
            My Enrolled Courses
          </h2>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyCourses.map((course) => (
          <div
            key={course.title}
            className="glass-sm p-6 rounded-2xl border border-white/5 bg-white/2 hover:border-violet/30 transition-all duration-300 flex flex-col justify-between h-[180px] group"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan">
                <BookOpen size={18} />
              </div>
              <span className="text-[10px] font-jetbrains border border-white/10 bg-white/5 px-2.5 py-1 rounded-md text-muted2">
                {course.level}
              </span>
            </div>
            <div>
              <h3 className="font-syne font-semibold text-lg text-text mb-2 group-hover:text-white transition-colors duration-200">
                {course.title}
              </h3>
              <div className="flex justify-between text-xs font-jetbrains text-muted2">
                <span>{course.modules} Modules</span>
                <span className="text-amber">★ {course.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
