'use client'

interface VisualExplanationProps {
  children: React.ReactNode
  title?: string
  caption?: string
}

export function VisualExplanation({ children, title, caption }: VisualExplanationProps) {
  return (
    <div className="my-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
          {title}
        </h3>
      )}
      <div className="flex justify-center items-center">
        {children}
      </div>
      {caption && (
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          {caption}
        </p>
      )}
    </div>
  )
}
