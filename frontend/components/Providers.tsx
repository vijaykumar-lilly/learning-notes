'use client'

import { ThemeProvider } from './ThemeProvider'
import { BilingualPreferencesProvider } from './bilingual/BilingualPreferencesProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from './Toast'
import ErrorBoundary from './ErrorBoundary'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BilingualPreferencesProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </BilingualPreferencesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
