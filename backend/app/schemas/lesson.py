from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime


class LessonSectionResponse(BaseModel):
    id: int
    section_type: str
    display_order: int
    content: Dict[str, Any]  # content_json

    class Config:
        from_attributes = True


class LessonNavigationResponse(BaseModel):
    previous: Optional[Dict[str, str]] = None  # {"slug": "...", "title": "..."}
    next: Optional[Dict[str, str]] = None


class LessonResponse(BaseModel):
    id: int
    slug: str
    title: str
    domain: str
    difficulty: str
    estimated_time: Optional[int]
    sections: List[LessonSectionResponse]
    exercises: List[Dict[str, Any]]  # Will be populated from Exercise model
    navigation: LessonNavigationResponse

    class Config:
        from_attributes = True


class LessonCreate(BaseModel):
    topic_slug: str
    estimated_time: Optional[int]
    difficulty: str = "beginner"
    sections: List[Dict[str, Any]]


class LessonUpdate(BaseModel):
    estimated_time: Optional[int] = None
    difficulty: Optional[str] = None
    sections: Optional[List[Dict[str, Any]]] = None
