from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from datetime import datetime
from app.database import get_db
from app.models.user import User
from app.models.progress import LessonProgress
from app.models.lesson import Lesson
from app.models.exercise import Exercise
from app.models.progress import ExerciseSubmission
from app.models.translation import Translation
from app.models import ProgressStatus
from app.middleware.auth import get_current_active_user
from app.utils.errors import handle_errors, NotFoundError, ValidationError, log_info, log_error
from app.schemas.progress import (
    ProgressOverviewResponse,
    LessonProgressUpdate,
    LessonProgressResponse,
    RecommendationResponse
)
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/overview", response_model=ProgressOverviewResponse)
@handle_errors
async def get_progress_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user's overall progress overview (requires auth)"""
    log_info(f"Fetching progress overview", f"user_id={current_user.id}")
    
    # Get total lessons count
    total_lessons = db.query(Lesson).count()

    # Get user's progress records
    completed_lessons = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.status == ProgressStatus.completed
    ).count()

    in_progress_lessons = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id,
        LessonProgress.status == ProgressStatus.in_progress
    ).count()

    # Calculate total time spent
    total_time_result = db.query(func.sum(LessonProgress.time_spent)).filter(
        LessonProgress.user_id == current_user.id
    ).scalar()
    total_time_spent = total_time_result if total_time_result else 0

    # Get recent lessons (last 5 accessed)
    recent_progress = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id
    ).order_by(LessonProgress.last_accessed_at.desc()).limit(5).all()

    recent_lessons = []
    for progress in recent_progress:
        lesson = db.query(Lesson).filter(Lesson.id == progress.lesson_id).first()
        if lesson and lesson.topic:
            topic = lesson.topic
            domain = topic.domain
            title = topic.title_key
            title_trans = db.query(Translation).filter_by(
                locale='en', namespace='common', key=f'topics.{topic.slug}.title'
            ).first()
            if title_trans:
                title = title_trans.value

            recent_lessons.append({
                "id": lesson.id,
                "slug": topic.slug,
                "domain_slug": domain.slug if domain else "unknown",
                "title_key": title,
                "status": progress.status.value,
                "time_spent": progress.time_spent,
                "last_accessed": progress.last_accessed_at.isoformat(),
                "exercises_completed": progress.exercises_completed
            })

    log_info(f"Progress overview fetched", f"user_id={current_user.id}, completed={completed_lessons}, in_progress={in_progress_lessons}")

    return ProgressOverviewResponse(
        total_lessons=total_lessons,
        completed_lessons=completed_lessons,
        in_progress_lessons=in_progress_lessons,
        total_time_spent=total_time_spent,
        recent_lessons=recent_lessons
    )


@router.post("/lessons/{lesson_id}", response_model=LessonProgressResponse)
@handle_errors
async def update_lesson_progress(
    lesson_id: int,
    progress: LessonProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update progress for a specific lesson (requires auth)"""
    log_info(f"Updating lesson progress", f"user_id={current_user.id}, lesson_id={lesson_id}")
    
    # Validate lesson_id
    if lesson_id <= 0:
        raise ValidationError("Invalid lesson ID")
    
    # Verify lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise NotFoundError("Lesson", lesson_id)

    try:
        # Find or create lesson progress record
        lesson_progress = db.query(LessonProgress).filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.lesson_id == lesson_id
        ).first()

        if not lesson_progress:
            # Create new progress record
            lesson_progress = LessonProgress(
                user_id=current_user.id,
                lesson_id=lesson_id,
                status=ProgressStatus.not_started,
                exercises_completed=0,
                time_spent=0
            )
            db.add(lesson_progress)
            log_info(f"Created progress record", f"user_id={current_user.id}, lesson_id={lesson_id}")

        # Update fields if provided
        if progress.status:
            try:
                new_status = ProgressStatus(progress.status)
                lesson_progress.status = new_status

                # Set timestamps based on status
                if new_status == ProgressStatus.in_progress and not lesson_progress.started_at:
                    lesson_progress.started_at = datetime.utcnow()
                elif new_status == ProgressStatus.completed and not lesson_progress.completed_at:
                    lesson_progress.completed_at = datetime.utcnow()
                    
                log_info(f"Updated progress status", f"user_id={current_user.id}, lesson_id={lesson_id}, status={new_status.value}")
            except ValueError:
                raise ValidationError(f"Invalid status: {progress.status}")

        if progress.time_spent is not None:
            if progress.time_spent < 0:
                raise ValidationError("Time spent cannot be negative")
            lesson_progress.time_spent += progress.time_spent

        # Update last accessed time
        lesson_progress.last_accessed_at = datetime.utcnow()

        # Count completed exercises for this lesson
        exercises_count = db.query(ExerciseSubmission).filter(
            ExerciseSubmission.user_id == current_user.id,
            ExerciseSubmission.exercise_id.in_(
                db.query(Exercise.id).filter(Exercise.lesson_id == lesson_id)
            ),
            ExerciseSubmission.is_correct == True
        ).count()
        lesson_progress.exercises_completed = exercises_count

        db.commit()
        db.refresh(lesson_progress)

        log_info(f"Progress updated", f"user_id={current_user.id}, lesson_id={lesson_id}, exercises={exercises_count}")
        return lesson_progress
        
    except SQLAlchemyError as e:
        db.rollback()
        log_error(e, f"Database error updating progress for user {current_user.id}, lesson {lesson_id}")
        raise HTTPException(
            status_code=500,
            detail="Failed to update progress. Please try again."
        )


@router.get("/recommendations", response_model=RecommendationResponse)
@handle_errors
async def get_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get personalized lesson recommendations (requires auth)"""
    log_info(f"Fetching recommendations", f"user_id={current_user.id}")
    
    # Get user's completed and in-progress lessons
    user_progress = db.query(LessonProgress).filter(
        LessonProgress.user_id == current_user.id
    ).all()

    completed_lesson_ids = [
        p.lesson_id for p in user_progress
        if p.status == ProgressStatus.completed
    ]
    in_progress_lesson_ids = [
        p.lesson_id for p in user_progress
        if p.status == ProgressStatus.in_progress
    ]

    next_lessons = []

    # Strategy 1: Continue in-progress lessons
    if in_progress_lesson_ids:
        in_progress_lessons = db.query(Lesson).filter(
            Lesson.id.in_(in_progress_lesson_ids)
        ).limit(2).all()

        for lesson in in_progress_lessons:
            if lesson.topic:
                topic = lesson.topic
                title_trans = db.query(Translation).filter_by(
                    locale='en', namespace='common', key=f'topics.{topic.slug}.title'
                ).first()
                next_lessons.append({
                    "id": lesson.id,
                    "slug": topic.slug,
                    "title_key": title_trans.value if title_trans else topic.title_key,
                    "reason": "Continue your learning"
                })

    # Strategy 2: Next lessons in sequence after completed ones
    if completed_lesson_ids and len(next_lessons) < 5:
        last_completed = db.query(LessonProgress).filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.status == ProgressStatus.completed
        ).order_by(LessonProgress.completed_at.desc()).first()

        if last_completed:
            last_lesson = db.query(Lesson).filter(
                Lesson.id == last_completed.lesson_id
            ).first()

            if last_lesson and last_lesson.topic:
                last_topic = last_lesson.topic
                # Find next topics in same domain after the completed one
                from app.models.topic import Topic as TopicModel
                next_topics = db.query(TopicModel).filter(
                    TopicModel.domain_id == last_topic.domain_id,
                    TopicModel.display_order > last_topic.display_order,
                ).order_by(TopicModel.display_order).limit(3).all()

                for ntopic in next_topics:
                    if len(next_lessons) >= 5:
                        break
                    if ntopic.lesson and ntopic.lesson.id not in (completed_lesson_ids + in_progress_lesson_ids):
                        title_trans = db.query(Translation).filter_by(
                            locale='en', namespace='common', key=f'topics.{ntopic.slug}.title'
                        ).first()
                        next_lessons.append({
                            "id": ntopic.lesson.id,
                            "slug": ntopic.slug,
                            "title_key": title_trans.value if title_trans else ntopic.title_key,
                            "reason": "Next in sequence"
                        })

    # Strategy 3: Popular lessons not yet started
    if len(next_lessons) < 5:
        try:
            # Find lessons with most completions (popular)
            popular_lessons_query = db.query(
                Lesson.id,
                func.count(LessonProgress.id).label('completion_count')
            ).join(
                LessonProgress,
                Lesson.id == LessonProgress.lesson_id
            ).filter(
                LessonProgress.status == ProgressStatus.completed,
                Lesson.id.notin_(completed_lesson_ids + in_progress_lesson_ids)
            ).group_by(Lesson.id).order_by(
                func.count(LessonProgress.id).desc()
            ).limit(5 - len(next_lessons)).all()

            popular_lesson_ids = [lesson_id for lesson_id, _ in popular_lessons_query]

            if popular_lesson_ids:
                popular_lessons = db.query(Lesson).filter(
                    Lesson.id.in_(popular_lesson_ids)
                ).all()

                for lesson in popular_lessons:
                    next_lessons.append({
                        "id": lesson.id,
                        "slug": lesson.slug,
                        "title_key": lesson.title_key,
                        "reason": "Popular with other learners"
                    })
        except Exception as e:
            logger.warning(f"Error fetching popular lessons: {str(e)}")

    # Strategy 4: If still not enough, suggest first lessons from each domain
    if len(next_lessons) < 5:
        existing_ids = completed_lesson_ids + in_progress_lesson_ids + [l["id"] for l in next_lessons]
        from app.models.topic import Topic as TopicModel
        first_topics = db.query(TopicModel).filter(
            TopicModel.display_order == 1,
        ).limit(10).all()

        for ftopic in first_topics:
            if len(next_lessons) >= 5:
                break
            if ftopic.lesson and ftopic.lesson.id not in existing_ids:
                title_trans = db.query(Translation).filter_by(
                    locale='en', namespace='common', key=f'topics.{ftopic.slug}.title'
                ).first()
                next_lessons.append({
                    "id": ftopic.lesson.id,
                    "slug": ftopic.slug,
                    "title_key": title_trans.value if title_trans else ftopic.title_key,
                    "reason": "Start a new topic"
                })

    log_info(f"Recommendations fetched", f"user_id={current_user.id}, count={len(next_lessons)}")
    return RecommendationResponse(next_lessons=next_lessons)
