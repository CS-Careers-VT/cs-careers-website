"""Registry of admin-manageable resources.

This is the one place that knows about every table the admin dashboard can
manage. Adding a new feature table to the dashboard = add one entry here.

The admin feature is intentionally allowed to import other features' models —
it is a cross-cutting management layer, not a normal feature. Normal features
must still follow the "no cross-feature imports" rule.
"""
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Optional

from sqlmodel import SQLModel

from app.users.models import Role, RoleHistory, User


@dataclass(frozen=True)
class ResourceConfig:
    name: str
    label: str
    model: type[SQLModel]
    min_role: Role
    # Column name used for soft-delete (e.g. "is_active"). None = no soft delete.
    soft_delete_field: Optional[str] = None
    # Fields the frontend must never send on create (server-managed).
    create_exclude: frozenset[str] = field(default_factory=frozenset)
    # Special delete handler name resolved in the service layer (e.g. "user").
    special_delete: Optional[str] = None


REGISTRY: dict[str, ResourceConfig] = {
    "users": ResourceConfig(
        name="users",
        label="Users",
        model=User,
        min_role=Role.ADMIN,
        soft_delete_field="is_active",
        create_exclude=frozenset({"id", "joined_at", "last_login"}),
        special_delete="user",
    ),
    "role_history": ResourceConfig(
        name="role_history",
        label="Role History",
        model=RoleHistory,
        min_role=Role.ADMIN,
        create_exclude=frozenset({"id", "changed_at"}),
    ),
    # Future feature tables go here, e.g.:
    # "attendance": ResourceConfig(
    #     name="attendance",
    #     label="Attendance",
    #     model=AttendanceRecord,
    #     min_role=Role.DEV,
    # ),
}


def get_resource(name: str) -> Optional[ResourceConfig]:
    return REGISTRY.get(name)


def visible_resources(role: Role) -> list[ResourceConfig]:
    """Resources a given role is allowed to manage."""
    order = {Role.MEMBER: 0, Role.DEV: 1, Role.ADMIN: 2}
    return [r for r in REGISTRY.values() if order[role] >= order[r.min_role]]


def can_access(role: Role, cfg: ResourceConfig) -> bool:
    order = {Role.MEMBER: 0, Role.DEV: 1, Role.ADMIN: 2}
    return order[role] >= order[cfg.min_role]


def column_metadata(cfg: ResourceConfig) -> list[dict]:
    """Lightweight column descriptors for the frontend table/form."""
    cols: list[dict] = []
    for fname, finfo in cfg.model.model_fields.items():
        cols.append(
            {
                "name": fname,
                "required": finfo.is_required(),
                "creatable": fname not in cfg.create_exclude,
            }
        )
    return cols


# Used by service.py to keep a stable accessor without exposing the dataclass.
DeleteHandler = Callable[..., None]
