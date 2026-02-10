/**
 * API Client for Math Learning Platform
 * Handles all communication with the FastAPI backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Types matching backend schemas
export interface Topic {
  id: number
  slug: string
  title: string
  exerciseCount: number
  proofCount?: number
  hasLesson: boolean
}

export interface Domain {
  id: number
  slug: string
  title: string
  description: string
  level: string
  topics: Topic[]
}

export interface Subject {
  id: number
  name: string
  grade_level?: string
  description?: string
  domains: Domain[]
}

export interface CurriculumResponse {
  subjects: Subject[]
}

export interface SubjectSummary {
  id: number
  name: string
  grade_level?: string
  description?: string
  total_domains: number
  total_topics: number
}

export interface LessonSection {
  id: number
  section_type: string
  display_order: number
  content: Record<string, any>
}

export interface Exercise {
  id: number
  type: string
  difficulty: string
  display_order: number
  question: string
  hint?: string
  explanation?: string
  [key: string]: any  // For type-specific data
}

export interface LessonNavigation {
  previous?: {
    slug: string
    title: string
  }
  next?: {
    slug: string
    title: string
  }
}

export interface Lesson {
  id: number
  slug: string
  title: string
  domain: string
  difficulty: string
  estimated_time?: number
  sections: LessonSection[]
  exercises: Exercise[]
  navigation: LessonNavigation
}

export interface ExerciseSubmissionResult {
  is_correct: boolean
  explanation?: string
  next_exercise?: number
}

export interface User {
  id: number
  email: string
  username: string
  full_name?: string
  preferred_locale: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface ProgressOverview {
  total_lessons: number
  completed_lessons: number
  in_progress_lessons: number
  total_time_spent: number
  recent_lessons: any[]
}

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add auth token if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`
    let errorDetails

    try {
      const errorData = await response.json()
      errorMessage = errorData.detail || errorMessage
      errorDetails = errorData
    } catch {
      // Response body is not JSON
    }

    throw new APIError(response.status, errorMessage, errorDetails)
  }

  return response.json()
}

// ============================================================================
// CURRICULUM API
// ============================================================================

/**
 * Fetch complete curriculum structure with all subjects, domains and topics
 */
export async function fetchCurriculum(locale: string = 'en'): Promise<CurriculumResponse> {
  return apiFetch<CurriculumResponse>(`/curriculum?locale=${locale}`)
}

/**
 * Fetch all published subjects
 */
export async function fetchSubjects(locale: string = 'en'): Promise<{ subjects: SubjectSummary[] }> {
  return apiFetch<{ subjects: SubjectSummary[] }>(`/curriculum/subjects?locale=${locale}`)
}

/**
 * Fetch all domains for a specific subject
 */
export async function fetchSubjectDomains(subjectId: number, locale: string = 'en'): Promise<{ subject: string, domains: Domain[] }> {
  return apiFetch<{ subject: string, domains: Domain[] }>(`/curriculum/subjects/${subjectId}/domains?locale=${locale}`)
}

/**
 * Fetch a specific domain by slug
 */
export async function fetchDomain(slug: string, locale: string = 'en'): Promise<Domain> {
  return apiFetch<Domain>(`/curriculum/domains/${slug}?locale=${locale}`)
}

/**
 * Fetch all topics for a specific domain
 */
export async function fetchDomainTopics(domainSlug: string, locale: string = 'en'): Promise<{ topics: Topic[] }> {
  return apiFetch<{ topics: Topic[] }>(`/curriculum/domains/${domainSlug}/topics?locale=${locale}`)
}

// ============================================================================
// LESSONS API
// ============================================================================

/**
 * Fetch complete lesson content by topic slug
 */
export async function fetchLesson(topicSlug: string, locale: string = 'en'): Promise<Lesson> {
  return apiFetch<Lesson>(`/lessons/${topicSlug}?locale=${locale}`)
}

/**
 * Fetch exercises for a specific lesson
 */
export async function fetchLessonExercises(topicSlug: string, locale: string = 'en'): Promise<{ exercises: Exercise[] }> {
  return apiFetch<{ exercises: Exercise[] }>(`/lessons/${topicSlug}/exercises?locale=${locale}`)
}

/**
 * Fetch user progress for a specific lesson (requires auth)
 */
export async function fetchLessonProgress(topicSlug: string): Promise<any> {
  return apiFetch<any>(`/lessons/${topicSlug}/progress`)
}

// ============================================================================
// TRANSLATIONS API
// ============================================================================

/**
 * Fetch all translations for a locale
 */
export async function fetchAllTranslations(locale: string): Promise<Record<string, any>> {
  return apiFetch<Record<string, any>>(`/translations/${locale}`)
}

/**
 * Fetch translations for a specific namespace
 */
export async function fetchNamespaceTranslations(locale: string, namespace: string): Promise<Record<string, any>> {
  return apiFetch<Record<string, any>>(`/translations/${locale}/${namespace}`)
}

// ============================================================================
// EXERCISES API
// ============================================================================

/**
 * Submit an exercise answer for validation
 */
export async function submitExercise(
  exerciseId: number,
  answer: any,
  locale: string = 'en'
): Promise<ExerciseSubmissionResult> {
  return apiFetch<ExerciseSubmissionResult>(`/exercises/${exerciseId}/submit?locale=${locale}`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  })
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

/**
 * Register a new user
 */
export async function register(
  email: string,
  username: string,
  password: string,
  fullName?: string
): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password,
      full_name: fullName,
    }),
  })

  // Store token in localStorage
  if (typeof window !== 'undefined' && response.access_token) {
    localStorage.setItem('auth_token', response.access_token)
  }

  return response
}

/**
 * Login with username and password
 */
export async function login(username: string, password: string): Promise<AuthResponse> {
  // FastAPI OAuth2 expects form data, not JSON
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new APIError(response.status, errorData.detail || 'Login failed', errorData)
  }

  const data = await response.json()

  // Store token in localStorage
  if (typeof window !== 'undefined' && data.access_token) {
    localStorage.setItem('auth_token', data.access_token)
  }

  return data
}

/**
 * Logout - clear local token
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

/**
 * Get current user info (requires auth)
 */
export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>('/auth/me')
}

// ============================================================================
// PROGRESS API
// ============================================================================

/**
 * Get user progress overview (requires auth)
 */
export async function fetchProgressOverview(): Promise<ProgressOverview> {
  return apiFetch<ProgressOverview>('/progress/overview')
}

/**
 * Update lesson progress (requires auth)
 */
export async function updateLessonProgress(
  lessonId: number,
  status: 'in_progress' | 'completed',
  timeSpent?: number
): Promise<any> {
  return apiFetch<any>(`/progress/lessons/${lessonId}`, {
    method: 'POST',
    body: JSON.stringify({
      status,
      time_spent: timeSpent,
    }),
  })
}

/**
 * Get recommended next lessons (requires auth)
 */
export async function fetchRecommendations(): Promise<{ next_lessons: any[] }> {
  return apiFetch<{ next_lessons: any[] }>('/progress/recommendations')
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('auth_token')
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}
