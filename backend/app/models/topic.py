from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(50), unique=True, index=True, nullable=False)
    title_key = Column(String(100), nullable=False)
    domain_id = Column(Integer, ForeignKey("domains.id"), nullable=False)
    exercise_count = Column(Integer, default=0, nullable=False)
    proof_count = Column(Integer, nullable=True)
    display_order = Column(Integer, nullable=False)

    # Relationships
    domain = relationship("Domain", back_populates="topics")
    lesson = relationship("Lesson", back_populates="topic", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Topic(id={self.id}, slug='{self.slug}', domain_id={self.domain_id})>"
