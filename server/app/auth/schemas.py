import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.users.models import Role


class SignupRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    first_name: str
    last_name: str
    role: Role
    joined_at: datetime

    model_config = {"from_attributes": True}
