'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ReactNode
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false,
  icon 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="my-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750',
          'transition-colors'
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-600 dark:text-blue-400">{icon}</div>}
          <span className="font-semibold text-gray-900 dark:text-white">{title}</span>
        </div>
        <svg
          className={cn(
            'w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="p-4 bg-white dark:bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  )
}
