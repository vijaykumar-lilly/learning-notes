/**
 * Admin API Client for LearningHub
 * All endpoints require admin authentication
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function adminFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: response.statusText }))
    throw new Error(err.detail || `HTTP ${response.status}`)
  }

  return response.json()
}

// ============================================================================
// Types
// ============================================================================

export interface DashboardStats {
  total_users: number
  total_subjects: number
  total_domains: number
  total_topics: number
  total_lessons: number
  total_exercises: number
  draft_subjects: number
  approved_subjects: number
  published_subjects: number
  recent_users: AdminUser[]
}

export interface AdminUser {
  id: number
  email: string
  username: string
  full_name: string | null
  preferred_locale: string
  is_active: boolean
  is_admin: boolean
  created_at: string
}

export interface AdminSubject {
  id: number
  name: string
  grade_level: string | null
  description: string | null
  standards: string | null
  status: string
  total_domains: number
  total_topics: number
  total_lessons: number
  created_at: string
  reviewed_at: string | null
  published_at: string | null
}

export interface SubjectDetail extends AdminSubject {
  domains: {
    id: number
    slug: string
    title: string
    description: string
    level: string
    status: string
    topic_count: number
  }[]
}

export interface GenerateRequest {
  subject: string
  grade_level?: string
  standards?: string
}

export interface GenerateResult {
  message: string
  subject_id: number
  subject: string
  status: string
  stats: { domains: number; topics: number }
  tokens_used?: number
  curriculum: any[]
}

export interface AnalyticsData {
  users: {
    total: number
    active_30d: number
    new_7d: number
    admins: number
  }
  content: {
    subjects: number
    domains: number
    topics: number
    lessons: number
    exercises: number
    sections: number
  }
  progress: {
    total_completions: number
    total_submissions: number
    avg_accuracy: number
    total_time_hours: number
  }
}

// ============================================================================
// Dashboard
// ============================================================================

export async function getDashboardStats(): Promise<DashboardStats> {
  return adminFetch<DashboardStats>('/admin/dashboard')
}

// ============================================================================
// Subjects
// ============================================================================

export async function getSubjects(status?: string): Promise<AdminSubject[]> {
  const query = status ? `?status=${status}` : ''
  return adminFetch<AdminSubject[]>(`/admin/subjects${query}`)
}

export async function getSubjectDetail(id: number): Promise<SubjectDetail> {
  return adminFetch<SubjectDetail>(`/admin/subjects/${id}`)
}

export async function generateCurriculum(data: GenerateRequest): Promise<GenerateResult> {
  return adminFetch<GenerateResult>('/admin/subjects/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function approveSubject(id: number): Promise<{ message: string }> {
  return adminFetch(`/admin/subjects/${id}/approve`, { method: 'POST' })
}

export async function publishSubject(id: number): Promise<{ message: string }> {
  return adminFetch(`/admin/subjects/${id}/publish`, { method: 'POST' })
}

export async function deleteSubject(id: number): Promise<{ message: string }> {
  return adminFetch(`/admin/subjects/${id}`, { method: 'DELETE' })
}

// ============================================================================
// Users
// ============================================================================

export async function getUsers(): Promise<AdminUser[]> {
  return adminFetch<AdminUser[]>('/admin/users')
}

export async function toggleUserAdmin(userId: number, isAdmin: boolean): Promise<{ message: string }> {
  return adminFetch(`/admin/users/${userId}/role`, {
    method: 'PUT',
    body: JSON.stringify({ is_admin: isAdmin }),
  })
}

export async function toggleUserActive(userId: number, isActive: boolean): Promise<{ message: string }> {
  return adminFetch(`/admin/users/${userId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ is_active: isActive }),
  })
}

// ============================================================================
// Analytics
// ============================================================================

export async function getAnalytics(): Promise<AnalyticsData> {
  return adminFetch<AnalyticsData>('/admin/analytics')
}
