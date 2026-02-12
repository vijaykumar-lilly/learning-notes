"""
Security middleware: rate limiting + security headers.
Lightweight implementation suitable for MVP - no external dependencies.
For production at scale, replace with Redis-backed rate limiting.
"""
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict
from datetime import datetime, timedelta
import time
import logging

logger = logging.getLogger(__name__)


# ============================================================================
# Rate Limiting (in-memory, per-IP)
# ============================================================================

class RateLimiter:
    """Simple in-memory rate limiter. Replace with Redis for multi-process."""

    def __init__(self):
        self.requests: dict[str, list[float]] = defaultdict(list)

    def is_allowed(self, key: str, limit: int, window_seconds: int) -> bool:
        now = time.time()
        cutoff = now - window_seconds

        # Clean old entries
        self.requests[key] = [t for t in self.requests[key] if t > cutoff]

        if len(self.requests[key]) >= limit:
            return False

        self.requests[key].append(now)
        return True

    def cleanup(self):
        """Periodically remove old keys to prevent memory leaks."""
        now = time.time()
        stale_keys = [k for k, v in self.requests.items() if not v or v[-1] < now - 3600]
        for k in stale_keys:
            del self.requests[k]


_limiter = RateLimiter()

# Rate limit rules: path prefix -> (requests, window_seconds)
RATE_LIMITS: dict[str, tuple[int, int]] = {
    "/api/v1/auth/login": (10, 60),          # 10 login attempts per minute
    "/api/v1/auth/register": (5, 60),         # 5 registrations per minute
    "/api/v1/auth/password-reset": (3, 60),   # 3 reset requests per minute
    "/api/v1/admin/subjects/generate": (3, 300),  # 3 AI generations per 5 min
    "/api/v1/exercises": (60, 60),            # 60 submissions per minute
}

# Default rate limit for all other endpoints
DEFAULT_RATE_LIMIT = (120, 60)  # 120 requests per minute


class RateLimitMiddleware(BaseHTTPMiddleware):
    """Rate limiting middleware."""

    _cleanup_counter = 0

    async def dispatch(self, request: Request, call_next):
        # Skip rate limiting for health checks and docs
        path = request.url.path
        if path in ("/health", "/docs", "/redoc", "/openapi.json"):
            return await call_next(request)

        # Get client IP
        client_ip = request.client.host if request.client else "unknown"

        # Find matching rate limit rule
        limit, window = DEFAULT_RATE_LIMIT
        for prefix, (rule_limit, rule_window) in RATE_LIMITS.items():
            if path.startswith(prefix):
                limit, window = rule_limit, rule_window
                break

        key = f"{client_ip}:{path.split('?')[0]}"

        if not _limiter.is_allowed(key, limit, window):
            logger.warning(f"Rate limit exceeded: {client_ip} on {path}")
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many requests. Please try again later."},
                headers={"Retry-After": str(window)},
            )

        # Periodic cleanup (every 1000 requests)
        RateLimitMiddleware._cleanup_counter += 1
        if RateLimitMiddleware._cleanup_counter >= 1000:
            _limiter.cleanup()
            RateLimitMiddleware._cleanup_counter = 0

        return await call_next(request)


# ============================================================================
# Security Headers
# ============================================================================

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Add security headers to all responses."""

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)

        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"

        # Only add HSTS in production (when not localhost)
        host = request.headers.get("host", "")
        if "localhost" not in host and "127.0.0.1" not in host:
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

        return response


# ============================================================================
# Request ID
# ============================================================================

class RequestIDMiddleware(BaseHTTPMiddleware):
    """Add a unique request ID to each request for tracing."""

    async def dispatch(self, request: Request, call_next):
        import uuid
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4())[:8])
        request.state.request_id = request_id

        response = await call_next(request)
        response.headers["X-Request-ID"] = request_id

        return response


# ============================================================================
# Setup function
# ============================================================================

def setup_security(app):
    """Add all security middleware to the FastAPI app."""
    app.add_middleware(RequestIDMiddleware)
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(RateLimitMiddleware)
    logger.info("Security middleware enabled: rate limiting, security headers, request ID")
