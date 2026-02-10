'use client'

import { useState, DragEvent } from 'react'

interface MatchPair {
  id: string
  question: React.ReactNode
  answer: React.ReactNode
}

interface DragDropMatcherProps {
  pairs: MatchPair[]
  label?: string
  onComplete?: () => void
}

export default function DragDropMatcher({ pairs, label, onComplete }: DragDropMatcherProps) {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect'>>({})

  const shuffledAnswers = [...pairs].sort(() => Math.random() - 0.5)
  const isComplete = Object.keys(matches).length === pairs.length && 
                     Object.values(feedback).every(f => f === 'correct')

  const handleDragStart = (e: DragEvent, answerId: string) => {
    setDraggedItem(answerId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent, questionId: string) => {
    e.preventDefault()
    if (!draggedItem) return

    const isCorrect = draggedItem === questionId
    
    setMatches(prev => ({
      ...prev,
      [questionId]: draggedItem
    }))

    setFeedback(prev => ({
      ...prev,
      [questionId]: isCorrect ? 'correct' : 'incorrect'
    }))

    setDraggedItem(null)

    if (isCorrect && Object.keys(matches).length + 1 === pairs.length) {
      setTimeout(() => {
        if (Object.values({ ...feedback, [questionId]: 'correct' }).every(f => f === 'correct')) {
          onComplete?.()
        }
      }, 500)
    }
  }

  const handleRemove = (questionId: string) => {
    const newMatches = { ...matches }
    const newFeedback = { ...feedback }
    delete newMatches[questionId]
    delete newFeedback[questionId]
    setMatches(newMatches)
    setFeedback(newFeedback)
  }

  const reset = () => {
    setMatches({})
    setFeedback({})
    setDraggedItem(null)
  }

  const usedAnswerIds = new Set(Object.values(matches))

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
      {label && (
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h3>
      )}

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Drag the answers on the right to match with the questions on the left.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Questions (Drop Zones) */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Questions:</h4>
          {pairs.map(pair => (
            <div
              key={pair.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, pair.id)}
              className={`
                p-4 rounded-lg border-2 border-dashed min-h-[80px] flex items-center justify-between
                transition-all duration-200
                ${matches[pair.id] 
                  ? feedback[pair.id] === 'correct'
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                    : 'bg-red-100 dark:bg-red-900/30 border-red-500'
                  : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                }
              `}
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {pair.question}
                </div>
                {matches[pair.id] && (
                  <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    {shuffledAnswers.find(a => a.id === matches[pair.id])?.answer}
                  </div>
                )}
              </div>
              
              <div className="ml-2 flex flex-col gap-1">
                {feedback[pair.id] === 'correct' && (
                  <span className="text-2xl">✓</span>
                )}
                {feedback[pair.id] === 'incorrect' && (
                  <span className="text-2xl">✗</span>
                )}
                {matches[pair.id] && (
                  <button
                    onClick={() => handleRemove(pair.id)}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Answers (Draggable) */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Answers:</h4>
          {shuffledAnswers.map(pair => (
            <div
              key={pair.id}
              draggable={!usedAnswerIds.has(pair.id)}
              onDragStart={(e) => handleDragStart(e, pair.id)}
              className={`
                p-4 rounded-lg border-2 min-h-[80px] flex items-center justify-center
                transition-all duration-200
                ${usedAnswerIds.has(pair.id)
                  ? 'opacity-30 cursor-not-allowed bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
                  : 'cursor-move bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:shadow-lg'
                }
                ${draggedItem === pair.id ? 'opacity-50 scale-95' : ''}
              `}
            >
              <div className="text-center text-gray-900 dark:text-gray-100">
                {pair.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isComplete && (
        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-center">
          <p className="font-bold text-green-700 dark:text-green-400 text-lg">
            🎉 Perfect! All matches are correct!
          </p>
        </div>
      )}

      <button
        onClick={reset}
        className="w-full mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
