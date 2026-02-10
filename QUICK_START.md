# Quick Start Guide - Learning Ocean Backend

## Database Configuration ✅

Your database configuration has been updated:

- **Database Name:** `learning_ocean`
- **Host:** `localhost`
- **Port:** `5432`
- **User:** `postgres`
- **Password:** `postgres`

All configuration files have been updated with these settings:
- ✅ `backend/.env.example`
- ✅ `backend/.env` (created)
- ✅ `backend/alembic.ini`
- ✅ `docker-compose.yml`

---

## 🚀 Start the Backend (3 Options)

### Option 1: Using Existing PostgreSQL Database (Recommended)

If your PostgreSQL is already running with the `learning_ocean` database:

```bash
cd backend

# Install dependencies (first time only)
pip install -r requirements.txt

# Generate initial migration
alembic revision --autogenerate -m "Initial database schema"

# Apply migration
alembic upgrade head

# Start the backend
uvicorn app.main:app --reload
```

Access the API at: http://localhost:8000/docs

---

### Option 2: Using Docker (Fresh Start)

If you want to start with a fresh PostgreSQL container:

```bash
# From project root
docker-compose up -d postgres

# Wait for PostgreSQL to be ready (10-15 seconds)
sleep 15

# Generate and apply migrations
cd backend
alembic revision --autogenerate -m "Initial database schema"
alembic upgrade head

# Start backend locally
uvicorn app.main:app --reload
```

---

### Option 3: Full Docker Setup

Run both PostgreSQL and Backend in containers:

```bash
# From project root
docker-compose up -d postgres

# Wait for PostgreSQL
sleep 15

# Run migrations inside container
docker-compose run --rm backend alembic upgrade head

# Start backend container
docker-compose up -d backend

# View logs
docker-compose logs -f backend
```

---

## ✅ Verify Setup

Once the backend is running, test these endpoints:

### 1. Health Check
```bash
curl http://localhost:8000/health
```

Expected: `{"status":"healthy"}`

### 2. API Root
```bash
curl http://localhost:8000/
```

Expected: API info with version

### 3. Register a User
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@learningocean.com",
    "username": "admin",
    "password": "admin123",
    "full_name": "Admin User"
  }'
```

Expected: JWT token and user info

### 4. Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"
```

Expected: JWT token

### 5. API Documentation
Open in browser: http://localhost:8000/docs

---

## 📊 Database Tables Created

After running migrations, these tables will be created in `learning_ocean`:

1. **domains** - Curriculum domains (Foundations, Pre-Algebra, etc.)
2. **topics** - Topics within domains
3. **lessons** - Lesson metadata
4. **lesson_sections** - Lesson content sections (JSON)
5. **translations** - Multilingual content (en, ta)
6. **exercises** - Practice exercises with answers
7. **users** - User accounts
8. **lesson_progress** - User progress tracking
9. **exercise_submissions** - Exercise attempt history
10. **alembic_version** - Migration version tracking

---

## 🔧 Troubleshooting

### Issue: "relation does not exist"
**Solution:** Run migrations first
```bash
cd backend
alembic upgrade head
```

### Issue: "could not connect to server"
**Solution:** Ensure PostgreSQL is running
```bash
# Check if PostgreSQL is running
pg_isadmin -h localhost -p 5432 -U postgres

# Or if using Docker
docker-compose ps postgres
```

### Issue: "database 'learning_ocean' does not exist"
**Solution:** Create the database
```bash
# Connect to PostgreSQL
psql -h localhost -U postgres

# Create database
CREATE DATABASE learning_ocean;
\q
```

### Issue: Import errors when starting backend
**Solution:** Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

---

## 🎯 What's Next?

With Phase 1 complete and database configured, you can now:

1. **Test Authentication** ✅ (Already implemented)
   - Register users
   - Login with JWT tokens
   - Verify token-based auth works

2. **Start Phase 2** - Implement API Endpoints
   - Curriculum API (get domains/topics)
   - Lessons API (fetch lesson content)
   - Translations API (multilingual support)
   - Exercise submission & validation

3. **Start Phase 4** - Data Migration
   - Migrate static curriculum data to database
   - Import translations from JSON files
   - Parse lesson pages and extract components

4. **Build Frontend Integration**
   - Create API client in Next.js
   - Replace static imports with API calls
   - Connect authentication system

---

## 📝 Environment Variables

Your `.env` file contains:

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/learning_ocean

# Security
SECRET_KEY=your-secret-key-here-change-in-production  # ⚠️ Change in production!
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
CORS_ORIGINS=["http://localhost:3000"]

# Environment
ENVIRONMENT=development
```

**⚠️ Production Note:** Generate a strong SECRET_KEY:
```bash
openssl rand -hex 32
```

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ Backend starts without errors
2. ✅ API docs accessible at http://localhost:8000/docs
3. ✅ User registration returns JWT token
4. ✅ Login works with username/password
5. ✅ Database has 10 tables created
6. ✅ Health check returns `{"status":"healthy"}`

---

**Backend Status:** 🟢 Ready for Development

Need help with the next phase? Let me know!
