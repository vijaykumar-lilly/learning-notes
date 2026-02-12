/**
 * Centralized API error handling for the frontend
 * Provides consistent error handling across all API calls
 */

export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

/**
 * Handle API response errors consistently
 * Automatically redirects to login on 401 errors
 * Throws APIError with parsed error details
 */
export async function handleAPIError(response: Response): Promise<Response> {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const message = data.detail || data.message || 'An error occurred'
    const code = data.code

    // Handle authentication errors
    if (response.status === 401) {
      // Clear auth token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        // Redirect to login page
        const currentLocale = window.location.pathname.split('/')[1] || 'en'
        window.location.href = `/${currentLocale}/auth/login`
      }
      throw new APIError(401, 'Your session has expired. Please sign in again.', 'UNAUTHORIZED')
    }

    // Handle forbidden errors
    if (response.status === 403) {
      throw new APIError(403, message || 'You do not have permission to perform this action.', code || 'FORBIDDEN')
    }

    // Handle not found errors
    if (response.status === 404) {
      throw new APIError(404, message || 'The requested resource was not found.', code || 'NOT_FOUND')
    }

    // Handle validation errors
    if (response.status === 400) {
      throw new APIError(400, message || 'Invalid request. Please check your input.', code || 'VALIDATION_ERROR')
    }

    // Handle server errors
    if (response.status >= 500) {
      throw new APIError(
        response.status,
        'Something went wrong on our end. Please try again later.',
        code || 'SERVER_ERROR'
      )
    }

    // Generic error
    throw new APIError(response.status, message, code)
  }

  return response
}

/**
 * Wrapper for fetch that automatically handles errors
 */
export async function apiFetch(url: string, options?: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, options)
    return await handleAPIError(response)
  } catch (error) {
    // Network errors (no response from server)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(0, 'Network error. Please check your internet connection.', 'NETWORK_ERROR')
    }
    // Re-throw APIError instances
    if (error instanceof APIError) {
      throw error
    }
    // Unknown errors
    throw new APIError(500, 'An unexpected error occurred.', 'UNKNOWN_ERROR')
  }
}

/**
 * Get user-friendly error message for display
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}
