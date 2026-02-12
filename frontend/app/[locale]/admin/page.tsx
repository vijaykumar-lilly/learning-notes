'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDashboardStats, type DashboardStats } from '@/lib/admin-api'

function StatCard({ label, value, icon, color = 'blue' }: { label: string; value: number | string; icon: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || 'Failed to load dashboard'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <Link
          href="/admin/subjects"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
        >
          Manage Subjects
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.total_users} color="blue" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        <StatCard label="Subjects" value={stats.total_subjects} color="purple" icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        <StatCard label="Domains" value={stats.total_domains} color="indigo" icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        <StatCard label="Topics" value={stats.total_topics} color="green" icon="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        <StatCard label="Lessons" value={stats.total_lessons} color="yellow" icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <StatCard label="Exercises" value={stats.total_exercises} color="red" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </div>

      {/* Content Pipeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Pipeline</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-3xl font-bold text-yellow-600">{stats.draft_subjects}</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">Draft</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-3xl font-bold text-blue-600">{stats.approved_subjects}</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Approved</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <p className="text-3xl font-bold text-green-600">{stats.published_subjects}</p>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">Published</p>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      {stats.recent_users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Username</th>
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {stats.recent_users.slice(0, 5).map((user) => (
                  <tr key={user.id} className="text-gray-900 dark:text-gray-100">
                    <td className="py-3 font-medium">{user.username}</td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.is_admin ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {user.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
