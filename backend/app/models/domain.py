from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
from enum import Enum
from app.database import Base


class ContentStatus(str, Enum):
    """Content lifecycle status"""
    DRAFT = "draft"                    # AI-generated, not reviewed
    PENDING_REVIEW = "pending_review"  # Submitted for admin review
    APPROVED = "approved"              # Admin approved
    PUBLISHED = "published"            # Visible to students
    ARCHIVED = "archived"              # Removed from curriculum


class Domain(Base):
    __tablename__ = "domains"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    title_key = Column(String(100), nullable=False)
    description_key = Column(String(100), nullable=False)
    level = Column(String(50), nullable=False)
    display_order = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Link to subject
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=True)

    # Status tracking
    status = Column(
        SQLEnum(ContentStatus),
        default=ContentStatus.DRAFT,
        nullable=False,
        index=True
    )

    # User tracking
    created_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    reviewed_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)

    # Relationships
    subject = relationship("Subject", back_populates="domains")
    topics = relationship("Topic", back_populates="domain", cascade="all, delete-orphan")
    creator = relationship("User", foreign_keys=[created_by], backref="created_domains")
    reviewer = relationship("User", foreign_keys=[reviewed_by], backref="reviewed_domains")

    def __repr__(self):
        return f"<Domain(id={self.id}, slug='{self.slug}', level='{self.level}', status='{self.status}')>"
