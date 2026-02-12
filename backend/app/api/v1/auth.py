from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import timedelta
from app.database import get_db
from app.schemas.user import UserCreate, UserResponse, Token, UserUpdate
from app.models.user import User
from app.utils.security import verify_password, get_password_hash, create_access_token
from app.utils.errors import handle_errors, ValidationError, log_info, log_error
from app.config import settings
from app.middleware.auth import get_current_active_user
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
@handle_errors
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    log_info(f"Registration attempt", f"username={user_data.username}, email={user_data.email}")
    
    # Check if user already exists
    existing_user = db.query(User).filter(
        (User.email == user_data.email) | (User.username == user_data.username)
    ).first()

    if existing_user:
        if existing_user.email == user_data.email:
            log_info(f"Registration failed", f"email={user_data.email} already exists")
            raise ValidationError("Email already registered")
        else:
            log_info(f"Registration failed", f"username={user_data.username} already exists")
            raise ValidationError("Username already taken")

    try:
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        new_user = User(
            email=user_data.email,
            username=user_data.username,
            hashed_password=hashed_password,
            full_name=user_data.full_name,
            preferred_locale=user_data.preferred_locale
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": new_user.username}, expires_delta=access_token_expires
        )

        log_info(f"User registered successfully", f"user_id={new_user.id}, username={new_user.username}")

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": new_user
        }
    except SQLAlchemyError as e:
        db.rollback()
        log_error(e, f"Database error during registration for {user_data.username}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account. Please try again."
        )


@router.post("/login", response_model=Token)
@handle_errors
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login with username and password"""
    log_info(f"Login attempt", f"username={form_data.username}")
    
    # Find user
    user = db.query(User).filter(User.username == form_data.username).first()

    if not user:
        log_info(f"Login failed", f"username={form_data.username} not found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not verify_password(form_data.password, user.hashed_password):
        log_info(f"Login failed", f"username={form_data.username} incorrect password")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        log_info(f"Login failed", f"username={form_data.username} account inactive")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Please contact support."
        )

    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    log_info(f"Login successful", f"user_id={user.id}, username={user.username}")

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/me", response_model=UserResponse)
@handle_errors
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user information (requires authentication)"""
    log_info(f"Fetching user info", f"user_id={current_user.id}")
    return current_user


@router.put("/me", response_model=UserResponse)
@handle_errors
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update current user information (requires authentication)"""
    log_info(f"Updating user profile", f"user_id={current_user.id}")
    
    try:
        # Check if email is being updated and is unique
        if user_update.email and user_update.email != current_user.email:
            existing_user = db.query(User).filter(User.email == user_update.email).first()
            if existing_user:
                log_info(f"Profile update failed", f"email={user_update.email} already exists")
                raise ValidationError("Email already registered")
            current_user.email = user_update.email

        # Update full name if provided
        if user_update.full_name is not None:
            current_user.full_name = user_update.full_name

        # Update preferred locale if provided
        if user_update.preferred_locale:
            current_user.preferred_locale = user_update.preferred_locale

        # Update password if provided
        if user_update.password:
            current_user.hashed_password = get_password_hash(user_update.password)
            log_info(f"Password updated", f"user_id={current_user.id}")

        db.commit()
        db.refresh(current_user)

        log_info(f"Profile updated successfully", f"user_id={current_user.id}")
        return current_user
        
    except SQLAlchemyError as e:
        db.rollback()
        log_error(e, f"Database error updating profile for user {current_user.id}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile. Please try again."
        )
