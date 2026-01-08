'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Celebration from '@/components/ui/Celebration'

interface Choice {
  id: string
  text: React.ReactNode
  isCorrect: boolean
}

interface MultipleChoiceExerciseProps {
  question: React.ReactNode
  choices: Choice[]
  explanation?: React.ReactNode
  hint?: React.ReactNode
  onCorrect?: () => void
  onIncorrect?: () => void
}

export default function MultipleChoiceExercise({
  question,
  choices,
  explanation,
  hint,
  onCorrect,
  onIncorrect
}: MultipleChoiceExerciseProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = () => {
    if (!selectedId) return

    const selectedChoice = choices.find(c => c.id === selectedId)
    const isCorrect = selectedChoice?.isCorrect || false

    setIsChecked(true)
    setAttempts(attempts + 1)

    if (isCorrect) {
      setShowCelebration(true)
      onCorrect?.()
    } else {
      onIncorrect?.()
    }
  }

  const reset = () => {
    setSelectedId(null)
    setIsChecked(false)
    setShowHint(false)
  }

  const selectedChoice = choices.find(c => c.id === selectedId)
  const isCorrect = selectedChoice?.isCorrect || false

  return (
    <>
      <Celebration show={showCelebration} onComplete={() => setShowCelebration(false)} />
      
      <div className="my-6 p-4 sm:p-6 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
      {/* Question */}
      <div className="mb-4 text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">
        {question}
      </div>

      {/* Choices */}
      <div className="space-y-3 mb-4">
        {choices.map((choice) => {
          const isSelected = selectedId === choice.id
          const showCorrectness = isChecked && isSelected

          return (
            <button
              key={choice.id}
              onClick={() => !isChecked && setSelectedId(choice.id)}
              disabled={isChecked}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                'hover:border-blue-300 dark:hover:border-blue-600',
                isSelected && !isChecked && 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                !isSelected && !isChecked && 'border-gray-300 dark:border-gray-600',
                isChecked && choice.isCorrect && 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20',
                isChecked && !choice.isCorrect && isSelected && 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/20',
                isChecked && !choice.isCorrect && !isSelected && 'border-gray-300 dark:border-gray-600 opacity-50'
              )}
            >
              <div className="flex items-center gap-3">
                {/* Radio button */}
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isSelected && !isChecked && 'border-blue-500 dark:border-blue-400',
                  !isSelected && !isChecked && 'border-gray-400 dark:border-gray-500',
                  isChecked && choice.isCorrect && 'border-green-500 dark:border-green-400',
                  isChecked && !choice.isCorrect && isSelected && 'border-red-500 dark:border-red-400'
                )}>
                  {isChecked && choice.isCorrect && (
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isChecked && !choice.isCorrect && isSelected && (
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  {isSelected && !isChecked && (
                    <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400" />
                  )}
                </div>

                {/* Choice text */}
                <div className="flex-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {choice.text}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Check/Reset button */}
      <div className="mb-4">
        {!isChecked ? (
          <button
            onClick={checkAnswer}
            disabled={!selectedId}
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
                <span className="font-semibold text-red-800 dark:text-red-300">Not quite</span>
              </>
            )}
          </div>
          
          {explanation && isCorrect && (
            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
              {explanation}
            </div>
          )}
        </div>
      )}

      {/* Hint */}
      {hint && !showHint && !isChecked && (
        <button
          onClick={() => setShowHint(true)}
          className="px-4 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors border border-yellow-300 dark:border-yellow-700"
        >
          💡 Show Hint
        </button>
      )}

      {showHint && hint && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-2">HINT</p>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {hint}
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
