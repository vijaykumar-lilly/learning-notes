const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface ProgressOverview {
  total_lessons: number
  completed_lessons: number
  in_progress_lessons: number
  total_time_spent: number
  recent_lessons: Array<{
    id: number
    slug: string
    title_key: string
    status: string
    time_spent: number
    last_accessed: string
    exercises_completed: number
  }>
}

export interface LessonProgress {
  id: number
  user_id: number
  lesson_id: number
  status: string
  exercises_completed: number
  time_spent: number
  started_at: string | null
  completed_at: string | null
  last_accessed_at: string
}

export interface Recommendation {
  next_lessons: Array<{
    id: number
    slug: string
    title_key: string
    reason: string
  }>
}

// Helper to get auth token from localStorage
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

// Helper to create auth headers
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken()
  return token
    ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    : { 'Content-Type': 'application/json' }
}

/**
 * Get user's progress overview
 */
export async function getProgressOverview(): Promise<ProgressOverview | null> {
  const token = getAuthToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE}/progress/overview`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch progress overview')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching progress overview:', error)
    return null
  }
}

/**
 * Update lesson progress
 */
export async function updateLessonProgress(
  lessonId: number,
  update: {
    status?: 'not_started' | 'in_progress' | 'completed'
    time_spent?: number
  }
): Promise<LessonProgress | null> {
  const token = getAuthToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE}/progress/lessons/${lessonId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(update)
    })

    if (!response.ok) {
      throw new Error('Failed to update lesson progress')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating lesson progress:', error)
    return null
  }
}

/**
 * Get personalized lesson recommendations
 */
export async function getRecommendations(): Promise<Recommendation | null> {
  const token = getAuthToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE}/progress/recommendations`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    return null
  }
}

/**
 * Submit an exercise answer
 */
export async function submitExercise(
  exerciseId: number,
  answer: any,
  locale: string = 'en'
): Promise<{
  is_correct: boolean
  explanation: string | null
  next_exercise: number | null
} | null> {
  try {
    const response = await fetch(
      `${API_BASE}/exercises/${exerciseId}/submit?locale=${locale}`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ answer })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to submit exercise')
    }

    return await response.json()
  } catch (error) {
    console.error('Error submitting exercise:', error)
    return null
  }
}
