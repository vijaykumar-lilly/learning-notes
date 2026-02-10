'use client'

import { useState, useEffect } from 'react'

interface Step {
  content: React.ReactNode
  explanation?: string
}

interface StepByStepHighlighterProps {
  steps: Step[]
  autoPlay?: boolean
  autoPlayDelay?: number
  label?: string
}

export default function StepByStepHighlighter({
  steps,
  autoPlay = false,
  autoPlayDelay = 2000,
  label
}: StepByStepHighlighterProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, autoPlayDelay)
      return () => clearTimeout(timer)
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false)
    }
  }, [currentStep, isPlaying, autoPlayDelay, steps.length])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setIsPlaying(false)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setIsPlaying(false)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="my-6 p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800">
      {label && (
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{label}</h3>
      )}

      {/* Steps Display */}
      <div className="space-y-3 mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border-2 transition-all duration-300
              ${index === currentStep
                ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 shadow-lg scale-105'
                : index < currentStep
                  ? 'bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-800 opacity-60'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-40'
              }
            `}
          >
            <div className="flex items-start gap-3">
              {/* Step Number Badge */}
              <div
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${index === currentStep
                    ? 'bg-blue-600 text-white'
                    : index < currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }
                `}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {step.content}
                </div>
                {step.explanation && index <= currentStep && (
                  <div className={`
                    text-sm text-gray-600 dark:text-gray-400 mt-2 
                    transition-all duration-300
                    ${index === currentStep ? 'opacity-100' : 'opacity-60'}
                  `}>
                    💡 {step.explanation}
                  </div>
                )}
              </div>

              {/* Current Step Indicator */}
              {index === currentStep && (
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
        >
          ← Previous
        </button>

        <button
          onClick={handlePlayPause}
          className={`px-4 py-2 ${isPlaying ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded-lg font-semibold transition-colors`}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
        >
          Next →
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors ml-auto"
        >
          ↺ Reset
        </button>
      </div>

      {currentStep === steps.length - 1 && (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-500 text-center">
          <p className="font-bold text-green-700 dark:text-green-400">
            ✓ Complete! You've reviewed all steps.
          </p>
        </div>
      )}
    </div>
  )
}
