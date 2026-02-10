from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.lesson import LessonResponse, LessonSectionResponse, LessonNavigationResponse
from app.models.topic import Topic
from app.models.lesson import Lesson
from app.models.lesson_content import LessonSection
from app.models.exercise import Exercise
from app.models.translation import Translation
from app.models.domain import Domain
from typing import Dict, Any, List

router = APIRouter()


def get_translation(db: Session, locale: str, namespace: str, key: str) -> str:
    """Helper function to get a translation"""
    translation = db.query(Translation).filter(
        Translation.locale == locale,
        Translation.namespace == namespace,
        Translation.key == key
    ).first()
    return translation.value if translation else key


def format_exercise(exercise: Exercise, locale: str, db: Session) -> Dict[str, Any]:
    """Format exercise with localized content"""
    namespace = exercise.lesson.topic.slug

    result = {
        "id": exercise.id,
        "type": exercise.exercise_type,
        "difficulty": exercise.difficulty.value,
        "display_order": exercise.display_order,
        "question": get_translation(db, locale, namespace, exercise.question_key),
        "hint": get_translation(db, locale, namespace, exercise.hint_key) if exercise.hint_key else None,
        "explanation": get_translation(db, locale, namespace, exercise.explanation_key) if exercise.explanation_key else None,
    }

    # Add type-specific data
    if exercise.data_json:
        result.update(exercise.data_json)

    return result


@router.get("/{topic_slug}", response_model=LessonResponse)
async def get_lesson(
    topic_slug: str,
    locale: str = Query(default="en", description="Language locale (en, ta)"),
    db: Session = Depends(get_db)
):
    """
    Get complete lesson content by topic slug.
    Includes sections, exercises, and navigation.
    """
    # Find topic by slug
    topic = db.query(Topic).filter(Topic.slug == topic_slug).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    # Find lesson for this topic
    lesson = db.query(Lesson).filter(Lesson.topic_id == topic.id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found for this topic")

    # Get localized title
    title = get_translation(db, locale, "common", f"topics.{topic.slug}.title") or topic.slug

    # Get domain info
    domain = db.query(Domain).filter(Domain.id == topic.domain_id).first()
    domain_slug = domain.slug if domain else ""

    # Get sections with content
    sections = []
    for section in lesson.sections:
        sections.append(LessonSectionResponse(
            id=section.id,
            section_type=section.section_type,
            display_order=section.display_order,
            content=section.content_json or {}
        ))

    # Get exercises with localized content
    exercises = []
    for exercise in lesson.exercises:
        exercises.append(format_exercise(exercise, locale, db))

    # Get navigation (previous/next topics in same domain)
    all_topics = db.query(Topic).filter(
        Topic.domain_id == topic.domain_id
    ).order_by(Topic.display_order).all()

    navigation = LessonNavigationResponse()
    for i, t in enumerate(all_topics):
        if t.id == topic.id:
            if i > 0:
                prev_topic = all_topics[i - 1]
                navigation.previous = {
                    "slug": prev_topic.slug,
                    "title": get_translation(db, locale, "common", f"topics.{prev_topic.slug}.title") or prev_topic.slug
                }
            if i < len(all_topics) - 1:
                next_topic = all_topics[i + 1]
                navigation.next = {
                    "slug": next_topic.slug,
                    "title": get_translation(db, locale, "common", f"topics.{next_topic.slug}.title") or next_topic.slug
                }
            break

    return LessonResponse(
        id=lesson.id,
        slug=topic.slug,
        title=title,
        domain=domain_slug,
        difficulty=lesson.difficulty.value,
        estimated_time=lesson.estimated_time,
        sections=sections,
        exercises=exercises,
        navigation=navigation
    )


@router.get("/{topic_slug}/exercises")
async def get_lesson_exercises(
    topic_slug: str,
    locale: str = Query(default="en"),
    db: Session = Depends(get_db)
):
    """Get all exercises for a specific lesson"""
    topic = db.query(Topic).filter(Topic.slug == topic_slug).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    lesson = db.query(Lesson).filter(Lesson.topic_id == topic.id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    exercises = []
    for exercise in lesson.exercises:
        exercises.append(format_exercise(exercise, locale, db))

    return {"exercises": exercises}


@router.get("/{topic_slug}/progress")
async def get_lesson_progress(
    topic_slug: str,
    db: Session = Depends(get_db)
):
    """Get user's progress for a specific lesson (requires auth)"""
    # TODO: Implement with auth in next phase
    # For now, return placeholder
    return {
        "message": "Progress tracking requires authentication",
        "status": "not_implemented"
    }
