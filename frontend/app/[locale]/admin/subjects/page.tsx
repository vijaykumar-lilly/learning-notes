'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getSubjects,
  generateCurriculum,
  approveSubject,
  publishSubject,
  deleteSubject,
  type AdminSubject,
  type GenerateRequest,
} from '@/lib/admin-api'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<AdminSubject[]>([])
  const [loading, setLoading] = useState(true)
  const [showGenerate, setShowGenerate] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generateForm, setGenerateForm] = useState<GenerateRequest>({ subject: '', grade_level: '' })
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function loadSubjects() {
    try {
      const data = await getSubjects()
      setSubjects(data)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSubjects() }, [])

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!generateForm.subject.trim()) return

    setGenerating(true)
    setMessage(null)
    try {
      const result = await generateCurriculum(generateForm)
      setMessage({ type: 'success', text: `Generated "${result.subject}" with ${result.stats.domains} domains and ${result.stats.topics} topics` })
      setShowGenerate(false)
      setGenerateForm({ subject: '', grade_level: '' })
      loadSubjects()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setGenerating(false)
    }
  }

  async function handleApprove(id: number) {
    setActionLoading(id)
    try {
      await approveSubject(id)
      setMessage({ type: 'success', text: 'Subject approved' })
      loadSubjects()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(null)
    }
  }

  async function handlePublish(id: number) {
    setActionLoading(id)
    try {
      await publishSubject(id)
      setMessage({ type: 'success', text: 'Subject published — now visible to users' })
      loadSubjects()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    setActionLoading(id)
    try {
      await deleteSubject(id)
      setMessage({ type: 'success', text: 'Subject deleted' })
      loadSubjects()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subjects</h1>
        <button
          onClick={() => setShowGenerate(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Generate with AI
        </button>
      </div>

      {/* Message Banner */}
      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right font-bold">×</button>
        </div>
      )}

      {/* Generate Modal */}
      {showGenerate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => !generating && setShowGenerate(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Generate Curriculum with AI</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Name *</label>
                <input
                  type="text"
                  value={generateForm.subject}
                  onChange={(e) => setGenerateForm({ ...generateForm, subject: e.target.value })}
                  placeholder="e.g., Mathematics, Physics, Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={generating}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade Level (optional)</label>
                <input
                  type="text"
                  value={generateForm.grade_level || ''}
                  onChange={(e) => setGenerateForm({ ...generateForm, grade_level: e.target.value })}
                  placeholder="e.g., Grade 10, Undergraduate, Beginner"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={generating}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGenerate(false)}
                  disabled={generating}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={generating || !generateForm.subject.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {generating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
              {generating && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">This may take 30-60 seconds. AI is generating domains, topics, and lesson content.</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Subjects Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 animate-pulse border border-gray-200 dark:border-gray-700">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No subjects yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Generate your first curriculum using AI</p>
          <button onClick={() => setShowGenerate(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Generate with AI
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{subject.name}</h3>
                    <StatusBadge status={subject.status} />
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    {subject.grade_level && <span>Grade: {subject.grade_level}</span>}
                    <span>{subject.total_domains} domains</span>
                    <span>{subject.total_topics} topics</span>
                    <span>{subject.total_lessons} lessons</span>
                    <span>Created: {new Date(subject.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {subject.status === 'draft' && (
                    <>
                      <button
                        onClick={() => handleApprove(subject.id)}
                        disabled={actionLoading === subject.id}
                        className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {actionLoading === subject.id ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id, subject.name)}
                        disabled={actionLoading === subject.id}
                        className="px-3 py-1.5 text-red-600 border border-red-300 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {subject.status === 'approved' && (
                    <button
                      onClick={() => handlePublish(subject.id)}
                      disabled={actionLoading === subject.id}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                      {actionLoading === subject.id ? '...' : 'Publish'}
                    </button>
                  )}
                  {subject.status === 'published' && (
                    <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Live
                    </span>
                  )}
                  <Link
                    href={`/admin/subjects/${subject.id}`}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
