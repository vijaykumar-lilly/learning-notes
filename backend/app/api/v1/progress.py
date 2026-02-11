from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.database import get_db
from app.models.user import User
from app.models.progress import LessonProgress
from app.models.lesson import Lesson
from app.models.exercise import Exercise
from app.models.progress import ExerciseSubmission
from app.models import ProgressStatus
from app.middleware.auth import get_current_active_user
from app.schemas.progress import (
    ProgressOverviewResponse,
    LessonProgressUpdate,
    LessonProgressResponse,
    RecommendationResponse
)

router = APIRouter()


@router.get("/overview", response_model=ProgressOverviewResponse)
async def get_progress_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get user's overall progress overview (requires auth)"""
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
        if lesson:
            recent_lessons.append({
                "id": lesson.id,
                "slug": lesson.slug,
                "title_key": lesson.title_key,
                "status": progress.status.value,
                "time_spent": progress.time_spent,
                "last_accessed": progress.last_accessed_at.isoformat(),
                "exercises_completed": progress.exercises_completed
            })

    return ProgressOverviewResponse(
        total_lessons=total_lessons,
        completed_lessons=completed_lessons,
        in_progress_lessons=in_progress_lessons,
        total_time_spent=total_time_spent,
        recent_lessons=recent_lessons
    )


@router.post("/lessons/{lesson_id}", response_model=LessonProgressResponse)
async def update_lesson_progress(
    lesson_id: int,
    progress: LessonProgressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update progress for a specific lesson (requires auth)"""
    # Verify lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

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
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {progress.status}")

    if progress.time_spent is not None:
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

    return lesson_progress


@router.get("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get personalized lesson recommendations (requires auth)"""
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
        ).order_by(Lesson.display_order).limit(2).all()

        for lesson in in_progress_lessons:
            next_lessons.append({
                "id": lesson.id,
                "slug": lesson.slug,
                "title_key": lesson.title_key,
                "reason": "Continue your learning"
            })

    # Strategy 2: Next lessons in sequence after completed ones
    if completed_lesson_ids and len(next_lessons) < 5:
        # Find the last completed lesson
        last_completed = db.query(LessonProgress).filter(
            LessonProgress.user_id == current_user.id,
            LessonProgress.status == ProgressStatus.completed
        ).order_by(LessonProgress.completed_at.desc()).first()

        if last_completed:
            last_lesson = db.query(Lesson).filter(
                Lesson.id == last_completed.lesson_id
            ).first()

            if last_lesson:
                # Find next lessons in same topic
                next_in_topic = db.query(Lesson).filter(
                    Lesson.topic_id == last_lesson.topic_id,
                    Lesson.display_order > last_lesson.display_order,
                    Lesson.id.notin_(completed_lesson_ids + in_progress_lesson_ids)
                ).order_by(Lesson.display_order).limit(3).all()

                for lesson in next_in_topic:
                    if len(next_lessons) >= 5:
                        break
                    next_lessons.append({
                        "id": lesson.id,
                        "slug": lesson.slug,
                        "title_key": lesson.title_key,
                        "reason": "Next in sequence"
                    })

    # Strategy 3: Popular lessons not yet started
    if len(next_lessons) < 5:
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

    # Strategy 4: If still not enough, suggest first lessons from each topic
    if len(next_lessons) < 5:
        first_lessons = db.query(Lesson).filter(
            Lesson.display_order == 1,
            Lesson.id.notin_(completed_lesson_ids + in_progress_lesson_ids + [l["id"] for l in next_lessons])
        ).limit(5 - len(next_lessons)).all()

        for lesson in first_lessons:
            next_lessons.append({
                "id": lesson.id,
                "slug": lesson.slug,
                "title_key": lesson.title_key,
                "reason": "Start a new topic"
            })

    return RecommendationResponse(next_lessons=next_lessons)
