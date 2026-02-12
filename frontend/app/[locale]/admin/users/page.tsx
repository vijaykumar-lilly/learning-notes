'use client'

import { useEffect, useState } from 'react'
import { getUsers, toggleUserAdmin, toggleUserActive, type AdminUser } from '@/lib/admin-api'

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [search, setSearch] = useState('')

  async function loadUsers() {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadUsers() }, [])

  async function handleToggleAdmin(userId: number, currentIsAdmin: boolean) {
    const action = currentIsAdmin ? 'remove admin from' : 'promote to admin'
    if (!confirm(`Are you sure you want to ${action} this user?`)) return

    setActionLoading(userId)
    try {
      await toggleUserAdmin(userId, !currentIsAdmin)
      setMessage({ type: 'success', text: `User ${currentIsAdmin ? 'demoted' : 'promoted'} successfully` })
      loadUsers()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(null)
    }
  }

  async function handleToggleActive(userId: number, currentIsActive: boolean) {
    setActionLoading(userId)
    try {
      await toggleUserActive(userId, !currentIsActive)
      setMessage({ type: 'success', text: `User ${currentIsActive ? 'deactivated' : 'activated'}` })
      loadUsers()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setActionLoading(null)
    }
  }

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.full_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{users.length} total</span>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right font-bold">×</button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username, email, or name..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                  <th className="px-5 py-3 font-medium">User</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Language</th>
                  <th className="px-5 py-3 font-medium">Role</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium">{user.username}</p>
                        {user.full_name && <p className="text-xs text-gray-500 dark:text-gray-400">{user.full_name}</p>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase">
                        {user.preferred_locale}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.is_admin ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {user.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleAdmin(user.id, user.is_admin)}
                          disabled={actionLoading === user.id}
                          className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
                          title={user.is_admin ? 'Remove admin' : 'Make admin'}
                        >
                          {user.is_admin ? 'Demote' : 'Promote'}
                        </button>
                        <button
                          onClick={() => handleToggleActive(user.id, user.is_active)}
                          disabled={actionLoading === user.id}
                          className={`text-xs px-2 py-1 border rounded transition disabled:opacity-50 ${user.is_active ? 'border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20' : 'border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                        >
                          {user.is_active ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      {search ? 'No users match your search' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
