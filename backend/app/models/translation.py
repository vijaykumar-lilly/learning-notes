from sqlalchemy import Column, Integer, String, Text, Index, UniqueConstraint
from app.database import Base


class Translation(Base):
    __tablename__ = "translations"

    id = Column(Integer, primary_key=True, index=True)
    locale = Column(String(5), index=True, nullable=False)  # 'en', 'ta'
    namespace = Column(String(50), index=True, nullable=False)  # Topic slug or 'common'
    key = Column(String(200), index=True, nullable=False)  # Dot-notation key path
    value = Column(Text, nullable=False)

    __table_args__ = (
        Index('idx_translation_lookup', 'locale', 'namespace', 'key'),
        UniqueConstraint('locale', 'namespace', 'key', name='uq_translation'),
    )

    def __repr__(self):
        return f"<Translation(id={self.id}, locale='{self.locale}', namespace='{self.namespace}', key='{self.key}')>"
