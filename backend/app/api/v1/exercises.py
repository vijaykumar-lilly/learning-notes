from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from app.database import get_db
from app.schemas.exercise import ExerciseSubmission, ExerciseSubmissionResponse
from app.models.exercise import Exercise
from app.models.progress import ExerciseSubmission as ExerciseSubmissionModel
from app.models.translation import Translation
from app.models.user import User
from app.utils.errors import handle_errors, NotFoundError, ValidationError, log_info, log_error
from typing import Any, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


# Optional auth dependency - returns None if no token provided
async def get_optional_current_user(request: Request, db: Session = Depends(get_db)) -> Optional[User]:
    """Get current user if authenticated, None otherwise"""
    try:
        from app.middleware.auth import get_current_user
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return None

        token = auth_header.split(" ")[1]
        from app.utils.security import decode_access_token
        payload = decode_access_token(token)
        if payload is None:
            return None

        username = payload.get("sub")
        if username is None:
            return None

        user = db.query(User).filter(User.username == username).first()
        return user if user and user.is_active else None
    except Exception as e:
        logger.warning(f"Error getting optional user: {str(e)}")
        return None


def validate_answer(exercise: Exercise, user_answer: Any) -> bool:
    """
    Validate user answer based on exercise type.
    Returns True if correct, False otherwise.
    """
    exercise_type = exercise.exercise_type
    data = exercise.data_json

    if exercise_type == "multiple_choice":
        # For multiple choice, check if selected choice ID matches correct answer
        correct_answer = data.get("correctAnswer")
        return user_answer == correct_answer

    elif exercise_type == "numeric_input":
        # For numeric input, check within tolerance
        correct_answer = data.get("correctAnswer")
        tolerance = data.get("tolerance", 0.001)

        try:
            user_value = float(user_answer)
            correct_value = float(correct_answer)
            return abs(user_value - correct_value) <= tolerance
        except (ValueError, TypeError):
            return False

    elif exercise_type == "drag_drop":
        # For drag-drop, check if order matches
        correct_order = data.get("correctOrder", [])
        return user_answer == correct_order

    elif exercise_type == "text_input":
        # For text input, case-insensitive exact match
        correct_answer = data.get("correctAnswer", "").lower().strip()
        user_text = str(user_answer).lower().strip()
        return user_text == correct_answer

    # Default: false for unknown types
    logger.warning(f"Unknown exercise type: {exercise_type}")
    return False


def get_translation(db: Session, locale: str, namespace: str, key: str) -> str:
    """Helper function to get a translation"""
    translation = db.query(Translation).filter(
        Translation.locale == locale,
        Translation.namespace == namespace,
        Translation.key == key
    ).first()
    return translation.value if translation else key


@router.post("/{exercise_id}/submit", response_model=ExerciseSubmissionResponse)
@handle_errors
async def submit_exercise(
    exercise_id: int,
    submission: ExerciseSubmission,
    locale: str = "en",
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_current_user)
):
    """
    Submit an answer to an exercise.
    Validates the answer and returns feedback.
    Records submission if user is authenticated.
    """
    log_info(f"Exercise submission", f"exercise_id={exercise_id}, user={current_user.username if current_user else 'anonymous'}")

    # Validate exercise_id
    if exercise_id <= 0:
        raise ValidationError("Invalid exercise ID")

    # Validate answer is not None
    if submission.answer is None:
        raise ValidationError("Answer cannot be empty")

    # Find exercise
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if not exercise:
        raise NotFoundError("Exercise", exercise_id)

    # Validate answer type based on exercise type
    try:
        is_correct = validate_answer(exercise, submission.answer)
    except Exception as e:
        log_error(e, f"Error validating answer for exercise {exercise_id}")
        raise ValidationError("Invalid answer format for this exercise type")

    # Record submission if user is authenticated
    if current_user:
        try:
            # Check if user has submitted this exercise before
            existing_submission = db.query(ExerciseSubmissionModel).filter(
                ExerciseSubmissionModel.user_id == current_user.id,
                ExerciseSubmissionModel.exercise_id == exercise_id
            ).first()

            if existing_submission:
                # Update existing submission
                existing_submission.user_answer = submission.answer
                existing_submission.is_correct = is_correct
                existing_submission.attempts += 1
                existing_submission.submitted_at = datetime.utcnow()
                log_info(f"Updated submission", f"exercise={exercise_id}, attempt={existing_submission.attempts}")
            else:
                # Create new submission record
                new_submission = ExerciseSubmissionModel(
                    user_id=current_user.id,
                    exercise_id=exercise_id,
                    user_answer=submission.answer,
                    is_correct=is_correct,
                    attempts=1
                )
                db.add(new_submission)
                log_info(f"Created submission", f"exercise={exercise_id}, user={current_user.username}")

            db.commit()
        except SQLAlchemyError as e:
            db.rollback()
            log_error(e, f"Database error saving submission for exercise {exercise_id}")
            # Don't fail the request, just log the error
            logger.warning("Submission not saved due to database error, but validation completed")

    # Get explanation if available
    explanation = None
    if exercise.explanation_key:
        try:
            namespace = exercise.lesson.topic.slug
            explanation = get_translation(db, locale, namespace, exercise.explanation_key)
        except Exception as e:
            logger.warning(f"Error fetching explanation: {str(e)}")

    # Find next exercise in the lesson
    next_exercise_id = None
    try:
        next_exercise = db.query(Exercise).filter(
            Exercise.lesson_id == exercise.lesson_id,
            Exercise.display_order > exercise.display_order
        ).order_by(Exercise.display_order).first()
        next_exercise_id = next_exercise.id if next_exercise else None
    except Exception as e:
        logger.warning(f"Error fetching next exercise: {str(e)}")

    log_info(f"Exercise validated", f"exercise_id={exercise_id}, correct={is_correct}")

    return ExerciseSubmissionResponse(
        is_correct=is_correct,
        explanation=explanation,
        next_exercise=next_exercise_id
    )
