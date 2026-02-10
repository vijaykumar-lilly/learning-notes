"""Authentication service - User authentication logic"""
from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import verify_password, get_password_hash


class AuthService:
    """Service class for authentication operations"""

    @staticmethod
    def authenticate_user(db: Session, username: str, password: str) -> User | None:
        """Authenticate a user with username and password"""
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def create_user(db: Session, email: str, username: str, password: str, **kwargs) -> User:
        """Create a new user"""
        hashed_password = get_password_hash(password)
        user = User(
            email=email,
            username=username,
            hashed_password=hashed_password,
            **kwargs
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
