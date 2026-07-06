"""Admin dashboard route tests.

Auth users are created directly in the DB with a chosen role, and a matching
JWT is minted with the TEST_JWT_SECRET (same approach the app uses to validate).
Supabase auth deletion is mocked.
"""
import uuid
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import jwt
import pytest
from httpx import AsyncClient
from sqlmodel import Session, select

from app.admin.models import AdminAuditLog
from app.users.models import Role, User
from tests.conftest import TEST_JWT_SECRET


def _make_user(session: Session, role: Role, email: str | None = None) -> User:
    uid = str(uuid.uuid4())
    user = User(
        supabase_id=uid,
        email=email or f"{uid}@example.com",
        first_name="Test",
        last_name="User",
        role=role,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def _token(user: User) -> str:
    return jwt.encode(
        {
            "sub": user.supabase_id,
            "email": user.email,
            "aud": "authenticated",
            "exp": int(datetime(2099, 1, 1, tzinfo=timezone.utc).timestamp()),
        },
        TEST_JWT_SECRET,
        algorithm="HS256",
    )


def _auth(user: User) -> dict[str, str]:
    return {"Authorization": f"Bearer {_token(user)}"}


@pytest.mark.asyncio
async def test_dev_cannot_list_users(
    client: AsyncClient, db_session: Session
) -> None:
    dev = _make_user(db_session, Role.DEV)
    resp = await client.get("/api/admin/users", headers=_auth(dev))
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_admin_can_list_users(
    client: AsyncClient, db_session: Session
) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    resp = await client.get("/api/admin/users", headers=_auth(admin))
    assert resp.status_code == 200
    body = resp.json()
    assert body["total"] >= 1
    assert isinstance(body["rows"], list)


@pytest.mark.asyncio
async def test_resources_hide_users_from_dev(
    client: AsyncClient, db_session: Session
) -> None:
    dev = _make_user(db_session, Role.DEV)
    resp = await client.get("/api/admin/resources", headers=_auth(dev))
    assert resp.status_code == 200
    names = {r["name"] for r in resp.json()["resources"]}
    assert "users" not in names
    assert "role_history" not in names


@pytest.mark.asyncio
async def test_resources_show_users_to_admin(
    client: AsyncClient, db_session: Session
) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    resp = await client.get("/api/admin/resources", headers=_auth(admin))
    names = {r["name"] for r in resp.json()["resources"]}
    assert "users" in names


@pytest.mark.asyncio
async def test_admin_delete_user(client: AsyncClient, db_session: Session) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    # second admin so the target is deletable and admin isn't the last one
    _make_user(db_session, Role.ADMIN)
    victim = _make_user(db_session, Role.MEMBER)
    victim_id = str(victim.id)

    sb_admin = MagicMock()
    with patch("app.admin.service.get_supabase_admin", return_value=sb_admin):
        resp = await client.delete(
            f"/api/admin/users/{victim_id}", headers=_auth(admin)
        )

    assert resp.status_code == 204
    sb_admin.auth.admin.delete_user.assert_called_once()
    assert db_session.get(User, victim.id) is None

    audit = db_session.exec(
        select(AdminAuditLog).where(AdminAuditLog.target_id == victim_id)
    ).first()
    assert audit is not None


@pytest.mark.asyncio
async def test_cannot_delete_self(client: AsyncClient, db_session: Session) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    _make_user(db_session, Role.ADMIN)  # not the last admin
    resp = await client.delete(
        f"/api/admin/users/{admin.id}", headers=_auth(admin)
    )
    assert resp.status_code == 400


@pytest.mark.asyncio
async def test_cannot_deactivate_last_active_admin(
    client: AsyncClient, db_session: Session
) -> None:
    # Actor is an admin (allowed by role gate) but is itself inactive, so the
    # target is the only remaining active admin and must be protected.
    actor = _make_user(db_session, Role.ADMIN)
    actor.is_active = False
    db_session.add(actor)
    last_active_admin = _make_user(db_session, Role.ADMIN)
    db_session.commit()

    resp = await client.post(
        f"/api/admin/users/{last_active_admin.id}/deactivate",
        headers=_auth(actor),
    )
    assert resp.status_code == 400


@pytest.mark.asyncio
async def test_deactivate_and_reactivate_user(
    client: AsyncClient, db_session: Session
) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    victim = _make_user(db_session, Role.MEMBER)

    resp = await client.post(
        f"/api/admin/users/{victim.id}/deactivate", headers=_auth(admin)
    )
    assert resp.status_code == 200
    assert resp.json()["row"]["is_active"] is False

    resp = await client.post(
        f"/api/admin/users/{victim.id}/reactivate", headers=_auth(admin)
    )
    assert resp.status_code == 200
    assert resp.json()["row"]["is_active"] is True


@pytest.mark.asyncio
async def test_dev_blocked_from_delete_users(
    client: AsyncClient, db_session: Session
) -> None:
    dev = _make_user(db_session, Role.DEV)
    victim = _make_user(db_session, Role.MEMBER)
    resp = await client.delete(
        f"/api/admin/users/{victim.id}", headers=_auth(dev)
    )
    assert resp.status_code == 403


@pytest.mark.asyncio
async def test_unknown_resource_404(
    client: AsyncClient, db_session: Session
) -> None:
    admin = _make_user(db_session, Role.ADMIN)
    resp = await client.get("/api/admin/nope", headers=_auth(admin))
    assert resp.status_code == 404


@pytest.mark.asyncio
async def test_audit_admin_only(client: AsyncClient, db_session: Session) -> None:
    dev = _make_user(db_session, Role.DEV)
    admin = _make_user(db_session, Role.ADMIN)

    assert (await client.get("/api/admin/audit", headers=_auth(dev))).status_code == 403
    assert (
        await client.get("/api/admin/audit", headers=_auth(admin))
    ).status_code == 200
