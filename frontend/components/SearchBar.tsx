'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

interface SearchResult {
  type: 'subject' | 'domain' | 'lesson'
  id: number
  title: string
  subtitle: string
  url: string
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    // Debounce API calls
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&limit=10`)
        if (response.ok) {
          const data = await response.json()
          setResults(data.results)
          setIsOpen(true)
        }
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  const handleSelect = (url: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(url)
  }

  const typeIcons: Record<string, string> = {
    subject: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    domain: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    lesson: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  }

  const typeBadgeColors: Record<string, string> = {
    subject: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    domain: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    lesson: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Search lessons, topics, concepts..."
          className="w-full px-4 py-3 pl-12 pr-12 text-sm sm:text-base bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        {/* Search Icon / Loading */}
        {loading ? (
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        {query && (
          <button type="button" onClick={handleClear} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              {results.map((result, idx) => (
                <button
                  key={`${result.type}-${result.id}-${idx}`}
                  onClick={() => handleSelect(result.url)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-start gap-3"
                >
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={typeIcons[result.type] || typeIcons.lesson} />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white truncate">{result.title}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${typeBadgeColors[result.type] || ''}`}>
                        {result.type}
                      </span>
                    </div>
                    {result.subtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{result.subtitle}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && !loading && results.length === 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-gray-500 mt-1">Try different keywords or browse the curriculum</p>
          </div>
        </>
      )}
    </div>
  )
}
