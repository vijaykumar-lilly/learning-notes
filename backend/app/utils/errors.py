"""
Error handling utilities for the API
Provides consistent error responses and logging
"""

import logging
from fastapi import HTTPException, status
from typing import Any, Optional
from functools import wraps

# Configure logger
logger = logging.getLogger(__name__)


class APIError(Exception):
    """Base exception for API errors"""
    def __init__(self, status_code: int, detail: str, error_code: Optional[str] = None):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code
        super().__init__(self.detail)


class NotFoundError(APIError):
    """Resource not found"""
    def __init__(self, resource: str, identifier: Any):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{resource} not found: {identifier}",
            error_code="NOT_FOUND"
        )


class ValidationError(APIError):
    """Validation failed"""
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            error_code="VALIDATION_ERROR"
        )


class UnauthorizedError(APIError):
    """Unauthorized access"""
    def __init__(self, detail: str = "Unauthorized"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            error_code="UNAUTHORIZED"
        )


class ForbiddenError(APIError):
    """Forbidden access"""
    def __init__(self, detail: str = "Forbidden"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
            error_code="FORBIDDEN"
        )


def handle_errors(func):
    """
    Decorator to handle errors in API endpoints
    Catches exceptions and converts them to proper HTTP responses
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except HTTPException:
            # Re-raise HTTP exceptions as-is
            raise
        except APIError as e:
            # Convert API errors to HTTP exceptions
            logger.warning(f"API Error in {func.__name__}: {e.detail}")
            raise HTTPException(
                status_code=e.status_code,
                detail=e.detail
            )
        except ValueError as e:
            # Validation errors
            logger.warning(f"Validation error in {func.__name__}: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )
        except Exception as e:
            # Unexpected errors
            logger.error(f"Unexpected error in {func.__name__}: {str(e)}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An unexpected error occurred. Please try again later."
            )
    return wrapper


def log_error(error: Exception, context: str = ""):
    """Log an error with context"""
    logger.error(f"Error in {context}: {str(error)}", exc_info=True)


def log_warning(message: str, context: str = ""):
    """Log a warning with context"""
    logger.warning(f"Warning in {context}: {message}")


def log_info(message: str, context: str = ""):
    """Log info with context"""
    logger.info(f"Info in {context}: {message}")
