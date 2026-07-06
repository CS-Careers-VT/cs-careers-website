"""
TEMPLATE: router.py
===================
Thin routing layer. Routes only: validate input, call service, return schema.
No business logic here — that lives in service.py.

Rules:
- Import get_current_user for any route that requires authentication
- Import require_role for routes restricted to specific roles
- require_role must be wrapped in Depends(): `Depends(require_role(Role.ADMIN))`
- Register this router in server/app/main.py:
      from app.<feature>.router import router as <feature>_router
      app.include_router(<feature>_router, prefix="/api/<feature>", tags=["<feature>"])

Copy this file to your feature folder and rename the prefix in main.py.
"""
import uuid

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app._template import service
from app._template.schemas import AttendanceCreateRequest, AttendanceResponse
from app.auth.dependencies import get_current_user, require_role
from app.database import get_session
from app.users.models import Role, User

router = APIRouter()


# Any authenticated user can log attendance for themselves
@router.post(
    "/", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED
)
def create_attendance(
    req: AttendanceCreateRequest,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
) -> AttendanceResponse:
    record = service.create_attendance(req, user, session)
    return AttendanceResponse.model_validate(record)


# DEV or ADMIN can fetch any record by ID
@router.get("/{record_id}", response_model=AttendanceResponse)
def get_attendance(
    record_id: uuid.UUID,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> AttendanceResponse:
    return service.get_attendance(record_id, user, session)
