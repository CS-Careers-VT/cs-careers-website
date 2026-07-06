from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel

from app.users.models import Role


class ResourceColumn(BaseModel):
    name: str
    required: bool
    creatable: bool


class ResourceInfo(BaseModel):
    name: str
    label: str
    min_role: Role
    supports_soft_delete: bool
    columns: list[ResourceColumn]


class ResourceListResponse(BaseModel):
    resources: list[ResourceInfo]


class RowListResponse(BaseModel):
    rows: list[dict[str, Any]]
    total: int
    limit: int
    offset: int


class CreateRowRequest(BaseModel):
    data: dict[str, Any]


class RowResponse(BaseModel):
    row: dict[str, Any]


class AuditLogEntry(BaseModel):
    id: Any
    actor_id: Any
    action: str
    resource: str
    target_id: str
    detail: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class AuditLogResponse(BaseModel):
    entries: list[AuditLogEntry]
    total: int
