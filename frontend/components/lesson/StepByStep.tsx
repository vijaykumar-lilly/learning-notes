'use client'

import { ReactNode } from 'react'

interface Step {
  title?: string
  content: ReactNode
  explanation?: string
}

interface StepByStepProps {
  title?: string
  steps: Step[]
}

export default function StepByStep({ title = 'Step-by-Step Solution', steps }: StepByStepProps) {
  return (
    <div className="my-6 p-4 sm:p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-cyan-900 dark:text-cyan-200">
        {title}
      </h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-8">
            {/* Step number indicator */}
            <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center text-xs font-bold">
              {index + 1}
            </div>
            
            {/* Connecting line (except for last step) */}
            {index < steps.length - 1 && (
              <div className="absolute left-3 top-6 w-0.5 h-full bg-cyan-300 dark:bg-cyan-700" />
            )}
            
            <div className="pb-2">
              {step.title && (
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
              )}
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-cyan-200 dark:border-cyan-800">
                <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {step.content}
                </div>
              </div>
              
              {step.explanation && (
                <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
                  {step.explanation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
