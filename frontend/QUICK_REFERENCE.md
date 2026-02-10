# LearnHub Quick Reference

## 🚀 Quick Start Commands

### Database Setup
```bash
cd backend
alembic upgrade head                    # Run migrations
python scripts/seed_test_data.py        # Populate test data
```

### Start Services
```bash
# Backend (in /backend)
uvicorn app.main:app --reload           # http://localhost:8000

# Frontend (in root)
npm run dev                              # http://localhost:3000
```

### Test Accounts
```
Admin:    admin / admin123
Student:  student / student123
```

---

## 📊 Database Management

```bash
# Export
python scripts/db_manager.py export --format json

# Import
python scripts/db_manager.py import --file backup.json

# Clean all data
python scripts/db_manager.py clean

# Reset (clean + seed)
python scripts/db_manager.py reset --force

# Named backups
python scripts/db_manager.py backup --name my_backup
python scripts/db_manager.py restore --name my_backup
python scripts/db_manager.py list-backups
```

---

## 🌐 Key URLs

### Frontend
```
http://localhost:3000/en                      # Homepage
http://localhost:3000/en/subjects/1          # Subject detail
http://localhost:3000/en/learn/mechanics/motion  # Lesson
http://localhost:3000/en/curriculum           # Curriculum browser
http://localhost:3000/en/admin/dashboard      # Admin dashboard
```

### Backend
```
http://localhost:8000                         # Root
http://localhost:8000/docs                    # API documentation
http://localhost:8000/api/v1/curriculum      # Curriculum API
http://localhost:8000/api/v1/lessons/{slug}  # Lesson API
```

---

## 📁 File Structure

```
/app/[locale]/
  ├── page.tsx                           # Homepage (subjects)
  ├── subjects/[id]/page.tsx             # Subject detail
  ├── learn/[domain]/[slug]/page.tsx     # Dynamic lesson
  └── curriculum/page.tsx                # Curriculum browser

/components/
  ├── lesson/
  │   ├── LessonSectionRenderer.tsx      # Section renderer
  │   └── ExercisesRenderer.tsx          # Exercise player
  └── ui/                                # UI components

/backend/
  ├── app/models/                        # Database models
  ├── app/api/v1/                        # API endpoints
  └── scripts/
      ├── seed_test_data.py              # Test data
      └── db_manager.py                  # DB management
```

---

## 🔑 API Endpoints

### Public (Students)
```bash
GET /api/v1/curriculum?locale=en           # Get all subjects/domains
GET /api/v1/lessons/{slug}?locale=en       # Get lesson content
GET /api/v1/translations/{locale}          # Get translations
```

### Admin (Authentication Required)
```bash
POST /api/v1/admin/subjects                # Create subject
GET  /api/v1/admin/subjects                # List all subjects
PUT  /api/v1/admin/subjects/{id}           # Update subject
POST /api/v1/admin/translations            # Add translation
```

---

## 🎓 Content Structure

### Lesson Section Types
- `before_you_start` - Prerequisites & objectives
- `definition` - Terms and definitions
- `example` - Problem-solving examples
- `visual` - Diagrams and visualizations
- `note` - Tips and warnings
- `common_mistake` - Common errors

### Exercise Types
- `multiple_choice` - Multiple choice questions
- `numeric_input` - Numeric answer questions

---

## 🌍 Translation Keys

Format: `{category}.{item}.{field}`

Examples:
```
subjects.physics.name          → "Physics" / "இயற்பியல்"
domains.mechanics.title        → "Mechanics" / "இயக்கவியல்"
physics.motion.definition.term → "Velocity" / "வேகம்"
```

---

## 🔧 Common Tasks

### Add New Subject (Manual)
1. Edit `seed_test_data.py`
2. Add Subject, Domains, Topics
3. Add Translations
4. Run: `python scripts/seed_test_data.py`

### Add New Language
1. Add translations to database (locale='xx')
2. Update `i18n.ts`: add locale to array
3. Done! Frontend auto-supports it

### Backup Before Changes
```bash
python scripts/db_manager.py backup --name before_$(date +%Y%m%d)
# Make changes...
# Restore if needed:
python scripts/db_manager.py restore --name before_YYYYMMDD
```

### Fresh Development Start
```bash
python scripts/db_manager.py reset --force
```

---

## 🐛 Troubleshooting

**Frontend not loading:**
- Check backend is running: http://localhost:8000
- Check .env.local has NEXT_PUBLIC_API_URL
- Run seed script: `python scripts/seed_test_data.py`

**Database errors:**
- Start PostgreSQL
- Check DATABASE_URL in backend/.env
- Run migrations: `alembic upgrade head`

**404 on lesson page:**
- Verify slug is correct
- Check lesson exists in database
- Verify status is PUBLISHED

---

## 📚 Documentation

- System Guide: `/docs/SYSTEM_GUIDE.md`
- Frontend Cleanup: `/docs/FRONTEND_CLEANUP_COMPLETE.md`
- Scripts Guide: `/backend/scripts/README.md`

---

## 💡 Pro Tips

1. Always backup before migrations:
   ```bash
   python scripts/db_manager.py backup --name before_migration
   ```

2. Use named backups for experiments:
   ```bash
   python scripts/db_manager.py backup --name experiment_1
   # Try something...
   python scripts/db_manager.py restore --name experiment_1
   ```

3. Export for team sharing:
   ```bash
   python scripts/db_manager.py export --output team_data.json
   ```

4. JSON format is portable, SQL format is faster

5. Backend API docs at: http://localhost:8000/docs

---

**Version:** 1.0.0 | **Last Updated:** 2026-02-10
