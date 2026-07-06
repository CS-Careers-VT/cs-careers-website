"""initial auth tables

Revision ID: 001
Revises:
Create Date: 2026-05-21

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    role_enum = sa.Enum("MEMBER", "DEV", "ADMIN", name="role")
    role_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "users",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("supabase_id", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("first_name", sa.String(), nullable=False),
        sa.Column("last_name", sa.String(), nullable=False),
        sa.Column(
            "role",
            sa.Enum("MEMBER", "DEV", "ADMIN", name="role", create_type=False),
            nullable=False,
            server_default="MEMBER",
        ),
        sa.Column("discord_id", sa.String(), nullable=True),
        sa.Column("joined_at", sa.DateTime(), nullable=False),
        sa.Column("last_login", sa.DateTime(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("supabase_id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("discord_id"),
    )
    op.create_index("ix_users_supabase_id", "users", ["supabase_id"])

    op.create_table(
        "role_history",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("user_id", sa.UUID(), nullable=False),
        sa.Column(
            "old_role",
            sa.Enum("MEMBER", "DEV", "ADMIN", name="role", create_type=False),
            nullable=True,
        ),
        sa.Column(
            "new_role",
            sa.Enum("MEMBER", "DEV", "ADMIN", name="role", create_type=False),
            nullable=False,
        ),
        sa.Column("changed_by", sa.UUID(), nullable=True),
        sa.Column("changed_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["changed_by"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("role_history")
    op.drop_table("users")
    sa.Enum(name="role").drop(op.get_bind(), checkfirst=True)
