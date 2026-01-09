'use client'

import { ReactNode, useState } from 'react'
import ZoomModal from '@/components/ui/ZoomModal'

interface ExampleProps {
  title?: string
  problem: ReactNode
  solution: ReactNode
  hint?: ReactNode
}

export default function Example({ title, problem, solution, hint }: ExampleProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const content = (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase mb-2">Problem</p>
        <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
          {problem}
        </div>
      </div>

      {hint && (
        <details className="group">
          <summary className="cursor-pointer text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 flex items-center gap-2 p-2">
            <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Show Hint
          </summary>
          <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {hint}
            </div>
          </div>
        </details>
      )}

      <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg border border-emerald-300 dark:border-emerald-700">
        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase mb-3">Solution</p>
        <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-3">
          {solution}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="my-6 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 relative group">
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-2 right-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 shadow-sm"
          aria-label="Zoom in"
          title="Click to zoom"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-emerald-900 dark:text-emerald-200">
            {title || 'Example'}
          </h3>
        </div>
      </div>
      
        {content}
      </div>

      <ZoomModal isOpen={isZoomed} onClose={() => setIsZoomed(false)} title={title || 'Example'}>
        {content}
      </ZoomModal>
    </>
  )
}
