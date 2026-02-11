import { notFound } from 'next/navigation'
import LessonSectionRenderer from '@/components/lesson/LessonSectionRenderer'
import ExercisesRenderer from '@/components/lesson/ExercisesRenderer'
import DifficultyBadge from '@/components/ui/DifficultyBadge'

async function fetchLesson(slug: string, locale: string) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

  try {
    const res = await fetch(`${API_BASE}/lessons/${slug}?locale=${locale}`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })

    if (!res.ok) {
      if (res.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch lesson: ${res.statusText}`)
    }

    const data = await res.json()
    // Backend returns the lesson directly, not wrapped in data.lesson
    return data
  } catch (error) {
    console.error('Error fetching lesson:', error)
    throw error
  }
}

interface PageProps {
  params: Promise<{
    locale: string
    domain: string
    slug: string
  }>
}

export default async function LessonPage({ params }: PageProps) {
  const { locale, domain, slug } = await params

  // Fetch lesson data from API
  const lesson = await fetchLesson(slug, locale)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <a href={`/${locale}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </a>
            <span>/</span>
            <a href={`/${locale}/subjects/${lesson.subjectId}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {lesson.domain}
            </a>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">{lesson.title}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {lesson.title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            {lesson.difficulty && (
              <DifficultyBadge level={lesson.difficulty} />
            )}

            {lesson.estimated_time && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{lesson.estimated_time} minutes</span>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Sections */}
        <div className="space-y-6 mb-12">
          {lesson.sections.map((section: any, idx: number) => (
            <LessonSectionRenderer key={idx} section={section} locale={locale} />
          ))}
        </div>

        {/* Exercises */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Practice Exercises
            </h2>
            <ExercisesRenderer
              exercises={lesson.exercises}
              lessonSlug={slug}
              lessonId={lesson.id}
              locale={locale}
            />
          </div>
        )}

        {/* Navigation */}
        {(lesson.navigation?.previous || lesson.navigation?.next) && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              {lesson.navigation.previous ? (
                <a
                  href={`/${locale}/learn/${domain}/${lesson.navigation.previous.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
                    <div className="font-medium">{lesson.navigation.previous.title}</div>
                  </div>
                </a>
              ) : (
                <div />
              )}

              {lesson.navigation.next ? (
                <a
                  href={`/${locale}/learn/${domain}/${lesson.navigation.next.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <div className="text-right">
                    <div className="text-xs text-blue-100">Next</div>
                    <div className="font-medium">{lesson.navigation.next.title}</div>
                  </div>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const lesson = await fetchLesson(slug, locale)

  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    }
  }

  return {
    title: `${lesson.title} | LearnHub`,
    description: lesson.description || `Learn ${lesson.title} with interactive lessons and exercises`,
  }
}
