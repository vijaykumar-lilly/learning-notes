# LearningHub MVP Completion Plan

**Target:** Production-Ready MVP in 4-6 Weeks
**Current Status:** 75% Complete (29/39 requirements implemented)
**Priority:** Phase 1 Critical Fixes → Phase 2 Core Features → Phase 3 Launch Polish

---

## 🎯 EXECUTIVE SUMMARY

LearningHub has a **solid foundation** with working authentication, curriculum browsing, lesson delivery, interactive exercises, and progress tracking. The core learning flow works end-to-end.

**Main Blockers:**
1. Lesson content is empty (structure generated, sections not filled)
2. Status field type inconsistency (strings vs enums)
3. User profile page missing

**Estimated Effort:** 4-6 weeks with 1-2 developers
**Go-Live Date:** March 15-29, 2026 (assuming Feb 11 start)

---

## 📋 PHASE 1: CRITICAL FIXES (Week 1-2)

**Goal:** Make core user flow production-ready
**Duration:** 8-10 working days
**Priority:** HIGHEST - Blocks all other work

### Task 1.1: Fix Status Field Enum Consistency

**Issue:** Code uses string literals (`'draft'`, `'approved'`) instead of enum types
**Files Affected:**
- `backend/app/api/v1/admin.py` (line 156)
- `backend/app/models/curriculum.py`
- Any other status assignments

**Implementation:**
```python
# ❌ WRONG (current)
domain.status = 'draft'

# ✅ CORRECT (fix)
from app.models.curriculum import ContentStatus
domain.status = ContentStatus.DRAFT
```

**Steps:**
1. Search codebase for string status assignments: `grep -r "\.status = ['\"]" backend/`
2. Replace all with enum values
3. Update tests to use enums
4. Run full test suite
5. Verify database writes use correct enum values

**Acceptance Criteria:**
- ✅ All status assignments use `ContentStatus` enum
- ✅ No string literals for status values
- ✅ Database stores correct enum values
- ✅ All tests pass

**Effort:** 2-4 hours
**Owner:** Backend Developer

---

### Task 1.2: Complete Lesson Content Generation

**Issue:** AI generates domain/topic structure, but `LessonSection` content is empty
**Files Affected:**
- `backend/app/agents/curriculum_agent.py`
- `backend/app/api/v1/admin.py`

**Current Flow:**
```
POST /admin/subjects/generate
  ↓
CurriculumAgent.generate_curriculum()
  ↓
Creates: Subject → Domains → Topics
  ❌ Missing: Lessons → LessonSections with content
```

**Implementation Plan:**

**Step 1:** Extend `CurriculumAgent` with section generation

```python
# Add to curriculum_agent.py

def generate_lesson_content(
    self,
    topic: Topic,
    num_sections: int = 5
) -> List[LessonSection]:
    """Generate lesson sections using Claude API"""

    # Use compact notation prompt (Document 09)
    prompt = f"""
Generate {num_sections} lesson sections for topic: {topic.title_key}

Schema:
Section{{type:def|ex|vis|note, content:{{en,ta}}, order:int}}

Types:
- def: Definition/explanation
- ex: Worked example with steps
- vis: Visual explanation
- note: Important note or tip

Output JSON array only.
"""

    response = self.claude_client.generate(prompt)
    sections = parse_response(response)

    # Create LessonSection records
    lesson_sections = []
    for idx, section_data in enumerate(sections):
        section = LessonSection(
            lesson_id=topic.lesson_id,
            section_type=section_data['type'],
            content_json=section_data['content'],
            display_order=idx,
            status=ContentStatus.DRAFT
        )
        lesson_sections.append(section)

    return lesson_sections
```

**Step 2:** Integrate into generation workflow

```python
# Modify admin.py generate endpoint

@router.post("/admin/subjects/generate")
async def generate_curriculum(request: GenerationRequest):
    # ... existing code generates subject, domains, topics ...

    # NEW: Generate lesson content for each topic
    for topic in topics:
        # Create Lesson record
        lesson = Lesson(
            topic_id=topic.id,
            slug=generate_slug(topic.title_key),
            status=ContentStatus.DRAFT
        )
        db.add(lesson)
        db.flush()  # Get lesson.id

        # Generate sections
        sections = agent.generate_lesson_content(topic, num_sections=5)
        db.add_all(sections)

    db.commit()
```

**Step 3:** Add batch optimization

- Generate 10 topics worth of content per API call
- Use prompt caching (Document 09)
- Track token usage

**Acceptance Criteria:**
- ✅ Lesson sections have actual content (not empty)
- ✅ Content includes both English and Tamil
- ✅ All section types render correctly
- ✅ Token usage tracked and within budget

**Effort:** 3-5 days
**Owner:** Backend Developer + AI Engineer

---

### Task 1.3: Build User Profile Page

**Issue:** Users can't edit their preferences
**Files Affected:**
- `frontend/app/[locale]/profile/page.tsx` (NEW)
- `frontend/components/profile/ProfileForm.tsx` (NEW)
- `backend/app/api/v1/auth.py` (test `/me` endpoint)

**Implementation:**

**Step 1:** Create profile page

```typescript
// frontend/app/[locale]/profile/page.tsx

'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/layout/AppLayout'
import ProfileForm from '@/components/profile/ProfileForm'
import { getMe, updateProfile } from '@/lib/auth-api'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getMe()
        setUser(userData)
      } catch (error) {
        console.error('Failed to load user', error)
        // Redirect to login if not authenticated
        window.location.href = '/auth/login'
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
        <ProfileForm user={user} onUpdate={setUser} />
      </div>
    </AppLayout>
  )
}
```

**Step 2:** Create profile form component

```typescript
// frontend/components/profile/ProfileForm.tsx

'use client'

import { useState } from 'react'
import { updateProfile } from '@/lib/auth-api'

export default function ProfileForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    full_name: user.full_name || '',
    email: user.email || '',
    preferred_locale: user.preferred_locale || 'en'
  })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const updated = await updateProfile(formData)
      onUpdate(updated)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Preferred Language
        </label>
        <select
          value={formData.preferred_locale}
          onChange={(e) => setFormData({...formData, preferred_locale: e.target.value})}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="en">English</option>
          <option value="ta">Tamil</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
```

**Step 3:** Add update endpoint (backend)

```python
# backend/app/api/v1/auth.py

@router.put("/me")
async def update_profile(
    profile: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user profile"""

    # Update allowed fields
    if profile.full_name is not None:
        current_user.full_name = profile.full_name
    if profile.preferred_locale is not None:
        current_user.preferred_locale = profile.preferred_locale
    # Email update requires verification (Phase 2)

    db.commit()
    db.refresh(current_user)

    return current_user
```

**Acceptance Criteria:**
- ✅ User can view profile information
- ✅ User can edit name and language preference
- ✅ Changes save successfully
- ✅ UI updates reflect changes immediately
- ✅ Proper error handling

**Effort:** 1-2 days
**Owner:** Frontend Developer

---

### Task 1.4: Comprehensive Error Handling

**Issue:** Inconsistent error handling across codebase
**Files Affected:** All API endpoints, all frontend pages

**Implementation:**

**Backend Error Handling:**
```python
# Add to all endpoints

@router.get("/lessons/{slug}")
async def get_lesson(slug: str, db: Session = Depends(get_db)):
    try:
        lesson = db.query(Lesson).filter_by(slug=slug).first()
        if not lesson:
            raise HTTPException(
                status_code=404,
                detail=f"Lesson '{slug}' not found"
            )
        return lesson
    except HTTPException:
        raise  # Re-raise HTTP exceptions
    except Exception as e:
        logger.error(f"Error fetching lesson {slug}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )
```

**Frontend Error Handling:**
```typescript
// Add to all API calls

try {
  const data = await fetchAPI('/lessons/slug')
  return data
} catch (error) {
  if (error.status === 404) {
    // Show "not found" message
  } else if (error.status === 401) {
    // Redirect to login
    window.location.href = '/auth/login'
  } else {
    // Show generic error
    console.error('API Error:', error)
  }
  throw error
}
```

**Acceptance Criteria:**
- ✅ All API endpoints have try-catch blocks
- ✅ Proper HTTP status codes returned
- ✅ Frontend shows user-friendly error messages
- ✅ Errors logged for debugging
- ✅ 401 errors redirect to login
- ✅ 404 errors show "not found" pages

**Effort:** 1-2 days
**Owner:** Full Stack Developer

---

### Task 1.5: End-to-End Testing

**Issue:** Need to verify complete user flow works
**Test Scenarios:**

1. **Registration & Login**
   - Register new user
   - Verify email stored correctly
   - Login with credentials
   - JWT token valid

2. **Curriculum Browsing**
   - View all subjects
   - Click subject → see domains
   - Click domain → see topics
   - Click topic → see lesson

3. **Lesson Learning**
   - Lesson displays correctly
   - All section types render
   - Math equations render (KaTeX)
   - Bilingual content switches

4. **Exercise Completion**
   - Multiple choice submission works
   - Numeric input validates
   - Correct answers show celebration
   - Incorrect answers show explanation

5. **Progress Tracking**
   - Lesson progress saves
   - Dashboard shows stats
   - Recommendations generate

**Acceptance Criteria:**
- ✅ All test scenarios pass
- ✅ No console errors
- ✅ No broken links
- ✅ Responsive on mobile/tablet/desktop
- ✅ Dark mode works

**Effort:** 2-3 days
**Owner:** QA / Full Stack Developer

---

## 📋 PHASE 2: CORE FEATURES (Week 3-5)

**Goal:** Complete feature parity with BRD
**Duration:** 12-15 working days
**Priority:** HIGH - Required for production

### Task 2.1: Password Reset Flow

**Features:**
- User requests password reset
- Email with reset link sent
- User sets new password
- Old JWT tokens invalidated

**Implementation:**

**Step 1:** Add email service (SendGrid)

```python
# backend/app/services/email.py

import sendgrid
from sendgrid.helpers.mail import Mail

class EmailService:
    def __init__(self, api_key: str):
        self.client = sendgrid.SendGridAPIClient(api_key)

    def send_password_reset(self, email: str, token: str):
        base_url = os.getenv('FRONTEND_URL')
        reset_link = f"{base_url}/auth/reset-password?token={token}"

        message = Mail(
            from_email='noreply@learninghub.com',
            to_emails=email,
            subject='Reset Your Password',
            html_content=f'''
                <h1>Reset Your Password</h1>
                <p>Click the link below to reset your password:</p>
                <a href="{reset_link}">Reset Password</a>
                <p>This link expires in 1 hour.</p>
            '''
        )

        response = self.client.send(message)
        return response.status_code == 202
```

**Step 2:** Backend endpoints

```python
# backend/app/api/v1/auth.py

@router.post("/password-reset")
async def request_password_reset(request: PasswordResetRequest):
    """Send password reset email"""
    user = db.query(User).filter_by(email=request.email).first()
    if user:
        # Generate reset token (JWT with 1 hour expiration)
        reset_token = create_reset_token(user.id)

        # Send email
        email_service.send_password_reset(user.email, reset_token)

    # Always return success (don't reveal if email exists)
    return {"message": "If email exists, reset link sent"}

@router.post("/password-reset/confirm")
async def confirm_password_reset(request: PasswordResetConfirm):
    """Reset password with token"""
    try:
        # Verify token
        payload = jwt.decode(request.token, SECRET_KEY)
        user_id = payload.get("sub")

        # Update password
        user = db.query(User).get(user_id)
        user.password_hash = hash_password(request.new_password)
        db.commit()

        return {"message": "Password reset successful"}
    except JWTError:
        raise HTTPException(400, "Invalid or expired token")
```

**Step 3:** Frontend pages

```typescript
// frontend/app/[locale]/auth/reset-password/page.tsx

export default function ResetPasswordPage() {
  const [step, setStep] = useState<'request' | 'confirm'>('request')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      setStep('confirm')
    }
  }, [])

  if (step === 'request') {
    return <RequestResetForm />
  } else {
    return <ConfirmResetForm token={token} />
  }
}
```

**Acceptance Criteria:**
- ✅ User can request password reset via email
- ✅ Email received with reset link
- ✅ Reset link opens password reset form
- ✅ New password saves successfully
- ✅ User can login with new password
- ✅ Old JWT tokens no longer valid

**Effort:** 2-3 days
**Owner:** Full Stack Developer

---

### Task 2.2: Admin Content Management UI

**Features:**
- Dashboard overview (stats, pending approvals)
- Subject/Domain/Topic CRUD
- Lesson content editor
- Approval workflow
- Analytics views

**Pages to Create:**
1. `/[locale]/admin` - Dashboard
2. `/[locale]/admin/subjects` - Subject list
3. `/[locale]/admin/subjects/[id]` - Subject editor
4. `/[locale]/admin/lessons/[id]` - Lesson editor
5. `/[locale]/admin/analytics` - Analytics dashboard

**Implementation:**

**Step 1:** Admin layout component

```typescript
// frontend/components/admin/AdminLayout.tsx

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/subjects">Subjects</Link>
          <Link href="/admin/lessons">Lessons</Link>
          <Link href="/admin/users">Users</Link>
          <Link href="/admin/analytics">Analytics</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
```

**Step 2:** Dashboard page

```typescript
// frontend/app/[locale]/admin/page.tsx

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  const pending = await getPendingApprovals()

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={stats.total_users} />
        <StatCard title="Total Lessons" value={stats.total_lessons} />
        <StatCard title="Pending Approvals" value={pending.length} />
        <StatCard title="Active Learners" value={stats.active_users} />
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Pending Approvals</h2>
        <ApprovalQueue items={pending} />
      </div>
    </AdminLayout>
  )
}
```

**Step 3:** Backend endpoints (implement 501 stubs)

```python
# backend/app/api/v1/admin.py

@router.get("/admin/dashboard")
async def get_admin_dashboard(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    return {
        "total_users": db.query(User).count(),
        "total_lessons": db.query(Lesson).count(),
        "total_subjects": db.query(Subject).count(),
        "active_users": db.query(User).filter(
            User.last_login_at > datetime.now() - timedelta(days=30)
        ).count(),
        "pending_approvals": db.query(Subject).filter_by(
            status=ContentStatus.DRAFT
        ).count()
    }

@router.post("/admin/lessons")
async def create_lesson(
    lesson: LessonCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Create new lesson"""
    new_lesson = Lesson(**lesson.dict())
    db.add(new_lesson)
    db.commit()
    return new_lesson

@router.put("/admin/lessons/{id}")
async def update_lesson(
    id: int,
    lesson: LessonUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Update existing lesson"""
    existing = db.query(Lesson).get(id)
    if not existing:
        raise HTTPException(404, "Lesson not found")

    for key, value in lesson.dict(exclude_unset=True).items():
        setattr(existing, key, value)

    db.commit()
    return existing

@router.delete("/admin/lessons/{id}")
async def delete_lesson(
    id: int,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Delete lesson"""
    lesson = db.query(Lesson).get(id)
    if not lesson:
        raise HTTPException(404, "Lesson not found")

    db.delete(lesson)
    db.commit()
    return {"message": "Lesson deleted"}
```

**Acceptance Criteria:**
- ✅ Admins can access admin panel
- ✅ Dashboard shows key statistics
- ✅ Admins can create/edit/delete subjects, domains, topics, lessons
- ✅ Approval workflow functional
- ✅ Changes persist to database
- ✅ Non-admin users blocked (403)

**Effort:** 5-7 days
**Owner:** Full Stack Developer

---

### Task 2.3: Complete Analytics System

**Features:**
- User analytics (lesson completion, time spent, streaks)
- Admin analytics (platform-wide stats)
- Report exports (CSV)

**Implementation:** See detailed specs in BRD Document 07, Section 15

**Acceptance Criteria:**
- ✅ Users see personal analytics
- ✅ Admins see platform-wide analytics
- ✅ Charts visualize data clearly
- ✅ Reports exportable as CSV

**Effort:** 3-4 days
**Owner:** Full Stack Developer

---

### Task 2.4: Email Notifications

**Types:**
- Welcome email (on registration)
- Progress summary (weekly)
- Achievement earned
- Password reset (already in 2.1)

**Implementation:** Extend email service from Task 2.1

**Acceptance Criteria:**
- ✅ Welcome email sent on registration
- ✅ Weekly progress summary sent (if user has activity)
- ✅ Achievement emails sent immediately
- ✅ Users can unsubscribe

**Effort:** 2-3 days
**Owner:** Backend Developer

---

## 📋 PHASE 3: POLISH & LAUNCH (Week 6)

**Goal:** Production-ready platform
**Duration:** 5-7 working days
**Priority:** CRITICAL - Required for launch

### Task 3.1: Connect Search Functionality

**Current State:** SearchBar component exists, not connected
**Files:** `frontend/components/layout/SearchBar.tsx`

**Implementation:**
```typescript
// Update SearchBar.tsx to call API

async function handleSearch(query: string) {
  try {
    const results = await fetch(`/api/v1/search?q=${query}`)
    setResults(results.data)
  } catch (error) {
    console.error('Search failed', error)
  }
}
```

**Backend endpoint:**
```python
@router.get("/search")
async def search(
    q: str,
    type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Search lessons, topics, subjects"""
    query = db.query(Lesson)

    if q:
        # Full-text search on title and description
        query = query.filter(
            or_(
                Lesson.title_key.ilike(f"%{q}%"),
                Lesson.description_key.ilike(f"%{q}%")
            )
        )

    if type:
        # Filter by type if specified
        pass

    results = query.limit(20).all()
    return results
```

**Effort:** 1 day
**Owner:** Full Stack Developer

---

### Task 3.2: Performance Optimization

**Targets (BRD Document 07, Section 14.1):**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- API P95 < 200ms

**Actions:**

**Frontend:**
1. Add caching headers
2. Optimize images (WebP format)
3. Code splitting (already done with lazy loading)
4. Minify CSS/JS

**Backend:**
1. Add database indexes
2. Enable query caching (Redis)
3. API response compression (Gzip)
4. Connection pooling

**Verification:**
- Run Lighthouse audit
- Use WebPageTest
- Check Core Web Vitals

**Acceptance Criteria:**
- ✅ LCP < 2.5s on 4G
- ✅ API P95 < 200ms
- ✅ Lighthouse score > 90

**Effort:** 2-3 days
**Owner:** Full Stack Developer + DevOps

---

### Task 3.3: Security Hardening

**Actions:**

1. **Rate Limiting**
```python
# Add to main.py

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@limiter.limit("5/minute")
@app.post("/auth/login")
async def login(...):
    pass
```

2. **CORS Configuration**
```python
# Restrict origins in production

ALLOWED_ORIGINS = [
    "https://learninghub.com",
    "https://app.learninghub.com"
]
```

3. **Change Production Secrets**
```bash
# Generate new SECRET_KEY
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Update .env
SECRET_KEY=<new_random_key>
```

4. **Security Headers**
```python
# Add middleware for security headers

@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    return response
```

**Acceptance Criteria:**
- ✅ Rate limiting enabled on all endpoints
- ✅ CORS restricted to production domain
- ✅ Production SECRET_KEY changed
- ✅ Security headers configured
- ✅ No high/critical vulnerabilities (run npm audit, safety check)

**Effort:** 1-2 days
**Owner:** Backend Developer + DevOps

---

### Task 3.4: Monitoring & Logging

**Tools:**
- Sentry (error tracking)
- Google Analytics (user analytics)
- Custom logging

**Implementation:**

**Step 1:** Add Sentry

```python
# backend/app/main.py

import sentry_sdk

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    environment=os.getenv("ENVIRONMENT", "production")
)
```

**Step 2:** Add structured logging

```python
# backend/app/core/logging.py

import logging
import json

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_data = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName
        }
        return json.dumps(log_data)

# Use in all modules
logger = logging.getLogger(__name__)
logger.info("User logged in", extra={"user_id": user.id})
```

**Step 3:** Add Google Analytics to frontend

```typescript
// frontend/lib/analytics.ts

export function trackEvent(event: string, params: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, params)
  }
}

// Usage
trackEvent('lesson_completed', {
  lesson_id: lessonId,
  time_spent: timeSpent
})
```

**Acceptance Criteria:**
- ✅ Sentry captures all errors
- ✅ Structured logs in JSON format
- ✅ Google Analytics tracking key events
- ✅ Can debug issues from production logs

**Effort:** 1-2 days
**Owner:** DevOps + Full Stack Developer

---

### Task 3.5: Deployment Setup

**Infrastructure:**
- Docker containers
- CI/CD pipeline (GitHub Actions)
- Backup strategy

**Implementation:**

**Step 1:** Production docker-compose

```yaml
# docker-compose.prod.yml

version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: always

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - SECRET_KEY=${SECRET_KEY}
    restart: always
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    restart: always

  redis:
    image: redis:7
    restart: always

volumes:
  postgres_data:
```

**Step 2:** CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          cd backend && pytest
          cd frontend && npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        run: |
          ssh deploy@server "cd /app && git pull && docker-compose up -d --build"
```

**Step 3:** Backup Strategy

```bash
# Daily backup script

#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups"

# Backup database
docker exec postgres pg_dump -U postgres learninghub > $BACKUP_DIR/db_$DATE.sql

# Compress
gzip $BACKUP_DIR/db_$DATE.sql

# Delete backups older than 30 days
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

**Acceptance Criteria:**
- ✅ Docker compose for production works
- ✅ CI/CD pipeline deploys on push to main
- ✅ Automated tests run before deploy
- ✅ Daily database backups
- ✅ 30-day backup retention
- ✅ Can restore from backup

**Effort:** 2-3 days
**Owner:** DevOps

---

## 📊 TIMELINE SUMMARY

| Phase | Duration | Effort (Person-Days) | Start Date | End Date |
|-------|----------|---------------------|------------|----------|
| **Phase 1: Critical Fixes** | 2 weeks | 10 days | Feb 11 | Feb 22 |
| **Phase 2: Core Features** | 3 weeks | 15 days | Feb 25 | Mar 14 |
| **Phase 3: Polish & Launch** | 1 week | 7 days | Mar 17 | Mar 21 |
| **Buffer & Testing** | 1 week | 3 days | Mar 22 | Mar 28 |
| **TOTAL** | **7 weeks** | **35 days** | Feb 11 | **Mar 28** |

**With 2 developers:** 4-5 weeks
**With 1 developer:** 7-8 weeks

---

## 🎯 SUCCESS METRICS

### Phase 1 Success (Week 2)
- ✅ Core user flow works without errors
- ✅ Lesson content displays (not empty)
- ✅ User can edit profile
- ✅ No critical bugs

### Phase 2 Success (Week 5)
- ✅ Password reset works
- ✅ Admin panel functional
- ✅ Analytics dashboard complete
- ✅ Email notifications sent

### Phase 3 Success (Week 7)
- ✅ Performance targets met (LCP < 2.5s)
- ✅ Security hardened
- ✅ Monitoring operational
- ✅ Deployment automated
- ✅ Ready for beta users

---

## 🚨 RISK MITIGATION

### High Risk: Lesson Content Generation (Task 1.2)

**Risk:** AI generation might not produce quality content
**Impact:** High - blocks user experience
**Mitigation:**
1. Manual review of first 100 generated lessons
2. Human-in-the-loop approval workflow
3. Fallback to manual content creation if needed

### Medium Risk: Email Service Integration (Task 2.1, 2.4)

**Risk:** Email delivery issues (spam, deliverability)
**Impact:** Medium - affects password reset and notifications
**Mitigation:**
1. Use reputable service (SendGrid)
2. Configure SPF, DKIM, DMARC records
3. Monitor bounce/complaint rates
4. Have fallback email provider (AWS SES)

### Medium Risk: Performance Targets (Task 3.2)

**Risk:** Might not hit LCP < 2.5s target
**Impact:** Medium - affects user experience
**Mitigation:**
1. Test early and often (Lighthouse)
2. Progressive optimization
3. CDN for static assets
4. Database query optimization

### Low Risk: Deployment Issues (Task 3.5)

**Risk:** Docker deployment failures
**Impact:** Low - delays launch by 1-2 days
**Mitigation:**
1. Test deployment in staging environment
2. Have rollback plan
3. Gradual rollout (canary deployment)

---

## 📋 CHECKLIST FOR GO-LIVE

### Pre-Launch (1 week before)

- [ ] All Phase 1 tasks complete
- [ ] All Phase 2 tasks complete
- [ ] All Phase 3 tasks complete
- [ ] End-to-end testing passed
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Backup strategy tested
- [ ] Monitoring operational
- [ ] Documentation updated

### Launch Day

- [ ] Deploy to production
- [ ] Run smoke tests
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify email notifications
- [ ] Test user registration flow
- [ ] Announce launch

### Post-Launch (Week 1)

- [ ] Monitor daily active users
- [ ] Review error logs
- [ ] Gather user feedback
- [ ] Fix critical bugs immediately
- [ ] Plan Phase 4 features

---

## 🎓 RESOURCES

### Documentation
- [claude.md](claude.md) - Context document (read first!)
- [BRD Suite](business_docs/README.md) - All requirements
- [Technical Decisions](business_docs/10_Technical_Decisions_Solutions.md) - Solutions guide

### Code References
- Frontend: `/frontend/`
- Backend: `/backend/`
- Database models: `/backend/app/models/`
- API endpoints: `/backend/app/api/v1/`

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Claude API Docs](https://docs.anthropic.com/)

---

**Last Updated:** 2026-02-11
**Status:** APPROVED
**Next Review:** End of Phase 1 (Feb 22)

---

**Remember:** Quality over speed. It's better to launch 1 week late with a solid product than on time with critical bugs. Test thoroughly at each phase!
