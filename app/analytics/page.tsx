import Link from 'next/link'
import { Activity, ArrowLeft, BarChart3, TrendingUp, Zap } from 'lucide-react'

export default function AnalyticsPage() {
  const metrics = [
    { title: 'Weekly Time spent', value: '14.8 hrs', change: '+12% from last week', icon: <TrendingUp size={18} className="text-cyan" /> },
    { title: 'Lessons completed', value: '42 lessons', change: '+5 this week', icon: <Zap size={18} className="text-amber" /> },
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
            <Activity size={20} />
          </div>
          <h2 className="font-syne font-bold text-3xl text-text tracking-tight">
            Performance Analytics
          </h2>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="glass-sm p-6 rounded-2xl border border-white/5 bg-white/2 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
              {metric.icon}
            </div>
            <div>
              <span className="text-xs font-jetbrains text-muted2">{metric.title}</span>
              <h3 className="font-syne font-bold text-2xl text-text mt-1">{metric.value}</h3>
              <p className="text-[10px] font-space text-green mt-1">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Large graph placeholder */}
      <div className="glass-md p-6 rounded-2xl border border-white/5 bg-white/2 h-[300px] flex flex-col justify-between">
        <div>
          <h3 className="font-syne font-bold text-lg text-text">Weekly Activity Trends</h3>
          <p className="text-xs font-space text-muted2">A high-fidelity timeline tracking your interactive commits and coding progress.</p>
        </div>
        <div className="flex items-center justify-center h-48 border border-dashed border-white/10 rounded-xl bg-white/1 flex-col gap-2">
          <BarChart3 size={24} className="text-muted" />
          <span className="text-xs font-jetbrains text-muted">Weekly graph viewport rendering...</span>
        </div>
      </div>
    </div>
  )
}
