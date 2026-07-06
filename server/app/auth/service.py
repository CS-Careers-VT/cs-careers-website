import logging
from datetime import UTC, datetime

from fastapi import HTTPException
from sqlmodel import Session, select

from app.auth.schemas import LoginRequest, LoginResponse, SignupRequest, UserResponse
from app.auth.supabase_client import get_supabase, get_supabase_admin
from app.users.models import Role, RoleHistory, User

logger = logging.getLogger(__name__)


def signup(req: SignupRequest, session: Session) -> User:
    sb = get_supabase()
    try:
        auth_resp = sb.auth.sign_up({"email": req.email, "password": req.password})
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Signup failed") from exc

    if not auth_resp.user:
        raise HTTPException(status_code=400, detail="Signup failed")

    supabase_user_id = str(auth_resp.user.id)

    user = User(
        supabase_id=supabase_user_id,
        email=req.email,
        first_name=req.first_name,
        last_name=req.last_name,
        role=Role.MEMBER,
    )
    try:
        session.add(user)
        session.flush()

        history = RoleHistory(
            user_id=user.id,
            old_role=None,
            new_role=Role.MEMBER,
            changed_by=None,
        )
        session.add(history)
        session.commit()
        session.refresh(user)
    except Exception as exc:
        session.rollback()
        try:
            get_supabase_admin().auth.admin.delete_user(supabase_user_id)
        except Exception:
            logger.error("Orphaned Supabase auth user: %s", supabase_user_id)
        raise HTTPException(status_code=500, detail="Failed to create user") from exc

    return user


def login(req: LoginRequest, session: Session) -> LoginResponse:
    sb = get_supabase()
    try:
        auth_resp = sb.auth.sign_in_with_password(
            {"email": req.email, "password": req.password}
        )
    except Exception as exc:
        raise HTTPException(status_code=401, detail="Invalid credentials") from exc

    if not auth_resp.session:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user = session.exec(select(User).where(User.email == req.email)).first()
    if user:
        user.last_login = datetime.now(UTC).replace(tzinfo=None)  # naive UTC
        session.add(user)
        session.commit()

    return LoginResponse(access_token=auth_resp.session.access_token)


def get_me(user: User) -> UserResponse:
    return UserResponse.model_validate(user)
