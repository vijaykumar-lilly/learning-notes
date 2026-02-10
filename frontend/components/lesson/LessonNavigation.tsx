import Link from 'next/link'

interface LessonNavigationType {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

interface LessonNavigationProps {
  navigation: LessonNavigationType
}

export default function LessonNavigation({ navigation }: LessonNavigationProps) {
  const { previous, next } = navigation

  if (!previous && !next) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <nav className="flex justify-between items-center gap-4">
        {/* Previous Lesson */}
        {previous ? (
          <Link
            href={previous.href}
            className="group flex-1 flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="flex-1 text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous Lesson</div>
              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {previous.title}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Next Lesson */}
        {next ? (
          <Link
            href={next.href}
            className="group flex-1 flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <div className="flex-1 text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Lesson</div>
              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {next.title}
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </div>
  )
}
