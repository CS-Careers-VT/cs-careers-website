"""Auth route integration tests.

Each test is independent — no shared state. Supabase calls are mocked; JWT
validation uses the TEST_JWT_SECRET set in conftest.py.
"""
from unittest.mock import patch

import pytest
from httpx import AsyncClient
from sqlmodel import Session, select

from app.auth.dependencies import require_role
from app.main import app
from app.users.models import Role, User
from tests.conftest import SIGNUP_PAYLOAD, make_supabase_admin_mock, make_supabase_mock


@pytest.mark.asyncio
async def test_signup_creates_member(client: AsyncClient, db_session: Session) -> None:
    """POST /signup returns 201, role=MEMBER, and the DB row is correct."""
    sb_mock = make_supabase_mock(SIGNUP_PAYLOAD["email"])
    sb_admin_mock = make_supabase_admin_mock()

    with (
        patch("app.auth.service.get_supabase", return_value=sb_mock),
        patch("app.auth.service.get_supabase_admin", return_value=sb_admin_mock),
    ):
        resp = await client.post("/api/auth/signup", json=SIGNUP_PAYLOAD)

    assert resp.status_code == 201
    body = resp.json()
    assert body["role"] == "MEMBER"
    assert body["email"] == SIGNUP_PAYLOAD["email"]
    assert body["first_name"] == SIGNUP_PAYLOAD["first_name"]

    user = db_session.exec(
        select(User).where(User.email == SIGNUP_PAYLOAD["email"])
    ).first()
    assert user is not None
    assert user.role == Role.MEMBER
    assert user.supabase_id is not None


@pytest.mark.asyncio
async def test_login_returns_token(client: AsyncClient) -> None:
    """POST /login returns 200 with a non-empty access_token."""
    sb_mock = make_supabase_mock(SIGNUP_PAYLOAD["email"])
    sb_admin_mock = make_supabase_admin_mock()

    with (
        patch("app.auth.service.get_supabase", return_value=sb_mock),
        patch("app.auth.service.get_supabase_admin", return_value=sb_admin_mock),
    ):
        await client.post("/api/auth/signup", json=SIGNUP_PAYLOAD)
        resp = await client.post(
            "/api/auth/login",
            json={"email": SIGNUP_PAYLOAD["email"], "password": SIGNUP_PAYLOAD["password"]},  # noqa: E501
        )

    assert resp.status_code == 200
    body = resp.json()
    assert "access_token" in body
    assert isinstance(body["access_token"], str)
    assert len(body["access_token"]) > 0


@pytest.mark.asyncio
async def test_me_with_valid_token(client: AsyncClient) -> None:
    """GET /me with a valid token returns correct user data."""
    sb_mock = make_supabase_mock(SIGNUP_PAYLOAD["email"])
    sb_admin_mock = make_supabase_admin_mock()

    with (
        patch("app.auth.service.get_supabase", return_value=sb_mock),
        patch("app.auth.service.get_supabase_admin", return_value=sb_admin_mock),
    ):
        await client.post("/api/auth/signup", json=SIGNUP_PAYLOAD)
        login_resp = await client.post(
            "/api/auth/login",
            json={"email": SIGNUP_PAYLOAD["email"], "password": SIGNUP_PAYLOAD["password"]},  # noqa: E501
        )

    token = login_resp.json()["access_token"]
    resp = await client.get(
        "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
    )

    assert resp.status_code == 200
    body = resp.json()
    assert body["email"] == SIGNUP_PAYLOAD["email"]
    assert body["role"] == "MEMBER"
    assert "id" in body
    assert "first_name" in body
    assert "last_name" in body
    assert "joined_at" in body


@pytest.mark.asyncio
async def test_me_without_token(client: AsyncClient) -> None:
    """GET /me with no Authorization header returns 401."""
    resp = await client.get("/api/auth/me")
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_me_with_invalid_token(client: AsyncClient) -> None:
    """GET /me with a garbage token returns 401."""
    resp = await client.get(
        "/api/auth/me", headers={"Authorization": "Bearer invalidtoken"}
    )
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_require_role_blocks_wrong_role(client: AsyncClient) -> None:
    """A MEMBER token is rejected by a route protected with require_role(ADMIN)."""
    from fastapi import APIRouter, Depends

    # Register a temporary ADMIN-only route for this test
    test_router = APIRouter()

    @test_router.get("/test-admin-only")
    def admin_only(user: User = Depends(require_role(Role.ADMIN))) -> dict:
        return {"ok": True}

    app.include_router(test_router)

    sb_mock = make_supabase_mock(SIGNUP_PAYLOAD["email"])
    sb_admin_mock = make_supabase_admin_mock()

    with (
        patch("app.auth.service.get_supabase", return_value=sb_mock),
        patch("app.auth.service.get_supabase_admin", return_value=sb_admin_mock),
    ):
        await client.post("/api/auth/signup", json=SIGNUP_PAYLOAD)
        login_resp = await client.post(
            "/api/auth/login",
            json={"email": SIGNUP_PAYLOAD["email"], "password": SIGNUP_PAYLOAD["password"]},  # noqa: E501
        )

    token = login_resp.json()["access_token"]
    resp = await client.get(
        "/test-admin-only", headers={"Authorization": f"Bearer {token}"}
    )
    assert resp.status_code == 403
