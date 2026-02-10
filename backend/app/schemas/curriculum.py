from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class TopicBase(BaseModel):
    slug: str
    title: str
    exercise_count: int
    proof_count: Optional[int] = None
    has_lesson: bool


class TopicResponse(TopicBase):
    id: int

    class Config:
        from_attributes = True


class DomainBase(BaseModel):
    slug: str
    title: str
    description: str
    level: str


class DomainWithTopics(DomainBase):
    id: int
    topics: List[TopicResponse]

    class Config:
        from_attributes = True


class SubjectWithDomains(BaseModel):
    id: int
    name: str
    grade_level: Optional[str] = None
    description: Optional[str] = None
    domains: List[DomainWithTopics]

    class Config:
        from_attributes = True


class CurriculumResponse(BaseModel):
    subjects: List[SubjectWithDomains]
