import os
import uuid
from collections.abc import AsyncGenerator, Generator
from datetime import datetime, timezone
from unittest.mock import MagicMock

import jwt
import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlmodel import Session, SQLModel, create_engine

# Must set env vars before importing app modules
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("TEST_DATABASE_URL", "sqlite:///./test.db")
os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_ANON_KEY", "test-anon-key")
os.environ.setdefault("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-key")
os.environ.setdefault("SUPABASE_JWT_SECRET", "test-jwt-secret-32-chars-minimum!!")

from app.database import get_session  # noqa: E402
from app.main import app  # noqa: E402
from app.users.models import Role, User  # noqa: E402, F401

TEST_JWT_SECRET = os.environ["SUPABASE_JWT_SECRET"]

TEST_DATABASE_URL = os.environ["TEST_DATABASE_URL"]
test_engine = create_engine(
    TEST_DATABASE_URL, connect_args={"check_same_thread": False}
)


@pytest.fixture(autouse=True)
def setup_db() -> Generator:
    SQLModel.metadata.create_all(test_engine)
    yield
    SQLModel.metadata.drop_all(test_engine)


@pytest.fixture
def db_session(setup_db: None) -> Generator[Session, None, None]:
    with Session(test_engine) as session:
        yield session


@pytest.fixture
def override_session(db_session: Session) -> Generator:
    app.dependency_overrides[get_session] = lambda: db_session
    yield
    app.dependency_overrides.clear()


@pytest_asyncio.fixture
async def client(override_session: None) -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as c:
        yield c


def make_supabase_mock(email: str, supabase_uid: str | None = None) -> MagicMock:
    """Return a mock Supabase client for sign_up and sign_in_with_password."""
    uid = supabase_uid or str(uuid.uuid4())

    token = jwt.encode(
        {
            "sub": uid,
            "email": email,
            "aud": "authenticated",
            "exp": int(datetime(2099, 1, 1, tzinfo=timezone.utc).timestamp()),
        },
        TEST_JWT_SECRET,
        algorithm="HS256",
    )

    mock_user = MagicMock()
    mock_user.id = uid

    mock_session = MagicMock()
    mock_session.access_token = token

    mock_auth_resp = MagicMock()
    mock_auth_resp.user = mock_user
    mock_auth_resp.session = mock_session

    mock_client = MagicMock()
    mock_client.auth.sign_up.return_value = mock_auth_resp
    mock_client.auth.sign_in_with_password.return_value = mock_auth_resp

    return mock_client


def make_supabase_admin_mock() -> MagicMock:
    mock = MagicMock()
    mock.auth.admin.delete_user.return_value = None
    return mock


SIGNUP_PAYLOAD = {
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User",
}
