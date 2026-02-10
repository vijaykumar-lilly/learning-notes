#!/bin/bash

# Phase 2 API Endpoints Verification Script
# Tests all implemented API endpoints

set -e

echo "========================================"
echo "Phase 2: API Endpoints Verification"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:${APP_PORT:-8000}/api/v1"

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local url=$3
    local expected_code=$4
    local data=$5

    echo -n "Testing: $name... "

    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" -X GET "$url")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    # Extract status code (last line)
    status_code=$(echo "$response" | tail -n1)
    # Extract body (all except last line)
    body=$(echo "$response" | sed '$d')

    if [ "$status_code" = "$expected_code" ]; then
        echo -e "${GREEN}✓ PASSED${NC} (Status: $status_code)"
        TESTS_PASSED=$((TESTS_PASSED + 1))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (Expected: $expected_code, Got: $status_code)"
        echo "Response: $body"
        TESTS_FAILED=$((TESTS_FAILED + 1))
        return 1
    fi
}

echo "1. Testing Curriculum API Endpoints"
echo "------------------------------------"

test_endpoint \
    "Get all curriculum (English)" \
    "GET" \
    "$BASE_URL/curriculum?locale=en" \
    "200"

test_endpoint \
    "Get all curriculum (Tamil)" \
    "GET" \
    "$BASE_URL/curriculum?locale=ta" \
    "200"

test_endpoint \
    "Get specific domain (if exists)" \
    "GET" \
    "$BASE_URL/curriculum/domains/pre-algebra" \
    "200"

test_endpoint \
    "Get domain topics" \
    "GET" \
    "$BASE_URL/curriculum/domains/pre-algebra/topics" \
    "200"

echo ""
echo "2. Testing Translation API Endpoints"
echo "------------------------------------"

test_endpoint \
    "Get all translations for English" \
    "GET" \
    "$BASE_URL/translations/en" \
    "200"

test_endpoint \
    "Get all translations for Tamil" \
    "GET" \
    "$BASE_URL/translations/ta" \
    "200"

test_endpoint \
    "Get translations for specific namespace" \
    "GET" \
    "$BASE_URL/translations/en/common" \
    "200"

echo ""
echo "3. Testing Lesson API Endpoints"
echo "------------------------------------"

# Note: These tests assume at least one lesson exists in the database
test_endpoint \
    "Get lesson by topic slug (should work if lesson exists)" \
    "GET" \
    "$BASE_URL/lessons/expressions?locale=en" \
    "200"

test_endpoint \
    "Get lesson exercises" \
    "GET" \
    "$BASE_URL/lessons/expressions/exercises?locale=en" \
    "200"

test_endpoint \
    "Get lesson progress (auth not implemented)" \
    "GET" \
    "$BASE_URL/lessons/expressions/progress" \
    "200"

test_endpoint \
    "Get non-existent lesson (should return 404)" \
    "GET" \
    "$BASE_URL/lessons/nonexistent-lesson?locale=en" \
    "404"

echo ""
echo "4. Testing Exercise API Endpoints"
echo "------------------------------------"

# Note: This test assumes exercise ID 1 exists
test_endpoint \
    "Submit exercise answer (should work if exercise exists)" \
    "POST" \
    "$BASE_URL/exercises/1/submit?locale=en" \
    "200" \
    '{"answer": "test"}'

test_endpoint \
    "Submit to non-existent exercise (should return 404)" \
    "POST" \
    "$BASE_URL/exercises/99999/submit" \
    "404" \
    '{"answer": "test"}'

echo ""
echo "========================================"
echo "Phase 2 Verification Summary"
echo "========================================"
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All Phase 2 tests passed!${NC}"
    echo ""
    echo "Next Steps:"
    echo "1. Add sample data to database (lessons, translations, exercises)"
    echo "2. Test with actual lesson content"
    echo "3. Move to Phase 3: Data Migration Script"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Please review the errors above.${NC}"
    echo ""
    echo "Note: Some tests may fail if:"
    echo "- Database is empty (no lessons/exercises created yet)"
    echo "- Specific topics/domains don't exist"
    echo "- Sample data hasn't been loaded"
    exit 1
fi
