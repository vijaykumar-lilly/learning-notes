#!/usr/bin/env python3
"""
Data Migration Script: Static Files → PostgreSQL Database

This script migrates data from the static Next.js application to the PostgreSQL database:
1. Curriculum data from lib/curriculum-data.ts
2. Translations from messages/{locale}/*.json
3. Lesson content from app/[locale]/learn/**/*.tsx (manual/future)

Usage:
    python scripts/migrate_static_to_db.py [--curriculum] [--translations] [--all]
"""

import sys
import os
import json
import re
from pathlib import Path
from typing import Dict, List, Any, Optional

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal
from app.models.domain import Domain
from app.models.topic import Topic
from app.models.translation import Translation
from sqlalchemy.exc import IntegrityError


class MigrationStats:
    """Track migration statistics"""
    def __init__(self):
        self.domains_created = 0
        self.topics_created = 0
        self.translations_created = 0
        self.errors = []

    def print_summary(self):
        print("\n" + "="*60)
        print("MIGRATION SUMMARY")
        print("="*60)
        print(f"✓ Domains created:      {self.domains_created}")
        print(f"✓ Topics created:       {self.topics_created}")
        print(f"✓ Translations created: {self.translations_created}")

        if self.errors:
            print(f"\n⚠ Errors encountered:   {len(self.errors)}")
            for error in self.errors[:5]:  # Show first 5 errors
                print(f"  - {error}")
            if len(self.errors) > 5:
                print(f"  ... and {len(self.errors) - 5} more")
        else:
            print("\n✓ No errors encountered!")
        print("="*60)


def parse_typescript_curriculum(file_path: str) -> List[Dict[str, Any]]:
    """
    Parse curriculum-data.ts to extract domain and topic information.
    Uses regex to extract the JavaScript object literal.
    """
    print(f"\n📖 Parsing curriculum data from: {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the curriculumData array - look for the array up to the closing bracket
    match = re.search(r'export const curriculumData: Domain\[\] = (\[[\s\S]*?\n\])', content)
    if not match:
        raise ValueError("Could not find curriculumData array in file")

    # Extract the array content
    array_content = match.group(1)

    # Clean up TypeScript-specific syntax
    # Remove trailing commas before closing braces/brackets
    array_content = re.sub(r',(\s*[}\]])', r'\1', array_content)

    # Quote unquoted property names (JavaScript → JSON)
    # Match word characters followed by colon (but not inside quotes)
    array_content = re.sub(r'(\s)([a-zA-Z_][a-zA-Z0-9_]*?)(\s*):', r'\1"\2"\3:', array_content)

    # Convert JavaScript single quotes to double quotes
    array_content = array_content.replace("'", '"')

    try:
        domains = json.loads(array_content)
        print(f"✓ Successfully parsed {len(domains)} domains")
        return domains
    except json.JSONDecodeError as e:
        print(f"❌ Failed to parse curriculum data: {e}")
        raise


def migrate_curriculum(db: SessionLocal, curriculum_file: str, stats: MigrationStats):
    """
    Migrate domains and topics from curriculum-data.ts to database.
    """
    print("\n" + "="*60)
    print("PHASE 1: MIGRATING CURRICULUM DATA")
    print("="*60)

    # Parse curriculum file
    domains_data = parse_typescript_curriculum(curriculum_file)

    for domain_data in domains_data:
        try:
            # Check if domain already exists
            existing_domain = db.query(Domain).filter(Domain.slug == domain_data['slug']).first()

            if existing_domain:
                print(f"⏭  Domain '{domain_data['slug']}' already exists, skipping...")
                domain = existing_domain
            else:
                # Create domain
                domain = Domain(
                    slug=domain_data['slug'],
                    title_key=f"domains.{domain_data['slug']}.title",
                    description_key=f"domains.{domain_data['slug']}.description",
                    level=domain_data['level'],
                    display_order=int(domain_data['id'])
                )
                db.add(domain)
                db.flush()  # Get the ID without committing
                print(f"✓ Created domain: {domain.slug} (level: {domain.level})")
                stats.domains_created += 1

            # Create topics for this domain
            for idx, topic_data in enumerate(domain_data['topics'], start=1):
                try:
                    existing_topic = db.query(Topic).filter(Topic.slug == topic_data['slug']).first()

                    if existing_topic:
                        print(f"  ⏭  Topic '{topic_data['slug']}' already exists, skipping...")
                        continue

                    topic = Topic(
                        slug=topic_data['slug'],
                        title_key=f"topics.{topic_data['slug']}.title",
                        domain_id=domain.id,
                        exercise_count=topic_data['exerciseCount'],
                        proof_count=topic_data.get('proofCount'),
                        display_order=idx
                    )
                    db.add(topic)
                    print(f"  ✓ Created topic: {topic.slug} ({topic.exercise_count} exercises)")
                    stats.topics_created += 1

                except IntegrityError as e:
                    db.rollback()
                    error_msg = f"Failed to create topic {topic_data.get('slug', 'unknown')}: {str(e)}"
                    print(f"  ❌ {error_msg}")
                    stats.errors.append(error_msg)

            # Commit after each domain and its topics
            db.commit()

        except IntegrityError as e:
            db.rollback()
            error_msg = f"Failed to create domain {domain_data.get('slug', 'unknown')}: {str(e)}"
            print(f"❌ {error_msg}")
            stats.errors.append(error_msg)
        except Exception as e:
            db.rollback()
            error_msg = f"Unexpected error with domain {domain_data.get('slug', 'unknown')}: {str(e)}"
            print(f"❌ {error_msg}")
            stats.errors.append(error_msg)


def flatten_json(data: Dict[str, Any], parent_key: str = '') -> Dict[str, str]:
    """
    Flatten nested JSON into dot-notation keys.
    Example: {"definition": {"term": "value"}} → {"definition.term": "value"}
    """
    items = []
    for k, v in data.items():
        new_key = f"{parent_key}.{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_json(v, new_key).items())
        elif isinstance(v, str):
            items.append((new_key, v))
        else:
            # Convert other types to string
            items.append((new_key, str(v)))
    return dict(items)


def migrate_translations(db: SessionLocal, messages_dir: str, stats: MigrationStats):
    """
    Migrate translation files from messages/{locale}/*.json to database.
    """
    print("\n" + "="*60)
    print("PHASE 2: MIGRATING TRANSLATIONS")
    print("="*60)

    messages_path = Path(messages_dir)

    if not messages_path.exists():
        print(f"❌ Messages directory not found: {messages_dir}")
        return

    # Find all locale directories
    locales = [d for d in messages_path.iterdir() if d.is_dir()]

    for locale_dir in locales:
        locale = locale_dir.name
        print(f"\n📖 Processing locale: {locale}")

        # Find all JSON files in this locale
        json_files = list(locale_dir.glob('*.json'))
        print(f"   Found {len(json_files)} translation files")

        for json_file in json_files:
            # Skip backup files
            if 'backup' in json_file.name:
                print(f"  ⏭  Skipping backup file: {json_file.name}")
                continue

            namespace = json_file.stem  # filename without .json

            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    translations_data = json.load(f)

                # Flatten nested JSON
                flat_translations = flatten_json(translations_data)

                print(f"  📝 Processing {namespace}.json ({len(flat_translations)} keys)")

                # Insert translations
                for key, value in flat_translations.items():
                    try:
                        # Check if translation already exists
                        existing = db.query(Translation).filter(
                            Translation.locale == locale,
                            Translation.namespace == namespace,
                            Translation.key == key
                        ).first()

                        if existing:
                            # Update existing translation
                            if existing.value != value:
                                existing.value = value
                                print(f"    ↻ Updated: {key}")
                        else:
                            # Create new translation
                            translation = Translation(
                                locale=locale,
                                namespace=namespace,
                                key=key,
                                value=value
                            )
                            db.add(translation)
                            stats.translations_created += 1

                    except IntegrityError as e:
                        db.rollback()
                        error_msg = f"Failed to insert translation {locale}.{namespace}.{key}"
                        stats.errors.append(error_msg)

                # Commit after each file
                db.commit()
                print(f"  ✓ Completed {namespace}.json")

            except json.JSONDecodeError as e:
                error_msg = f"Failed to parse {json_file}: {str(e)}"
                print(f"  ❌ {error_msg}")
                stats.errors.append(error_msg)
            except Exception as e:
                db.rollback()
                error_msg = f"Error processing {json_file}: {str(e)}"
                print(f"  ❌ {error_msg}")
                stats.errors.append(error_msg)


def verify_migration(db: SessionLocal):
    """
    Verify that migration was successful by checking data counts.
    """
    print("\n" + "="*60)
    print("VERIFICATION")
    print("="*60)

    domain_count = db.query(Domain).count()
    topic_count = db.query(Topic).count()
    translation_count = db.query(Translation).count()

    print(f"\n📊 Database Statistics:")
    print(f"   Domains:      {domain_count}")
    print(f"   Topics:       {topic_count}")
    print(f"   Translations: {translation_count}")

    # Check translation coverage
    en_translations = db.query(Translation).filter(Translation.locale == 'en').count()
    ta_translations = db.query(Translation).filter(Translation.locale == 'ta').count()

    print(f"\n🌐 Translation Coverage:")
    print(f"   English (en): {en_translations} keys")
    print(f"   Tamil (ta):   {ta_translations} keys")

    if en_translations > 0 and ta_translations == 0:
        print(f"   ⚠ Warning: No Tamil translations found!")
    elif ta_translations < en_translations * 0.9:
        percentage = (ta_translations / en_translations) * 100
        print(f"   ⚠ Warning: Tamil coverage is only {percentage:.1f}%")

    # Check for topics without lessons
    topics_without_lessons = db.query(Topic).filter(Topic.lesson == None).count()
    if topics_without_lessons > 0:
        print(f"\n📝 Topics without lessons: {topics_without_lessons}")
        print(f"   (This is expected - lessons will be created separately)")


def main():
    """Main migration function"""
    import argparse

    parser = argparse.ArgumentParser(description='Migrate static content to database')
    parser.add_argument('--curriculum', action='store_true', help='Migrate curriculum data')
    parser.add_argument('--translations', action='store_true', help='Migrate translation files')
    parser.add_argument('--all', action='store_true', help='Migrate everything')
    parser.add_argument('--verify-only', action='store_true', help='Only verify existing data')

    args = parser.parse_args()

    # If no args, default to --all
    if not any([args.curriculum, args.translations, args.all, args.verify_only]):
        args.all = True

    # Determine project root (parent of backend/)
    script_dir = Path(__file__).parent.parent.parent
    curriculum_file = script_dir / 'lib' / 'curriculum-data.ts'
    messages_dir = script_dir / 'messages'

    print("="*60)
    print("MATH LEARNING PLATFORM - DATA MIGRATION")
    print("="*60)
    print(f"Project root: {script_dir}")
    print(f"Curriculum file: {curriculum_file}")
    print(f"Messages directory: {messages_dir}")

    # Initialize database session
    db = SessionLocal()
    stats = MigrationStats()

    try:
        if args.verify_only:
            verify_migration(db)
            return

        # Migrate curriculum
        if args.curriculum or args.all:
            if curriculum_file.exists():
                migrate_curriculum(db, str(curriculum_file), stats)
            else:
                print(f"❌ Curriculum file not found: {curriculum_file}")

        # Migrate translations
        if args.translations or args.all:
            if messages_dir.exists():
                migrate_translations(db, str(messages_dir), stats)
            else:
                print(f"❌ Messages directory not found: {messages_dir}")

        # Verify migration
        verify_migration(db)

        # Print summary
        stats.print_summary()

    except Exception as e:
        print(f"\n❌ Fatal error during migration: {str(e)}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()


if __name__ == '__main__':
    main()
