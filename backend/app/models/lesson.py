from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models import DifficultyLevel


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), unique=True, nullable=False)
    estimated_time = Column(Integer, nullable=True)  # minutes
    difficulty = Column(SQLEnum(DifficultyLevel), default=DifficultyLevel.beginner, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationships
    topic = relationship("Topic", back_populates="lesson")
    sections = relationship("LessonSection", back_populates="lesson", order_by="LessonSection.display_order", cascade="all, delete-orphan")
    exercises = relationship("Exercise", back_populates="lesson", cascade="all, delete-orphan")
    progress_records = relationship("LessonProgress", back_populates="lesson")

    def __repr__(self):
        return f"<Lesson(id={self.id}, topic_id={self.topic_id}, difficulty='{self.difficulty.value}')>"
