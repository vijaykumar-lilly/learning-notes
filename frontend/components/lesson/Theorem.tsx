'use client'

import { ReactNode } from 'react'

interface TheoremProps {
  title: string
  children: ReactNode
  proof?: ReactNode
}

export default function Theorem({ title, children, proof }: TheoremProps) {
  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold mb-3 text-indigo-900 dark:text-indigo-200">
            Theorem: {title}
          </h3>
          <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-2">
            {children}
          </div>
          {proof && (
            <details className="mt-4 group">
              <summary className="cursor-pointer text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 flex items-center gap-2">
                <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View Proof
              </summary>
              <div className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-2">
                  {proof}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
