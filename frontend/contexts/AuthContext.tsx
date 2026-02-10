'use client'

/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  isAuthenticated as checkAuth,
  type User,
  type AuthResponse,
} from '@/lib/api-client'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string, fullName?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const authenticated = checkAuth()

      if (authenticated) {
        try {
          // Fetch current user data
          const userData = await getCurrentUser()
          setUser(userData)
          setToken(localStorage.getItem('auth_token'))
        } catch (error) {
          console.error('Failed to fetch user data:', error)
          // Token might be invalid/expired
          apiLogout()
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response: AuthResponse = await apiLogin(username, password)
      setUser(response.user)
      setToken(response.access_token)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (
    email: string,
    username: string,
    password: string,
    fullName?: string
  ) => {
    try {
      const response: AuthResponse = await apiRegister(email, username, password, fullName)
      setUser(response.user)
      setToken(response.access_token)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = () => {
    apiLogout()
    setUser(null)
    setToken(null)
  }

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
      // If refresh fails, logout
      logout()
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to use auth context
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

/**
 * Higher-order component to protect routes
 * Redirects to login if not authenticated
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      )
    }

    if (!isAuthenticated) {
      // In a real app, redirect to login page
      // For now, just show a message
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p>Please log in to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}
