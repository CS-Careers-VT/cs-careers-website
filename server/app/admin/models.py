import enum
import uuid
from datetime import UTC, datetime
from typing import Optional

from sqlalchemy import Enum as SAEnum
from sqlmodel import Column, Field, SQLModel


def _utcnow() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


class AdminAction(str, enum.Enum):
    CREATE = "CREATE"
    DELETE = "DELETE"
    DEACTIVATE = "DEACTIVATE"
    REACTIVATE = "REACTIVATE"


class AdminAuditLog(SQLModel, table=True):
    __tablename__ = "admin_audit_log"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    actor_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    action: AdminAction = Field(
        sa_column=Column(
            SAEnum(AdminAction, name="admin_action", native_enum=True),
            nullable=False,
        )
    )
    resource: str = Field(nullable=False)
    target_id: str = Field(nullable=False)
    detail: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=_utcnow)
