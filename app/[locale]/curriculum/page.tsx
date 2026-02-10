'use client'

/**
 * Curriculum Browser Page
 * Displays all domains and topics from the API
 */

import { useCurriculum } from '@/hooks/useCurriculum'
import AppLayout from '@/components/layout/AppLayout'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { useState } from 'react'

export default function CurriculumPage() {
  const locale = useLocale()
  const { domains, isLoading, error, refetch } = useCurriculum()
  const [selectedLevel, setSelectedLevel] = useState<string>('all')

  // Get unique levels
  const levels = ['all', ...Array.from(new Set(domains.map(d => d.level)))]

  // Filter domains by level
  const filteredDomains = selectedLevel === 'all'
    ? domains
    : domains.filter(d => d.level === selectedLevel)

  // Calculate statistics
  const stats = {
    totalDomains: domains.length,
    totalTopics: domains.reduce((sum, domain) => sum + domain.topics.length, 0),
    totalExercises: domains.reduce((sum, domain) => {
      return sum + domain.topics.reduce((topicSum, topic) => topicSum + topic.exerciseCount, 0)
    }, 0),
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading curriculum...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Loading Curriculum
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Mathematics Curriculum</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Complete learning path from basics to advanced mathematics
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stats.totalDomains}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Domains</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {stats.totalTopics}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Topics</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {stats.totalExercises.toLocaleString()}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Exercises</div>
          </div>
        </div>

        {/* Level Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Filter by Level:</label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {level === 'all' ? 'All Levels' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="space-y-8">
          {filteredDomains.map((domain, index) => (
            <section
              key={domain.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Domain Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {domain.title}
                      </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {domain.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full">
                        {domain.level}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {domain.topics.length} topics
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {domain.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      href={`/${locale}/learn/${domain.slug}/${topic.slug}`}
                      className="group block p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {topic.title}
                        </h3>
                        {topic.hasLesson && (
                          <span className="text-green-600 dark:text-green-400" title="Lesson available">
                            📚
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {topic.exerciseCount} exercises
                        </span>
                        {topic.proofCount && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {topic.proofCount} proofs
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No domains found for the selected level.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
