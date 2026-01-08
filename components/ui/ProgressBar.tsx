'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  current: number
  total: number
  label?: string
  showPercentage?: boolean
}

export default function ProgressBar({ current, total, label, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {percentage}%
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            "bg-gradient-to-r from-blue-500 to-purple-500",
            percentage === 100 && "from-green-500 to-emerald-500"
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full w-full bg-white/20 animate-pulse" />
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {current} of {total} completed
      </div>
    </div>
  )
}
