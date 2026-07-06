from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.admin import service
from app.admin.schemas import (
    AuditLogResponse,
    CreateRowRequest,
    ResourceListResponse,
    RowListResponse,
    RowResponse,
)
from app.auth.dependencies import require_role
from app.database import get_session
from app.users.models import Role, User

router = APIRouter()


@router.get("/resources", response_model=ResourceListResponse)
def list_resources(
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
) -> ResourceListResponse:
    return service.list_resources(user)


@router.get("/audit", response_model=AuditLogResponse)
def list_audit(
    limit: int = 50,
    offset: int = 0,
    user: User = Depends(require_role(Role.ADMIN)),
    session: Session = Depends(get_session),
) -> AuditLogResponse:
    return service.list_audit(user, session, limit, offset)


@router.get("/{resource}", response_model=RowListResponse)
def list_rows(
    resource: str,
    limit: int = 50,
    offset: int = 0,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> RowListResponse:
    return service.list_rows(resource, user, session, limit, offset)


@router.post(
    "/{resource}", response_model=RowResponse, status_code=status.HTTP_201_CREATED
)
def create_row(
    resource: str,
    req: CreateRowRequest,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> RowResponse:
    return service.create_row(resource, req.data, user, session)


@router.delete("/{resource}/{row_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_row(
    resource: str,
    row_id: str,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> None:
    service.delete_row(resource, row_id, user, session)


@router.post("/{resource}/{row_id}/deactivate", response_model=RowResponse)
def deactivate_row(
    resource: str,
    row_id: str,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> RowResponse:
    return service.set_active(resource, row_id, False, user, session)


@router.post("/{resource}/{row_id}/reactivate", response_model=RowResponse)
def reactivate_row(
    resource: str,
    row_id: str,
    user: User = Depends(require_role(Role.DEV, Role.ADMIN)),
    session: Session = Depends(get_session),
) -> RowResponse:
    return service.set_active(resource, row_id, True, user, session)
