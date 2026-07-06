import enum
import uuid
from datetime import UTC, datetime
from typing import Optional

from sqlalchemy import Enum as SAEnum
from sqlmodel import Column, Field, SQLModel


def _utcnow() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


class Role(str, enum.Enum):
    MEMBER = "MEMBER"
    DEV = "DEV"
    ADMIN = "ADMIN"


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    supabase_id: str = Field(unique=True, nullable=False, index=True)
    email: str = Field(unique=True, nullable=False)
    first_name: str
    last_name: str
    role: Role = Field(
        default=Role.MEMBER,
        sa_column=Column(
            SAEnum(Role, name="role", native_enum=True), nullable=False
        ),
    )
    discord_id: Optional[str] = Field(default=None, unique=True, nullable=True)
    joined_at: datetime = Field(default_factory=_utcnow)
    last_login: Optional[datetime] = Field(default=None)
    is_active: bool = Field(default=True)


class RoleHistory(SQLModel, table=True):
    __tablename__ = "role_history"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)
    old_role: Optional[Role] = Field(
        default=None,
        sa_column=Column(
            SAEnum(Role, name="role", create_constraint=False, native_enum=True),
            nullable=True,
        ),
    )
    new_role: Role = Field(
        sa_column=Column(
            SAEnum(Role, name="role", create_constraint=False, native_enum=True),
            nullable=False,
        )
    )
    changed_by: Optional[uuid.UUID] = Field(
        default=None, foreign_key="users.id", nullable=True
    )
    changed_at: datetime = Field(default_factory=_utcnow)
