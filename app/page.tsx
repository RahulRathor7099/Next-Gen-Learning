import { createClient } from '@/lib/supabase/server'
import { Course } from '@/lib/types'
import DashboardClient from './DashboardClient'

export const revalidate = 0 // Disable cache for live database updates

const MOCK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns', progress: 75, icon_name: 'Code2' },
  { id: '2', title: 'TypeScript Deep Dive', progress: 42, icon_name: 'FileType' },
  { id: '3', title: 'Next.js App Router', progress: 90, icon_name: 'Layers' },
  { id: '4', title: 'Supabase & PostgreSQL', progress: 28, icon_name: 'Database' },
]

export default async function Home() {
  const supabase = createClient()
  let courses: Course[] = []
  let isOffline = false

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch failed or returned empty, falling back to mock data:', error)
      courses = MOCK_COURSES
      isOffline = true
    } else {
      courses = data
    }
  } catch (e) {
    console.warn('Supabase connection timed out or failed, falling back to mock data:', e)
    courses = MOCK_COURSES
    isOffline = true
  }

  return <DashboardClient initialCourses={courses} isOffline={isOffline} />
}
