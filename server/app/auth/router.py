from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.auth import service
from app.auth.dependencies import get_current_user
from app.auth.schemas import (
    LoginRequest,
    LoginResponse,
    SignupRequest,
    UserResponse,
)
from app.database import get_session
from app.users.models import User

router = APIRouter()


@router.post(
    "/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
def signup(req: SignupRequest, session: Session = Depends(get_session)) -> User:
    return service.signup(req, session)


@router.post("/login", response_model=LoginResponse)
def login(req: LoginRequest, session: Session = Depends(get_session)) -> LoginResponse:
    return service.login(req, session)


@router.get("/me", response_model=UserResponse)
def me(user: User = Depends(get_current_user)) -> UserResponse:
    return service.get_me(user)
