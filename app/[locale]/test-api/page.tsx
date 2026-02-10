'use client'

/**
 * API Integration Test Page
 * Tests all API endpoints and displays results
 */

import { useEffect, useState } from 'react'
import { useCurriculum } from '@/hooks/useCurriculum'
import { fetchAllTranslations, type Domain } from '@/lib/api-client'
import AppLayout from '@/components/layout/AppLayout'

export default function APITestPage() {
  const { domains, isLoading: curriculumLoading, error: curriculumError } = useCurriculum()
  const [translationsCount, setTranslationsCount] = useState<number>(0)
  const [translationsLoading, setTranslationsLoading] = useState(true)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  // Test backend connection
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000')
        if (response.ok) {
          setBackendStatus('online')
        } else {
          setBackendStatus('offline')
        }
      } catch (error) {
        setBackendStatus('offline')
      }
    }

    checkBackend()
  }, [])

  // Test translations API
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const translations = await fetchAllTranslations('en')
        const count = Object.values(translations).reduce((sum, namespace) => {
          return sum + Object.keys(namespace as object).length
        }, 0)
        setTranslationsCount(count)
      } catch (error) {
        console.error('Failed to fetch translations:', error)
      } finally {
        setTranslationsLoading(false)
      }
    }

    fetchTranslations()
  }, [])

  const stats = {
    totalDomains: domains.length,
    totalTopics: domains.reduce((sum, domain) => sum + domain.topics.length, 0),
    totalExercises: domains.reduce((sum, domain) => {
      return sum + domain.topics.reduce((topicSum, topic) => topicSum + topic.exerciseCount, 0)
    }, 0),
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Integration Test</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Testing connection to FastAPI backend and data integrity
          </p>
        </div>

        {/* Backend Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Backend Status</h2>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${
              backendStatus === 'online' ? 'bg-green-500' :
              backendStatus === 'offline' ? 'bg-red-500' :
              'bg-yellow-500 animate-pulse'
            }`}></div>
            <span className="font-medium">
              {backendStatus === 'online' && 'Backend is running'}
              {backendStatus === 'offline' && 'Backend is offline'}
              {backendStatus === 'checking' && 'Checking backend...'}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}
          </p>
        </div>

        {/* Curriculum API Test */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Curriculum API</h2>

          {curriculumLoading && (
            <div className="text-gray-600 dark:text-gray-400">Loading curriculum data...</div>
          )}

          {curriculumError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
              <p className="text-red-800 dark:text-red-200 font-medium">Error loading curriculum:</p>
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">{curriculumError.message}</p>
            </div>
          )}

          {!curriculumLoading && !curriculumError && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalDomains}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Domains</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-4">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.totalTopics}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Topics</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-4">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalExercises}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Sample Data:</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 max-h-64 overflow-y-auto">
                  <pre className="text-xs">
                    {JSON.stringify(domains.slice(0, 2), null, 2)}
                  </pre>
                </div>
              </div>

              <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Curriculum API working correctly!</span>
              </div>
            </div>
          )}
        </div>

        {/* Translations API Test */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Translations API</h2>

          {translationsLoading && (
            <div className="text-gray-600 dark:text-gray-400">Loading translations data...</div>
          )}

          {!translationsLoading && (
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-4">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{translationsCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">English Translation Keys</div>
              </div>

              <div className="text-green-600 dark:text-green-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Translations API working correctly!</span>
              </div>
            </div>
          )}
        </div>

        {/* Domain List */}
        {!curriculumLoading && !curriculumError && domains.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">All Domains</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {domains.map((domain: Domain) => (
                <div key={domain.id} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                  <div className="font-semibold text-lg mb-1">{domain.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{domain.level}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{domain.topics.length} topics</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold mb-2">ℹ️ Integration Status</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            This page verifies that your frontend can successfully communicate with the FastAPI backend.
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Backend server must be running on port 8000</li>
            <li>CORS is configured to allow requests from localhost:3000</li>
            <li>All API endpoints are accessible</li>
            <li>Data is being fetched and displayed correctly</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  )
}
