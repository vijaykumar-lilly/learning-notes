#!/bin/bash
# Create learning_ocean database

echo "🗄️  Creating 'learning_ocean' database..."

# Try to create the database
psql -h localhost -U postgres -c "CREATE DATABASE learning_ocean;" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Database 'learning_ocean' created successfully!"
else
    echo "⚠️  Database may already exist or there was an error."
    echo ""
    echo "To create manually, run:"
    echo "  psql -h localhost -U postgres"
    echo "  CREATE DATABASE learning_ocean;"
    echo "  \\q"
fi

echo ""
echo "Verifying database exists..."
psql -h localhost -U postgres -l | grep learning_ocean

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database 'learning_ocean' is ready!"
    echo ""
    echo "Next steps:"
    echo "  1. cd backend"
    echo "  2. alembic revision --autogenerate -m 'Initial database schema'"
    echo "  3. alembic upgrade head"
else
    echo ""
    echo "❌ Database not found. Please create it manually."
fi
