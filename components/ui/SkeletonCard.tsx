export default function SkeletonCard() {
  return (
    <div className="glass-sm p-6 rounded-2xl flex flex-col justify-between h-[160px] animate-pulse border border-white/5 bg-white/2">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-white/10 rounded-xl" />
        <div className="w-4 h-4 bg-white/10 rounded-full" />
      </div>
      <div>
        <div className="h-4 bg-white/10 rounded w-2/3 mb-3" />
        <div className="h-2 bg-white/10 rounded w-full mb-1" />
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-white/10 rounded w-1/4" />
          <div className="h-3 bg-white/10 rounded w-1/8" />
        </div>
      </div>
    </div>
  )
}
