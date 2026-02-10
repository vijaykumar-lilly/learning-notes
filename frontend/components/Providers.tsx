'use client'

import { ThemeProvider } from './ThemeProvider'
import { BilingualPreferencesProvider } from './bilingual/BilingualPreferencesProvider'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <BilingualPreferencesProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BilingualPreferencesProvider>
    </ThemeProvider>
  )
}
