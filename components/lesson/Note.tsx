'use client'

import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'
import ZoomModal from '@/components/ui/ZoomModal'

interface NoteProps {
  type?: 'info' | 'warning' | 'success' | 'tip'
  children: ReactNode
}

export default function Note({ type = 'info', children }: NoteProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    warning: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      icon: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
      iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    tip: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    }
  }

  const variant = variants[type]

  const typeLabels = {
    info: 'Information',
    warning: 'Warning',
    success: 'Success',
    tip: 'Tip'
  }

  return (
    <>
      <div className={cn(
        'my-4 p-4 rounded-lg border flex gap-3 relative group',
        variant.bg,
        variant.border
      )}>
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 shadow-sm"
          aria-label="Zoom in"
          title="Click to zoom"
        >
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      <div className={cn(
        'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center',
        variant.iconBg
      )}>
        <svg className={cn('w-5 h-5', variant.icon)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={variant.iconPath} />
        </svg>
      </div>
        <div className="flex-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>

      <ZoomModal isOpen={isZoomed} onClose={() => setIsZoomed(false)} title={typeLabels[type]}>
        <div className="text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </ZoomModal>
    </>
  )
}
