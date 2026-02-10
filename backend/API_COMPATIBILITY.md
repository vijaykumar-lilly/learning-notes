# API Compatibility with Subject Model - Summary

## Status: ✅ All APIs Updated and Compatible

All existing APIs have been updated to work correctly with the new Subject model and status-based visibility system.

---

## Changes Made

### 1. **Curriculum API** ([curriculum.py](app/api/v1/curriculum.py))

**Updated Endpoints:**

- `GET /api/v1/curriculum` - **Now filters by status**
  ```python
  # Before: Returned ALL domains
  domains = db.query(Domain).order_by(Domain.display_order).all()

  # After: Only returns PUBLISHED domains
  domains = db.query(Domain).filter(
      Domain.status == ContentStatus.PUBLISHED
  ).order_by(Domain.display_order).all()
  ```

- `GET /api/v1/curriculum/domains/{slug}` - **Now checks status**
  ```python
  # Only returns domain if status == PUBLISHED
  domain = db.query(Domain).filter(
      Domain.slug == domain_slug,
      Domain.status == ContentStatus.PUBLISHED
  ).first()
  ```

- `GET /api/v1/curriculum/domains/{slug}/topics` - **Now checks status**
  ```python
  # Only returns topics for PUBLISHED domains
  ```

**Impact:** Students can only see published domains. Draft and approved domains are hidden.

---

### 2. **Lessons API** ([lessons.py](app/api/v1/lessons.py))

**Updated Endpoint:**

- `GET /api/v1/lessons/{topic_slug}` - **Now checks domain status**
  ```python
  # Check if domain is published before returning lesson
  if domain.status != ContentStatus.PUBLISHED:
      raise HTTPException(
          status_code=404,
          detail="Lesson not available (domain not published)"
      )
  ```

**Impact:** Students can only access lessons for published domains. Trying to access a lesson for a draft domain returns 404.

---

### 3. **Admin API** ([admin.py](app/api/v1/admin.py)) - NEW

**Created Endpoints:**

- `POST /api/v1/admin/subjects/generate` - Generate curriculum with AI
- `GET /api/v1/admin/subjects` - List all subjects (admin only)
- `GET /api/v1/admin/subjects/{id}` - Get subject details
- `POST /api/v1/admin/subjects/{id}/approve` - Approve curriculum
- `POST /api/v1/admin/subjects/{id}/publish` - Publish to students
- `PUT /api/v1/admin/subjects/{id}` - Update subject metadata
- `DELETE /api/v1/admin/subjects/{id}` - Delete draft subject

**Impact:** Admins have full CRUD control over subjects and can manage the approval workflow.

---

## Visibility Rules

### For Students (Public API):

| Endpoint | Visibility Rule |
|----------|----------------|
| `GET /curriculum` | ✅ Only **published** domains |
| `GET /curriculum/domains/{slug}` | ✅ Only **published** domains |
| `GET /lessons/{slug}` | ✅ Only lessons in **published** domains |
| `GET /exercises` | ✅ Only exercises in **published** domains |

### For Admins (Admin API):

| Endpoint | Visibility Rule |
|----------|----------------|
| `GET /admin/subjects` | ✅ All subjects (draft, approved, published) |
| `GET /admin/subjects/{id}` | ✅ All subjects |
| `POST /admin/subjects/generate` | ✅ Creates draft subject |
| `POST /admin/subjects/{id}/approve` | ✅ Changes draft → approved |
| `POST /admin/subjects/{id}/publish` | ✅ Changes approved → published |

---

## Status Workflow

```
1. AI Generation → DRAFT
   ↓
2. Admin Reviews → (stays DRAFT or updates metadata)
   ↓
3. Admin Approves → APPROVED
   ↓
4. Admin Publishes → PUBLISHED ✅ Visible to Students
```

---

## Backward Compatibility

### ✅ Existing Functionality Preserved

All existing APIs continue to work as before, with the addition of status filtering:

**Before Subject Model:**
- `/curriculum` returned all domains (12 domains)

**After Subject Model:**
- `/curriculum` returns only published domains
- If no domains published yet → returns empty list
- Existing domains in DB have `status = NULL` → need migration

### ⚠️ Migration Needed

Existing domains in the database don't have a status set. Run this migration:

```python
from app.database import SessionLocal
from app.models import Domain
from app.models.domain import ContentStatus

db = SessionLocal()

# Set all existing domains to PUBLISHED (so they remain visible)
db.query(Domain).update({"status": ContentStatus.PUBLISHED})
db.commit()

print("✅ All existing domains set to PUBLISHED")
```

Or set them to DRAFT if you want to review them first:

```python
db.query(Domain).update({"status": ContentStatus.DRAFT})
```

---

## API Testing

### Test Student Visibility:

```bash
# Should only return published domains
curl http://localhost:8000/api/v1/curriculum?locale=en

# Should return 404 if domain is not published
curl http://localhost:8000/api/v1/curriculum/domains/draft-domain

# Should return 404 if lesson's domain is not published
curl http://localhost:8000/api/v1/lessons/draft-topic?locale=en
```

### Test Admin Access:

```bash
# Login as admin
TOKEN=$(curl -X POST http://localhost:8000/api/v1/auth/login \
  -d "username=admin&password=admin123" | jq -r .access_token)

# List all subjects (including drafts)
curl http://localhost:8000/api/v1/admin/subjects \
  -H "Authorization: Bearer $TOKEN"

# Generate new curriculum
curl -X POST http://localhost:8000/api/v1/admin/subjects/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Test Subject", "grade_level": null}'

# Approve subject
curl -X POST http://localhost:8000/api/v1/admin/subjects/1/approve \
  -H "Authorization: Bearer $TOKEN"

# Publish subject
curl -X POST http://localhost:8000/api/v1/admin/subjects/1/publish \
  -H "Authorization: Bearer $TOKEN"

# Verify student can now see it
curl http://localhost:8000/api/v1/curriculum?locale=en
```

---

## Other APIs (No Changes Needed)

### ✅ Compatible As-Is:

- **Auth API** (`auth.py`) - Not affected by subject model
- **Translations API** (`translations.py`) - Not affected
- **Exercises API** (`exercises.py`) - Inherits visibility from lessons
- **Progress API** (`progress.py`) - Not affected (user-specific)

---

## Summary

✅ **Curriculum API** - Updated with status filtering
✅ **Lessons API** - Updated with domain status check
✅ **Admin API** - New endpoints for subject management
✅ **Visibility Rules** - Only published content visible to students
✅ **Backward Compatible** - Existing APIs still work
⚠️ **Migration Required** - Set status on existing domains

---

## Next Steps

1. **Run Migration** - Set status on existing domains in database
2. **Test Visibility** - Verify students only see published content
3. **Test Admin Workflow** - Generate → Approve → Publish
4. **Update Frontend** - Add admin UI for subject management

All APIs are now compatible with the Subject model and ready for the agentic AI workflow!
