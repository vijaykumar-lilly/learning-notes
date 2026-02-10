from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum
from app.database import Base


class SubjectStatus(str, Enum):
    """Subject lifecycle status"""
    QUEUED = "queued"           # Curriculum generation queued
    GENERATING = "generating"   # AI is generating curriculum
    DRAFT = "draft"            # Generated, awaiting review
    PENDING_REVIEW = "pending_review"  # Submitted for admin review
    APPROVED = "approved"      # Admin approved, lessons being generated
    PUBLISHED = "published"    # All lessons complete, visible to students
    REJECTED = "rejected"      # Admin rejected, needs regeneration


class Subject(Base):
    """
    Top-level subject that contains multiple domains.

    Examples:
    - "Linear Algebra" (no grade - grade-agnostic)
    - "Pre-Algebra - Grade 7" (grade-specific)
    - "Advanced Calculus" (no grade - typically college level)
    - "Geometry - High School" (grade-specific)
    """
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)  # "Mathematics", "Physics", "Linear Algebra"
    grade_level = Column(String(100), nullable=True)  # OPTIONAL: "Grade 10", "High School", "College", etc.
    description = Column(Text, nullable=True)

    # Curriculum standards (optional)
    standards = Column(Text, nullable=True)  # e.g., "Common Core", "NGSS"

    # Status tracking
    status = Column(
        SQLEnum(SubjectStatus),
        default=SubjectStatus.QUEUED,
        nullable=False,
        index=True
    )

    # User tracking
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewed_by = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    reviewed_at = Column(DateTime, nullable=True)
    published_at = Column(DateTime, nullable=True)

    # Generation metadata
    generation_task_id = Column(String(100), nullable=True)  # UUID of curriculum generation task

    # Admin notes/feedback
    admin_notes = Column(Text, nullable=True)

    # Statistics (populated after generation)
    total_domains = Column(Integer, default=0)
    total_topics = Column(Integer, default=0)
    total_lessons = Column(Integer, default=0)

    # Relationships
    domains = relationship("Domain", back_populates="subject", cascade="all, delete-orphan")
    creator = relationship("User", foreign_keys=[created_by], backref="created_subjects")
    reviewer = relationship("User", foreign_keys=[reviewed_by], backref="reviewed_subjects")

    def __repr__(self):
        return f"<Subject(id={self.id}, name='{self.name}', status='{self.status}')>"
