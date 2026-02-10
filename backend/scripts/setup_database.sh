#!/bin/bash
# Setup database and run migrations for Phase 1

echo "🗄️  Learning Ocean Backend - Database Setup"
echo "==========================================="
echo ""

# Check if PostgreSQL is running
echo "1️⃣  Checking PostgreSQL..."
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running!"
    echo ""
    echo "Start PostgreSQL with:"
    echo "  brew services start postgresql@15"
    echo "  # or"
    echo "  docker-compose up -d postgres"
    exit 1
fi
echo "✅ PostgreSQL is running"
echo ""

# Create database
echo "2️⃣  Creating database 'learning_ocean'..."
createdb -h localhost -U postgres learning_ocean 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully"
else
    # Check if it already exists
    if psql -h localhost -U postgres -lqt | cut -d \| -f 1 | grep -qw learning_ocean; then
        echo "⚠️  Database already exists (OK)"
    else
        echo "❌ Failed to create database"
        exit 1
    fi
fi
echo ""

# Generate migration
echo "3️⃣  Generating database migration..."
alembic revision --autogenerate -m "Initial database schema" 2>&1 | grep -v "INFO"

if [ $? -eq 0 ]; then
    echo "✅ Migration generated"
else
    echo "⚠️  Migration may already exist or there was an error"
fi
echo ""

# Run migrations
echo "4️⃣  Running migrations..."
alembic upgrade head

if [ $? -eq 0 ]; then
    echo "✅ Migrations applied successfully"
else
    echo "❌ Failed to apply migrations"
    exit 1
fi
echo ""

# Verify tables
echo "5️⃣  Verifying database tables..."
TABLE_COUNT=$(psql -h localhost -U postgres learning_ocean -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null | tr -d ' ')

if [ "$TABLE_COUNT" -gt 0 ]; then
    echo "✅ Found $TABLE_COUNT tables in database"
    echo ""
    echo "Tables created:"
    psql -h localhost -U postgres learning_ocean -c "\dt" 2>/dev/null | grep -E "public \|" | awk '{print "  • " $3}'
else
    echo "❌ No tables found in database"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Database setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Start backend: python -m uvicorn app.main:app --reload"
echo "  2. Run verification: ./verify_phase1.sh"
echo ""
