from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.topic import Topic
from app.models.domain import Domain, ContentStatus
from app.models.subject import Subject, SubjectStatus
from app.models.lesson import Lesson
from app.models.translation import Translation
from typing import Optional, List, Dict, Any
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


def _search_translations(db: Session, query_lower: str, locale: str, limit: int = 20) -> List[Dict[str, Any]]:
    """Search translation values and map back to content"""
    results = []
    seen_slugs = set()

    # Search translations that match the query
    matching = db.query(Translation).filter(
        Translation.locale == locale,
        Translation.value.ilike(f"%{query_lower}%")
    ).limit(50).all()

    for trans in matching:
        key = trans.key

        # Match topic titles → lessons
        if key.startswith("topics.") and key.endswith(".title"):
            slug = key.replace("topics.", "").replace(".title", "")
            if slug in seen_slugs:
                continue
            seen_slugs.add(slug)

            topic = db.query(Topic).filter(Topic.slug == slug).first()
            if not topic:
                continue
            domain = db.query(Domain).filter(Domain.id == topic.domain_id).first()
            if not domain or domain.status != ContentStatus.PUBLISHED:
                continue

            results.append({
                "type": "lesson",
                "id": topic.id,
                "title": trans.value,
                "subtitle": f"in {_get_trans(db, locale, 'common', f'domains.{domain.slug}.title') or domain.slug}",
                "url": f"/{locale}/learn/{domain.slug}/{topic.slug}",
            })

        # Match domain titles
        elif key.startswith("domains.") and key.endswith(".title"):
            slug = key.replace("domains.", "").replace(".title", "")
            if slug in seen_slugs:
                continue
            seen_slugs.add(slug)

            domain = db.query(Domain).filter(
                Domain.slug == slug, Domain.status == ContentStatus.PUBLISHED
            ).first()
            if not domain:
                continue

            results.append({
                "type": "domain",
                "id": domain.id,
                "title": trans.value,
                "subtitle": _get_trans(db, locale, 'common', f'domains.{slug}.description') or "",
                "url": f"/{locale}/curriculum",
            })

        # Match subject titles
        elif key.startswith("subjects.") and key.endswith(".name"):
            subj = db.query(Subject).filter(
                Subject.name_key == key, Subject.status == SubjectStatus.PUBLISHED
            ).first()
            if not subj:
                continue

            results.append({
                "type": "subject",
                "id": subj.id,
                "title": trans.value,
                "subtitle": _get_trans(db, locale, 'common', subj.description_key) or subj.description or "",
                "url": f"/{locale}/subjects/{subj.id}",
            })

    return results[:limit]


def _get_trans(db: Session, locale: str, ns: str, key: str) -> Optional[str]:
    row = db.query(Translation).filter_by(locale=locale, namespace=ns, key=key).first()
    return row.value if row else None


@router.get("")
async def search(
    q: str = Query(..., min_length=1, description="Search query"),
    locale: str = Query(default="en"),
    limit: int = Query(default=20, le=50),
    db: Session = Depends(get_db)
):
    """
    Search across subjects, domains, topics, and lessons.
    Searches translation values so actual content text is matched.
    """
    results = _search_translations(db, q.lower(), locale, limit)

    # Also search subject legacy name/description fields as fallback
    if len(results) < limit:
        query_pattern = f"%{q.lower()}%"
        subjects = db.query(Subject).filter(
            Subject.status == SubjectStatus.PUBLISHED,
            or_(
                Subject.name.ilike(query_pattern),
                Subject.description.ilike(query_pattern),
            )
        ).limit(5).all()

        existing_ids = {(r["type"], r["id"]) for r in results}
        for s in subjects:
            if ("subject", s.id) not in existing_ids:
                results.append({
                    "type": "subject",
                    "id": s.id,
                    "title": s.name or s.name_key,
                    "subtitle": s.description or "",
                    "url": f"/{locale}/subjects/{s.id}",
                })

    return {
        "query": q,
        "total": len(results),
        "results": results[:limit],
    }
