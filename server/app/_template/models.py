"""
TEMPLATE: models.py
===================
Define SQLModel table classes here. One file per feature.

Rules:
- Use SQLModel with `table=True` for database tables
- Use `Field(foreign_key="table.col")` for FK relationships
- Models live here; request/response schemas go in schemas.py
- Never import from other feature folders — only from app.users.models for shared types

Copy this file to your feature folder and rename the class.
"""
import uuid
from datetime import UTC, datetime
from typing import Optional

from sqlmodel import Field, SQLModel


def _utcnow() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


# Example: a simple table linked to a user
class AttendanceRecord(SQLModel, table=True):
    __tablename__ = "attendance_records"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    # FK to the shared users table — always reference users.id, never supabase_id
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

    event_name: str
    attended_at: datetime = Field(default_factory=_utcnow)
    notes: Optional[str] = Field(default=None)
