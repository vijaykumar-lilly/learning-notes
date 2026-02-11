'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProgressOverview, getRecommendations, type ProgressOverview, type Recommendation } from '@/lib/progress-api'

export default function ProgressPage() {
  const router = useRouter()
  const [overview, setOverview] = useState<ProgressOverview | null>(null)
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [overviewData, recommendationsData] = await Promise.all([
          getProgressOverview(),
          getRecommendations()
        ])

        if (!overviewData) {
          // Not authenticated, redirect to login
          router.push('/en/auth/login')
          return
        }

        setOverview(overviewData)
        setRecommendations(recommendationsData)
      } catch (err) {
        setError('Failed to load progress data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your progress...</p>
        </div>
      </div>
    )
  }

  if (error || !overview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">{error || 'Failed to load progress'}</p>
        </div>
      </div>
    )
  }

  const completionPercentage = overview.total_lessons > 0
    ? Math.round((overview.completed_lessons / overview.total_lessons) * 100)
    : 0

  const totalHours = Math.floor(overview.total_time_spent / 3600)
  const totalMinutes = Math.floor((overview.total_time_spent % 3600) / 60)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Lessons */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Total Lessons</span>
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {overview.total_lessons}
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Completed</span>
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {overview.completed_lessons}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {completionPercentage}% complete
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">In Progress</span>
              <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {overview.in_progress_lessons}
            </div>
          </div>

          {/* Time Spent */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Time Spent</span>
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {totalHours}h {totalMinutes}m
            </div>
          </div>
        </div>

        {/* Recent Lessons */}
        {overview.recent_lessons.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Lessons
            </h2>
            <div className="space-y-3">
              {overview.recent_lessons.map((lesson) => {
                const minutesSpent = Math.floor(lesson.time_spent / 60)
                const statusColor = lesson.status === 'completed'
                  ? 'text-green-600 dark:text-green-400'
                  : lesson.status === 'in_progress'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-600 dark:text-gray-400'

                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {lesson.title_key}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`font-medium ${statusColor}`}>
                          {lesson.status.replace('_', ' ')}
                        </span>
                        <span>{minutesSpent} min</span>
                        <span>{lesson.exercises_completed} exercises</span>
                      </div>
                    </div>
                    <a
                      href={`/en/learn/domain/${lesson.slug}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                    >
                      Continue
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.next_lessons.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended Next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.next_lessons.map((lesson) => (
                <a
                  key={lesson.id}
                  href={`/en/learn/domain/${lesson.slug}`}
                  className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {lesson.title_key}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lesson.reason}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
