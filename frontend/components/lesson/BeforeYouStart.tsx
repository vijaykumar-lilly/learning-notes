'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Prerequisite {
  title: string
  description: string
  reviewLink?: string
}

interface BeforeYouStartProps {
  prerequisites: Prerequisite[]
  children?: ReactNode
}

export default function BeforeYouStart({ prerequisites, children }: BeforeYouStartProps) {
  return (
    <div className="my-6 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-2 border-indigo-300 dark:border-indigo-700">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200">
          Before You Start
        </h3>
      </div>
      
      {children ? (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {children}
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            Make sure you're comfortable with these topics:
          </p>
          
          <ul className="space-y-3">
            {prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">✓</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {prereq.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {prereq.description}
                  </p>
                  {prereq.reviewLink && (
                    <a 
                      href={prereq.reviewLink} 
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-1 inline-block"
                    >
                      Review this topic →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      
      <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          💡 Need a refresher? Review the topics above before starting this lesson for the best learning experience!
        </p>
      </div>
    </div>
  )
}
