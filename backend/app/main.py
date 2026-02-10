from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app.config import settings
from app.middleware.cors import setup_cors
from app.api.v1 import curriculum, lessons, auth, exercises, progress, translations, admin

# Create FastAPI application
app = FastAPI(
    title="Math Learning Platform API",
    description="Backend API for comprehensive mathematics education platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Setup CORS
setup_cors(app)


# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Math Learning Platform API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# Include API routers
app.include_router(curriculum.router, prefix="/api/v1/curriculum", tags=["Curriculum"])
app.include_router(lessons.router, prefix="/api/v1/lessons", tags=["Lessons"])
app.include_router(exercises.router, prefix="/api/v1/exercises", tags=["Exercises"])
app.include_router(translations.router, prefix="/api/v1/translations", tags=["Translations"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(progress.router, prefix="/api/v1/progress", tags=["Progress"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.APP_HOST,
        port=settings.APP_PORT,
        reload=True
    )
