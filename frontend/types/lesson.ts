// Lesson metadata types
export interface LessonMetadata {
  id: string
  title: string
  slug: string
  domain: string
  domainSlug: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  estimatedTime: number // in minutes
  prerequisites: string[] // lesson IDs
  learningObjectives: string[]
  keywords: string[]
  exerciseCount: number
  proofCount?: number
}

// Lesson section types
export interface LessonSection {
  id: string
  type: 'introduction' | 'concept' | 'theorem' | 'example' | 'exercise' | 'summary'
  title?: string
  content: any // Will be React components
}

export interface Lesson {
  metadata: LessonMetadata
  sections: LessonSection[]
}

// Progress tracking types
export interface LessonProgress {
  lessonId: string
  userId: string
  status: 'not-started' | 'in-progress' | 'completed'
  startedAt?: Date
  completedAt?: Date
  exercisesCompleted: number
  totalExercises: number
  timeSpent: number // in minutes
  lastAccessedAt: Date
}

// Search result type
export interface SearchResult {
  id: string
  title: string
  description: string
  domain: string
  slug: string
  type: 'lesson' | 'topic' | 'concept'
  relevanceScore: number
  keywords: string[]
}
