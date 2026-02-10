from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.exercise import ExerciseSubmission, ExerciseSubmissionResponse
from app.models.exercise import Exercise
from app.models.translation import Translation
from typing import Any

router = APIRouter()


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
async def submit_exercise(
    exercise_id: int,
    submission: ExerciseSubmission,
    locale: str = "en",
    db: Session = Depends(get_db)
):
    """
    Submit an answer to an exercise.
    Validates the answer and returns feedback.
    """
    # Find exercise
    exercise = db.query(Exercise).filter(Exercise.id == exercise_id).first()
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    # Validate answer
    is_correct = validate_answer(exercise, submission.answer)

    # Get explanation if available
    explanation = None
    if exercise.explanation_key:
        namespace = exercise.lesson.topic.slug
        explanation = get_translation(db, locale, namespace, exercise.explanation_key)

    # Find next exercise in the lesson
    next_exercise = db.query(Exercise).filter(
        Exercise.lesson_id == exercise.lesson_id,
        Exercise.display_order > exercise.display_order
    ).order_by(Exercise.display_order).first()

    next_exercise_id = next_exercise.id if next_exercise else None

    return ExerciseSubmissionResponse(
        is_correct=is_correct,
        explanation=explanation,
        next_exercise=next_exercise_id
    )
