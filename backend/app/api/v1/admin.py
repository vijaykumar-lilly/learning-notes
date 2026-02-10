from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.middleware.auth import get_current_admin_user
from app.models.user import User

router = APIRouter()


@router.post("/lessons")
async def create_lesson(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new lesson (admin only)"""
    # TODO: Implement in Phase 6 (Admin Dashboard)
    raise HTTPException(status_code=501, detail="Not implemented")


@router.put("/lessons/{lesson_id}")
async def update_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Update an existing lesson (admin only)"""
    # TODO: Implement in Phase 6 (Admin Dashboard)
    raise HTTPException(status_code=501, detail="Not implemented")


@router.delete("/lessons/{lesson_id}")
async def delete_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a lesson (admin only)"""
    # TODO: Implement in Phase 6 (Admin Dashboard)
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/analytics")
async def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Get platform analytics (admin only)"""
    # TODO: Implement in Phase 7 (Analytics)
    raise HTTPException(status_code=501, detail="Not implemented")
