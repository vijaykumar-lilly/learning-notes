from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text, JSON, Index, UniqueConstraint, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
import enum


class DifficultyLevel(enum.Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    expert = "expert"


class ProgressStatus(enum.Enum):
    not_started = "not_started"
    in_progress = "in_progress"
    completed = "completed"


class ExerciseDifficulty(enum.Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"


# Import all models to ensure they're registered with SQLAlchemy
# Import order matters - base models first, then models that reference them
from app.models.user import User
from app.models.subject import Subject, SubjectStatus
from app.models.domain import Domain, ContentStatus
from app.models.topic import Topic
from app.models.lesson import Lesson
from app.models.lesson_content import LessonSection
from app.models.translation import Translation
from app.models.exercise import Exercise
from app.models.progress import LessonProgress, ExerciseSubmission
from app.models.generation_task import GenerationTask, TaskType, TaskStatus

# Export all models
__all__ = [
    'Subject',
    'SubjectStatus',
    'GenerationTask',
    'TaskType',
    'TaskStatus',
    'Domain',
    'ContentStatus',
    'Topic',
    'Lesson',
    'LessonSection',
    'Translation',
    'Exercise',
    'User',
    'LessonProgress',
    'ExerciseSubmission',
    'DifficultyLevel',
    'ProgressStatus',
    'ExerciseDifficulty',
]
