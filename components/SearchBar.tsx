'use client'

import { useState } from 'react'
import Link from 'next/link'
import { searchLessons } from '@/lib/lesson-metadata'
import { LessonMetadata } from '@/types/lesson'
import { cn } from '@/lib/utils'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LessonMetadata[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim().length >= 2) {
      const searchResults = searchLessons(searchQuery)
      setResults(searchResults.slice(0, 8)) // Limit to 8 results
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  const difficultyColors = {
    beginner: 'text-green-600 dark:text-green-400',
    intermediate: 'text-blue-600 dark:text-blue-400',
    advanced: 'text-orange-600 dark:text-orange-400',
    expert: 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search lessons, topics, concepts..."
          className="w-full px-4 py-3 pl-12 pr-12 text-sm sm:text-base bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Results */}
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {results.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/learn/${lesson.domainSlug}/${lesson.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <span className="text-gray-500 dark:text-gray-500">
                          {lesson.domain}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600">•</span>
                        <span className={difficultyColors[lesson.difficulty]}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                      {lesson.exerciseCount} ex
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            {results.length === 8 && (
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-400">
                Showing first 8 results. Try a more specific search.
              </div>
            )}
          </div>
        </>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 p-6 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              No lessons found for "{query}"
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Try different keywords or browse the curriculum
            </p>
          </div>
        </>
      )}
    </div>
  )
}
