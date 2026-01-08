'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Celebration from '@/components/ui/Celebration'

interface NumericInputExerciseProps {
  question: React.ReactNode
  correctAnswer: number
  tolerance?: number // Allow small floating point differences
  hint?: React.ReactNode
  solution?: React.ReactNode
  unit?: string // e.g., "meters", "°", etc.
  onCorrect?: () => void
  onIncorrect?: () => void
}

export default function NumericInputExercise({
  question,
  correctAnswer,
  tolerance = 0.001,
  hint,
  solution,
  unit,
  onCorrect,
  onIncorrect
}: NumericInputExerciseProps) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const checkAnswer = () => {
    const numericAnswer = parseFloat(userAnswer)
    
    if (isNaN(numericAnswer)) {
      return
    }

    const correct = Math.abs(numericAnswer - correctAnswer) <= tolerance
    setIsCorrect(correct)
    setIsChecked(true)
    setAttempts(attempts + 1)

    if (correct) {
      setShowCelebration(true)
      onCorrect?.()
    } else {
      onIncorrect?.()
    }
  }

  const reset = () => {
    setUserAnswer('')
    setIsChecked(false)
    setIsCorrect(false)
    setShowHint(false)
    setShowSolution(false)
  }

  return (
    <>
      <Celebration show={showCelebration} onComplete={() => setShowCelebration(false)} />
      
      <div className="my-6 p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
      {/* Question */}
      <div className="mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200">
        {question}
      </div>

      {/* Input Area */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isChecked && checkAnswer()}
          disabled={isChecked && isCorrect}
          placeholder="Enter your answer"
          className={cn(
            'px-4 py-2 border-2 rounded-lg text-sm sm:text-base w-40',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'dark:bg-gray-700 dark:text-white dark:border-gray-600',
            isChecked && (isCorrect 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-red-500 bg-red-50 dark:bg-red-900/20')
          )}
        />
        
        {unit && (
          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {unit}
          </span>
        )}

        {!isChecked ? (
          <button
            onClick={checkAnswer}
            disabled={!userAnswer}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Feedback */}
      {isChecked && (
        <div className={cn(
          'mb-4 p-4 rounded-lg border-2',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700'
        )}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-green-800 dark:text-green-300">Correct!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-semibold text-red-800 dark:text-red-300">Not quite right</span>
              </>
            )}
          </div>
          {isCorrect ? (
            <p className="text-sm text-green-700 dark:text-green-300">
              Great job! You got the correct answer.
            </p>
          ) : (
            <p className="text-sm text-red-700 dark:text-red-300">
              {attempts === 1 ? "That's not correct. Try again!" : "Still not correct. Consider reviewing the hint or solution."}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {hint && !showHint && !isCorrect && (
          <button
            onClick={() => setShowHint(true)}
            className="px-4 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors border border-yellow-300 dark:border-yellow-700"
          >
            💡 Show Hint
          </button>
        )}
        
        {solution && !showSolution && (
          <button
            onClick={() => setShowSolution(true)}
            className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors border border-purple-300 dark:border-purple-700"
          >
            📖 Show Solution
          </button>
        )}
      </div>

      {/* Hint */}
      {showHint && hint && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-2">HINT</p>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {hint}
          </div>
        </div>
      )}

      {/* Solution */}
      {showSolution && solution && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2">SOLUTION</p>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            {solution}
          </div>
        </div>
      )}

      {/* Attempt counter */}
      {attempts > 0 && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Attempts: {attempts}
        </div>
      )}
    </div>
    </>
  )
}
