# Agentic AI Prototype - Quick Start

## What This Prototype Does

Demonstrates **autonomous curriculum generation** using Claude Opus 4.6 with:
- ✅ Tool calling for structured output
- ✅ Grade-specific and grade-agnostic generation
- ✅ Automatic domain/topic structure
- ✅ Database integration

---

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install anthropic
```

### 2. Set API Key

```bash
export ANTHROPIC_API_KEY="your_anthropic_api_key_here"
```

Get your key from: https://console.anthropic.com/

### 3. Ensure Database is Running

```bash
# If not already running:
docker-compose up -d postgres

# Or check status:
docker-compose ps
```

---

## Running the Prototype

```bash
cd backend
python test_prototype.py
```

### What Happens:

**Test 1: Grade-Specific Curriculum**
- Subject: "Pre-Algebra"
- Grade: "Grade 7"
- Standards: "Common Core Math"
- → Generates age-appropriate curriculum

**Test 2: Grade-Agnostic Curriculum**
- Subject: "Linear Algebra"
- Grade: None (flexible)
- → Generates universal curriculum

**Test 3: Save to Database** (optional)
- Saves generated curriculum to PostgreSQL
- Creates Subject, Domain, and Topic records
- Sets status to "draft"

---

## Expected Output

```
==================================================
TEST 1: Grade-Specific Curriculum
==================================================

🤖 Agent: Planning curriculum for Pre-Algebra...
✅ Generated curriculum: 4 domains, 24 topics

📊 Results:
  Subject: Pre-Algebra
  Grade: Grade 7
  Domains: 4
  Topics: 24
  Tokens Used: 3521

📚 Curriculum Structure:

  1. Number Systems and Operations (beginner)
     Understanding different types of numbers and operations
     Topics: 6
       1. Integers and Absolute Value (~45 min)
       2. Rational Numbers and Decimals (~50 min)
       ...

  2. Variables and Expressions (beginner)
     Introduction to algebraic thinking with variables
     Topics: 6
       ...

💾 Full output saved to: test_output_grade_specific.json
```

---

## Verifying Results

### 1. Check Generated JSON Files

```bash
ls -lh test_output_*.json
cat test_output_grade_specific.json | jq '.curriculum[0]'
```

### 2. Check Database (if saved)

```python
from app.database import SessionLocal
from app.models import Subject, Domain, Topic

db = SessionLocal()

# Find the subject
subject = db.query(Subject).filter(Subject.name == "Pre-Algebra").first()
print(f"Subject: {subject.name}, Status: {subject.status}")
print(f"Domains: {len(subject.domains)}")

# Show domains
for domain in subject.domains:
    print(f"  - {domain.title_key} ({len(domain.topics)} topics)")
```

---

## Key Features Demonstrated

### 1. **Tool Calling**
Agent uses Claude's tool calling to return structured JSON:
```python
tools = [{
    "name": "create_curriculum_plan",
    "description": "Create structured curriculum",
    "input_schema": {
        "type": "object",
        "properties": {
            "domains": [...],
            ...
        }
    }
}]
```

### 2. **Grade Adaptation**
System prompt adjusts based on grade level:
- **With grade**: "tailor content to Grade 7 students"
- **Without grade**: "create grade-agnostic content"

### 3. **Validation**
Agent ensures:
- 3-5 domains per curriculum
- 3-8 topics per domain
- Clear learning objectives
- Logical progression (beginner → advanced)

---

## Troubleshooting

### Error: "ANTHROPIC_API_KEY environment variable not set"
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Error: "Connection refused" (database)
```bash
docker-compose up -d postgres
```

### Error: "Admin user not found" (during save)
```bash
# Create admin user first
python -c "
from app.database import SessionLocal
from app.models import User
from app.utils.security import get_password_hash

db = SessionLocal()
user = User(
    email='admin@example.com',
    username='admin',
    hashed_password=get_password_hash('admin123'),
    full_name='Admin User',
    is_admin=True
)
db.add(user)
db.commit()
print('Admin user created')
"
```

---

## Understanding the Output

### Curriculum Structure

```json
{
  "subject": "Pre-Algebra",
  "grade_level": "Grade 7",
  "curriculum": [
    {
      "name": "Number Systems and Operations",
      "slug": "number-systems-and-operations",
      "description": "Understanding different types of numbers",
      "level": "beginner",
      "topics": [
        {
          "name": "Integers and Absolute Value",
          "slug": "integers-and-absolute-value",
          "learning_objectives": [
            "Understand positive and negative integers",
            "Calculate absolute values",
            ...
          ],
          "estimated_time_minutes": 45,
          "prerequisites": []
        },
        ...
      ]
    },
    ...
  ],
  "stats": {
    "total_domains": 4,
    "total_topics": 24
  },
  "tokens_used": 3521
}
```

### Token Usage
- Typically 3000-5000 tokens per curriculum generation
- Cost: ~$0.15 - $0.25 per curriculum (Opus 4 pricing)

---

## What's Next?

### Immediate Next Steps:
1. **Review Generated Curricula**
   - Check if domains make sense
   - Verify topic progression
   - Assess learning objectives quality

2. **Iterate on Prompts**
   - Adjust system prompt for better results
   - Add more constraints/guidelines
   - Test with different subjects

3. **Build Lesson Agent**
   - Create similar agent for lesson generation
   - Use generated curriculum as input
   - Generate actual lesson content

### Full Implementation:
1. Add async task queue (for background processing)
2. Create API endpoints (FastAPI routes)
3. Build admin UI (Next.js pages)
4. Add progress tracking
5. Implement approval workflow

---

## Cost Estimation

**Prototype Testing (5 runs):**
- 5 curricula × 4000 tokens = 20,000 tokens
- Cost: ~$1.00

**Production (100 subjects):**
- 100 curricula × 4000 tokens = 400,000 tokens
- Cost: ~$20

**With Lessons (100 subjects, 2000 lessons):**
- Curricula: 400,000 tokens = $20
- Lessons: 2000 × 8000 tokens = 16M tokens = $800
- **Total: ~$820 for complete content library**

Compare to: Hiring content creators for 2000 lessons = $100,000+

---

## Success Criteria

✅ Prototype is successful if:
- Agent generates 3-5 domains
- Each domain has 3-8 topics
- Topics have clear learning objectives
- Progression is logical (beginner → advanced)
- Output is valid JSON
- Can be saved to database

---

## Support

Issues? Questions?
- Check [AGENTIC_AI_ARCHITECTURE.md](../docs/AGENTIC_AI_ARCHITECTURE.md)
- Review agent code: [curriculum_agent.py](app/agents/curriculum_agent.py)
- Test script: [test_prototype.py](test_prototype.py)
