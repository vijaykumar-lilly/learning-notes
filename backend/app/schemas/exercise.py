from pydantic import BaseModel
from typing import Dict, Any, Optional, List


class ExerciseBase(BaseModel):
    exercise_type: str
    difficulty: str
    question: str  # Translation key or resolved text
    data: Dict[str, Any]  # Type-specific data
    hint: Optional[str] = None
    explanation: Optional[str] = None


class ExerciseResponse(ExerciseBase):
    id: int
    lesson_id: int
    display_order: int

    class Config:
        from_attributes = True


class ExerciseSubmission(BaseModel):
    answer: Any  # Can be string, number, list, etc.


class ExerciseSubmissionResponse(BaseModel):
    is_correct: bool
    explanation: Optional[str] = None
    next_exercise: Optional[int] = None
