'use client'

import { useState } from 'react'
import { MultipleChoiceExercise } from '@/components/interactive/MultipleChoiceExercise'
import { NumericInputExercise } from '@/components/interactive/NumericInputExercise'
import { DifficultyBadge } from '@/components/ui/DifficultyBadge'

interface Exercise {
  id: number
  exercise_type: string
  difficulty: string
  question: string
  data: any
  hint?: string
  explanation?: string
  display_order: number
}

interface ExercisesRendererProps {
  exercises: Exercise[]
  lessonSlug: string
}

export default function ExercisesRenderer({ exercises, lessonSlug }: ExercisesRendererProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

  if (!exercises || exercises.length === 0) {
    return null
  }

  const currentExercise = exercises[currentExerciseIndex]

  const handleExerciseComplete = (exerciseId: number, isCorrect: boolean) => {
    if (isCorrect) {
      setCompletedExercises(prev => new Set([...prev, exerciseId]))

      // Auto-advance to next exercise after 1 second
      setTimeout(() => {
        if (currentExerciseIndex < exercises.length - 1) {
          setCurrentExerciseIndex(currentExerciseIndex + 1)
        }
      }, 1000)
    }
  }

  const goToExercise = (index: number) => {
    setCurrentExerciseIndex(index)
  }

  return (
    <div className="space-y-6">
      {/* Exercise Progress */}
      <div className="flex items-center gap-2 flex-wrap">
        {exercises.map((exercise, idx) => (
          <button
            key={exercise.id}
            onClick={() => goToExercise(idx)}
            className={`
              w-10 h-10 rounded-lg font-semibold transition
              ${idx === currentExerciseIndex
                ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                : completedExercises.has(exercise.id)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
          >
            {idx + 1}
          </button>
        ))}
        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
          {completedExercises.size} of {exercises.length} completed
        </div>
      </div>

      {/* Current Exercise */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </h3>
          {currentExercise.difficulty && (
            <DifficultyBadge difficulty={currentExercise.difficulty} />
          )}
        </div>

        {renderExercise(currentExercise, handleExerciseComplete)}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => goToExercise(Math.max(0, currentExerciseIndex - 1))}
            disabled={currentExerciseIndex === 0}
            className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>

          <button
            onClick={() => goToExercise(Math.min(exercises.length - 1, currentExerciseIndex + 1))}
            disabled={currentExerciseIndex === exercises.length - 1}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Completion Message */}
      {completedExercises.size === exercises.length && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
            Congratulations!
          </h3>
          <p className="text-green-700 dark:text-green-300">
            You've completed all exercises for this lesson!
          </p>
        </div>
      )}
    </div>
  )
}

function renderExercise(exercise: Exercise, onComplete: (id: number, isCorrect: boolean) => void) {
  const { exercise_type, data, question, hint, explanation } = exercise

  switch (exercise_type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceExercise
          question={question}
          choices={data.choices || []}
          hint={hint}
          explanation={explanation}
          onAnswer={(isCorrect) => onComplete(exercise.id, isCorrect)}
        />
      )

    case 'numeric_input':
      return (
        <NumericInputExercise
          question={question}
          correctAnswer={data.correctAnswer}
          tolerance={data.tolerance || 0.001}
          unit={data.unit}
          hint={hint}
          solution={explanation}
          onAnswer={(isCorrect) => onComplete(exercise.id, isCorrect)}
        />
      )

    default:
      return (
        <div className="text-center text-gray-500 dark:text-gray-400">
          Exercise type '{exercise_type}' not yet implemented
        </div>
      )
  }
}
