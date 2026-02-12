'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/api-client'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/subjects', label: 'Subjects', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { href: '/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAdmin() {
      try {
        const user = await getCurrentUser()
        setAuthorized(user.is_admin === true)
      } catch {
        setAuthorized(false)
      }
    }
    checkAdmin()
  }, [])

  if (authorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (authorized === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need admin privileges to access this page.</p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  // Strip locale prefix to match nav items
  const pathWithoutLocale = '/' + pathname.split('/').slice(2).join('/')

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 dark:bg-gray-950 text-white flex-shrink-0 hidden lg:block">
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">LH</div>
            <span className="text-lg font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathWithoutLocale === item.href || (item.href !== '/admin' && pathWithoutLocale.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
          <span className="font-bold">Admin Panel</span>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg ${pathWithoutLocale === item.href ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                title={item.label}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
