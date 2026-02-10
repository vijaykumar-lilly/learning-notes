from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base


class LessonSection(Base):
    __tablename__ = "lesson_sections"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    section_type = Column(String(50), nullable=False)  # 'definition', 'example', 'visual', 'note', etc.
    display_order = Column(Integer, nullable=False)
    content_json = Column(JSON, nullable=False)  # Flexible JSON for component-specific data

    # Relationships
    lesson = relationship("Lesson", back_populates="sections")

    def __repr__(self):
        return f"<LessonSection(id={self.id}, lesson_id={self.lesson_id}, type='{self.section_type}')>"
