'use client'

/**
 * Curriculum Hooks
 * React hooks for fetching and managing curriculum data
 */

import { useEffect, useState } from 'react'
import { fetchCurriculum, type Domain } from '@/lib/api-client'
import { useLocale } from 'next-intl'

interface UseCurriculumReturn {
  domains: Domain[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch curriculum data from API
 */
export function useCurriculum(): UseCurriculumReturn {
  const locale = useLocale()
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetchCurriculum(locale)
      setDomains(response.domains)
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
    domains,
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
