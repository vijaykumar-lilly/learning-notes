'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/Toast'
import { apiFetch, getErrorMessage } from '@/lib/api-client-errors'

interface ProfileFormProps {
  locale: string
}

interface ProfileData {
  email: string
  full_name: string
  preferred_locale: string
  password?: string
  confirmPassword?: string
}

export default function ProfileForm({ locale }: ProfileFormProps) {
  const router = useRouter()
  const { user, token, refreshUser } = useAuth()
  const { success: showSuccessToast, error: showErrorToast } = useToast()

  const [formData, setFormData] = useState<ProfileData>({
    email: user?.email || '',
    full_name: user?.full_name || '',
    preferred_locale: user?.preferred_locale || 'en',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        full_name: user.full_name || '',
        preferred_locale: user.preferred_locale || 'en',
        password: '',
        confirmPassword: ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate password match if changing password
    if (showPasswordFields) {
      if (formData.password !== formData.confirmPassword) {
        showErrorToast('Passwords do not match')
        return
      }
      if (formData.password && formData.password.length < 8) {
        showErrorToast('Password must be at least 8 characters')
        return
      }
    }

    setLoading(true)

    try {
      const response = await apiFetch('http://localhost:8000/api/v1/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.full_name,
          preferred_locale: formData.preferred_locale,
          ...(showPasswordFields && formData.password ? { password: formData.password } : {})
        })
      })

      const updatedUser = await response.json()

      // Refresh user data in context
      await refreshUser()

      showSuccessToast('Profile updated successfully!')
      setShowPasswordFields(false)
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))

      // If locale changed, redirect to new locale
      if (updatedUser.preferred_locale !== locale) {
        router.push(`/${updatedUser.preferred_locale}/profile`)
      }
    } catch (err) {
      showErrorToast(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Preferred Language */}
        <div>
          <label htmlFor="preferred_locale" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Language
          </label>
          <select
            id="preferred_locale"
            value={formData.preferred_locale}
            onChange={(e) => setFormData({ ...formData, preferred_locale: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>
        </div>

        {/* Password Change Toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {showPasswordFields ? 'Cancel password change' : 'Change password'}
          </button>
        </div>

        {/* Password Fields */}
        {showPasswordFields && (
          <>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                minLength={8}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 8 characters
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                minLength={8}
              />
            </div>
          </>
        )}

        {/* Account Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Username:</span> {user?.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span className="font-medium">Member since:</span>{' '}
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
