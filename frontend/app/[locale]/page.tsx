import Link from 'next/link'
import AppLayout from '@/components/layout/AppLayout'
import Logo from '@/components/Logo'
import { getSubjects } from '@/lib/curriculum-api'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Fetch subjects from API
  const subjects = await getSubjects(locale)

  // Calculate statistics from API data
  const stats = {
    totalSubjects: subjects.length,
    totalDomains: subjects.reduce((sum, subject) => sum + subject.total_domains, 0),
    totalTopics: subjects.reduce((sum, subject) => sum + subject.total_topics, 0),
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Logo size="xl" showText={false} />
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome to LearnHub</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your comprehensive learning platform</p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            Explore {stats.totalSubjects} subjects covering {stats.totalDomains} domains with {stats.totalTopics} topics.
            Start your learning journey today.
          </p>
        </section>

        {/* Subjects Grid */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Available Subjects</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/${locale}/subjects/${subject.id}`}
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{subject.name}</h4>
                  {subject.grade_level && (
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                      {subject.grade_level}
                    </span>
                  )}
                </div>
                {subject.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {subject.description}
                  </p>
                )}
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <span>{subject.total_domains} domains</span>
                  <span>{subject.total_topics} topics</span>
                </div>
              </Link>
            ))}
          </div>

          {subjects.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">No subjects available yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalSubjects}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Subjects</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalDomains}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Domains</div>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalTopics}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Topics</div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Platform Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Adaptive Learning</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Personalized pathways based on your progress</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Multiple Subjects</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Learn multiple subjects in one platform</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 text-gray-900 dark:text-white">Instant Feedback</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Step-by-step hints and explanations</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
