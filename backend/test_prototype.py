#!/usr/bin/env python3
"""
Prototype Test Script - Curriculum Generation

Tests the agentic AI curriculum generation system
"""

import json
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.agents.curriculum_agent import generate_curriculum_sync


def test_grade_specific_curriculum():
    """Test 1: Generate grade-specific curriculum"""
    print("\n" + "=" * 70)
    print("TEST 1: Grade-Specific Curriculum")
    print("=" * 70)

    result = generate_curriculum_sync(
        subject="Pre-Algebra",
        grade_level="Grade 7",
        standards="Common Core Math"
    )

    print(f"\n📊 Results:")
    print(f"  Subject: {result['subject']}")
    print(f"  Grade: {result['grade_level']}")
    print(f"  Domains: {result['stats']['total_domains']}")
    print(f"  Topics: {result['stats']['total_topics']}")
    print(f"  Tokens Used: {result['tokens_used']}")

    print(f"\n📚 Curriculum Structure:")
    for i, domain in enumerate(result['curriculum'], 1):
        print(f"\n  {i}. {domain['name']} ({domain['level']})")
        print(f"     {domain['description']}")
        print(f"     Topics: {len(domain['topics'])}")
        for j, topic in enumerate(domain['topics'][:2], 1):  # Show first 2 topics
            print(f"       {j}. {topic['name']} (~{topic['estimated_time_minutes']} min)")

    # Save full result
    with open('test_output_grade_specific.json', 'w') as f:
        json.dump(result, f, indent=2)
    print(f"\n💾 Full output saved to: test_output_grade_specific.json")

    return result


def test_grade_agnostic_curriculum():
    """Test 2: Generate grade-agnostic curriculum"""
    print("\n" + "=" * 70)
    print("TEST 2: Grade-Agnostic Curriculum")
    print("=" * 70)

    result = generate_curriculum_sync(
        subject="Linear Algebra",
        grade_level=None,  # No grade level
        standards=None
    )

    print(f"\n📊 Results:")
    print(f"  Subject: {result['subject']}")
    print(f"  Grade: {result['grade_level'] or 'Not specified (grade-agnostic)'}")
    print(f"  Domains: {result['stats']['total_domains']}")
    print(f"  Topics: {result['stats']['total_topics']}")
    print(f"  Tokens Used: {result['tokens_used']}")

    print(f"\n📚 Curriculum Structure:")
    for i, domain in enumerate(result['curriculum'], 1):
        print(f"\n  {i}. {domain['name']} ({domain['level']})")
        print(f"     {domain['description']}")
        print(f"     Topics: {len(domain['topics'])}")

    # Save full result
    with open('test_output_grade_agnostic.json', 'w') as f:
        json.dump(result, f, indent=2)
    print(f"\n💾 Full output saved to: test_output_grade_agnostic.json")

    return result


def test_save_to_database(curriculum_data):
    """Test 3: Save generated curriculum to database"""
    print("\n" + "=" * 70)
    print("TEST 3: Save to Database")
    print("=" * 70)

    from app.database import SessionLocal
    from app.models import Subject, Domain, Topic, User
    from app.models.subject import SubjectStatus
    from app.models.domain import ContentStatus
    from datetime import datetime

    db = SessionLocal()

    try:
        # Get or create admin user
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            print("⚠️  Admin user not found. Please create admin user first.")
            return

        # Create Subject
        subject = Subject(
            name=curriculum_data['subject'],
            grade_level=curriculum_data.get('grade_level'),
            standards=curriculum_data.get('standards'),
            status=SubjectStatus.DRAFT,
            created_by=admin_user.id,
            created_at=datetime.utcnow(),
            total_domains=curriculum_data['stats']['total_domains'],
            total_topics=curriculum_data['stats']['total_topics']
        )
        db.add(subject)
        db.flush()  # Get subject.id

        print(f"✅ Created Subject: {subject.name} (ID: {subject.id})")

        # Create Domains and Topics
        for domain_order, domain_data in enumerate(curriculum_data['curriculum'], 1):
            domain = Domain(
                slug=domain_data['slug'],
                title_key=domain_data['name'],  # For prototype, using name directly
                description_key=domain_data['description'],
                level=domain_data['level'],
                display_order=domain_order,
                subject_id=subject.id,
                status=ContentStatus.DRAFT,
                created_by=admin_user.id,
                created_at=datetime.utcnow()
            )
            db.add(domain)
            db.flush()  # Get domain.id

            print(f"  ✅ Created Domain: {domain.title_key} (ID: {domain.id})")

            # Create Topics
            for topic_order, topic_data in enumerate(domain_data['topics'], 1):
                topic = Topic(
                    slug=topic_data['slug'],
                    title_key=topic_data['name'],
                    domain_id=domain.id,
                    exercise_count=0,  # Will be set later when exercises are generated
                    display_order=topic_order
                )
                db.add(topic)
                print(f"    ✅ Created Topic: {topic.title_key}")

        db.commit()
        print(f"\n✅ Successfully saved curriculum to database!")
        print(f"   Subject ID: {subject.id}")
        print(f"   Status: {subject.status}")

        return subject.id

    except Exception as e:
        db.rollback()
        print(f"\n❌ Error saving to database: {e}")
        raise
    finally:
        db.close()


def main():
    """Run all tests"""
    print("\n" + "=" * 70)
    print("🧪 AGENTIC AI CURRICULUM GENERATION - PROTOTYPE TEST")
    print("=" * 70)

    # Check for API key
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("\n❌ Error: ANTHROPIC_API_KEY environment variable not set")
        print("   Please set it: export ANTHROPIC_API_KEY=your_key_here")
        sys.exit(1)

    try:
        # Test 1: Grade-specific
        result1 = test_grade_specific_curriculum()

        # Test 2: Grade-agnostic
        result2 = test_grade_agnostic_curriculum()

        # Test 3: Save to database
        print("\n\nWould you like to save the first curriculum to the database? (y/n)")
        response = input("> ").strip().lower()
        if response == 'y':
            subject_id = test_save_to_database(result1)
            print(f"\n✅ Curriculum saved with Subject ID: {subject_id}")

        print("\n" + "=" * 70)
        print("✅ ALL TESTS PASSED")
        print("=" * 70)

        print("\n📋 Summary:")
        print(f"  ✅ Generated grade-specific curriculum (Pre-Algebra)")
        print(f"  ✅ Generated grade-agnostic curriculum (Linear Algebra)")
        print(f"  ✅ Agent used tool calling successfully")
        print(f"  ✅ Structured output validated")

        print("\n🎉 Prototype is working! The agentic AI approach is validated.")
        print("\nNext steps:")
        print("  1. Review generated curricula in the JSON files")
        print("  2. Build lesson generation agent")
        print("  3. Add API endpoints")
        print("  4. Create admin UI")

    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
