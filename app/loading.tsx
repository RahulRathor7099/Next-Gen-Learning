import BentoGrid from '@/components/bento/BentoGrid'
import SkeletonCard from '@/components/ui/SkeletonCard'

export default function Loading() {
  return (
    <div className="space-y-8 select-none">
      {/* Header Loading Placeholder */}
      <div className="space-y-3">
        <div className="w-32 h-3 bg-white/5 rounded animate-pulse" />
        <div className="w-80 h-10 bg-white/10 rounded-lg animate-pulse" />
      </div>

      {/* Grid of Skeleton items */}
      <BentoGrid>
        {/* Hero Tile placeholder */}
        <div className="glass-sm p-8 rounded-2xl md:col-span-2 lg:col-span-2 min-h-[300px] bg-white/2 border border-white/5 flex flex-col justify-between animate-pulse">
          <div className="space-y-4">
            <div className="w-16 h-3 bg-white/5 rounded" />
            <div className="w-48 h-8 bg-white/10 rounded-md" />
            <div className="w-72 h-4 bg-white/5 rounded" />
          </div>
          <div className="flex gap-4">
            <div className="w-32 h-12 bg-white/5 rounded-xl" />
            <div className="w-32 h-12 bg-white/5 rounded-xl" />
          </div>
        </div>

        {/* 3D mesh Canvas placeholder */}
        <div className="glass-sm p-6 rounded-2xl bg-white/2 border border-white/5 flex flex-col items-center justify-center min-h-[300px] animate-pulse">
          <div className="w-28 h-28 rounded-full bg-white/5" />
        </div>

        {/* Course Card placeholders */}
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

        {/* Activity Tile placeholder */}
        <div className="glass-sm p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-3 border border-white/5 bg-white/2 h-[220px] animate-pulse" />
      </BentoGrid>
    </div>
  )
}
