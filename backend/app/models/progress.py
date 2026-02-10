from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum as SQLEnum, JSON, Boolean, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models import ProgressStatus


class LessonProgress(Base):
    __tablename__ = "lesson_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    status = Column(SQLEnum(ProgressStatus), default=ProgressStatus.not_started, nullable=False)
    exercises_completed = Column(Integer, default=0, nullable=False)
    time_spent = Column(Integer, default=0, nullable=False)  # seconds
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    last_accessed_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress_records")

    __table_args__ = (
        UniqueConstraint('user_id', 'lesson_id', name='uq_user_lesson_progress'),
    )

    def __repr__(self):
        return f"<LessonProgress(id={self.id}, user_id={self.user_id}, lesson_id={self.lesson_id}, status='{self.status.value}')>"


class ExerciseSubmission(Base):
    __tablename__ = "exercise_submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), nullable=False)
    user_answer = Column(JSON, nullable=False)  # Flexible for different answer types
    is_correct = Column(Boolean, nullable=False)
    attempts = Column(Integer, default=1, nullable=False)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="submissions")
    exercise = relationship("Exercise", back_populates="submissions")

    def __repr__(self):
        return f"<ExerciseSubmission(id={self.id}, user_id={self.user_id}, exercise_id={self.exercise_id}, is_correct={self.is_correct})>"
