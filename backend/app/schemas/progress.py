from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class LessonProgressBase(BaseModel):
    lesson_id: int
    status: str
    time_spent: int = 0  # seconds


class LessonProgressUpdate(BaseModel):
    status: Optional[str] = None
    time_spent: Optional[int] = None


class LessonProgressResponse(LessonProgressBase):
    id: int
    user_id: int
    exercises_completed: int
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    last_accessed_at: datetime

    class Config:
        from_attributes = True


class ProgressOverviewResponse(BaseModel):
    total_lessons: int
    completed_lessons: int
    in_progress_lessons: int
    total_time_spent: int  # seconds
    recent_lessons: List[Dict]


class RecommendationResponse(BaseModel):
    next_lessons: List[Dict]  # [{"slug": "...", "title": "...", "reason": "..."}]
