'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCurriculum } from '@/hooks/useCurriculum'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'
import { useLocale } from 'next-intl'
import type { Domain } from '@/lib/api-client'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const { subjects, domains, isLoading } = useCurriculum()

  // Determine which domain to expand based on current pathname
  const getCurrentDomain = (): Set<string> => {
    const currentDomain = domains.find(domain =>
      pathname?.includes(`/learn/${domain.slug}/`)
    )
    return currentDomain ? new Set([currentDomain.id.toString()]) : new Set<string>()
  }

  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Initialize expanded domains after data loads
    if (!isLoading && domains.length > 0) {
      setExpandedDomains(getCurrentDomain())
    }
  }, [isLoading, domains, pathname])

  const toggleDomain = (domainId: number) => {
    const newExpanded = new Set(expandedDomains)
    const id = domainId.toString()
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedDomains(newExpanded)
  }

  const totalTopics = domains.reduce((acc, domain) => acc + domain.topics.length, 0)
  const totalExercises = domains.reduce(
    (acc, domain) => acc + domain.topics.reduce((sum, topic) => sum + topic.exerciseCount, 0),
    0
  )

  if (isLoading) {
    return (
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out',
          'lg:z-auto',
          isCollapsed ? 'lg:w-16' : 'lg:w-80',
          isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </aside>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out',
          'lg:z-auto',
          isCollapsed ? 'lg:w-16' : 'lg:w-80',
          isOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            {!isCollapsed && <h2 className="text-lg font-bold text-gray-900 dark:text-white">Curriculum</h2>}
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleCollapse}
                className="hidden lg:block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle sidebar"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className={cn('w-5 h-5 transition-transform text-gray-700 dark:text-gray-300', isCollapsed ? 'rotate-180' : '')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          {!isCollapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>{subjects.length} Subjects • {domains.length} Domains</div>
              <div>{totalTopics} Topics • {totalExercises.toLocaleString()} Exercises</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {subjects.map((subject) => (
            <div key={subject.id} className="mb-3">
              {/* Subject Header */}
              <div className="px-3 py-2 mb-1">
                <div className="flex items-center justify-between">
                  {!isCollapsed && (
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {subject.name}
                    </div>
                  )}
                  {subject.grade_level && !isCollapsed && (
                    <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                      {subject.grade_level}
                    </span>
                  )}
                </div>
              </div>

              {/* Domains for this subject */}
              {subject.domains.map((domain) => (
                <div key={domain.id} className="mb-1">
                  {/* Domain Header */}
                  <button
                    onClick={() => toggleDomain(domain.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      pathname?.includes(`/learn/${domain.slug}/`)
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                    title={isCollapsed ? domain.title : undefined}
                  >
                    <div className="flex-1 min-w-0">
                      {isCollapsed ? (
                        <div className="font-semibold text-xs text-center">{domain.id}</div>
                      ) : (
                        <>
                          <div className="font-semibold text-sm truncate">{domain.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {domain.topics.length} topics
                          </div>
                        </>
                      )}
                    </div>
                    {!isCollapsed && (
                      <svg
                        className={cn(
                          'w-4 h-4 ml-2 transition-transform flex-shrink-0',
                          expandedDomains.has(domain.id.toString()) ? 'rotate-90' : ''
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Topics */}
                  {!isCollapsed && expandedDomains.has(domain.id.toString()) && (
                    <div className="mt-1 ml-2 space-y-0.5">
                      {domain.topics.map((topic) => {
                        const topicPath = `/${locale}/learn/${domain.slug}/${topic.slug}`
                        const isActive = pathname?.endsWith(topicPath) || pathname === topicPath

                        return (
                          <Link
                            key={topic.id}
                            href={topicPath}
                            onClick={onClose}
                            className={cn(
                              'block px-3 py-2 rounded-md text-sm transition-colors',
                              'hover:bg-gray-100 dark:hover:bg-gray-800',
                              isActive
                                ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{topic.title}</span>
                              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  {topic.exerciseCount}
                                </span>
                                {topic.proofCount && (
                                  <span className="text-xs text-purple-500 dark:text-purple-400">
                                    {topic.proofCount}P
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="mb-3">
              <Logo size="sm" showText={true} />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>Open Source Platform</div>
              <div>Apache-2.0 (Code) • CC BY-SA (Content)</div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
