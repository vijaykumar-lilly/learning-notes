'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getSubjectDetail, approveSubject, publishSubject, type SubjectDetail } from '@/lib/admin-api'

export default function SubjectDetailPage() {
  const params = useParams()
  const subjectId = Number(params.id)
  const [subject, setSubject] = useState<SubjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function load() {
    try {
      const data = await getSubjectDetail(subjectId)
      setSubject(data)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [subjectId])

  async function handleApprove() {
    setActionLoading(true)
    try {
      await approveSubject(subjectId)
      setMessage({ type: 'success', text: 'Subject approved' })
      load()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(false)
    }
  }

  async function handlePublish() {
    setActionLoading(true)
    try {
      await publishSubject(subjectId)
      setMessage({ type: 'success', text: 'Subject published — now visible to users' })
      load()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Subject not found</p>
        <Link href="/admin/subjects" className="text-blue-600 hover:underline mt-2 inline-block">Back to subjects</Link>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-blue-100 text-blue-700',
    published: 'bg-green-100 text-green-700',
  }

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/admin/subjects" className="hover:text-blue-600">Subjects</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{subject.name}</span>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{subject.name}</h1>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase ${statusColors[subject.status] || 'bg-gray-100 text-gray-700'}`}>
                {subject.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
              {subject.grade_level && <span>Grade: {subject.grade_level}</span>}
              <span>{subject.total_domains} domains</span>
              <span>{subject.total_topics} topics</span>
              <span>{subject.total_lessons} lessons</span>
              <span>Created: {new Date(subject.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {subject.status === 'draft' && (
              <button onClick={handleApprove} disabled={actionLoading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 text-sm">
                {actionLoading ? 'Processing...' : 'Approve'}
              </button>
            )}
            {subject.status === 'approved' && (
              <button onClick={handlePublish} disabled={actionLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 text-sm">
                {actionLoading ? 'Processing...' : 'Publish'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Domains ({subject.domains.length})</h2>
        {subject.domains.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No domains found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {subject.domains.map((domain) => (
              <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{domain.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[domain.level] || 'bg-gray-100 text-gray-700'}`}>
                    {domain.level}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{domain.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{domain.topic_count} topics</span>
                  <span className={`px-1.5 py-0.5 rounded ${statusColors[domain.status] || 'bg-gray-100 text-gray-600'}`}>{domain.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
