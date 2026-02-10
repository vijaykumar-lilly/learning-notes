'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { LessonMetadata } from '@/types/lesson'
import { cn } from '@/lib/utils'

interface LessonHeaderProps {
  metadata: LessonMetadata
  breadcrumbs?: { label: string; href: string }[]
}

export default function LessonHeader({ metadata, breadcrumbs }: LessonHeaderProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
    intermediate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
    advanced: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700',
    expert: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
  }

  return (
    <div className="mb-8">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                <span>/</span>
                <Link
                  href={crumb.href}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {crumb.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {metadata.title}
              </span>
            </li>
          </ol>
        </nav>
      )}

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {metadata.title}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
        {metadata.description}
      </p>

      {/* Metadata Tags */}
      <div className="flex flex-wrap gap-3 text-sm">
        {/* Difficulty */}
        <span
          className={cn(
            'px-3 py-1 rounded-full border font-medium',
            difficultyColors[metadata.difficulty]
          )}
        >
          {metadata.difficulty.charAt(0).toUpperCase() + metadata.difficulty.slice(1)}
        </span>

        {/* Domain */}
        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium border border-purple-300 dark:border-purple-700">
          {metadata.domain}
        </span>

        {/* Estimated Time */}
        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium border border-gray-300 dark:border-gray-700 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {metadata.estimatedTime} min
        </span>

        {/* Exercise Count */}
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-medium border border-blue-300 dark:border-blue-700">
          {metadata.exerciseCount} Exercises
        </span>

        {/* Proof Count */}
        {metadata.proofCount && metadata.proofCount > 0 && (
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full font-medium border border-indigo-300 dark:border-indigo-700">
            {metadata.proofCount} Proofs
          </span>
        )}
      </div>

      {/* Learning Objectives */}
      {metadata.learningObjectives.length > 0 && (
        <details className="mt-6 group">
          <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Learning Objectives ({metadata.learningObjectives.length})
          </summary>
          <ul className="mt-3 ml-6 space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc">
            {metadata.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </details>
      )}

      {/* Prerequisites */}
      {metadata.prerequisites.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Prerequisites:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Before starting this lesson, you should complete: {metadata.prerequisites.join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
