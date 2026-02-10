"""add_translation_keys_to_subject

Revision ID: eb3af96ee7e8
Revises: 682f2c06daff
Create Date: 2026-02-10 21:35:14.498983

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eb3af96ee7e8'
down_revision: Union[str, None] = '682f2c06daff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add translation key columns
    op.add_column('subjects', sa.Column('name_key', sa.String(length=100), nullable=True))
    op.add_column('subjects', sa.Column('description_key', sa.String(length=100), nullable=True))

    # Make existing 'name' column nullable for backwards compatibility
    op.alter_column('subjects', 'name',
                    existing_type=sa.String(length=200),
                    nullable=True)

    # Migrate existing data: generate translation keys from existing names
    # Format: Convert "Mathematics" -> "subjects.mathematics.name"
    op.execute("""
        UPDATE subjects
        SET name_key = CONCAT('subjects.', LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', '')), '.name')
        WHERE name_key IS NULL AND name IS NOT NULL
    """)

    op.execute("""
        UPDATE subjects
        SET description_key = CONCAT('subjects.', LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', '')), '.description')
        WHERE description_key IS NULL AND name IS NOT NULL AND description IS NOT NULL
    """)

    # Make name_key required after migration
    op.alter_column('subjects', 'name_key',
                    existing_type=sa.String(length=100),
                    nullable=False)


def downgrade() -> None:
    # Make name column required again
    op.alter_column('subjects', 'name',
                    existing_type=sa.String(length=200),
                    nullable=False)

    # Drop translation key columns
    op.drop_column('subjects', 'description_key')
    op.drop_column('subjects', 'name_key')
