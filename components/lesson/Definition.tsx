'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DefinitionProps {
  term: string
  children: ReactNode
  variant?: 'default' | 'important'
  example?: ReactNode
}

export default function Definition({ term, children, variant = 'default', example }: DefinitionProps) {
  return (
    <div className={cn(
      'my-6 p-4 sm:p-6 rounded-xl border-l-4',
      variant === 'important'
        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 dark:border-purple-400'
        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400'
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
          variant === 'important'
            ? 'bg-purple-100 dark:bg-purple-900/40'
            : 'bg-blue-100 dark:bg-blue-900/40'
        )}>
          <svg className={cn(
            'w-6 h-6',
            variant === 'important'
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-blue-600 dark:text-blue-400'
          )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {term}
          </h3>
          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-2">
            {children}
          </div>
          {example && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Example</p>
              <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {example}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
