'use client'

import { ThemeProvider } from './ThemeProvider'
import { BilingualPreferencesProvider } from './bilingual/BilingualPreferencesProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <BilingualPreferencesProvider>
        {children}
      </BilingualPreferencesProvider>
    </ThemeProvider>
  )
}
