from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.curriculum import CurriculumResponse, SubjectWithDomains, DomainWithTopics, TopicResponse
from app.models.domain import Domain
from app.models.topic import Topic
from app.models.translation import Translation
from app.models.subject import Subject
from typing import List

router = APIRouter()


def get_translation(db: Session, locale: str, namespace: str, key: str) -> str:
    """Helper function to get a translation"""
    translation = db.query(Translation).filter(
        Translation.locale == locale,
        Translation.namespace == namespace,
        Translation.key == key
    ).first()
    return translation.value if translation else key


@router.get("", response_model=CurriculumResponse)
async def get_curriculum(
    locale: str = Query(default="en", description="Language locale (en, ta)"),
    db: Session = Depends(get_db)
):
    """
    Get complete curriculum structure with all subjects, domains and topics.
    Returns localized titles and descriptions.

    IMPORTANT: Only returns PUBLISHED subjects and domains
    """
    from app.models.domain import ContentStatus
    from app.models.subject import SubjectStatus

    # Get all published subjects
    subjects = db.query(Subject).filter(
        Subject.status == SubjectStatus.PUBLISHED
    ).all()

    subjects_response = []
    for subject in subjects:
        # Get published domains for this subject
        domains = db.query(Domain).filter(
            Domain.subject_id == subject.id,
            Domain.status == ContentStatus.PUBLISHED
        ).order_by(Domain.display_order).all()

        domains_response = []
        for domain in domains:
            # Get localized domain info
            title = get_translation(db, locale, "common", f"domains.{domain.slug}.title") or domain.slug
            description = get_translation(db, locale, "common", f"domains.{domain.slug}.description") or ""

            # Get topics for this domain
            topics = db.query(Topic).filter(
                Topic.domain_id == domain.id
            ).order_by(Topic.display_order).all()

            topics_response = []
            for topic in topics:
                topic_title = get_translation(db, locale, "common", f"topics.{topic.slug}.title") or topic.slug
                topics_response.append(TopicResponse(
                    id=topic.id,
                    slug=topic.slug,
                    title=topic_title,
                    exercise_count=topic.exercise_count,
                    proof_count=topic.proof_count,
                    has_lesson=topic.lesson is not None
                ))

            domains_response.append(DomainWithTopics(
                id=domain.id,
                slug=domain.slug,
                title=title,
                description=description,
                level=domain.level,
                topics=topics_response
            ))

        subjects_response.append(SubjectWithDomains(
            id=subject.id,
            name=subject.name,
            grade_level=subject.grade_level,
            description=subject.description,
            domains=domains_response
        ))

    return CurriculumResponse(subjects=subjects_response)


@router.get("/subjects")
async def get_subjects(
    locale: str = Query(default="en"),
    db: Session = Depends(get_db)
):
    """Get all published subjects"""
    from app.models.subject import SubjectStatus

    subjects = db.query(Subject).filter(
        Subject.status == SubjectStatus.PUBLISHED
    ).all()

    return {
        "subjects": [
            {
                "id": subject.id,
                "name": subject.name,
                "grade_level": subject.grade_level,
                "description": subject.description,
                "total_domains": subject.total_domains,
                "total_topics": subject.total_topics
            }
            for subject in subjects
        ]
    }


@router.get("/subjects/{subject_id}/domains")
async def get_subject_domains(
    subject_id: int,
    locale: str = Query(default="en"),
    db: Session = Depends(get_db)
):
    """Get all domains for a specific subject"""
    from app.models.domain import ContentStatus
    from app.models.subject import SubjectStatus

    subject = db.query(Subject).filter(
        Subject.id == subject_id,
        Subject.status == SubjectStatus.PUBLISHED
    ).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    domains = db.query(Domain).filter(
        Domain.subject_id == subject.id,
        Domain.status == ContentStatus.PUBLISHED
    ).order_by(Domain.display_order).all()

    domains_response = []
    for domain in domains:
        title = get_translation(db, locale, "common", f"domains.{domain.slug}.title") or domain.slug
        description = get_translation(db, locale, "common", f"domains.{domain.slug}.description") or ""

        topics = db.query(Topic).filter(
            Topic.domain_id == domain.id
        ).order_by(Topic.display_order).all()

        topics_response = []
        for topic in topics:
            topic_title = get_translation(db, locale, "common", f"topics.{topic.slug}.title") or topic.slug
            topics_response.append({
                "id": topic.id,
                "slug": topic.slug,
                "title": topic_title,
                "exercise_count": topic.exercise_count,
                "proof_count": topic.proof_count,
                "has_lesson": topic.lesson is not None
            })

        domains_response.append({
            "id": domain.id,
            "slug": domain.slug,
            "title": title,
            "description": description,
            "level": domain.level,
            "topics": topics_response
        })

    return {"subject": subject.name, "domains": domains_response}


@router.get("/domains/{domain_slug}")
async def get_domain(
    domain_slug: str,
    locale: str = Query(default="en"),
    db: Session = Depends(get_db)
):
    """Get a specific domain by slug (only if published)"""
    from app.models.domain import ContentStatus

    domain = db.query(Domain).filter(
        Domain.slug == domain_slug,
        Domain.status == ContentStatus.PUBLISHED  # Only published domains
    ).first()

    if not domain:
        raise HTTPException(status_code=404, detail="Domain not found")

    # Get localized domain info
    title = get_translation(db, locale, "common", f"domains.{domain.slug}.title") or domain.slug
    description = get_translation(db, locale, "common", f"domains.{domain.slug}.description") or ""

    return {
        "id": domain.id,
        "slug": domain.slug,
        "title": title,
        "description": description,
        "level": domain.level
    }


@router.get("/domains/{domain_slug}/topics")
async def get_domain_topics(
    domain_slug: str,
    locale: str = Query(default="en"),
    db: Session = Depends(get_db)
):
    """Get all topics for a specific domain (only if published)"""
    from app.models.domain import ContentStatus

    domain = db.query(Domain).filter(
        Domain.slug == domain_slug,
        Domain.status == ContentStatus.PUBLISHED  # Only published domains
    ).first()

    if not domain:
        raise HTTPException(status_code=404, detail="Domain not found")

    topics = db.query(Topic).filter(
        Topic.domain_id == domain.id
    ).order_by(Topic.display_order).all()

    topics_response = []
    for topic in topics:
        topic_title = get_translation(db, locale, "common", f"topics.{topic.slug}.title") or topic.slug
        topics_response.append({
            "id": topic.id,
            "slug": topic.slug,
            "title": topic_title,
            "exercise_count": topic.exercise_count,
            "proof_count": topic.proof_count,
            "has_lesson": topic.lesson is not None
        })

    return {"topics": topics_response}
