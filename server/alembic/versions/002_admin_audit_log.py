"""admin audit log

Revision ID: 002
Revises: 001
Create Date: 2026-06-28

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    action_enum = sa.Enum(
        "CREATE", "DELETE", "DEACTIVATE", "REACTIVATE", name="admin_action"
    )
    action_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "admin_audit_log",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("actor_id", sa.UUID(), nullable=False),
        sa.Column(
            "action",
            sa.Enum(
                "CREATE",
                "DELETE",
                "DEACTIVATE",
                "REACTIVATE",
                name="admin_action",
                create_type=False,
            ),
            nullable=False,
        ),
        sa.Column("resource", sa.String(), nullable=False),
        sa.Column("target_id", sa.String(), nullable=False),
        sa.Column("detail", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["actor_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("admin_audit_log")
    sa.Enum(name="admin_action").drop(op.get_bind(), checkfirst=True)
