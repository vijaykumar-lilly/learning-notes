"""
LearningHub Demo Data Seed Script
===================================
Populates the database with complete, working demo content.

Creates:
- Admin + Student users
- Mathematics subject (PUBLISHED) with 3 domains, 7 topics, 7 lessons
- Computer Science subject (DRAFT) for testing admin workflow
- All lesson sections use INLINE content (not translation keys)
- All exercises have correct data format for frontend rendering
- Complete English + Tamil translations for all navigation elements

Run: cd backend && python scripts/seed_demo_data.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database import SessionLocal, engine, Base
from app.models.subject import Subject, SubjectStatus
from app.models.domain import Domain, ContentStatus
from app.models.topic import Topic
from app.models.lesson import Lesson
from app.models.lesson_content import LessonSection
from app.models.translation import Translation
from app.models.exercise import Exercise
from app.models.user import User
from app.models.progress import LessonProgress, ExerciseSubmission
from app.utils.security import get_password_hash
from app.models import DifficultyLevel, ExerciseDifficulty
from datetime import datetime


# ============================================================================
# HELPERS
# ============================================================================

def t(db, locale, namespace, key, value):
    """Create or update a translation"""
    existing = db.query(Translation).filter_by(
        locale=locale, namespace=namespace, key=key
    ).first()
    if existing:
        existing.value = value
    else:
        db.add(Translation(locale=locale, namespace=namespace, key=key, value=value))


def clear_all(db):
    """Clear all content data (preserves user accounts)"""
    print("Clearing existing data...")
    db.query(ExerciseSubmission).delete()
    db.query(LessonProgress).delete()
    db.query(Exercise).delete()
    db.query(LessonSection).delete()
    db.query(Lesson).delete()
    db.query(Topic).delete()
    db.query(Domain).delete()
    db.query(Subject).delete()
    db.query(Translation).delete()
    db.commit()
    print("  ✓ Cleared")


def ensure_users(db):
    """Create admin and student users if they don't exist"""
    admin = db.query(User).filter_by(username="admin").first()
    if not admin:
        admin = User(
            email="admin@learninghub.com", username="admin",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User", preferred_locale="en",
            is_active=True, is_admin=True
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print("  ✓ Created admin (admin / admin123)")
    else:
        print("  ✓ Admin exists")

    student = db.query(User).filter_by(username="student").first()
    if not student:
        student = User(
            email="student@example.com", username="student",
            hashed_password=get_password_hash("student123"),
            full_name="Maya Sharma", preferred_locale="en",
            is_active=True, is_admin=False
        )
        db.add(student)
        db.commit()
        db.refresh(student)
        print("  ✓ Created student (student / student123)")
    else:
        print("  ✓ Student exists")

    return admin, student


# ============================================================================
# MATHEMATICS SUBJECT (PUBLISHED - Full demo content)
# ============================================================================

def create_mathematics(db, admin_id):
    print("\n=== Creating Mathematics ===")

    # --- Subject ---
    math = Subject(
        name_key="subjects.mathematics.name",
        description_key="subjects.mathematics.description",
        name="Mathematics",
        description="From basic arithmetic to advanced algebra — master mathematics step by step",
        grade_level="High School",
        status=SubjectStatus.PUBLISHED,
        created_by=admin_id, reviewed_by=admin_id,
        created_at=datetime.utcnow(), reviewed_at=datetime.utcnow(),
        published_at=datetime.utcnow(),
        total_domains=3, total_topics=7, total_lessons=7,
    )
    db.add(math)
    db.commit()
    db.refresh(math)

    # Subject translations
    t(db, 'en', 'common', 'subjects.mathematics.name', 'Mathematics')
    t(db, 'ta', 'common', 'subjects.mathematics.name', 'கணிதம்')
    t(db, 'en', 'common', 'subjects.mathematics.description',
      'From basic arithmetic to advanced algebra — master mathematics step by step')
    t(db, 'ta', 'common', 'subjects.mathematics.description',
      'அடிப்படை எண்கணிதத்திலிருந்து மேம்பட்ட இயற்கணிதம் வரை — படிப்படியாக கணிதத்தை மாஸ்டர் செய்யுங்கள்')

    # ---------------------------------------------------------------
    # DOMAIN 1: Algebra
    # ---------------------------------------------------------------
    algebra = Domain(
        slug="algebra", title_key="domains.algebra.title",
        description_key="domains.algebra.description",
        level="Beginner", display_order=1, subject_id=math.id,
        status=ContentStatus.PUBLISHED, created_by=admin_id,
        reviewed_by=admin_id, created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow(),
    )
    db.add(algebra)
    db.commit()
    db.refresh(algebra)

    t(db, 'en', 'common', 'domains.algebra.title', 'Algebra')
    t(db, 'ta', 'common', 'domains.algebra.title', 'இயற்கணிதம்')
    t(db, 'en', 'common', 'domains.algebra.description', 'Variables, expressions, equations and functions')
    t(db, 'ta', 'common', 'domains.algebra.description', 'மாறிகள், கோவைகள், சமன்பாடுகள் மற்றும் சார்புகள்')

    # --- Topic 1: Linear Equations ---
    _create_linear_equations(db, algebra.id, admin_id)

    # --- Topic 2: Quadratic Equations ---
    _create_quadratic_equations(db, algebra.id, admin_id)

    # --- Topic 3: Polynomials ---
    _create_polynomials(db, algebra.id, admin_id)

    # ---------------------------------------------------------------
    # DOMAIN 2: Geometry
    # ---------------------------------------------------------------
    geometry = Domain(
        slug="geometry", title_key="domains.geometry.title",
        description_key="domains.geometry.description",
        level="Intermediate", display_order=2, subject_id=math.id,
        status=ContentStatus.PUBLISHED, created_by=admin_id,
        reviewed_by=admin_id, created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow(),
    )
    db.add(geometry)
    db.commit()
    db.refresh(geometry)

    t(db, 'en', 'common', 'domains.geometry.title', 'Geometry')
    t(db, 'ta', 'common', 'domains.geometry.title', 'வடிவியல்')
    t(db, 'en', 'common', 'domains.geometry.description', 'Shapes, angles, areas and spatial reasoning')
    t(db, 'ta', 'common', 'domains.geometry.description', 'வடிவங்கள், கோணங்கள், பரப்புகள் மற்றும் இட அறிவு')

    _create_triangles(db, geometry.id, admin_id)
    _create_circles(db, geometry.id, admin_id)

    # ---------------------------------------------------------------
    # DOMAIN 3: Arithmetic
    # ---------------------------------------------------------------
    arithmetic = Domain(
        slug="arithmetic", title_key="domains.arithmetic.title",
        description_key="domains.arithmetic.description",
        level="Beginner", display_order=3, subject_id=math.id,
        status=ContentStatus.PUBLISHED, created_by=admin_id,
        reviewed_by=admin_id, created_at=datetime.utcnow(),
        reviewed_at=datetime.utcnow(),
    )
    db.add(arithmetic)
    db.commit()
    db.refresh(arithmetic)

    t(db, 'en', 'common', 'domains.arithmetic.title', 'Arithmetic')
    t(db, 'ta', 'common', 'domains.arithmetic.title', 'எண்கணிதம்')
    t(db, 'en', 'common', 'domains.arithmetic.description', 'Fractions, percentages, ratios and number operations')
    t(db, 'ta', 'common', 'domains.arithmetic.description', 'பின்னங்கள், சதவீதங்கள், விகிதங்கள் மற்றும் எண் செயல்பாடுகள்')

    _create_fractions(db, arithmetic.id, admin_id)
    _create_percentages(db, arithmetic.id, admin_id)

    db.commit()
    print(f"  ✓ Mathematics complete: 3 domains, 7 topics, 7 lessons")
    return math


# ============================================================================
# TOPIC BUILDERS — each creates topic + lesson + sections + exercises
# ============================================================================

def _create_linear_equations(db, domain_id, admin_id):
    slug = "linear-equations"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=4, display_order=1)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Linear Equations')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'நேரியல் சமன்பாடுகள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=20,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    # Sections — content is INLINE, matching what the frontend renderer expects
    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Linear Equation",
                "definition": "A linear equation is an equation where the highest power of the variable is 1. It can be written in the form ax + b = 0, where a ≠ 0.",
                "examples": ["2x + 3 = 7", "5y − 10 = 0", "x/2 = 4"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=2,
            content_json={
                "title": "Solving a Simple Linear Equation",
                "problem": "Solve for x: 3x + 5 = 20",
                "hint": "Isolate x by performing the same operation on both sides.",
                "solution": "Step 1: Subtract 5 from both sides → 3x = 15\nStep 2: Divide both sides by 3 → x = 5\n\nAnswer: x = 5"
            }),
        LessonSection(lesson_id=lesson.id, section_type='note', display_order=3,
            content_json={
                "type": "tip",
                "content": "Always check your answer by substituting it back into the original equation. For x = 5: 3(5) + 5 = 15 + 5 = 20 ✓"
            }),
        LessonSection(lesson_id=lesson.id, section_type='common_mistake', display_order=4,
            content_json={
                "title": "Sign Errors When Moving Terms",
                "wrong": "3x + 5 = 20 → 3x = 20 + 5 = 25",
                "correct": "3x + 5 = 20 → 3x = 20 − 5 = 15",
                "explanation": "When you move a term to the other side, the sign flips: +5 becomes −5."
            }),
    ])

    # Exercises — choices have 'text' (not 'textKey') and data has 'correctAnswer'
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{slug}.ex1.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "x = 3", "isCorrect": False},
                         {"id": "b", "text": "x = 4", "isCorrect": True},
                         {"id": "c", "text": "x = 5", "isCorrect": False},
                         {"id": "d", "text": "x = 6", "isCorrect": False},
                     ],
                     "correctAnswer": "b"
                 },
                 hint_key=f'{slug}.ex1.hint',
                 explanation_key=f'{slug}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.easy, display_order=2,
                 question_key=f'{slug}.ex2.q',
                 data_json={"correctAnswer": 7, "tolerance": 0.01},
                 hint_key=f'{slug}.ex2.hint',
                 explanation_key=f'{slug}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.medium, display_order=3,
                 question_key=f'{slug}.ex3.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "x = −2", "isCorrect": False},
                         {"id": "b", "text": "x = 2", "isCorrect": False},
                         {"id": "c", "text": "x = 3", "isCorrect": True},
                         {"id": "d", "text": "x = −3", "isCorrect": False},
                     ],
                     "correctAnswer": "c"
                 },
                 hint_key=f'{slug}.ex3.hint',
                 explanation_key=f'{slug}.ex3.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.hard, display_order=4,
                 question_key=f'{slug}.ex4.q',
                 data_json={"correctAnswer": -2, "tolerance": 0.01},
                 hint_key=f'{slug}.ex4.hint',
                 explanation_key=f'{slug}.ex4.exp'),
    ])

    # Exercise translations
    ns = slug
    t(db, 'en', ns, 'ex1.q', 'Solve: 2x − 1 = 7. What is x?')
    t(db, 'ta', ns, 'ex1.q', 'தீர்க்கவும்: 2x − 1 = 7. x இன் மதிப்பு என்ன?')
    t(db, 'en', ns, 'ex1.hint', 'Add 1 to both sides first, then divide by 2.')
    t(db, 'ta', ns, 'ex1.hint', 'முதலில் இரு பக்கங்களிலும் 1 கூட்டவும், பின்னர் 2 ஆல் வகுக்கவும்.')
    t(db, 'en', ns, 'ex1.exp', '2x − 1 = 7 → 2x = 8 → x = 4')
    t(db, 'ta', ns, 'ex1.exp', '2x − 1 = 7 → 2x = 8 → x = 4')

    t(db, 'en', ns, 'ex2.q', 'Solve: 5x − 10 = 25. Enter the value of x.')
    t(db, 'ta', ns, 'ex2.q', 'தீர்க்கவும்: 5x − 10 = 25. x இன் மதிப்பை உள்ளிடவும்.')
    t(db, 'en', ns, 'ex2.hint', 'Add 10 to both sides, then divide by 5.')
    t(db, 'ta', ns, 'ex2.hint', 'இரு பக்கங்களிலும் 10 கூட்டவும், பின்னர் 5 ஆல் வகுக்கவும்.')
    t(db, 'en', ns, 'ex2.exp', '5x − 10 = 25 → 5x = 35 → x = 7')
    t(db, 'ta', ns, 'ex2.exp', '5x − 10 = 25 → 5x = 35 → x = 7')

    t(db, 'en', ns, 'ex3.q', 'Solve: 4(x − 1) = 8. What is x?')
    t(db, 'ta', ns, 'ex3.q', 'தீர்க்கவும்: 4(x − 1) = 8. x இன் மதிப்பு என்ன?')
    t(db, 'en', ns, 'ex3.hint', 'First expand the bracket, or divide both sides by 4.')
    t(db, 'ta', ns, 'ex3.hint', 'முதலில் அடைப்புக்குறியை விரிவாக்கவும், அல்லது இரு பக்கங்களையும் 4 ஆல் வகுக்கவும்.')
    t(db, 'en', ns, 'ex3.exp', '4(x−1) = 8 → x−1 = 2 → x = 3')
    t(db, 'ta', ns, 'ex3.exp', '4(x−1) = 8 → x−1 = 2 → x = 3')

    t(db, 'en', ns, 'ex4.q', 'Solve: 3x + 12 = 2x + 10. Enter the value of x.')
    t(db, 'ta', ns, 'ex4.q', 'தீர்க்கவும்: 3x + 12 = 2x + 10. x இன் மதிப்பை உள்ளிடவும்.')
    t(db, 'en', ns, 'ex4.hint', 'Move all x terms to one side and constants to the other.')
    t(db, 'ta', ns, 'ex4.hint', 'எல்லா x உறுப்புகளையும் ஒரு பக்கத்திலும், மாறிலிகளை மறுபக்கத்திலும் நகர்த்தவும்.')
    t(db, 'en', ns, 'ex4.exp', '3x + 12 = 2x + 10 → x = −2')
    t(db, 'ta', ns, 'ex4.exp', '3x + 12 = 2x + 10 → x = −2')

    print(f"  ✓ Linear Equations: 4 sections, 4 exercises")


def _create_quadratic_equations(db, domain_id, admin_id):
    slug = "quadratic-equations"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=2)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Quadratic Equations')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'இருபடி சமன்பாடுகள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=25,
                    difficulty=DifficultyLevel.intermediate)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Quadratic Equation",
                "definition": "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0, where a ≠ 0. The solutions can be found using factoring, completing the square, or the quadratic formula.",
                "examples": ["x² + 5x + 6 = 0", "2x² − 3x = 0", "x² = 16"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=2,
            content_json={
                "term": "The Quadratic Formula",
                "definition": "For ax² + bx + c = 0, the solutions are: x = (−b ± √(b² − 4ac)) / 2a. The expression b² − 4ac is called the discriminant.",
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=3,
            content_json={
                "title": "Solving by Factoring",
                "problem": "Solve: x² + 5x + 6 = 0",
                "hint": "Find two numbers that multiply to give 6 and add to give 5.",
                "solution": "Factor: (x + 2)(x + 3) = 0\nSet each factor to zero:\n  x + 2 = 0 → x = −2\n  x + 3 = 0 → x = −3\n\nSolutions: x = −2 or x = −3"
            }),
        LessonSection(lesson_id=lesson.id, section_type='note', display_order=4,
            content_json={
                "type": "info",
                "content": "The discriminant (b² − 4ac) tells you the number of solutions: if > 0, two real solutions; if = 0, one repeated solution; if < 0, no real solutions."
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "x = 1 or x = 2", "isCorrect": False},
                         {"id": "b", "text": "x = −1 or x = −2", "isCorrect": True},
                         {"id": "c", "text": "x = 1 or x = −2", "isCorrect": False},
                         {"id": "d", "text": "x = −1 or x = 2", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.medium, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "Two real solutions", "isCorrect": True},
                         {"id": "b", "text": "One repeated solution", "isCorrect": False},
                         {"id": "c", "text": "No real solutions", "isCorrect": False},
                         {"id": "d", "text": "Cannot determine", "isCorrect": False},
                     ], "correctAnswer": "a"
                 },
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.medium, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={"correctAnswer": 5, "tolerance": 0.01},
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'Solve: x² + 3x + 2 = 0')
    t(db, 'ta', ns, 'ex1.q', 'தீர்க்கவும்: x² + 3x + 2 = 0')
    t(db, 'en', ns, 'ex1.hint', 'Factor: find two numbers that multiply to 2 and add to 3.')
    t(db, 'ta', ns, 'ex1.hint', 'காரணிகளாக்கு: 2 ஐ பெருக்கி 3 ஐ கூட்டும் இரு எண்களைக் கண்டுபிடி.')
    t(db, 'en', ns, 'ex1.exp', '(x+1)(x+2) = 0 → x = −1 or x = −2')
    t(db, 'ta', ns, 'ex1.exp', '(x+1)(x+2) = 0 → x = −1 அல்லது x = −2')

    t(db, 'en', ns, 'ex2.q', 'How many real solutions does x² − 4x + 1 = 0 have? (Hint: check the discriminant)')
    t(db, 'ta', ns, 'ex2.q', 'x² − 4x + 1 = 0 எத்தனை மெய் தீர்வுகளைக் கொண்டுள்ளது? (குறிப்பு: பாகுபாட்டைச் சரிபார்க்கவும்)')
    t(db, 'en', ns, 'ex2.hint', 'Calculate b² − 4ac where a=1, b=−4, c=1.')
    t(db, 'ta', ns, 'ex2.hint', 'b² − 4ac கணக்கிடவும், a=1, b=−4, c=1.')
    t(db, 'en', ns, 'ex2.exp', 'Discriminant = 16 − 4 = 12 > 0, so there are two real solutions.')
    t(db, 'ta', ns, 'ex2.exp', 'பாகுபாடு = 16 − 4 = 12 > 0, எனவே இரண்டு மெய் தீர்வுகள் உள்ளன.')

    t(db, 'en', ns, 'ex3.q', 'Find the positive solution of x² − 25 = 0.')
    t(db, 'ta', ns, 'ex3.q', 'x² − 25 = 0 இன் நேர்மறை தீர்வைக் கண்டுபிடிக்கவும்.')
    t(db, 'en', ns, 'ex3.hint', 'x² = 25, so x = ±√25')
    t(db, 'ta', ns, 'ex3.hint', 'x² = 25, எனவே x = ±√25')
    t(db, 'en', ns, 'ex3.exp', 'x² = 25 → x = ±5. The positive solution is x = 5.')
    t(db, 'ta', ns, 'ex3.exp', 'x² = 25 → x = ±5. நேர்மறை தீர்வு x = 5.')

    print(f"  ✓ Quadratic Equations: 4 sections, 3 exercises")


def _create_polynomials(db, domain_id, admin_id):
    slug = "polynomials"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=3)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Polynomials')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'பல்லுறுப்புக்கோவைகள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=20,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Polynomial",
                "definition": "A polynomial is an expression of one or more algebraic terms, each with a non-negative integer exponent. The degree of a polynomial is the highest exponent.",
                "examples": ["3x² + 2x + 1 (degree 2)", "x³ − 4x (degree 3)", "5 (degree 0, constant)"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=2,
            content_json={
                "title": "Adding Polynomials",
                "problem": "Add: (3x² + 2x + 1) + (x² − 4x + 5)",
                "solution": "Group like terms:\n  3x² + x² = 4x²\n  2x − 4x = −2x\n  1 + 5 = 6\n\nResult: 4x² − 2x + 6"
            }),
        LessonSection(lesson_id=lesson.id, section_type='note', display_order=3,
            content_json={
                "type": "tip",
                "content": "When adding or subtracting polynomials, only combine terms with the same variable AND the same exponent. These are called 'like terms'."
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "Degree 2", "isCorrect": False},
                         {"id": "b", "text": "Degree 3", "isCorrect": True},
                         {"id": "c", "text": "Degree 4", "isCorrect": False},
                         {"id": "d", "text": "Degree 1", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.easy, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={"correctAnswer": 3, "tolerance": 0.01},
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.medium, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "5x² + x + 3", "isCorrect": False},
                         {"id": "b", "text": "5x² + x − 3", "isCorrect": True},
                         {"id": "c", "text": "5x² − x + 3", "isCorrect": False},
                         {"id": "d", "text": "x² + 5x − 3", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'What is the degree of 4x³ + 2x − 7?')
    t(db, 'ta', ns, 'ex1.q', '4x³ + 2x − 7 இன் படி என்ன?')
    t(db, 'en', ns, 'ex1.hint', 'The degree is the highest exponent of x.')
    t(db, 'ta', ns, 'ex1.hint', 'படி என்பது x இன் மிக உயர்ந்த அடுக்கு.')
    t(db, 'en', ns, 'ex1.exp', 'The highest power of x is 3, so the degree is 3.')
    t(db, 'ta', ns, 'ex1.exp', 'x இன் மிக உயர்ந்த அடுக்கு 3, எனவே படி 3.')

    t(db, 'en', ns, 'ex2.q', 'How many terms are in the polynomial 2x² + 3x − 1?')
    t(db, 'ta', ns, 'ex2.q', '2x² + 3x − 1 பல்லுறுப்புக்கோவையில் எத்தனை உறுப்புகள் உள்ளன?')
    t(db, 'en', ns, 'ex2.hint', 'Count each separate part separated by + or −.')
    t(db, 'ta', ns, 'ex2.hint', '+ அல்லது − ஆல் பிரிக்கப்பட்ட ஒவ்வொரு தனிப் பகுதியையும் எண்ணவும்.')
    t(db, 'en', ns, 'ex2.exp', 'The three terms are: 2x², 3x, and −1.')
    t(db, 'ta', ns, 'ex2.exp', 'மூன்று உறுப்புகள்: 2x², 3x, மற்றும் −1.')

    t(db, 'en', ns, 'ex3.q', 'Simplify: (3x² + 2x − 1) + (2x² − x − 2)')
    t(db, 'ta', ns, 'ex3.q', 'எளிமையாக்கு: (3x² + 2x − 1) + (2x² − x − 2)')
    t(db, 'en', ns, 'ex3.hint', 'Add the coefficients of like terms.')
    t(db, 'ta', ns, 'ex3.hint', 'ஒத்த உறுப்புகளின் குணகங்களைக் கூட்டவும்.')
    t(db, 'en', ns, 'ex3.exp', '(3+2)x² + (2−1)x + (−1−2) = 5x² + x − 3')
    t(db, 'ta', ns, 'ex3.exp', '(3+2)x² + (2−1)x + (−1−2) = 5x² + x − 3')

    print(f"  ✓ Polynomials: 3 sections, 3 exercises")


def _create_triangles(db, domain_id, admin_id):
    slug = "triangles"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=1)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Triangles')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'முக்கோணங்கள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=20,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Triangle",
                "definition": "A triangle is a polygon with three sides and three angles. The sum of interior angles of any triangle is always 180°.",
                "examples": ["Equilateral (all sides equal)", "Isosceles (two sides equal)", "Scalene (no sides equal)"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=2,
            content_json={
                "term": "Area of a Triangle",
                "definition": "The area of a triangle is calculated as: Area = ½ × base × height. The base can be any side, and the height is the perpendicular distance from the base to the opposite vertex.",
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=3,
            content_json={
                "title": "Finding the Area",
                "problem": "A triangle has a base of 10 cm and a height of 6 cm. Find its area.",
                "solution": "Area = ½ × base × height\nArea = ½ × 10 × 6\nArea = 30 cm²"
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={"correctAnswer": 24, "tolerance": 0.1, "unit": "cm²"},
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "90°", "isCorrect": False},
                         {"id": "b", "text": "180°", "isCorrect": True},
                         {"id": "c", "text": "270°", "isCorrect": False},
                         {"id": "d", "text": "360°", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.medium, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={"correctAnswer": 50, "tolerance": 0.1, "unit": "°"},
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'A triangle has a base of 8 cm and height of 6 cm. What is its area in cm²?')
    t(db, 'ta', ns, 'ex1.q', 'ஒரு முக்கோணத்தின் அடிப்பக்கம் 8 செமீ, உயரம் 6 செமீ. அதன் பரப்பளவு என்ன (செமீ²)?')
    t(db, 'en', ns, 'ex1.hint', 'Use the formula: Area = ½ × base × height')
    t(db, 'ta', ns, 'ex1.hint', 'சூத்திரத்தைப் பயன்படுத்தவும்: பரப்பளவு = ½ × அடிப்பக்கம் × உயரம்')
    t(db, 'en', ns, 'ex1.exp', 'Area = ½ × 8 × 6 = 24 cm²')
    t(db, 'ta', ns, 'ex1.exp', 'பரப்பளவு = ½ × 8 × 6 = 24 செமீ²')

    t(db, 'en', ns, 'ex2.q', 'What is the sum of interior angles of any triangle?')
    t(db, 'ta', ns, 'ex2.q', 'எந்த முக்கோணத்தின் உள்கோணங்களின் கூடுதல் என்ன?')
    t(db, 'en', ns, 'ex2.hint', 'This is a fundamental property of all triangles.')
    t(db, 'ta', ns, 'ex2.hint', 'இது அனைத்து முக்கோணங்களின் அடிப்படை பண்பு.')
    t(db, 'en', ns, 'ex2.exp', 'The sum of interior angles of any triangle is always 180°.')
    t(db, 'ta', ns, 'ex2.exp', 'எந்த முக்கோணத்தின் உள்கோணங்களின் கூடுதல் எப்போதும் 180°.')

    t(db, 'en', ns, 'ex3.q', 'A triangle has angles of 60° and 70°. What is the third angle in degrees?')
    t(db, 'ta', ns, 'ex3.q', 'ஒரு முக்கோணத்தின் கோணங்கள் 60° மற்றும் 70°. மூன்றாவது கோணம் என்ன (டிகிரி)?')
    t(db, 'en', ns, 'ex3.hint', 'All three angles must add up to 180°.')
    t(db, 'ta', ns, 'ex3.hint', 'மூன்று கோணங்களும் 180° ஆக கூட வேண்டும்.')
    t(db, 'en', ns, 'ex3.exp', '180° − 60° − 70° = 50°')
    t(db, 'ta', ns, 'ex3.exp', '180° − 60° − 70° = 50°')

    print(f"  ✓ Triangles: 3 sections, 3 exercises")


def _create_circles(db, domain_id, admin_id):
    slug = "circles"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=2)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Circles')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'வட்டங்கள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=20,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Circle",
                "definition": "A circle is a set of all points in a plane that are at a fixed distance (radius) from a fixed point (center). The circumference is the perimeter of a circle: C = 2πr. The area is: A = πr².",
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=2,
            content_json={
                "title": "Finding Circumference and Area",
                "problem": "A circle has a radius of 7 cm. Find its circumference and area. (Use π ≈ 3.14)",
                "solution": "Circumference = 2πr = 2 × 3.14 × 7 = 43.96 cm\nArea = πr² = 3.14 × 7² = 3.14 × 49 = 153.86 cm²"
            }),
        LessonSection(lesson_id=lesson.id, section_type='note', display_order=3,
            content_json={
                "type": "info",
                "content": "π (pi) is approximately 3.14159. It is the ratio of a circle's circumference to its diameter. It is an irrational number — its decimal representation never ends and never repeats."
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={"correctAnswer": 31.4, "tolerance": 0.2, "unit": "cm"},
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.medium, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={"correctAnswer": 78.5, "tolerance": 0.5, "unit": "cm²"},
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "C = πr²", "isCorrect": False},
                         {"id": "b", "text": "C = 2πr", "isCorrect": True},
                         {"id": "c", "text": "C = πd²", "isCorrect": False},
                         {"id": "d", "text": "C = 2πd", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'A circle has a radius of 5 cm. What is its circumference? (Use π ≈ 3.14)')
    t(db, 'ta', ns, 'ex1.q', 'ஒரு வட்டத்தின் ஆரம் 5 செமீ. அதன் சுற்றளவு என்ன? (π ≈ 3.14 பயன்படுத்தவும்)')
    t(db, 'en', ns, 'ex1.hint', 'Circumference = 2πr')
    t(db, 'ta', ns, 'ex1.hint', 'சுற்றளவு = 2πr')
    t(db, 'en', ns, 'ex1.exp', 'C = 2 × 3.14 × 5 = 31.4 cm')
    t(db, 'ta', ns, 'ex1.exp', 'C = 2 × 3.14 × 5 = 31.4 செமீ')

    t(db, 'en', ns, 'ex2.q', 'Find the area of a circle with radius 5 cm. (Use π ≈ 3.14)')
    t(db, 'ta', ns, 'ex2.q', '5 செமீ ஆரம் கொண்ட வட்டத்தின் பரப்பளவைக் கண்டுபிடிக்கவும். (π ≈ 3.14)')
    t(db, 'en', ns, 'ex2.hint', 'Area = πr²')
    t(db, 'ta', ns, 'ex2.hint', 'பரப்பளவு = πr²')
    t(db, 'en', ns, 'ex2.exp', 'A = 3.14 × 5² = 3.14 × 25 = 78.5 cm²')
    t(db, 'ta', ns, 'ex2.exp', 'A = 3.14 × 5² = 3.14 × 25 = 78.5 செமீ²')

    t(db, 'en', ns, 'ex3.q', 'Which formula gives the circumference of a circle?')
    t(db, 'ta', ns, 'ex3.q', 'எந்த சூத்திரம் வட்டத்தின் சுற்றளவைத் தருகிறது?')
    t(db, 'en', ns, 'ex3.hint', 'Remember: circumference is the perimeter (distance around).')
    t(db, 'ta', ns, 'ex3.hint', 'நினைவில் கொள்ளுங்கள்: சுற்றளவு என்பது சுற்றுப்பாதை (சுற்றிலும் உள்ள தூரம்).')
    t(db, 'en', ns, 'ex3.exp', 'Circumference = 2πr, where r is the radius.')
    t(db, 'ta', ns, 'ex3.exp', 'சுற்றளவு = 2πr, இதில் r ஆரம்.')

    print(f"  ✓ Circles: 3 sections, 3 exercises")


def _create_fractions(db, domain_id, admin_id):
    slug = "fractions"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=1)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Fractions')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'பின்னங்கள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=15,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Fraction",
                "definition": "A fraction represents a part of a whole. It is written as a/b where 'a' is the numerator (top) and 'b' is the denominator (bottom). The denominator cannot be zero.",
                "examples": ["½ (one half)", "¾ (three quarters)", "⅔ (two thirds)"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=2,
            content_json={
                "title": "Adding Fractions",
                "problem": "Add: 1/4 + 2/4",
                "hint": "When denominators are the same, add the numerators.",
                "solution": "Since both fractions have the same denominator (4):\n1/4 + 2/4 = (1+2)/4 = 3/4"
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=3,
            content_json={
                "title": "Adding Fractions with Different Denominators",
                "problem": "Add: 1/3 + 1/4",
                "hint": "Find the least common denominator (LCD) first.",
                "solution": "LCD of 3 and 4 is 12:\n1/3 = 4/12\n1/4 = 3/12\n4/12 + 3/12 = 7/12"
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "3/8", "isCorrect": False},
                         {"id": "b", "text": "5/8", "isCorrect": True},
                         {"id": "c", "text": "4/8", "isCorrect": False},
                         {"id": "d", "text": "6/8", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.medium, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "2/7", "isCorrect": False},
                         {"id": "b", "text": "5/12", "isCorrect": True},
                         {"id": "c", "text": "2/5", "isCorrect": False},
                         {"id": "d", "text": "7/12", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "Numerator", "isCorrect": False},
                         {"id": "b", "text": "Denominator", "isCorrect": True},
                         {"id": "c", "text": "Quotient", "isCorrect": False},
                         {"id": "d", "text": "Remainder", "isCorrect": False},
                     ], "correctAnswer": "b"
                 },
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'What is 2/8 + 3/8?')
    t(db, 'ta', ns, 'ex1.q', '2/8 + 3/8 = ?')
    t(db, 'en', ns, 'ex1.hint', 'Same denominator — just add the numerators.')
    t(db, 'ta', ns, 'ex1.hint', 'ஒரே பகுதி — எண்ணிகளை மட்டும் கூட்டவும்.')
    t(db, 'en', ns, 'ex1.exp', '2/8 + 3/8 = 5/8')
    t(db, 'ta', ns, 'ex1.exp', '2/8 + 3/8 = 5/8')

    t(db, 'en', ns, 'ex2.q', 'What is 1/4 + 1/6?')
    t(db, 'ta', ns, 'ex2.q', '1/4 + 1/6 = ?')
    t(db, 'en', ns, 'ex2.hint', 'Find the LCD of 4 and 6, which is 12.')
    t(db, 'ta', ns, 'ex2.hint', '4 மற்றும் 6 இன் LCD கண்டுபிடிக்கவும், அது 12.')
    t(db, 'en', ns, 'ex2.exp', '1/4 = 3/12, 1/6 = 2/12. So 3/12 + 2/12 = 5/12')
    t(db, 'ta', ns, 'ex2.exp', '1/4 = 3/12, 1/6 = 2/12. எனவே 3/12 + 2/12 = 5/12')

    t(db, 'en', ns, 'ex3.q', 'In the fraction 3/7, what is 7 called?')
    t(db, 'ta', ns, 'ex3.q', '3/7 பின்னத்தில், 7 எப்படி அழைக்கப்படுகிறது?')
    t(db, 'en', ns, 'ex3.hint', 'The bottom number of a fraction has a special name.')
    t(db, 'ta', ns, 'ex3.hint', 'பின்னத்தின் கீழே உள்ள எண்ணுக்கு ஒரு சிறப்பு பெயர் உண்டு.')
    t(db, 'en', ns, 'ex3.exp', 'The bottom number is called the denominator.')
    t(db, 'ta', ns, 'ex3.exp', 'கீழே உள்ள எண் பகுதி (denominator) என்று அழைக்கப்படுகிறது.')

    print(f"  ✓ Fractions: 3 sections, 3 exercises")


def _create_percentages(db, domain_id, admin_id):
    slug = "percentages"
    topic = Topic(slug=slug, title_key=f"topics.{slug}.title",
                  domain_id=domain_id, exercise_count=3, display_order=2)
    db.add(topic); db.commit(); db.refresh(topic)

    t(db, 'en', 'common', f'topics.{slug}.title', 'Percentages')
    t(db, 'ta', 'common', f'topics.{slug}.title', 'சதவீதங்கள்')

    lesson = Lesson(topic_id=topic.id, estimated_time=15,
                    difficulty=DifficultyLevel.beginner)
    db.add(lesson); db.commit(); db.refresh(lesson)

    db.add_all([
        LessonSection(lesson_id=lesson.id, section_type='definition', display_order=1,
            content_json={
                "term": "Percentage",
                "definition": "A percentage is a fraction expressed as a part of 100. The symbol '%' means 'per hundred'. To convert a fraction to a percentage, multiply by 100.",
                "examples": ["50% = 50/100 = 0.5", "25% = 25/100 = 0.25", "10% = 10/100 = 0.1"]
            }),
        LessonSection(lesson_id=lesson.id, section_type='example', display_order=2,
            content_json={
                "title": "Finding a Percentage of a Number",
                "problem": "What is 20% of 150?",
                "solution": "Method 1: 20% = 20/100 = 0.2\n0.2 × 150 = 30\n\nMethod 2: 20/100 × 150 = 3000/100 = 30\n\nAnswer: 30"
            }),
        LessonSection(lesson_id=lesson.id, section_type='note', display_order=3,
            content_json={
                "type": "tip",
                "content": "Quick mental math shortcuts: 10% = divide by 10, 5% = half of 10%, 1% = divide by 100. Combine these for any percentage!"
            }),
    ])

    ns = slug
    db.add_all([
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.easy, display_order=1,
                 question_key=f'{ns}.ex1.q',
                 data_json={"correctAnswer": 25, "tolerance": 0.1},
                 hint_key=f'{ns}.ex1.hint', explanation_key=f'{ns}.ex1.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='numeric_input',
                 difficulty=ExerciseDifficulty.medium, display_order=2,
                 question_key=f'{ns}.ex2.q',
                 data_json={"correctAnswer": 40, "tolerance": 0.1},
                 hint_key=f'{ns}.ex2.hint', explanation_key=f'{ns}.ex2.exp'),
        Exercise(lesson_id=lesson.id, exercise_type='multiple_choice',
                 difficulty=ExerciseDifficulty.easy, display_order=3,
                 question_key=f'{ns}.ex3.q',
                 data_json={
                     "choices": [
                         {"id": "a", "text": "0.25", "isCorrect": False},
                         {"id": "b", "text": "0.50", "isCorrect": False},
                         {"id": "c", "text": "0.75", "isCorrect": True},
                         {"id": "d", "text": "0.70", "isCorrect": False},
                     ], "correctAnswer": "c"
                 },
                 hint_key=f'{ns}.ex3.hint', explanation_key=f'{ns}.ex3.exp'),
    ])

    t(db, 'en', ns, 'ex1.q', 'What is 10% of 250?')
    t(db, 'ta', ns, 'ex1.q', '250 இல் 10% என்ன?')
    t(db, 'en', ns, 'ex1.hint', '10% means divide by 10.')
    t(db, 'ta', ns, 'ex1.hint', '10% என்றால் 10 ஆல் வகுக்கவும்.')
    t(db, 'en', ns, 'ex1.exp', '10% of 250 = 250/10 = 25')
    t(db, 'ta', ns, 'ex1.exp', '250 இல் 10% = 250/10 = 25')

    t(db, 'en', ns, 'ex2.q', 'What percentage is 80 out of 200?')
    t(db, 'ta', ns, 'ex2.q', '200 இல் 80 என்பது எத்தனை சதவீதம்?')
    t(db, 'en', ns, 'ex2.hint', 'Percentage = (part/whole) × 100')
    t(db, 'ta', ns, 'ex2.hint', 'சதவீதம் = (பகுதி/முழுமை) × 100')
    t(db, 'en', ns, 'ex2.exp', '(80/200) × 100 = 0.4 × 100 = 40%')
    t(db, 'ta', ns, 'ex2.exp', '(80/200) × 100 = 0.4 × 100 = 40%')

    t(db, 'en', ns, 'ex3.q', 'What is 75% expressed as a decimal?')
    t(db, 'ta', ns, 'ex3.q', '75% ஐ தசமத்தில் எப்படி எழுதுவது?')
    t(db, 'en', ns, 'ex3.hint', 'Divide the percentage by 100.')
    t(db, 'ta', ns, 'ex3.hint', 'சதவீதத்தை 100 ஆல் வகுக்கவும்.')
    t(db, 'en', ns, 'ex3.exp', '75% = 75/100 = 0.75')
    t(db, 'ta', ns, 'ex3.exp', '75% = 75/100 = 0.75')

    print(f"  ✓ Percentages: 3 sections, 3 exercises")


# ============================================================================
# COMPUTER SCIENCE SUBJECT (DRAFT — for testing admin workflow)
# ============================================================================

def create_computer_science(db, admin_id):
    print("\n=== Creating Computer Science (DRAFT) ===")

    cs = Subject(
        name_key="subjects.cs.name",
        description_key="subjects.cs.description",
        name="Computer Science",
        description="Introduction to programming, algorithms, and computational thinking",
        grade_level="High School",
        status=SubjectStatus.DRAFT,
        created_by=admin_id,
        created_at=datetime.utcnow(),
        total_domains=1, total_topics=2, total_lessons=0,
    )
    db.add(cs)
    db.commit()
    db.refresh(cs)

    t(db, 'en', 'common', 'subjects.cs.name', 'Computer Science')
    t(db, 'ta', 'common', 'subjects.cs.name', 'கணினி அறிவியல்')
    t(db, 'en', 'common', 'subjects.cs.description',
      'Introduction to programming, algorithms, and computational thinking')
    t(db, 'ta', 'common', 'subjects.cs.description',
      'நிரலாக்கம், வழிமுறைகள் மற்றும் கணக்கீட்டு சிந்தனை அறிமுகம்')

    python_domain = Domain(
        slug="python-basics", title_key="domains.python-basics.title",
        description_key="domains.python-basics.description",
        level="Beginner", display_order=1, subject_id=cs.id,
        status=ContentStatus.DRAFT, created_by=admin_id,
        created_at=datetime.utcnow(),
    )
    db.add(python_domain)
    db.commit()
    db.refresh(python_domain)

    t(db, 'en', 'common', 'domains.python-basics.title', 'Python Basics')
    t(db, 'ta', 'common', 'domains.python-basics.title', 'பைதான் அடிப்படைகள்')
    t(db, 'en', 'common', 'domains.python-basics.description', 'Variables, data types, and control flow')
    t(db, 'ta', 'common', 'domains.python-basics.description', 'மாறிகள், தரவு வகைகள் மற்றும் கட்டுப்பாட்டு ஓட்டம்')

    topic1 = Topic(slug="variables", title_key="topics.variables.title",
                   domain_id=python_domain.id, exercise_count=0, display_order=1)
    topic2 = Topic(slug="loops", title_key="topics.loops.title",
                   domain_id=python_domain.id, exercise_count=0, display_order=2)
    db.add_all([topic1, topic2])

    t(db, 'en', 'common', 'topics.variables.title', 'Variables and Data Types')
    t(db, 'ta', 'common', 'topics.variables.title', 'மாறிகள் மற்றும் தரவு வகைகள்')
    t(db, 'en', 'common', 'topics.loops.title', 'Loops and Iteration')
    t(db, 'ta', 'common', 'topics.loops.title', 'லூப்கள் மற்றும் மறுசெய்கை')

    db.commit()
    print(f"  ✓ Computer Science (DRAFT): 1 domain, 2 topics, 0 lessons")
    print(f"    → Use admin panel to approve/publish this subject")


# ============================================================================
# MAIN
# ============================================================================

def main():
    print("=" * 60)
    print("LearningHub Demo Seed Script")
    print("=" * 60)

    db = SessionLocal()
    try:
        clear_all(db)
        admin, student = ensure_users(db)

        create_mathematics(db, admin.id)
        create_computer_science(db, admin.id)

        # Final commit
        db.commit()

        # Summary
        total_lessons = db.query(Lesson).count()
        total_sections = db.query(LessonSection).count()
        total_exercises = db.query(Exercise).count()
        total_translations = db.query(Translation).count()

        print("\n" + "=" * 60)
        print("✅ SEED COMPLETE!")
        print("=" * 60)
        print(f"\n📊 Database:")
        print(f"   Subjects:     2 (Mathematics=PUBLISHED, CS=DRAFT)")
        print(f"   Domains:      4")
        print(f"   Topics:       9")
        print(f"   Lessons:      {total_lessons}")
        print(f"   Sections:     {total_sections}")
        print(f"   Exercises:    {total_exercises}")
        print(f"   Translations: {total_translations}")
        print(f"\n👤 Test Accounts:")
        print(f"   Admin:   admin / admin123")
        print(f"   Student: student / student123")
        print(f"\n🔗 Test URLs:")
        print(f"   Home:       http://localhost:3000/en")
        print(f"   Curriculum: http://localhost:3000/en/curriculum")
        print(f"   Lesson:     http://localhost:3000/en/learn/algebra/linear-equations")
        print(f"   Admin:      http://localhost:3000/en/admin")
        print(f"   Progress:   http://localhost:3000/en/progress  (login first)")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Error: {e}")
        import traceback; traceback.print_exc()
    finally:
        db.close()


if __name__ == "__main__":
    main()
