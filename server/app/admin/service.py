import logging
import uuid
from typing import Any

from fastapi import HTTPException
from sqlmodel import Session, func, select

from app.admin.models import AdminAction, AdminAuditLog
from app.admin.registry import (
    ResourceConfig,
    can_access,
    column_metadata,
    get_resource,
    visible_resources,
)
from app.admin.schemas import (
    AuditLogResponse,
    ResourceColumn,
    ResourceInfo,
    ResourceListResponse,
    RowListResponse,
    RowResponse,
)
from app.auth.supabase_client import get_supabase_admin
from app.users.models import Role, RoleHistory, User

logger = logging.getLogger(__name__)


def _serialize(obj: Any) -> dict[str, Any]:
    return obj.model_dump(mode="json")


def _resolve_resource(name: str, user: User) -> ResourceConfig:
    cfg = get_resource(name)
    if cfg is None:
        raise HTTPException(status_code=404, detail="Unknown resource")
    if not can_access(user.role, cfg):
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    return cfg


def _parse_pk(row_id: str) -> Any:
    try:
        return uuid.UUID(row_id)
    except ValueError:
        return row_id


def _get_row(cfg: ResourceConfig, row_id: str, session: Session) -> Any:
    obj = session.get(cfg.model, _parse_pk(row_id))
    if obj is None:
        raise HTTPException(status_code=404, detail="Row not found")
    return obj


def _audit(
    session: Session,
    actor: User,
    action: AdminAction,
    resource: str,
    target_id: str,
    detail: str | None = None,
) -> None:
    session.add(
        AdminAuditLog(
            actor_id=actor.id,
            action=action,
            resource=resource,
            target_id=str(target_id),
            detail=detail,
        )
    )


def list_resources(user: User) -> ResourceListResponse:
    infos = [
        ResourceInfo(
            name=cfg.name,
            label=cfg.label,
            min_role=cfg.min_role,
            supports_soft_delete=cfg.soft_delete_field is not None,
            columns=[ResourceColumn(**c) for c in column_metadata(cfg)],
        )
        for cfg in visible_resources(user.role)
    ]
    return ResourceListResponse(resources=infos)


def list_rows(
    resource: str, user: User, session: Session, limit: int, offset: int
) -> RowListResponse:
    cfg = _resolve_resource(resource, user)
    total = session.exec(select(func.count()).select_from(cfg.model)).one()
    rows = session.exec(select(cfg.model).offset(offset).limit(limit)).all()
    return RowListResponse(
        rows=[_serialize(r) for r in rows],
        total=int(total),
        limit=limit,
        offset=offset,
    )


def create_row(
    resource: str, data: dict[str, Any], user: User, session: Session
) -> RowResponse:
    cfg = _resolve_resource(resource, user)

    allowed = {
        k: v
        for k, v in data.items()
        if k in cfg.model.model_fields and k not in cfg.create_exclude
    }
    try:
        obj = cfg.model(**allowed)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid row data") from exc

    try:
        session.add(obj)
        session.flush()
        _audit(session, user, AdminAction.CREATE, resource, getattr(obj, "id", ""))
        session.commit()
        session.refresh(obj)
    except Exception as exc:
        session.rollback()
        raise HTTPException(status_code=400, detail="Failed to create row") from exc

    return RowResponse(row=_serialize(obj))


def delete_row(resource: str, row_id: str, user: User, session: Session) -> None:
    cfg = _resolve_resource(resource, user)

    if cfg.special_delete == "user":
        _delete_user(row_id, user, session)
        return

    obj = _get_row(cfg, row_id, session)
    try:
        session.delete(obj)
        _audit(session, user, AdminAction.DELETE, resource, row_id)
        session.commit()
    except Exception as exc:
        session.rollback()
        raise HTTPException(status_code=400, detail="Failed to delete row") from exc


def _delete_user(row_id: str, actor: User, session: Session) -> None:
    target = session.get(User, _parse_pk(row_id))
    if target is None:
        raise HTTPException(status_code=404, detail="User not found")

    _guard_user_mutation(target, actor, session)

    supabase_id = target.supabase_id
    try:
        # Detach role history: rows authored by this user lose their author,
        # rows about this user are removed.
        authored = session.exec(
            select(RoleHistory).where(RoleHistory.changed_by == target.id)
        ).all()
        for h in authored:
            h.changed_by = None
            session.add(h)

        about = session.exec(
            select(RoleHistory).where(RoleHistory.user_id == target.id)
        ).all()
        for h in about:
            session.delete(h)

        session.delete(target)
        _audit(session, actor, AdminAction.DELETE, "users", row_id)
        session.commit()
    except Exception as exc:
        session.rollback()
        raise HTTPException(status_code=400, detail="Failed to delete user") from exc

    try:
        get_supabase_admin().auth.admin.delete_user(supabase_id)
    except Exception:
        logger.error("Orphaned Supabase auth user after delete: %s", supabase_id)


def _guard_user_mutation(target: User, actor: User, session: Session) -> None:
    if target.id == actor.id:
        raise HTTPException(
            status_code=400, detail="You cannot delete or deactivate yourself"
        )
    # Only a problem if we are about to remove the last *active* admin.
    if target.role == Role.ADMIN and target.is_active:
        active_admins = session.exec(
            select(func.count())
            .select_from(User)
            .where(User.role == Role.ADMIN, User.is_active == True)  # noqa: E712
        ).one()
        if int(active_admins) <= 1:
            raise HTTPException(
                status_code=400, detail="Cannot remove the last active admin"
            )


def set_active(
    resource: str, row_id: str, active: bool, user: User, session: Session
) -> RowResponse:
    cfg = _resolve_resource(resource, user)
    if cfg.soft_delete_field is None:
        raise HTTPException(
            status_code=400, detail="Resource does not support soft delete"
        )

    obj = _get_row(cfg, row_id, session)

    if cfg.special_delete == "user" and not active:
        _guard_user_mutation(obj, user, session)

    try:
        setattr(obj, cfg.soft_delete_field, active)
        session.add(obj)
        action = AdminAction.REACTIVATE if active else AdminAction.DEACTIVATE
        _audit(session, user, action, resource, row_id)
        session.commit()
        session.refresh(obj)
    except HTTPException:
        raise
    except Exception as exc:
        session.rollback()
        raise HTTPException(status_code=400, detail="Failed to update row") from exc

    return RowResponse(row=_serialize(obj))


def list_audit(
    user: User, session: Session, limit: int, offset: int
) -> AuditLogResponse:
    if user.role != Role.ADMIN:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    total = session.exec(select(func.count()).select_from(AdminAuditLog)).one()
    entries = session.exec(
        select(AdminAuditLog)
        .order_by(AdminAuditLog.created_at.desc())  # type: ignore[attr-defined]
        .offset(offset)
        .limit(limit)
    ).all()
    return AuditLogResponse(entries=entries, total=int(total))  # type: ignore[arg-type]
