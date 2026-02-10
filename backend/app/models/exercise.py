from sqlalchemy import Column, Integer, String, ForeignKey, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from app.database import Base
from app.models import ExerciseDifficulty


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    exercise_type = Column(String(50), nullable=False)  # 'multiple_choice', 'numeric_input', 'drag_drop'
    difficulty = Column(SQLEnum(ExerciseDifficulty), default=ExerciseDifficulty.easy, nullable=False)
    display_order = Column(Integer, nullable=False)
    question_key = Column(String(200), nullable=False)  # Translation key
    data_json = Column(JSON, nullable=False)  # Type-specific data (choices, answer, tolerance, etc.)
    hint_key = Column(String(200), nullable=True)
    explanation_key = Column(String(200), nullable=True)

    # Relationships
    lesson = relationship("Lesson", back_populates="exercises")
    submissions = relationship("ExerciseSubmission", back_populates="exercise")

    def __repr__(self):
        return f"<Exercise(id={self.id}, lesson_id={self.lesson_id}, type='{self.exercise_type}', difficulty='{self.difficulty.value}')>"
