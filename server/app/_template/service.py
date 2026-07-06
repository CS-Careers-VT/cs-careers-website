"""
TEMPLATE: service.py
====================
Business logic lives here. Routers call service functions; services call the DB.

Rules:
- Service functions take explicit arguments (request schema + session) — no FastAPI
  dependencies inside service functions. get_current_user belongs in the router.
- Raise HTTPException from the service layer (not the router) so error handling
  stays in one place
- Always commit at the end of a write operation; rollback in the except block

Copy this file to your feature folder and rename the functions.
"""
from fastapi import HTTPException
from sqlmodel import Session, select

from app._template.models import AttendanceRecord
from app._template.schemas import AttendanceCreateRequest, AttendanceResponse
from app.users.models import User


def create_attendance(
    req: AttendanceCreateRequest, user: User, session: Session
) -> AttendanceRecord:
    record = AttendanceRecord(
        user_id=user.id,
        event_name=req.event_name,
        notes=req.notes,
    )
    try:
        session.add(record)
        session.commit()
        session.refresh(record)
    except Exception as exc:
        session.rollback()
        raise HTTPException(status_code=500, detail="Failed to save record") from exc
    return record


def get_attendance(record_id, user: User, session: Session) -> AttendanceResponse:
    record = session.exec(
        select(AttendanceRecord).where(
            AttendanceRecord.id == record_id,
            AttendanceRecord.user_id == user.id,
        )
    ).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return AttendanceResponse.model_validate(record)
