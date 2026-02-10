/**
 * API-based Curriculum Data Loader
 * Replaces static curriculum-data.ts with dynamic API calls
 */

import { fetchCurriculum, type Domain as APIDomain, type Topic as APITopic } from './api-client'

// Re-export types from api-client for compatibility
export type { APIDomain as Domain, APITopic as Topic }

/**
 * Server-side function to get curriculum data from API
 * Use this in Server Components and server actions
 */
export async function getCurriculumData(locale: string = 'en'): Promise<APIDomain[]> {
  try {
    const response = await fetchCurriculum(locale)
    return response.domains
  } catch (error) {
    console.error('Failed to fetch curriculum:', error)
    // Return empty array on error - can be handled by UI
    return []
  }
}

/**
 * Get a specific domain by slug
 */
export async function getDomainBySlug(slug: string, locale: string = 'en'): Promise<APIDomain | null> {
  try {
    const domains = await getCurriculumData(locale)
    return domains.find(d => d.slug === slug) || null
  } catch (error) {
    console.error(`Failed to fetch domain ${slug}:`, error)
    return null
  }
}

/**
 * Get all domains for a specific level
 */
export async function getDomainsByLevel(level: string, locale: string = 'en'): Promise<APIDomain[]> {
  try {
    const domains = await getCurriculumData(locale)
    return domains.filter(d => d.level === level)
  } catch (error) {
    console.error(`Failed to fetch domains for level ${level}:`, error)
    return []
  }
}

/**
 * Get a specific topic by slug across all domains
 */
export async function getTopicBySlug(slug: string, locale: string = 'en'): Promise<{ topic: APITopic, domain: APIDomain } | null> {
  try {
    const domains = await getCurriculumData(locale)

    for (const domain of domains) {
      const topic = domain.topics.find(t => t.slug === slug)
      if (topic) {
        return { topic, domain }
      }
    }

    return null
  } catch (error) {
    console.error(`Failed to fetch topic ${slug}:`, error)
    return null
  }
}

/**
 * Count total topics across all domains
 */
export async function getTotalTopicCount(locale: string = 'en'): Promise<number> {
  try {
    const domains = await getCurriculumData(locale)
    return domains.reduce((sum, domain) => sum + domain.topics.length, 0)
  } catch (error) {
    console.error('Failed to count topics:', error)
    return 0
  }
}

/**
 * Count total exercises across all topics
 */
export async function getTotalExerciseCount(locale: string = 'en'): Promise<number> {
  try {
    const domains = await getCurriculumData(locale)
    return domains.reduce((sum, domain) => {
      return sum + domain.topics.reduce((topicSum, topic) => topicSum + topic.exerciseCount, 0)
    }, 0)
  } catch (error) {
    console.error('Failed to count exercises:', error)
    return 0
  }
}
