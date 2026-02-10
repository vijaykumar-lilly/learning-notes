'use client'

import { ReactNode } from 'react'
import MathRenderer from '@/components/math/MathRenderer'
import { cn } from '@/lib/utils'

interface CommonMistakeProps {
  title: string
  wrongApproach: ReactNode
  wrongMath?: string
  correctApproach: ReactNode
  correctMath?: string
  explanation: ReactNode
  tip?: ReactNode
}

export default function CommonMistake({
  title,
  wrongApproach,
  wrongMath,
  correctApproach,
  correctMath,
  explanation,
  tip
}: CommonMistakeProps) {
  return (
    <div className="my-6 p-6 rounded-xl bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 dark:from-red-900/20 dark:via-yellow-900/20 dark:to-green-900/20 border-2 border-gray-300 dark:border-gray-600">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h4>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Wrong approach */}
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-2 border-red-300 dark:border-red-700">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="font-semibold text-red-700 dark:text-red-400">
              Common Mistake
            </p>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {wrongApproach}
          </div>
          {wrongMath && (
            <div className="p-3 bg-white dark:bg-gray-800 rounded border border-red-200 dark:border-red-700">
              <MathRenderer math={wrongMath} />
            </div>
          )}
        </div>
        
        {/* Correct approach */}
        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-2 border-green-300 dark:border-green-700">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-semibold text-green-700 dark:text-green-400">
              Correct Approach
            </p>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {correctApproach}
          </div>
          {correctMath && (
            <div className="p-3 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-700">
              <MathRenderer math={correctMath} />
            </div>
          )}
        </div>
      </div>
      
      {/* Explanation */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
        <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-400 mb-2 uppercase">
          💡 Why This Matters
        </p>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {explanation}
        </div>
      </div>
      
      {/* Optional tip */}
      {tip && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">
            ✨ Pro Tip
          </p>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {tip}
          </div>
        </div>
      )}
    </div>
  )
}
