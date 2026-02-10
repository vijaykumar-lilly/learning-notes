from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON, Enum as SQLEnum, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum
from app.database import Base


class TaskType(str, Enum):
    """Type of generation task"""
    CURRICULUM_GENERATION = "curriculum_generation"
    LESSON_GENERATION = "lesson_generation"
    EXERCISE_GENERATION = "exercise_generation"
    TRANSLATION_GENERATION = "translation_generation"


class TaskStatus(str, Enum):
    """Task execution status"""
    QUEUED = "queued"           # In queue, not started
    IN_PROGRESS = "in_progress" # Agent is working
    COMPLETED = "completed"     # Successfully completed
    FAILED = "failed"          # Error occurred
    CANCELLED = "cancelled"     # User cancelled


class GenerationTask(Base):
    """
    Tracks async agent tasks for curriculum and lesson generation.
    Provides progress tracking and error handling.
    """
    __tablename__ = "generation_tasks"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String(100), unique=True, index=True, nullable=False)  # UUID

    # Task details
    task_type = Column(SQLEnum(TaskType), nullable=False)
    status = Column(SQLEnum(TaskStatus), default=TaskStatus.QUEUED, nullable=False, index=True)

    # Related entities
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=True)

    # User who initiated the task
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Input parameters (stored as JSON)
    input_params = Column(JSON, nullable=True)
    # Example: {"subject": "Physics", "grade_level": "Grade 12", "standards": "NGSS"}

    # Output/result (stored as JSON)
    result = Column(JSON, nullable=True)
    # Example: {"curriculum_id": 123, "domains": [...], "stats": {...}}

    # Progress tracking
    progress_percent = Column(Float, default=0.0)  # 0.0 to 100.0
    progress_message = Column(String(500), nullable=True)  # "Generating domain 3 of 5..."

    # Error tracking
    error_message = Column(Text, nullable=True)
    error_traceback = Column(Text, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    # Agent metadata
    agent_version = Column(String(50), nullable=True)  # Track which agent version was used
    tokens_used = Column(Integer, nullable=True)  # Track Claude API token usage
    estimated_cost = Column(Float, nullable=True)  # Estimated cost in USD

    # Relationships
    subject = relationship("Subject", backref="generation_tasks")
    topic = relationship("Topic", backref="generation_tasks")
    lesson = relationship("Lesson", backref="generation_tasks")
    user = relationship("User", backref="initiated_tasks")

    def __repr__(self):
        return f"<GenerationTask(task_id='{self.task_id}', type='{self.task_type}', status='{self.status}')>"

    @property
    def duration_seconds(self) -> float:
        """Calculate task duration in seconds"""
        if self.started_at and self.completed_at:
            return (self.completed_at - self.started_at).total_seconds()
        return 0.0
