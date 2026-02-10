'use client'

/**
 * Curriculum Hooks
 * React hooks for fetching and managing curriculum data
 */

import { useEffect, useState } from 'react'
import { fetchCurriculum, fetchSubjects, type Domain, type Subject, type SubjectSummary } from '@/lib/api-client'
import { useLocale } from 'next-intl'

interface UseCurriculumReturn {
  subjects: Subject[]
  domains: Domain[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

interface UseSubjectsReturn {
  subjects: SubjectSummary[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch complete curriculum data with subjects from API
 */
export function useCurriculum(): UseCurriculumReturn {
  const locale = useLocale()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetchCurriculum(locale)
      setSubjects(response.subjects)
      // Flatten domains for backwards compatibility
      setDomains(response.subjects.flatMap(subject => subject.domains))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch curriculum'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return {
    subjects,
    domains,
    isLoading,
    error,
    refetch: fetchData,
  }
}

/**
 * Hook to fetch subjects only (lighter weight)
 */
export function useSubjects(): UseSubjectsReturn {
  const locale = useLocale()
  const [subjects, setSubjects] = useState<SubjectSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetchSubjects(locale)
      setSubjects(response.subjects)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch subjects'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return {
    subjects,
    isLoading,
    error,
    refetch: fetchData,
  }
}

/**
 * Hook to find a specific domain by slug
 */
export function useDomain(slug: string) {
  const { domains, isLoading, error } = useCurriculum()
  const domain = domains.find((d) => d.slug === slug)

  return {
    domain: domain || null,
    isLoading,
    error,
  }
}

/**
 * Hook to find a specific topic by slug across all domains
 */
export function useTopic(topicSlug: string) {
  const { domains, isLoading, error } = useCurriculum()

  const findTopic = () => {
    for (const domain of domains) {
      const topic = domain.topics.find((t) => t.slug === topicSlug)
      if (topic) {
        return { topic, domain }
      }
    }
    return null
  }

  return {
    result: findTopic(),
    isLoading,
    error,
  }
}
