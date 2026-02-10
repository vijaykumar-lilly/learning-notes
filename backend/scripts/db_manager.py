"""
Database Management Script for LearnHub

Commands:
  python scripts/db_manager.py export [--format json|sql] [--output filename]
  python scripts/db_manager.py import [--file filename]
  python scripts/db_manager.py clean [--force]
  python scripts/db_manager.py reset [--force]
  python scripts/db_manager.py backup [--name backup_name]
  python scripts/db_manager.py restore [--name backup_name]
"""

import sys
import json
import argparse
from pathlib import Path
from datetime import datetime
import subprocess

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal, engine
from app.models.subject import Subject
from app.models.domain import Domain
from app.models.topic import Topic
from app.models.lesson import Lesson
from app.models.lesson_content import LessonSection
from app.models.translation import Translation
from app.models.exercise import Exercise
from app.models.user import User
from app.models.progress import LessonProgress, ExerciseSubmission
from sqlalchemy import text


BACKUP_DIR = Path(__file__).parent.parent / "backups"
BACKUP_DIR.mkdir(exist_ok=True)


def confirm_action(message: str) -> bool:
    """Ask user for confirmation"""
    response = input(f"{message} (yes/no): ").lower().strip()
    return response in ['yes', 'y']


def export_json(output_file: str = None):
    """Export database to JSON format"""
    print("=" * 60)
    print("Exporting Database to JSON")
    print("=" * 60)

    db = SessionLocal()

    try:
        # Determine output file
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = str(BACKUP_DIR / f"db_export_{timestamp}.json")

        data = {
            "exported_at": datetime.now().isoformat(),
            "subjects": [],
            "domains": [],
            "topics": [],
            "lessons": [],
            "lesson_sections": [],
            "exercises": [],
            "translations": [],
            "users": [],
            "lesson_progress": [],
            "exercise_submissions": []
        }

        # Export Subjects
        print("\nExporting subjects...", end=" ")
        subjects = db.query(Subject).all()
        for subject in subjects:
            data["subjects"].append({
                "id": subject.id,
                "name_key": subject.name_key,
                "description_key": subject.description_key,
                "name": subject.name,
                "description": subject.description,
                "grade_level": subject.grade_level,
                "standards": subject.standards,
                "status": subject.status.value if subject.status else None,
                "created_by": subject.created_by,
                "reviewed_by": subject.reviewed_by,
                "created_at": subject.created_at.isoformat() if subject.created_at else None,
                "reviewed_at": subject.reviewed_at.isoformat() if subject.reviewed_at else None,
                "published_at": subject.published_at.isoformat() if subject.published_at else None,
                "generation_task_id": subject.generation_task_id,
                "admin_notes": subject.admin_notes,
                "total_domains": subject.total_domains,
                "total_topics": subject.total_topics,
                "total_lessons": subject.total_lessons
            })
        print(f"✓ {len(subjects)} subjects")

        # Export Domains
        print("Exporting domains...", end=" ")
        domains = db.query(Domain).all()
        for domain in domains:
            data["domains"].append({
                "id": domain.id,
                "slug": domain.slug,
                "title_key": domain.title_key,
                "description_key": domain.description_key,
                "level": domain.level,
                "display_order": domain.display_order,
                "subject_id": domain.subject_id,
                "status": domain.status.value if domain.status else None,
                "created_by": domain.created_by,
                "reviewed_by": domain.reviewed_by,
                "created_at": domain.created_at.isoformat() if domain.created_at else None,
                "reviewed_at": domain.reviewed_at.isoformat() if domain.reviewed_at else None
            })
        print(f"✓ {len(domains)} domains")

        # Export Topics
        print("Exporting topics...", end=" ")
        topics = db.query(Topic).all()
        for topic in topics:
            data["topics"].append({
                "id": topic.id,
                "slug": topic.slug,
                "title_key": topic.title_key,
                "domain_id": topic.domain_id,
                "exercise_count": topic.exercise_count,
                "proof_count": topic.proof_count,
                "display_order": topic.display_order
            })
        print(f"✓ {len(topics)} topics")

        # Export Lessons
        print("Exporting lessons...", end=" ")
        lessons = db.query(Lesson).all()
        for lesson in lessons:
            data["lessons"].append({
                "id": lesson.id,
                "topic_id": lesson.topic_id,
                "estimated_time": lesson.estimated_time,
                "difficulty": lesson.difficulty,
                "created_at": lesson.created_at.isoformat() if lesson.created_at else None,
                "updated_at": lesson.updated_at.isoformat() if lesson.updated_at else None
            })
        print(f"✓ {len(lessons)} lessons")

        # Export Lesson Sections
        print("Exporting lesson sections...", end=" ")
        sections = db.query(LessonSection).all()
        for section in sections:
            data["lesson_sections"].append({
                "id": section.id,
                "lesson_id": section.lesson_id,
                "section_type": section.section_type,
                "display_order": section.display_order,
                "content_json": section.content_json
            })
        print(f"✓ {len(sections)} sections")

        # Export Exercises
        print("Exporting exercises...", end=" ")
        exercises = db.query(Exercise).all()
        for exercise in exercises:
            data["exercises"].append({
                "id": exercise.id,
                "lesson_id": exercise.lesson_id,
                "exercise_type": exercise.exercise_type,
                "difficulty": exercise.difficulty,
                "display_order": exercise.display_order,
                "question_key": exercise.question_key,
                "data_json": exercise.data_json,
                "hint_key": exercise.hint_key,
                "explanation_key": exercise.explanation_key
            })
        print(f"✓ {len(exercises)} exercises")

        # Export Translations
        print("Exporting translations...", end=" ")
        translations = db.query(Translation).all()
        for translation in translations:
            data["translations"].append({
                "id": translation.id,
                "locale": translation.locale,
                "namespace": translation.namespace,
                "key": translation.key,
                "value": translation.value
            })
        print(f"✓ {len(translations)} translations")

        # Export Users (exclude sensitive data)
        print("Exporting users...", end=" ")
        users = db.query(User).all()
        for user in users:
            data["users"].append({
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "hashed_password": user.hashed_password,  # Keep for consistency
                "full_name": user.full_name,
                "preferred_locale": user.preferred_locale,
                "is_active": user.is_active,
                "is_admin": user.is_admin,
                "created_at": user.created_at.isoformat() if user.created_at else None
            })
        print(f"✓ {len(users)} users")

        # Export Progress
        print("Exporting lesson progress...", end=" ")
        progress_records = db.query(LessonProgress).all()
        for progress in progress_records:
            data["lesson_progress"].append({
                "id": progress.id,
                "user_id": progress.user_id,
                "lesson_id": progress.lesson_id,
                "status": progress.status,
                "exercises_completed": progress.exercises_completed,
                "time_spent": progress.time_spent,
                "started_at": progress.started_at.isoformat() if progress.started_at else None,
                "completed_at": progress.completed_at.isoformat() if progress.completed_at else None,
                "last_accessed_at": progress.last_accessed_at.isoformat() if progress.last_accessed_at else None
            })
        print(f"✓ {len(progress_records)} records")

        # Export Exercise Submissions
        print("Exporting exercise submissions...", end=" ")
        submissions = db.query(ExerciseSubmission).all()
        for submission in submissions:
            data["exercise_submissions"].append({
                "id": submission.id,
                "user_id": submission.user_id,
                "exercise_id": submission.exercise_id,
                "user_answer": submission.user_answer,
                "is_correct": submission.is_correct,
                "attempts": submission.attempts,
                "submitted_at": submission.submitted_at.isoformat() if submission.submitted_at else None
            })
        print(f"✓ {len(submissions)} submissions")

        # Write to file
        print(f"\nWriting to {output_file}...", end=" ")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("✓")

        # File size
        file_size = Path(output_file).stat().st_size
        print(f"\n✅ Export complete!")
        print(f"   File: {output_file}")
        print(f"   Size: {file_size:,} bytes ({file_size / 1024:.2f} KB)")

    except Exception as e:
        print(f"\n❌ Export failed: {e}")
        raise
    finally:
        db.close()


def export_sql(output_file: str = None):
    """Export database to SQL dump using pg_dump"""
    print("=" * 60)
    print("Exporting Database to SQL")
    print("=" * 60)

    try:
        # Get database URL from config
        from app.config import settings
        db_url = settings.DATABASE_URL

        # Parse database URL
        # Format: postgresql://user:password@host:port/database
        import re
        match = re.match(r'postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)', db_url)
        if not match:
            print("❌ Could not parse DATABASE_URL")
            return

        user, password, host, port, database = match.groups()

        # Determine output file
        if not output_file:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = str(BACKUP_DIR / f"db_export_{timestamp}.sql")

        print(f"\nExporting database '{database}' to {output_file}...")

        # Run pg_dump
        cmd = [
            'pg_dump',
            '-h', host,
            '-p', port,
            '-U', user,
            '-d', database,
            '-f', output_file,
            '--clean',  # Add DROP statements
            '--if-exists',  # Use IF EXISTS
            '--no-owner',  # Don't output ownership commands
            '--no-acl'  # Don't output ACL commands
        ]

        env = {'PGPASSWORD': password}
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)

        if result.returncode == 0:
            file_size = Path(output_file).stat().st_size
            print(f"\n✅ Export complete!")
            print(f"   File: {output_file}")
            print(f"   Size: {file_size:,} bytes ({file_size / 1024:.2f} KB)")
        else:
            print(f"\n❌ pg_dump failed:")
            print(result.stderr)

    except Exception as e:
        print(f"\n❌ Export failed: {e}")
        raise


def import_json(input_file: str):
    """Import database from JSON format"""
    print("=" * 60)
    print("Importing Database from JSON")
    print("=" * 60)

    if not Path(input_file).exists():
        print(f"❌ File not found: {input_file}")
        return

    print(f"\n⚠️  WARNING: This will REPLACE all existing data!")
    if not confirm_action("Continue with import?"):
        print("Import cancelled.")
        return

    db = SessionLocal()

    try:
        # Load data from file
        print(f"\nLoading data from {input_file}...", end=" ")
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print("✓")

        # Clean existing data first
        print("\nCleaning existing data...")
        clean_database(db, force=True)

        # Import in correct order (respecting foreign keys)

        # 1. Users
        print("\nImporting users...", end=" ")
        for user_data in data.get("users", []):
            user = User(**user_data)
            if user.created_at:
                user.created_at = datetime.fromisoformat(user.created_at)
            db.add(user)
        db.commit()
        print(f"✓ {len(data.get('users', []))} users")

        # 2. Subjects
        print("Importing subjects...", end=" ")
        for subject_data in data.get("subjects", []):
            subject_data = subject_data.copy()
            if subject_data.get('created_at'):
                subject_data['created_at'] = datetime.fromisoformat(subject_data['created_at'])
            if subject_data.get('reviewed_at'):
                subject_data['reviewed_at'] = datetime.fromisoformat(subject_data['reviewed_at'])
            if subject_data.get('published_at'):
                subject_data['published_at'] = datetime.fromisoformat(subject_data['published_at'])
            subject = Subject(**subject_data)
            db.add(subject)
        db.commit()
        print(f"✓ {len(data.get('subjects', []))} subjects")

        # 3. Domains
        print("Importing domains...", end=" ")
        for domain_data in data.get("domains", []):
            domain_data = domain_data.copy()
            if domain_data.get('created_at'):
                domain_data['created_at'] = datetime.fromisoformat(domain_data['created_at'])
            if domain_data.get('reviewed_at'):
                domain_data['reviewed_at'] = datetime.fromisoformat(domain_data['reviewed_at'])
            domain = Domain(**domain_data)
            db.add(domain)
        db.commit()
        print(f"✓ {len(data.get('domains', []))} domains")

        # 4. Topics
        print("Importing topics...", end=" ")
        for topic_data in data.get("topics", []):
            topic = Topic(**topic_data)
            db.add(topic)
        db.commit()
        print(f"✓ {len(data.get('topics', []))} topics")

        # 5. Lessons
        print("Importing lessons...", end=" ")
        for lesson_data in data.get("lessons", []):
            lesson_data = lesson_data.copy()
            if lesson_data.get('created_at'):
                lesson_data['created_at'] = datetime.fromisoformat(lesson_data['created_at'])
            if lesson_data.get('updated_at'):
                lesson_data['updated_at'] = datetime.fromisoformat(lesson_data['updated_at'])
            lesson = Lesson(**lesson_data)
            db.add(lesson)
        db.commit()
        print(f"✓ {len(data.get('lessons', []))} lessons")

        # 6. Lesson Sections
        print("Importing lesson sections...", end=" ")
        for section_data in data.get("lesson_sections", []):
            section = LessonSection(**section_data)
            db.add(section)
        db.commit()
        print(f"✓ {len(data.get('lesson_sections', []))} sections")

        # 7. Exercises
        print("Importing exercises...", end=" ")
        for exercise_data in data.get("exercises", []):
            exercise = Exercise(**exercise_data)
            db.add(exercise)
        db.commit()
        print(f"✓ {len(data.get('exercises', []))} exercises")

        # 8. Translations
        print("Importing translations...", end=" ")
        for translation_data in data.get("translations", []):
            translation = Translation(**translation_data)
            db.add(translation)
        db.commit()
        print(f"✓ {len(data.get('translations', []))} translations")

        # 9. Lesson Progress
        print("Importing lesson progress...", end=" ")
        for progress_data in data.get("lesson_progress", []):
            progress_data = progress_data.copy()
            if progress_data.get('started_at'):
                progress_data['started_at'] = datetime.fromisoformat(progress_data['started_at'])
            if progress_data.get('completed_at'):
                progress_data['completed_at'] = datetime.fromisoformat(progress_data['completed_at'])
            if progress_data.get('last_accessed_at'):
                progress_data['last_accessed_at'] = datetime.fromisoformat(progress_data['last_accessed_at'])
            progress = LessonProgress(**progress_data)
            db.add(progress)
        db.commit()
        print(f"✓ {len(data.get('lesson_progress', []))} records")

        # 10. Exercise Submissions
        print("Importing exercise submissions...", end=" ")
        for submission_data in data.get("exercise_submissions", []):
            submission_data = submission_data.copy()
            if submission_data.get('submitted_at'):
                submission_data['submitted_at'] = datetime.fromisoformat(submission_data['submitted_at'])
            submission = ExerciseSubmission(**submission_data)
            db.add(submission)
        db.commit()
        print(f"✓ {len(data.get('exercise_submissions', []))} submissions")

        # Reset sequences
        print("\nResetting ID sequences...", end=" ")
        reset_sequences(db)
        print("✓")

        print(f"\n✅ Import complete!")
        print(f"   Imported from: {input_file}")

    except Exception as e:
        print(f"\n❌ Import failed: {e}")
        db.rollback()
        raise
    finally:
        db.close()


def import_sql(input_file: str):
    """Import database from SQL dump using psql"""
    print("=" * 60)
    print("Importing Database from SQL")
    print("=" * 60)

    if not Path(input_file).exists():
        print(f"❌ File not found: {input_file}")
        return

    print(f"\n⚠️  WARNING: This will REPLACE all existing data!")
    if not confirm_action("Continue with import?"):
        print("Import cancelled.")
        return

    try:
        # Get database URL from config
        from app.config import settings
        db_url = settings.DATABASE_URL

        # Parse database URL
        import re
        match = re.match(r'postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)', db_url)
        if not match:
            print("❌ Could not parse DATABASE_URL")
            return

        user, password, host, port, database = match.groups()

        print(f"\nImporting from {input_file} to database '{database}'...")

        # Run psql
        cmd = [
            'psql',
            '-h', host,
            '-p', port,
            '-U', user,
            '-d', database,
            '-f', input_file
        ]

        env = {'PGPASSWORD': password}
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)

        if result.returncode == 0:
            print(f"\n✅ Import complete!")
        else:
            print(f"\n❌ psql failed:")
            print(result.stderr)

    except Exception as e:
        print(f"\n❌ Import failed: {e}")
        raise


def clean_database(db=None, force=False):
    """Clean all data from database"""
    print("=" * 60)
    print("Cleaning Database")
    print("=" * 60)

    if not force:
        print("\n⚠️  WARNING: This will DELETE ALL DATA from the database!")
        print("This action cannot be undone.")
        if not confirm_action("Are you sure you want to continue?"):
            print("Clean operation cancelled.")
            return

    close_db = False
    if db is None:
        db = SessionLocal()
        close_db = True

    try:
        print("\nDeleting data in correct order (respecting foreign keys)...")

        # Delete in reverse order of dependencies
        print("  - Exercise submissions...", end=" ")
        count = db.query(ExerciseSubmission).delete()
        print(f"✓ {count} deleted")

        print("  - Lesson progress...", end=" ")
        count = db.query(LessonProgress).delete()
        print(f"✓ {count} deleted")

        print("  - Exercises...", end=" ")
        count = db.query(Exercise).delete()
        print(f"✓ {count} deleted")

        print("  - Lesson sections...", end=" ")
        count = db.query(LessonSection).delete()
        print(f"✓ {count} deleted")

        print("  - Lessons...", end=" ")
        count = db.query(Lesson).delete()
        print(f"✓ {count} deleted")

        print("  - Topics...", end=" ")
        count = db.query(Topic).delete()
        print(f"✓ {count} deleted")

        print("  - Domains...", end=" ")
        count = db.query(Domain).delete()
        print(f"✓ {count} deleted")

        print("  - Subjects...", end=" ")
        count = db.query(Subject).delete()
        print(f"✓ {count} deleted")

        print("  - Translations...", end=" ")
        count = db.query(Translation).delete()
        print(f"✓ {count} deleted")

        print("  - Users...", end=" ")
        count = db.query(User).delete()
        print(f"✓ {count} deleted")

        db.commit()

        # Reset sequences
        print("\nResetting ID sequences...", end=" ")
        reset_sequences(db)
        print("✓")

        print("\n✅ Database cleaned successfully!")

    except Exception as e:
        print(f"\n❌ Clean failed: {e}")
        db.rollback()
        raise
    finally:
        if close_db:
            db.close()


def reset_sequences(db):
    """Reset all ID sequences to 1"""
    tables = [
        'users', 'subjects', 'domains', 'topics', 'lessons',
        'lesson_sections', 'exercises', 'translations',
        'lesson_progress', 'exercise_submissions'
    ]

    for table in tables:
        try:
            db.execute(text(f"ALTER SEQUENCE {table}_id_seq RESTART WITH 1"))
        except Exception:
            # Sequence might not exist, skip
            pass

    db.commit()


def reset_database(force=False):
    """Clean database and run seed script"""
    print("=" * 60)
    print("Resetting Database")
    print("=" * 60)

    if not force:
        print("\n⚠️  WARNING: This will DELETE ALL DATA and reseed with test data!")
        if not confirm_action("Are you sure you want to continue?"):
            print("Reset operation cancelled.")
            return

    # Clean database
    clean_database(force=True)

    # Run seed script
    print("\n" + "=" * 60)
    print("Running Seed Script")
    print("=" * 60)

    seed_script = Path(__file__).parent / "seed_test_data.py"
    result = subprocess.run([sys.executable, str(seed_script)])

    if result.returncode == 0:
        print("\n✅ Database reset complete!")
    else:
        print("\n❌ Seed script failed!")


def backup_database(backup_name: str = None):
    """Create a named backup"""
    if not backup_name:
        backup_name = datetime.now().strftime("%Y%m%d_%H%M%S")

    output_file = str(BACKUP_DIR / f"backup_{backup_name}.json")
    export_json(output_file)

    print(f"\n💾 Backup saved as: {backup_name}")
    print(f"   To restore: python scripts/db_manager.py restore --name {backup_name}")


def restore_database(backup_name: str):
    """Restore from a named backup"""
    input_file = str(BACKUP_DIR / f"backup_{backup_name}.json")

    if not Path(input_file).exists():
        print(f"❌ Backup not found: {backup_name}")
        print(f"\nAvailable backups:")
        list_backups()
        return

    import_json(input_file)


def list_backups():
    """List all available backups"""
    backups = sorted(BACKUP_DIR.glob("backup_*.json"))

    if not backups:
        print("No backups found.")
        return

    print(f"\nAvailable backups in {BACKUP_DIR}:")
    for backup in backups:
        name = backup.stem.replace("backup_", "")
        size = backup.stat().st_size
        modified = datetime.fromtimestamp(backup.stat().st_mtime)
        print(f"  - {name:<30} {size:>10,} bytes  {modified.strftime('%Y-%m-%d %H:%M:%S')}")


def main():
    parser = argparse.ArgumentParser(
        description="Database Management Script for LearnHub",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/db_manager.py export --format json
  python scripts/db_manager.py export --format sql --output backup.sql
  python scripts/db_manager.py import --file backup.json
  python scripts/db_manager.py clean
  python scripts/db_manager.py reset
  python scripts/db_manager.py backup --name before_test
  python scripts/db_manager.py restore --name before_test
  python scripts/db_manager.py list-backups
        """
    )

    parser.add_argument('command', choices=[
        'export', 'import', 'clean', 'reset',
        'backup', 'restore', 'list-backups'
    ])
    parser.add_argument('--format', choices=['json', 'sql'], default='json',
                       help='Export format (default: json)')
    parser.add_argument('--output', help='Output file path')
    parser.add_argument('--file', help='Input file path for import')
    parser.add_argument('--name', help='Backup name')
    parser.add_argument('--force', action='store_true',
                       help='Skip confirmation prompts')

    args = parser.parse_args()

    try:
        if args.command == 'export':
            if args.format == 'json':
                export_json(args.output)
            else:
                export_sql(args.output)

        elif args.command == 'import':
            if not args.file:
                print("❌ Error: --file argument is required for import")
                return

            if args.file.endswith('.json'):
                import_json(args.file)
            else:
                import_sql(args.file)

        elif args.command == 'clean':
            clean_database(force=args.force)

        elif args.command == 'reset':
            reset_database(force=args.force)

        elif args.command == 'backup':
            backup_database(args.name)

        elif args.command == 'restore':
            if not args.name:
                print("❌ Error: --name argument is required for restore")
                return
            restore_database(args.name)

        elif args.command == 'list-backups':
            list_backups()

    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
