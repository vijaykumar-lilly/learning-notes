from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime, timedelta
import uuid

from app.database import get_db
from app.middleware.auth import get_current_admin_user, get_current_user
from app.models.user import User
from app.models import Subject, SubjectStatus, GenerationTask, TaskType, TaskStatus, Domain, Topic, Lesson, LessonSection, DifficultyLevel, ProgressStatus
from app.models.domain import ContentStatus
from app.models.exercise import Exercise
from app.models.progress import LessonProgress, ExerciseSubmission
from app.models.translation import Translation
from app.agents.curriculum_agent import CurriculumAgent

router = APIRouter()


# ============================================================================
# Pydantic Schemas
# ============================================================================

class SubjectGenerateRequest(BaseModel):
    subject: str
    grade_level: Optional[str] = None
    standards: Optional[str] = None


class SubjectResponse(BaseModel):
    id: int
    name: str
    grade_level: Optional[str]
    description: Optional[str]
    standards: Optional[str]
    status: str
    total_domains: int
    total_topics: int
    total_lessons: int
    created_at: datetime
    reviewed_at: Optional[datetime]
    published_at: Optional[datetime]

    class Config:
        from_attributes = True


class TaskStatusResponse(BaseModel):
    task_id: str
    status: str
    progress_percent: float
    progress_message: Optional[str]
    result: Optional[dict]
    error: Optional[str]
    created_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    tokens_used: Optional[int]
    estimated_cost: Optional[float]

    class Config:
        from_attributes = True


class DomainSummary(BaseModel):
    id: int
    slug: str
    title: str
    description: str
    level: str
    status: str
    topic_count: int


class SubjectDetailResponse(SubjectResponse):
    domains: List[DomainSummary]


# ============================================================================
# Subject Management Endpoints
# ============================================================================

@router.post("/subjects/generate")
async def generate_curriculum(
    request: SubjectGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Generate a new curriculum using AI

    Admin initiates curriculum generation. The agent runs synchronously
    and returns the generated curriculum immediately.
    """

    try:
        # Create agent
        agent = CurriculumAgent()

        # Generate curriculum
        print(f"🚀 Starting curriculum generation for: {request.subject}")

        result = await agent.generate_curriculum(
            subject=request.subject,
            grade_level=request.grade_level,
            standards=request.standards
        )

        # Generate translation key from subject name
        # "Mathematics" -> "subjects.mathematics.name"
        subject_key = request.subject.lower().replace(' ', '-').replace("'", '')

        # Save to database
        subject = Subject(
            name_key=f"subjects.{subject_key}.name",
            description_key=f"subjects.{subject_key}.description" if request.subject else None,
            name=request.subject,  # Keep for backwards compatibility
            grade_level=request.grade_level,
            standards=request.standards,
            status=SubjectStatus.DRAFT,
            created_by=current_user.id,
            created_at=datetime.utcnow(),
            total_domains=result['stats']['total_domains'],
            total_topics=result['stats']['total_topics'],
            total_lessons=0  # Will be set when lessons are generated
        )
        db.add(subject)
        db.flush()

        # Create translations for the subject (initially in English)
        # This allows the same subject to be shown in different languages
        subject_name_translation = Translation(
            locale='en',
            namespace='common',
            key=f"subjects.{subject_key}.name",
            value=request.subject
        )
        db.add(subject_name_translation)

        if request.subject:
            subject_desc_translation = Translation(
                locale='en',
                namespace='common',
                key=f"subjects.{subject_key}.description",
                value=f"Learn {request.subject}"
            )
            db.add(subject_desc_translation)

        # Save domains and topics
        for domain_order, domain_data in enumerate(result['curriculum'], 1):
            domain = Domain(
                slug=domain_data['slug'],
                title_key=domain_data['name'],
                description_key=domain_data['description'],
                level=domain_data['level'],
                display_order=domain_order,
                subject_id=subject.id,
                status=ContentStatus.DRAFT,
                created_by=current_user.id,
                created_at=datetime.utcnow()
            )
            db.add(domain)
            db.flush()

            # Create topics
            for topic_order, topic_data in enumerate(domain_data['topics'], 1):
                topic = Topic(
                    slug=topic_data['slug'],
                    title_key=topic_data['name'],
                    domain_id=domain.id,
                    exercise_count=0,
                    display_order=topic_order
                )
                db.add(topic)
                db.flush()  # Get topic.id

                # Create lesson for this topic
                lesson = Lesson(
                    topic_id=topic.id,
                    estimated_time=topic_data.get('estimated_time_minutes', 20),
                    difficulty=DifficultyLevel.beginner  # Default, can be adjusted
                )
                db.add(lesson)
                db.flush()  # Get lesson.id

                # Generate lesson content sections
                try:
                    sections_data = await agent.generate_lesson_content(
                        topic_name=topic_data['name'],
                        topic_description=domain_data['description'],
                        learning_objectives=topic_data.get('learning_objectives', []),
                        subject=request.subject,
                        num_sections=5
                    )

                    # Create LessonSection records
                    for section_data in sections_data:
                        section = LessonSection(
                            lesson_id=lesson.id,
                            section_type=section_data['section_type'],
                            display_order=section_data['display_order'],
                            content_json=section_data['content']  # {en: "...", ta: "..."}
                        )
                        db.add(section)

                    print(f"   ✅ Generated {len(sections_data)} sections for '{topic_data['name']}'")
                except Exception as e:
                    print(f"   ⚠️ Failed to generate content for '{topic_data['name']}': {str(e)}")
                    # Continue with other topics even if one fails

        db.commit()

        print(f"✅ Curriculum saved to database. Subject ID: {subject.id}")

        return {
            "message": "Curriculum generated successfully",
            "subject_id": subject.id,
            "subject": subject.name,
            "status": subject.status,
            "stats": {
                "domains": result['stats']['total_domains'],
                "topics": result['stats']['total_topics']
            },
            "tokens_used": result.get('tokens_used'),
            "curriculum": result['curriculum']  # Return full curriculum for review
        }

    except Exception as e:
        db.rollback()
        print(f"❌ Error generating curriculum: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate curriculum: {str(e)}"
        )


@router.get("/subjects", response_model=List[SubjectResponse])
async def list_subjects(
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    List all subjects (admin only)

    Optionally filter by status: draft, pending_review, approved, published
    """
    query = db.query(Subject)

    if status:
        query = query.filter(Subject.status == status)

    subjects = query.order_by(Subject.created_at.desc()).all()

    return subjects


@router.get("/subjects/{subject_id}", response_model=SubjectDetailResponse)
async def get_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Get subject details with domains and topics
    """
    subject = db.query(Subject).filter(Subject.id == subject_id).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    # Build response with domains
    domains_summary = []
    for domain in subject.domains:
        domains_summary.append(DomainSummary(
            id=domain.id,
            slug=domain.slug,
            title=domain.title_key,
            description=domain.description_key,
            level=domain.level,
            status=domain.status.value,
            topic_count=len(domain.topics)
        ))

    response = SubjectDetailResponse(
        id=subject.id,
        name=subject.name,
        grade_level=subject.grade_level,
        description=subject.description,
        standards=subject.standards,
        status=subject.status.value,
        total_domains=subject.total_domains,
        total_topics=subject.total_topics,
        total_lessons=subject.total_lessons,
        created_at=subject.created_at,
        reviewed_at=subject.reviewed_at,
        published_at=subject.published_at,
        domains=domains_summary
    )

    return response


@router.post("/subjects/{subject_id}/approve")
async def approve_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Admin approves AI-generated curriculum

    This will trigger lesson generation for all topics (in future implementation)
    """
    subject = db.query(Subject).filter(Subject.id == subject_id).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    if subject.status != SubjectStatus.DRAFT:
        raise HTTPException(
            status_code=400,
            detail=f"Can only approve draft subjects. Current status: {subject.status}"
        )

    # Update subject status
    subject.status = SubjectStatus.APPROVED
    subject.reviewed_by = current_user.id
    subject.reviewed_at = datetime.utcnow()

    # Update all domains to approved
    for domain in subject.domains:
        domain.status = ContentStatus.APPROVED
        domain.reviewed_by = current_user.id
        domain.reviewed_at = datetime.utcnow()

    db.commit()

    return {
        "message": "Subject approved successfully",
        "subject_id": subject.id,
        "status": subject.status,
        "note": "Lesson generation will be implemented in next phase"
    }


@router.put("/subjects/{subject_id}")
async def update_subject(
    subject_id: int,
    name: Optional[str] = None,
    grade_level: Optional[str] = None,
    description: Optional[str] = None,
    standards: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Update subject metadata
    """
    subject = db.query(Subject).filter(Subject.id == subject_id).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    # Update fields
    if name is not None:
        subject.name = name
    if grade_level is not None:
        subject.grade_level = grade_level
    if description is not None:
        subject.description = description
    if standards is not None:
        subject.standards = standards

    db.commit()

    return {"message": "Subject updated", "subject_id": subject.id}


@router.delete("/subjects/{subject_id}")
async def delete_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Delete a subject and all its domains/topics
    """
    subject = db.query(Subject).filter(Subject.id == subject_id).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    # Can only delete draft subjects
    if subject.status != SubjectStatus.DRAFT:
        raise HTTPException(
            status_code=400,
            detail=f"Can only delete draft subjects. Current status: {subject.status}"
        )

    db.delete(subject)
    db.commit()

    return {"message": "Subject deleted", "subject_id": subject_id}


@router.post("/subjects/{subject_id}/publish")
async def publish_subject(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """
    Publish subject (make visible to students)
    """
    subject = db.query(Subject).filter(Subject.id == subject_id).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    if subject.status != SubjectStatus.APPROVED:
        raise HTTPException(
            status_code=400,
            detail=f"Can only publish approved subjects. Current status: {subject.status}"
        )

    subject.status = SubjectStatus.PUBLISHED
    subject.published_at = datetime.utcnow()

    # Update all domains to published
    for domain in subject.domains:
        domain.status = ContentStatus.PUBLISHED

    db.commit()

    return {
        "message": "Subject published successfully",
        "subject_id": subject.id,
        "status": subject.status
    }


# ============================================================================
# Legacy Endpoints (kept for backward compatibility)
# ============================================================================

@router.post("/lessons")
async def create_lesson(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new lesson (admin only)"""
    # TODO: Implement lesson generation agent
    raise HTTPException(status_code=501, detail="Use /subjects/generate instead")


@router.put("/lessons/{lesson_id}")
async def update_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update an existing lesson (admin only)"""
    # TODO: Implement in next phase
    raise HTTPException(status_code=501, detail="Not implemented")


@router.delete("/lessons/{lesson_id}")
async def delete_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a lesson (admin only)"""
    # TODO: Implement in next phase
    raise HTTPException(status_code=501, detail="Not implemented")


# ============================================================================
# Dashboard & Analytics Endpoints
# ============================================================================

@router.get("/dashboard")
async def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get admin dashboard statistics"""
    now = datetime.utcnow()

    # Content counts
    total_subjects = db.query(Subject).count()
    total_domains = db.query(Domain).count()
    total_topics = db.query(Topic).count()
    total_lessons = db.query(Lesson).count()
    total_exercises = db.query(Exercise).count()

    # Subject status breakdown
    draft_subjects = db.query(Subject).filter(Subject.status == SubjectStatus.DRAFT).count()
    approved_subjects = db.query(Subject).filter(Subject.status == SubjectStatus.APPROVED).count()
    published_subjects = db.query(Subject).filter(Subject.status == SubjectStatus.PUBLISHED).count()

    # User counts
    total_users = db.query(User).count()

    # Recent users (last 10)
    recent_users = db.query(User).order_by(User.created_at.desc()).limit(10).all()
    recent_users_data = [
        {
            "id": u.id,
            "email": u.email,
            "username": u.username,
            "full_name": u.full_name,
            "preferred_locale": u.preferred_locale,
            "is_active": u.is_active,
            "is_admin": u.is_admin,
            "created_at": u.created_at.isoformat() if u.created_at else None,
        }
        for u in recent_users
    ]

    return {
        "total_users": total_users,
        "total_subjects": total_subjects,
        "total_domains": total_domains,
        "total_topics": total_topics,
        "total_lessons": total_lessons,
        "total_exercises": total_exercises,
        "draft_subjects": draft_subjects,
        "approved_subjects": approved_subjects,
        "published_subjects": published_subjects,
        "recent_users": recent_users_data,
    }


@router.get("/analytics")
async def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get platform analytics"""
    now = datetime.utcnow()

    # User analytics
    total_users = db.query(User).count()
    active_30d = db.query(User).filter(User.is_active == True).count()  # Simplified
    new_7d = db.query(User).filter(User.created_at >= now - timedelta(days=7)).count()
    admin_count = db.query(User).filter(User.is_admin == True).count()

    # Content analytics
    subjects_count = db.query(Subject).count()
    domains_count = db.query(Domain).count()
    topics_count = db.query(Topic).count()
    lessons_count = db.query(Lesson).count()
    exercises_count = db.query(Exercise).count()
    sections_count = db.query(LessonSection).count()

    # Progress analytics
    total_completions = db.query(LessonProgress).filter(
        LessonProgress.status == ProgressStatus.completed
    ).count()
    total_submissions = db.query(ExerciseSubmission).count()

    correct_submissions = db.query(ExerciseSubmission).filter(
        ExerciseSubmission.is_correct == True
    ).count()
    avg_accuracy = (correct_submissions / total_submissions * 100) if total_submissions > 0 else 0

    total_time = db.query(func.sum(LessonProgress.time_spent)).scalar() or 0
    total_time_hours = round(total_time / 3600, 1)

    return {
        "users": {
            "total": total_users,
            "active_30d": active_30d,
            "new_7d": new_7d,
            "admins": admin_count,
        },
        "content": {
            "subjects": subjects_count,
            "domains": domains_count,
            "topics": topics_count,
            "lessons": lessons_count,
            "exercises": exercises_count,
            "sections": sections_count,
        },
        "progress": {
            "total_completions": total_completions,
            "total_submissions": total_submissions,
            "avg_accuracy": round(avg_accuracy, 1),
            "total_time_hours": total_time_hours,
        },
    }


# ============================================================================
# User Management Endpoints
# ============================================================================

@router.get("/users")
async def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """List all users (admin only)"""
    users = db.query(User).order_by(User.created_at.desc()).all()
    return [
        {
            "id": u.id,
            "email": u.email,
            "username": u.username,
            "full_name": u.full_name,
            "preferred_locale": u.preferred_locale,
            "is_active": u.is_active,
            "is_admin": u.is_admin,
            "created_at": u.created_at.isoformat() if u.created_at else None,
        }
        for u in users
    ]


@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Toggle user admin role"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot change your own role")

    user.is_admin = not user.is_admin
    db.commit()
    return {"message": f"User {'promoted to' if user.is_admin else 'removed from'} admin", "is_admin": user.is_admin}


@router.put("/users/{user_id}/status")
async def update_user_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Toggle user active status"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot deactivate yourself")

    user.is_active = not user.is_active
    db.commit()
    return {"message": f"User {'activated' if user.is_active else 'deactivated'}", "is_active": user.is_active}
