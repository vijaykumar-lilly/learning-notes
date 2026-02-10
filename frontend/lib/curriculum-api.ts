/**
 * API-based Curriculum Data Loader
 * Replaces static curriculum-data.ts with dynamic API calls
 */

import {
  fetchCurriculum,
  fetchSubjects,
  fetchSubjectDomains,
  type Domain as APIDomain,
  type Topic as APITopic,
  type Subject as APISubject,
  type SubjectSummary as APISubjectSummary
} from './api-client'

// Re-export types from api-client for compatibility
export type { APIDomain as Domain, APITopic as Topic, APISubject as Subject, APISubjectSummary as SubjectSummary }

/**
 * Server-side function to get all subjects
 */
export async function getSubjects(locale: string = 'en'): Promise<APISubjectSummary[]> {
  try {
    const response = await fetchSubjects(locale)
    return response.subjects
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
    return []
  }
}

/**
 * Server-side function to get complete curriculum with subjects
 */
export async function getCurriculumWithSubjects(locale: string = 'en'): Promise<APISubject[]> {
  try {
    const response = await fetchCurriculum(locale)
    return response.subjects
  } catch (error) {
    console.error('Failed to fetch curriculum:', error)
    return []
  }
}

/**
 * Server-side function to get curriculum data from API (legacy - returns all domains)
 * Use this in Server Components and server actions
 */
export async function getCurriculumData(locale: string = 'en'): Promise<APIDomain[]> {
  try {
    const response = await fetchCurriculum(locale)
    // Flatten all subjects to return just domains for backwards compatibility
    return response.subjects.flatMap(subject => subject.domains)
  } catch (error) {
    console.error('Failed to fetch curriculum:', error)
    return []
  }
}

/**
 * Get domains for a specific subject
 */
export async function getSubjectDomains(subjectId: number, locale: string = 'en'): Promise<APIDomain[]> {
  try {
    const response = await fetchSubjectDomains(subjectId, locale)
    return response.domains
  } catch (error) {
    console.error(`Failed to fetch subject ${subjectId} domains:`, error)
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
