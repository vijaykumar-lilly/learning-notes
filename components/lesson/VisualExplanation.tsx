'use client'

import { useState } from 'react'
import ZoomModal from '@/components/ui/ZoomModal'

interface VisualExplanationProps {
  children: React.ReactNode
  title?: string
  caption?: string
  zoomable?: boolean
}

export function VisualExplanation({ children, title, caption, zoomable = true }: VisualExplanationProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  
  const content = (
    <>
      <div className="flex justify-center items-center">
        {children}
      </div>
      {caption && (
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          {caption}
        </p>
      )}
    </>
  )
  return (
    <>
      <div className="my-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 relative group">
        {zoomable && (
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-2 right-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-gray-800 shadow-sm"
            aria-label="Zoom in"
            title="Click to zoom"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
        )}
        
        {title && (
          <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
            {title}
          </h3>
        )}
        {content}
      </div>
      
      {zoomable && (
        <ZoomModal isOpen={isZoomed} onClose={() => setIsZoomed(false)} title={title || 'Visual Explanation'}>
          {content}
        </ZoomModal>
      )}
    </>
  )
}
