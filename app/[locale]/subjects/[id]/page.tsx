import Link from 'next/link'
import AppLayout from '@/components/layout/AppLayout'
import { getSubjectDomains } from '@/lib/curriculum-api'
import { notFound } from 'next/navigation'

export default async function SubjectPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params

  const subjectId = parseInt(id, 10)
  if (isNaN(subjectId)) {
    notFound()
  }

  // Fetch domains for this subject
  const domains = await getSubjectDomains(subjectId, locale)

  if (domains.length === 0) {
    notFound()
  }

  // Group domains by level
  const domainsByLevel = domains.reduce((acc, domain) => {
    if (!acc[domain.level]) {
      acc[domain.level] = []
    }
    acc[domain.level].push(domain)
    return acc
  }, {} as Record<string, typeof domains>)

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href={`/${locale}`} className="text-blue-600 dark:text-blue-400 hover:underline">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">Subject</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Path
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {domains.length} domains available
          </p>
        </div>

        {/* Domains grouped by level */}
        {Object.entries(domainsByLevel).map(([level, levelDomains]) => (
          <section key={level} id={level} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white capitalize">
              {level}
            </h2>

            <div className="space-y-4">
              {levelDomains.map((domain) => (
                <div
                  key={domain.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {domain.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {domain.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {domain.topics.length} topics
                      </p>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                    {domain.topics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/${locale}/learn/${domain.slug}/${topic.slug}`}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 border border-transparent transition-all"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {topic.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                          {topic.exerciseCount > 0 && (
                            <span>{topic.exerciseCount} exercises</span>
                          )}
                          {topic.hasLesson && (
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                              Has lesson
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppLayout>
  )
}
