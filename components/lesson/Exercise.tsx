'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface ExerciseProps {
  number?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  problem: ReactNode
  solution: ReactNode
  hints?: ReactNode[]
}

export default function Exercise({ number, difficulty = 'medium', problem, solution, hints }: ExerciseProps) {
  const [showSolution, setShowSolution] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)

  const difficultyColors = {
    easy: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
    hard: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
  }

  return (
    <div className="my-4 p-4 sm:p-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {number && (
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
              #{number}
            </span>
          )}
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-full border',
            difficultyColors[difficulty]
          )}>
            {difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {problem}
      </div>

      <div className="flex flex-wrap gap-2">
        {hints && hints.length > 0 && currentHint < hints.length && !showSolution && (
          <button
            onClick={() => setCurrentHint(currentHint + 1)}
            className="px-4 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors border border-yellow-300 dark:border-yellow-700"
          >
            💡 Show Hint {currentHint + 1}/{hints.length}
          </button>
        )}
        
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-4 py-2 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          {showSolution ? '🔒 Hide Solution' : '🔓 Show Solution'}
        </button>
      </div>

      {hints && currentHint > 0 && !showSolution && (
        <div className="mt-4 space-y-2">
          {hints.slice(0, currentHint).map((hint, index) => (
            <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">Hint {index + 1}</p>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {hint}
              </div>
            </div>
          ))}
        </div>
      )}

      {showSolution && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase mb-2">Solution</p>
          <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-2">
            {solution}
          </div>
        </div>
      )}
    </div>
  )
}
