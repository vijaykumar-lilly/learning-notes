'use client'

import { useEffect, useState } from 'react'
import { getAnalytics, type AnalyticsData } from '@/lib/admin-api'

function MetricCard({ label, value, subtitle, color = 'blue' }: { label: string; value: string | number; subtitle?: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: 'border-l-blue-500',
    green: 'border-l-green-500',
    purple: 'border-l-purple-500',
    yellow: 'border-l-yellow-500',
    red: 'border-l-red-500',
  }
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 ${colors[color]} p-5`}>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const analytics = await getAnalytics()
        setData(analytics)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || 'Failed to load analytics'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>

      {/* Users Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Users
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Users" value={data.users.total} color="blue" />
          <MetricCard label="Active (30d)" value={data.users.active_30d} color="green" />
          <MetricCard label="New This Week" value={data.users.new_7d} color="purple" />
          <MetricCard label="Admins" value={data.users.admins} color="yellow" />
        </div>
      </div>

      {/* Content Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Content
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard label="Subjects" value={data.content.subjects} color="purple" />
          <MetricCard label="Domains" value={data.content.domains} color="blue" />
          <MetricCard label="Topics" value={data.content.topics} color="green" />
          <MetricCard label="Lessons" value={data.content.lessons} color="yellow" />
          <MetricCard label="Exercises" value={data.content.exercises} color="red" />
          <MetricCard label="Lesson Sections" value={data.content.sections} subtitle="Content blocks" color="purple" />
        </div>
      </div>

      {/* Learning Progress */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Learning Progress
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Lessons Completed" value={data.progress.total_completions} color="green" />
          <MetricCard label="Exercise Submissions" value={data.progress.total_submissions} color="blue" />
          <MetricCard label="Avg Accuracy" value={`${data.progress.avg_accuracy}%`} color="purple" subtitle={data.progress.total_submissions > 0 ? 'Across all submissions' : 'No data yet'} />
          <MetricCard label="Total Learning Time" value={`${data.progress.total_time_hours}h`} color="yellow" />
        </div>
      </div>
    </div>
  )
}
