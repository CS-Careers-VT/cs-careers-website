"""
TEMPLATE: schemas.py
====================
Pydantic request/response models. These are NOT database tables.

Rules:
- Use BaseModel (not SQLModel) for schemas
- Keep request and response schemas separate — never reuse a request schema
  as a response
- Add `model_config = {"from_attributes": True}` on response schemas so
  `Model.model_validate(orm_obj)` works
- Import Role from app.users.models if you need to expose the user's role

Copy this file to your feature folder and rename the classes.
"""
import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AttendanceCreateRequest(BaseModel):
    event_name: str
    notes: Optional[str] = None


class AttendanceResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    event_name: str
    attended_at: datetime
    notes: Optional[str]

    # Required to use .model_validate(orm_object)
    model_config = {"from_attributes": True}
