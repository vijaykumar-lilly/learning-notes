"""
Database seeding script for testing the learning platform without Claude API.

This script creates:
- 2 sample subjects (Physics, Biology)
- Multiple domains per subject
- Topics with lessons
- Translations in English and Tamil
- Sample exercises

Run: python scripts/seed_test_data.py
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal, engine
from app.models.subject import Subject, SubjectStatus
from app.models.domain import Domain, ContentStatus
from app.models.topic import Topic
from app.models.lesson import Lesson
from app.models.lesson_content import LessonSection
from app.models.translation import Translation
from app.models.exercise import Exercise
from app.models.user import User
from app.utils.security import get_password_hash
from datetime import datetime


def clear_existing_data(db):
    """Clear existing test data"""
    print("Clearing existing data...")
    db.query(Exercise).delete()
    db.query(LessonSection).delete()
    db.query(Lesson).delete()
    db.query(Topic).delete()
    db.query(Domain).delete()
    db.query(Subject).delete()
    db.query(Translation).filter(Translation.namespace.in_(['common', 'physics', 'biology'])).delete()
    db.commit()
    print("✓ Cleared existing data")


def create_admin_user(db):
    """Create admin user for testing"""
    print("\nCreating admin user...")

    # Check if admin already exists
    existing_admin = db.query(User).filter(User.username == "admin").first()
    if existing_admin:
        print("✓ Admin user already exists")
        return existing_admin

    admin = User(
        email="admin@learnhub.com",
        username="admin",
        hashed_password=get_password_hash("admin123"),
        full_name="Admin User",
        preferred_locale="en",
        is_active=True,
        is_admin=True,
        created_at=datetime.utcnow()
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    print(f"✓ Created admin user (username: admin, password: admin123)")
    return admin


def create_test_user(db):
    """Create regular test user"""
    print("Creating test user...")

    # Check if test user already exists
    existing_user = db.query(User).filter(User.username == "student").first()
    if existing_user:
        print("✓ Test user already exists")
        return existing_user

    user = User(
        email="student@example.com",
        username="student",
        hashed_password=get_password_hash("student123"),
        full_name="Test Student",
        preferred_locale="en",
        is_active=True,
        is_admin=False,
        created_at=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    print(f"✓ Created test user (username: student, password: student123)")
    return user


def create_physics_subject(db, admin_id):
    """Create Physics subject with complete curriculum"""
    print("\n=== Creating Physics Subject ===")

    # Create subject
    physics = Subject(
        name_key="subjects.physics.name",
        description_key="subjects.physics.description",
        name="Physics",  # Legacy field
        description="The study of matter, energy, and their interactions",
        grade_level=None,  # Grade-agnostic
        standards="Next Generation Science Standards (NGSS)",
        status=SubjectStatus.PUBLISHED,
        created_by=admin_id,
        reviewed_by=admin_id,
        created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow(),
        published_at=datetime.utcnow(),
        total_domains=0,
        total_topics=0,
        total_lessons=0
    )
    db.add(physics)
    db.commit()
    db.refresh(physics)
    print(f"✓ Created Physics subject (ID: {physics.id})")

    # Create translations
    translations = [
        Translation(locale='en', namespace='common', key='subjects.physics.name', value='Physics'),
        Translation(locale='ta', namespace='common', key='subjects.physics.name', value='இயற்பியல்'),
        Translation(locale='en', namespace='common', key='subjects.physics.description', value='The study of matter, energy, and their interactions'),
        Translation(locale='ta', namespace='common', key='subjects.physics.description', value='பொருள், ஆற்றல் மற்றும் அவற்றின் தொடர்புகள் பற்றிய ஆய்வு'),
    ]
    db.add_all(translations)

    # Create domains
    mechanics = Domain(
        slug="mechanics",
        title_key="domains.mechanics.title",
        description_key="domains.mechanics.description",
        level="High School",
        display_order=1,
        subject_id=physics.id,
        status=ContentStatus.PUBLISHED,
        created_by=admin_id,
        reviewed_by=admin_id,
        created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow()
    )

    electricity = Domain(
        slug="electricity",
        title_key="domains.electricity.title",
        description_key="domains.electricity.description",
        level="High School",
        display_order=2,
        subject_id=physics.id,
        status=ContentStatus.PUBLISHED,
        created_by=admin_id,
        reviewed_by=admin_id,
        created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow()
    )

    db.add_all([mechanics, electricity])
    db.commit()
    db.refresh(mechanics)
    db.refresh(electricity)
    print(f"✓ Created 2 domains: Mechanics, Electricity")

    # Domain translations
    domain_translations = [
        Translation(locale='en', namespace='common', key='domains.mechanics.title', value='Mechanics'),
        Translation(locale='ta', namespace='common', key='domains.mechanics.title', value='இயக்கவியல்'),
        Translation(locale='en', namespace='common', key='domains.mechanics.description', value='Forces, Motion, and Energy'),
        Translation(locale='ta', namespace='common', key='domains.mechanics.description', value='விசைகள், இயக்கம் மற்றும் ஆற்றல்'),

        Translation(locale='en', namespace='common', key='domains.electricity.title', value='Electricity & Magnetism'),
        Translation(locale='ta', namespace='common', key='domains.electricity.title', value='மின்சாரம் மற்றும் காந்தவியல்'),
        Translation(locale='en', namespace='common', key='domains.electricity.description', value='Electric fields, circuits, and magnetic forces'),
        Translation(locale='ta', namespace='common', key='domains.electricity.description', value='மின்புலங்கள், சுற்றுகள் மற்றும் காந்த விசைகள்'),
    ]
    db.add_all(domain_translations)

    # Create topics for Mechanics
    motion_topic = Topic(
        slug="motion",
        title_key="physics.motion.title",
        domain_id=mechanics.id,
        exercise_count=5,
        proof_count=None,
        display_order=1
    )

    forces_topic = Topic(
        slug="forces",
        title_key="physics.forces.title",
        domain_id=mechanics.id,
        exercise_count=4,
        proof_count=None,
        display_order=2
    )

    db.add_all([motion_topic, forces_topic])
    db.commit()
    db.refresh(motion_topic)
    db.refresh(forces_topic)
    print(f"✓ Created 2 topics: Motion, Forces")

    # Topic translations
    topic_translations = [
        Translation(locale='en', namespace='physics', key='motion.title', value='Motion and Velocity'),
        Translation(locale='ta', namespace='physics', key='motion.title', value='இயக்கம் மற்றும் வேகம்'),
        Translation(locale='en', namespace='physics', key='motion.definition.term', value='Velocity'),
        Translation(locale='ta', namespace='physics', key='motion.definition.term', value='வேகம்'),
        Translation(locale='en', namespace='physics', key='motion.definition.definition',
                   value='Velocity is the rate of change of position with respect to time. It is a vector quantity with both magnitude and direction.'),
        Translation(locale='ta', namespace='physics', key='motion.definition.definition',
                   value='வேகம் என்பது காலத்திற்கு ஏற்ப நிலை மாற்றத்தின் விகிதம். இது அளவு மற்றும் திசை இரண்டையும் கொண்ட ஒரு வெக்டர் அளவு.'),

        Translation(locale='en', namespace='physics', key='forces.title', value='Forces and Newton\'s Laws'),
        Translation(locale='ta', namespace='physics', key='forces.title', value='விசைகள் மற்றும் நியூட்டனின் விதிகள்'),
    ]
    db.add_all(topic_translations)

    # Create lesson for Motion topic
    motion_lesson = Lesson(
        topic_id=motion_topic.id,
        estimated_time=45,
        difficulty='intermediate',
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(motion_lesson)
    db.commit()
    db.refresh(motion_lesson)
    print(f"✓ Created lesson for Motion topic")

    # Create lesson sections
    sections = [
        LessonSection(
            lesson_id=motion_lesson.id,
            section_type='before_you_start',
            display_order=1,
            content_json={
                'prerequisites': [
                    {
                        'titleKey': 'physics.motion.prereq1.title',
                        'descriptionKey': 'physics.motion.prereq1.description'
                    },
                    {
                        'titleKey': 'physics.motion.prereq2.title',
                        'descriptionKey': 'physics.motion.prereq2.description'
                    }
                ],
                'learningObjectives': [
                    {'key': 'physics.motion.objective1'},
                    {'key': 'physics.motion.objective2'}
                ]
            }
        ),
        LessonSection(
            lesson_id=motion_lesson.id,
            section_type='definition',
            display_order=2,
            content_json={
                'termKey': 'physics.motion.definition.term',
                'definitionKey': 'physics.motion.definition.definition',
                'examplesKey': 'physics.motion.definition.examples'
            }
        ),
        LessonSection(
            lesson_id=motion_lesson.id,
            section_type='example',
            display_order=3,
            content_json={
                'titleKey': 'physics.motion.example1.title',
                'problemKey': 'physics.motion.example1.problem',
                'stepsKey': 'physics.motion.example1.steps',
                'solutionKey': 'physics.motion.example1.solution'
            }
        ),
        LessonSection(
            lesson_id=motion_lesson.id,
            section_type='note',
            display_order=4,
            content_json={
                'type': 'tip',
                'contentKey': 'physics.motion.note1'
            }
        )
    ]
    db.add_all(sections)
    print(f"✓ Created 4 lesson sections")

    # Create exercises
    exercises = [
        Exercise(
            lesson_id=motion_lesson.id,
            exercise_type='multiple_choice',
            difficulty='easy',
            display_order=1,
            question_key='physics.motion.exercise1.question',
            data_json={
                'choices': [
                    {'id': 'a', 'textKey': 'physics.motion.exercise1.choice_a', 'isCorrect': False},
                    {'id': 'b', 'textKey': 'physics.motion.exercise1.choice_b', 'isCorrect': True},
                    {'id': 'c', 'textKey': 'physics.motion.exercise1.choice_c', 'isCorrect': False},
                    {'id': 'd', 'textKey': 'physics.motion.exercise1.choice_d', 'isCorrect': False}
                ]
            },
            hint_key='physics.motion.exercise1.hint',
            explanation_key='physics.motion.exercise1.explanation'
        ),
        Exercise(
            lesson_id=motion_lesson.id,
            exercise_type='numeric_input',
            difficulty='medium',
            display_order=2,
            question_key='physics.motion.exercise2.question',
            data_json={
                'correctAnswer': 25,
                'tolerance': 0.1,
                'unit': 'm/s'
            },
            hint_key='physics.motion.exercise2.hint',
            explanation_key='physics.motion.exercise2.explanation'
        )
    ]
    db.add_all(exercises)
    print(f"✓ Created 2 exercises")

    # Exercise translations
    exercise_translations = [
        Translation(locale='en', namespace='physics', key='motion.exercise1.question',
                   value='A car travels 100 meters in 10 seconds. What is its average velocity?'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.question',
                   value='ஒரு கார் 10 விநாடிகளில் 100 மீட்டர் பயணிக்கிறது. அதன் சராசரி வேகம் என்ன?'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.choice_a', value='5 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.choice_a', value='5 மீ/வி'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.choice_b', value='10 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.choice_b', value='10 மீ/வி'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.choice_c', value='15 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.choice_c', value='15 மீ/வி'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.choice_d', value='20 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.choice_d', value='20 மீ/வி'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.hint',
                   value='Average velocity = Distance / Time'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.hint',
                   value='சராசரி வேகம் = தூரம் / நேரம்'),
        Translation(locale='en', namespace='physics', key='motion.exercise1.explanation',
                   value='Average velocity = 100m / 10s = 10 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise1.explanation',
                   value='சராசரி வேகம் = 100மீ / 10வி = 10 மீ/வி'),

        Translation(locale='en', namespace='physics', key='motion.exercise2.question',
                   value='A ball is thrown with an initial velocity of 15 m/s and accelerates at 2 m/s² for 5 seconds. What is its final velocity?'),
        Translation(locale='ta', namespace='physics', key='motion.exercise2.question',
                   value='ஒரு பந்து 15 மீ/வி தொடக்க வேகத்துடன் வீசப்பட்டு 5 விநாடிகளுக்கு 2 மீ/வி² முடுக்கம் பெறுகிறது. அதன் இறுதி வேகம் என்ன?'),
        Translation(locale='en', namespace='physics', key='motion.exercise2.hint',
                   value='Use the equation: v = u + at'),
        Translation(locale='ta', namespace='physics', key='motion.exercise2.hint',
                   value='சமன்பாட்டைப் பயன்படுத்தவும்: v = u + at'),
        Translation(locale='en', namespace='physics', key='motion.exercise2.explanation',
                   value='Final velocity v = 15 + (2 × 5) = 15 + 10 = 25 m/s'),
        Translation(locale='ta', namespace='physics', key='motion.exercise2.explanation',
                   value='இறுதி வேகம் v = 15 + (2 × 5) = 15 + 10 = 25 மீ/வி'),
    ]
    db.add_all(exercise_translations)

    # Update subject statistics
    physics.total_domains = 2
    physics.total_topics = 2
    physics.total_lessons = 1

    db.commit()
    print("\n✓ Physics subject complete with:")
    print(f"  - 2 domains (Mechanics, Electricity)")
    print(f"  - 2 topics (Motion, Forces)")
    print(f"  - 1 complete lesson with 4 sections")
    print(f"  - 2 exercises")
    print(f"  - Full English and Tamil translations")


def create_biology_subject(db, admin_id):
    """Create Biology subject (draft status for testing workflow)"""
    print("\n=== Creating Biology Subject (Draft) ===")

    biology = Subject(
        name_key="subjects.biology.name",
        description_key="subjects.biology.description",
        name="Biology",
        description="The study of living organisms",
        grade_level="High School",
        standards="Next Generation Science Standards (NGSS)",
        status=SubjectStatus.DRAFT,  # Draft for testing
        created_by=admin_id,
        created_at=datetime.utcnow(),
        total_domains=0,
        total_topics=0,
        total_lessons=0
    )
    db.add(biology)
    db.commit()
    db.refresh(biology)
    print(f"✓ Created Biology subject (ID: {biology.id}, Status: DRAFT)")

    # Translations
    translations = [
        Translation(locale='en', namespace='common', key='subjects.biology.name', value='Biology'),
        Translation(locale='ta', namespace='common', key='subjects.biology.name', value='உயிரியல்'),
        Translation(locale='en', namespace='common', key='subjects.biology.description', value='The study of living organisms'),
        Translation(locale='ta', namespace='common', key='subjects.biology.description', value='உயிரினங்கள் பற்றிய ஆய்வு'),
    ]
    db.add_all(translations)

    # Create one domain
    cell_biology = Domain(
        slug="cell-biology",
        title_key="domains.cell-biology.title",
        description_key="domains.cell-biology.description",
        level="High School",
        display_order=1,
        subject_id=biology.id,
        status=ContentStatus.DRAFT,
        created_by=admin_id,
        created_at=datetime.utcnow()
    )
    db.add(cell_biology)
    db.commit()
    db.refresh(cell_biology)

    domain_translations = [
        Translation(locale='en', namespace='common', key='domains.cell-biology.title', value='Cell Biology'),
        Translation(locale='ta', namespace='common', key='domains.cell-biology.title', value='செல் உயிரியல்'),
        Translation(locale='en', namespace='common', key='domains.cell-biology.description', value='Structure and function of cells'),
        Translation(locale='ta', namespace='common', key='domains.cell-biology.description', value='செல்களின் அமைப்பு மற்றும் செயல்பாடு'),
    ]
    db.add_all(domain_translations)

    biology.total_domains = 1
    db.commit()

    print("✓ Biology subject (DRAFT) created with:")
    print(f"  - 1 domain (Cell Biology)")
    print(f"  - Status: DRAFT (for testing admin workflow)")


def main():
    """Main seeding function"""
    print("=" * 60)
    print("LearnHub Test Data Seeding Script")
    print("=" * 60)

    db = SessionLocal()

    try:
        # Clear existing data
        clear_existing_data(db)

        # Create users
        admin = create_admin_user(db)
        user = create_test_user(db)

        # Create subjects
        create_physics_subject(db, admin.id)
        create_biology_subject(db, admin.id)

        print("\n" + "=" * 60)
        print("✅ Seeding Complete!")
        print("=" * 60)
        print("\n📊 Database Summary:")
        print(f"  - 2 subjects (Physics: PUBLISHED, Biology: DRAFT)")
        print(f"  - 3 domains")
        print(f"  - 2 topics")
        print(f"  - 1 complete lesson")
        print(f"  - 2 exercises")
        print(f"  - Full bilingual support (English + Tamil)")

        print("\n👤 Test Accounts:")
        print("  Admin:")
        print("    - Username: admin")
        print("    - Password: admin123")
        print("    - Can access admin dashboard")
        print("  Student:")
        print("    - Username: student")
        print("    - Password: student123")

        print("\n🧪 Test URLs (assuming frontend runs on http://localhost:3000):")
        print("  - Homepage: http://localhost:3000/en")
        print("  - Physics Subject: http://localhost:3000/en/subjects/1")
        print("  - Motion Lesson: http://localhost:3000/en/learn/mechanics/motion")
        print("  - Tamil Version: http://localhost:3000/ta")
        print("  - Admin Dashboard: http://localhost:3000/en/admin/dashboard")

        print("\n💡 What to Test:")
        print("  1. Subject selection homepage")
        print("  2. Subject detail page (domains grouped by level)")
        print("  3. Lesson page with interactive components")
        print("  4. Language switcher (English ↔ Tamil)")
        print("  5. Sidebar with dynamic data from API")
        print("  6. Admin login and view draft subjects")
        print("  7. Exercise submission (requires authentication)")

        print("\n📝 Next Steps:")
        print("  1. Start your FastAPI backend: cd backend && uvicorn app.main:app --reload")
        print("  2. Start your Next.js frontend: npm run dev")
        print("  3. Visit http://localhost:3000/en")
        print("  4. Test the complete workflow!")

    except Exception as e:
        print(f"\n❌ Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
