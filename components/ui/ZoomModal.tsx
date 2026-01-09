'use client'

import { useState, ReactNode, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ZoomModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function ZoomModal({ isOpen, onClose, children, title }: ZoomModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto",
          "bg-white dark:bg-gray-900 rounded-2xl shadow-2xl",
          "transform transition-all animate-zoom-in"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close zoom view"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-lg">
          {children}
        </div>

        {/* Footer hint */}
        <div className="sticky bottom-0 p-3 text-center text-sm text-gray-500 dark:text-gray-400 bg-gradient-to-t from-white dark:from-gray-900 to-transparent">
          Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd> to close
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-zoom-in {
          animation: zoom-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
