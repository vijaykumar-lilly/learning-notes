#!/bin/bash
# Phase 1 Verification Script - Learning Ocean Backend
# Tests all components to ensure Phase 1 is working properly

set -e  # Exit on error

echo "🔍 Phase 1 Verification - Learning Ocean Backend"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0
BASE_URL="http://localhost:8000"

# Test function
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_code="${3:-200}"

    echo -n "Testing: $name... "

    response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null || echo "000")
    http_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | sed '$d')

    if [ "$http_code" = "$expected_code" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $http_code)"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $http_code, expected $expected_code)"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# Check if server is running
echo "1️⃣  Checking if backend server is running..."
if ! curl -s "$BASE_URL/health" > /dev/null 2>&1; then
    echo -e "${RED}❌ Backend is not running!${NC}"
    echo ""
    echo "Please start the backend first:"
    echo "  cd backend"
    echo "  python -m uvicorn app.main:app --reload"
    echo ""
    exit 1
fi
echo -e "${GREEN}✓ Backend is running${NC}"
echo ""

# Test health endpoint
echo "2️⃣  Testing Health Check..."
test_endpoint "Health endpoint" "$BASE_URL/health"
echo ""

# Test root endpoint
echo "3️⃣  Testing Root Endpoint..."
test_endpoint "Root endpoint" "$BASE_URL/"
echo ""

# Test API documentation
echo "4️⃣  Testing API Documentation..."
test_endpoint "Swagger UI" "$BASE_URL/docs"
test_endpoint "ReDoc" "$BASE_URL/redoc"
echo ""

# Test API endpoints exist (even if not implemented)
echo "5️⃣  Testing API Endpoints (Structure)..."
test_endpoint "Curriculum endpoint" "$BASE_URL/api/v1/curriculum"
test_endpoint "Translations endpoint" "$BASE_URL/api/v1/translations/en" 200
echo ""

# Test authentication endpoints
echo "6️⃣  Testing Authentication System..."

# Generate random username to avoid conflicts
RANDOM_USER="testuser_$(date +%s)"
echo "Creating test user: $RANDOM_USER"

# Test user registration
echo -n "Testing: User Registration... "
register_response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/v1/auth/register" \
    -H "Content-Type: application/json" \
    -d "{
        \"email\": \"${RANDOM_USER}@test.com\",
        \"username\": \"${RANDOM_USER}\",
        \"password\": \"testpass123\",
        \"full_name\": \"Test User\"
    }" 2>/dev/null)

register_code=$(echo "$register_response" | tail -n 1)
register_body=$(echo "$register_response" | sed '$d')

if [ "$register_code" = "201" ]; then
    echo -e "${GREEN}✓ PASS${NC} (HTTP $register_code)"
    PASSED=$((PASSED + 1))

    # Extract token (simple grep, works if response is JSON)
    TOKEN=$(echo "$register_body" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4 || echo "")

    if [ -n "$TOKEN" ]; then
        echo -e "  ${GREEN}✓ JWT token received${NC}"
    else
        echo -e "  ${YELLOW}⚠ Could not extract token${NC}"
    fi
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $register_code)"
    FAILED=$((FAILED + 1))
fi

# Test user login
echo -n "Testing: User Login... "
login_response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/v1/auth/login" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=${RANDOM_USER}&password=testpass123" 2>/dev/null)

login_code=$(echo "$login_response" | tail -n 1)
login_body=$(echo "$login_response" | sed '$d')

if [ "$login_code" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} (HTTP $login_code)"
    PASSED=$((PASSED + 1))

    # Extract token
    TOKEN=$(echo "$login_body" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4 || echo "")

    if [ -n "$TOKEN" ]; then
        echo -e "  ${GREEN}✓ JWT token received${NC}"
        echo -e "  ${GREEN}✓ Authentication working!${NC}"
    fi
else
    echo -e "${RED}✗ FAIL${NC} (HTTP $login_code)"
    FAILED=$((FAILED + 1))
fi

echo ""

# Summary
echo "================================================"
echo "📊 Verification Summary"
echo "================================================"
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Phase 1 Verification: SUCCESS!${NC}"
    echo ""
    echo "✅ All systems operational:"
    echo "   • Backend server running"
    echo "   • Health checks passing"
    echo "   • API documentation accessible"
    echo "   • Authentication working"
    echo "   • JWT tokens generated"
    echo ""
    echo "🚀 Ready for Phase 2: API Implementation"
    echo ""
    echo "Next steps:"
    echo "  1. Create database: createdb -h localhost -U postgres learning_ocean"
    echo "  2. Run migrations: alembic upgrade head"
    echo "  3. Implement API endpoints (curriculum, lessons, exercises)"
    exit 0
else
    echo -e "${RED}❌ Phase 1 Verification: FAILED${NC}"
    echo ""
    echo "Please fix the failing tests before proceeding."
    exit 1
fi
