#!/bin/bash
# Verification script for Phase 1 backend setup

echo "🔍 Verifying Phase 1 Backend Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

checks_passed=0
checks_total=0

check() {
    checks_total=$((checks_total + 1))
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        checks_passed=$((checks_passed + 1))
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Check directory structure
[ -d "app/models" ]; check $? "Models directory exists"
[ -d "app/schemas" ]; check $? "Schemas directory exists"
[ -d "app/api/v1" ]; check $? "API v1 directory exists"
[ -d "app/services" ]; check $? "Services directory exists"
[ -d "app/middleware" ]; check $? "Middleware directory exists"
[ -d "alembic/versions" ]; check $? "Alembic versions directory exists"

# Check key files exist
[ -f "app/main.py" ]; check $? "main.py exists"
[ -f "app/config.py" ]; check $? "config.py exists"
[ -f "app/database.py" ]; check $? "database.py exists"
[ -f "requirements.txt" ]; check $? "requirements.txt exists"
[ -f "Dockerfile" ]; check $? "Dockerfile exists"
[ -f ".env.example" ]; check $? ".env.example exists"
[ -f "alembic.ini" ]; check $? "alembic.ini exists"

# Check model files
[ -f "app/models/domain.py" ]; check $? "domain.py model exists"
[ -f "app/models/topic.py" ]; check $? "topic.py model exists"
[ -f "app/models/lesson.py" ]; check $? "lesson.py model exists"
[ -f "app/models/user.py" ]; check $? "user.py model exists"
[ -f "app/models/progress.py" ]; check $? "progress.py model exists"
[ -f "app/models/exercise.py" ]; check $? "exercise.py model exists"
[ -f "app/models/translation.py" ]; check $? "translation.py model exists"

# Check API route files
[ -f "app/api/v1/auth.py" ]; check $? "auth.py routes exist"
[ -f "app/api/v1/curriculum.py" ]; check $? "curriculum.py routes exist"
[ -f "app/api/v1/lessons.py" ]; check $? "lessons.py routes exist"
[ -f "app/api/v1/exercises.py" ]; check $? "exercises.py routes exist"
[ -f "app/api/v1/progress.py" ]; check $? "progress.py routes exist"

# Check schema files
[ -f "app/schemas/user.py" ]; check $? "user.py schema exists"
[ -f "app/schemas/lesson.py" ]; check $? "lesson.py schema exists"
[ -f "app/schemas/curriculum.py" ]; check $? "curriculum.py schema exists"

# Check service files
[ -f "app/services/auth_service.py" ]; check $? "auth_service.py exists"
[ -f "app/services/lesson_service.py" ]; check $? "lesson_service.py exists"
[ -f "app/services/progress_service.py" ]; check $? "progress_service.py exists"

# Check security utilities
[ -f "app/utils/security.py" ]; check $? "security.py utilities exist"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Results: $checks_passed/$checks_total checks passed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $checks_passed -eq $checks_total ]; then
    echo -e "${GREEN}✅ Phase 1 setup verification: PASSED${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Create .env file: cp .env.example .env"
    echo "2. Start database: docker-compose up -d postgres"
    echo "3. Run migrations: alembic upgrade head"
    echo "4. Start backend: uvicorn app.main:app --reload"
    exit 0
else
    echo -e "${RED}❌ Phase 1 setup verification: FAILED${NC}"
    echo "Some files or directories are missing."
    exit 1
fi
