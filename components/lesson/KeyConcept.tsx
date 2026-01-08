'use client'

import { ReactNode } from 'react'

interface KeyConceptProps {
  title?: string
  children: ReactNode
}

export default function KeyConcept({ title = 'Key Concept', children }: KeyConceptProps) {
  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-700">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-amber-900 dark:text-amber-200">
            {title}
          </h3>
          <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
