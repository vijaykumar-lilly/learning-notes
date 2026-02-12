'use client'

import AppLayout from '@/components/layout/AppLayout'
import { useSubjects } from '@/hooks/useCurriculum'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function SubjectsPage() {
  const locale = useLocale()
  const { subjects, isLoading, error, refetch } = useSubjects()

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Subjects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose a subject to start learning
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading subjects...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Loading Subjects
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Subjects Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/${locale}/subjects/${subject.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                  <h2 className="text-xl font-bold text-white mb-1">
                    {subject.name}
                  </h2>
                  {subject.grade_level && (
                    <span className="text-sm text-blue-100">
                      {subject.grade_level}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {subject.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {subject.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {subject.total_domains} domains
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {subject.total_topics} topics
                    </span>
                  </div>

                  <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>Explore subject</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && subjects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Subjects Yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Subjects will appear here once they are published.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
