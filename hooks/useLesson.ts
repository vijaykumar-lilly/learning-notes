'use client'

/**
 * Lesson Hooks
 * React hooks for fetching and managing lesson data
 */

import { useEffect, useState } from 'react'
import { fetchLesson, type Lesson } from '@/lib/api-client'
import { useLocale } from 'next-intl'

interface UseLessonReturn {
  lesson: Lesson | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch a lesson by topic slug
 */
export function useLesson(topicSlug: string): UseLessonReturn {
  const locale = useLocale()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const lessonData = await fetchLesson(topicSlug, locale)
      setLesson(lessonData)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lesson'))
      setLesson(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (topicSlug) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicSlug, locale])

  return {
    lesson,
    isLoading,
    error,
    refetch: fetchData,
  }
}
