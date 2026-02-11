## 8. SYSTEM ARCHITECTURE

### 8.1 Architecture Overview

**LearningHub follows a modern, cloud-native, three-tier architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  Web App   │  │ Mobile App │  │  Admin     │           │
│  │  (Next.js) │  │  (Future)  │  │  Portal    │           │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘           │
└────────┼────────────────┼────────────────┼──────────────────┘
         │                │                │
         └────────────────┴────────────────┘
                          │
         ┌────────────────┴────────────────┐
         │        API Gateway / CDN         │
         │         (CloudFlare)             │
         └────────────────┬────────────────┘
                          │
┌─────────────────────────┴─────────────────────────────────┐
│                  APPLICATION LAYER                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           FastAPI Backend (Python)                  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │   Auth   │ │Curriculum│ │ Progress │           │  │
│  │  │  Service │ │ Service  │ │ Service  │           │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │ Exercise │ │   AI     │ │  Admin   │           │  │
│  │  │ Service  │ │ Service  │ │ Service  │           │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────┬──────────────────────────────────┘
                         │
┌────────────────────────┴──────────────────────────────────┐
│                     DATA LAYER                             │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────┐        │
│  │  PostgreSQL  │  │  Redis   │  │  S3 Storage  │        │
│  │   Database   │  │  Cache   │  │   (Images)   │        │
│  └──────────────┘  └──────────┘  └──────────────┘        │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────┐  ┌──────────────┐        │
│  │   Claude AI  │  │  Email   │  │  Analytics   │        │
│  │     API      │  │ Service  │  │   Service    │        │
│  └──────────────┘  └──────────┘  └──────────────┘        │
└───────────────────────────────────────────────────────────┘
```

### 8.2 Technology Stack

**Frontend:**
- **Framework:** Next.js 16.1.1 (React 19.0.0)
- **Language:** TypeScript 5.7.2 (Strict Mode)
- **Styling:** Tailwind CSS 3.4.17
- **State Management:** Zustand 5.0.9
- **Data Fetching:** React Query (@tanstack/react-query)
- **Internationalization:** next-intl 4.7.0
- **Math Rendering:** KaTeX 0.16.11
- **Forms:** React Hook Form
- **HTTP Client:** Fetch API (native)

**Backend:**
- **Framework:** FastAPI 0.115.12 (Python 3.12+)
- **Database ORM:** SQLAlchemy 2.0.36
- **Database:** PostgreSQL 15+
- **Authentication:** JWT (python-jose)
- **Password Hashing:** bcrypt
- **Migration:** Alembic
- **API Documentation:** OpenAPI/Swagger (auto-generated)
- **Validation:** Pydantic V2

**Infrastructure:**
- **Containerization:** Docker
- **Orchestration:** Docker Compose (Phase 1), Kubernetes (Phase 3)
- **Cache:** Redis 7+
- **Object Storage:** AWS S3 / MinIO
- **CDN:** CloudFlare
- **Load Balancer:** Nginx / CloudFlare
- **CI/CD:** GitHub Actions
- **Hosting:** AWS / DigitalOcean / Vercel (frontend)

**Third-Party Services:**
- **AI:** Anthropic Claude Opus 4.6 API
- **Email:** SendGrid / AWS SES
- **Analytics:** Google Analytics 4, Mixpanel
- **Error Tracking:** Sentry
- **Monitoring:** Prometheus + Grafana / Datadog
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)

### 8.3 Database Schema (Core Tables)

**Users & Authentication:**
```sql
users
├─ id (PK)
├─ email (unique, indexed)
├─ username (unique, indexed)
├─ password_hash
├─ full_name
├─ role (enum: user, educator, admin, superadmin)
├─ preferred_locale
├─ is_active
├─ email_verified
├─ created_at
└─ updated_at
```

**Curriculum Hierarchy:**
```sql
subjects
├─ id (PK)
├─ slug (unique, indexed)
├─ title_key (translation reference)
├─ description_key
├─ icon
├─ level (enum: beginner, intermediate, advanced)
├─ status (enum: draft, approved, published)
└─ display_order

domains
├─ id (PK)
├─ subject_id (FK)
├─ slug (unique, indexed)
├─ title_key
├─ description_key
├─ level
├─ status
└─ display_order

topics
├─ id (PK)
├─ domain_id (FK)
├─ slug (unique, indexed)
├─ title_key
├─ description_key
├─ prerequisites (JSON)
├─ learning_objectives (JSON)
├─ estimated_time (minutes)
├─ difficulty (enum: easy, medium, hard)
├─ status
└─ display_order

lessons
├─ id (PK)
├─ topic_id (FK)
├─ slug (unique, indexed)
├─ title_key
├─ description_key
├─ estimated_time
├─ difficulty
├─ status
└─ display_order

lesson_sections
├─ id (PK)
├─ lesson_id (FK)
├─ section_type (enum: definition, example, visual, note, ...)
├─ content_json (JSONB)
├─ display_order
└─ status
```

**Exercises:**
```sql
exercises
├─ id (PK)
├─ lesson_id (FK)
├─ exercise_type (enum: multiple_choice, numeric_input, drag_drop, text_input)
├─ difficulty
├─ question_key (translation reference)
├─ hint_key
├─ explanation_key
├─ data (JSONB - exercise-specific data)
├─ display_order
└─ status
```

**Progress Tracking:**
```sql
lesson_progress
├─ id (PK)
├─ user_id (FK, indexed)
├─ lesson_id (FK, indexed)
├─ status (enum: not_started, in_progress, completed)
├─ exercises_completed
├─ time_spent (seconds)
├─ started_at
├─ completed_at
└─ last_accessed_at

exercise_submissions
├─ id (PK)
├─ user_id (FK, indexed)
├─ exercise_id (FK, indexed)
├─ user_answer (JSONB)
├─ is_correct
├─ attempts
├─ time_taken (seconds)
├─ hint_used
└─ submitted_at
```

**Translations:**
```sql
translations
├─ id (PK)
├─ locale (indexed)
├─ namespace (indexed)
├─ key (indexed)
├─ value (TEXT)
├─ created_at
└─ updated_at

UNIQUE INDEX: (locale, namespace, key)
```

**AI Generation Tracking:**
```sql
generation_tasks
├─ id (PK)
├─ task_type (enum: curriculum, lesson, exercise)
├─ status (enum: pending, running, completed, failed)
├─ input_data (JSONB)
├─ output_data (JSONB)
├─ tokens_used
├─ cost
├─ error_message
├─ created_at
└─ completed_at
```

### 8.4 API Architecture

**RESTful API Design Principles:**

1. **Versioning:** `/api/v1/...` for version 1
2. **Resource-Based URLs:** Nouns, not verbs (`/lessons`, not `/getLesson`)
3. **HTTP Methods:** GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
4. **Status Codes:**
   - 200: Success
   - 201: Created
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error
5. **Pagination:** `?page=1&limit=20`
6. **Filtering:** `?status=published&level=beginner`
7. **Sorting:** `?sort=title&order=asc`
8. **Field Selection:** `?fields=id,title,description` (optional optimization)

**API Endpoints (Core):**

```
Authentication:
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/password-reset
POST   /api/v1/auth/password-reset/confirm

Curriculum:
GET    /api/v1/curriculum/subjects
GET    /api/v1/curriculum/subjects/{id}
GET    /api/v1/curriculum/domains/{id}
GET    /api/v1/curriculum/topics/{id}

Lessons:
GET    /api/v1/lessons/{slug}?locale=en
GET    /api/v1/lessons/{slug}/exercises

Exercises:
POST   /api/v1/exercises/{id}/submit
GET    /api/v1/exercises/{id}

Progress:
GET    /api/v1/progress/overview
POST   /api/v1/progress/lessons/{id}
GET    /api/v1/progress/lessons/{id}
GET    /api/v1/progress/recommendations
GET    /api/v1/progress/analytics

Translations:
GET    /api/v1/translations/{locale}
GET    /api/v1/translations/{locale}/{namespace}

Admin:
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/users
PUT    /api/v1/admin/users/{id}
POST   /api/v1/admin/content/{id}/approve
POST   /api/v1/admin/ai/generate-curriculum
GET    /api/v1/admin/analytics

Search:
GET    /api/v1/search?q={query}&type=lesson&locale=en
```

### 8.5 Security Architecture

**Defense in Depth Strategy:**

1. **Network Layer:**
   - HTTPS only (TLS 1.2+)
   - CloudFlare DDoS protection
   - Rate limiting per IP (100 req/min)
   - CORS configured for frontend domain only

2. **Application Layer:**
   - JWT authentication with RS256 signing
   - Password hashing with bcrypt (cost 12)
   - Role-based access control (RBAC)
   - Input validation (Pydantic schemas)
   - Output sanitization (prevent XSS)
   - CSRF protection (SameSite cookies)
   - SQL injection prevention (ORM, parameterized queries)

3. **Data Layer:**
   - Encryption at rest (database)
   - Encrypted backups
   - PII field-level encryption
   - Access logs for sensitive tables

4. **Monitoring & Response:**
   - Security event logging
   - Failed login attempt tracking
   - Anomaly detection (future)
   - Incident response plan

**Authentication Flow:**
```
1. User submits credentials (email/password)
2. Backend validates & checks password hash
3. If valid, generate JWT token (expires 24h)
4. Return token + user object to frontend
5. Frontend stores token in localStorage
6. All subsequent requests include: Authorization: Bearer {token}
7. Backend middleware validates token on each request
8. If expired/invalid, return 401 → Frontend redirects to login
```

### 8.6 Data Flow Diagrams

**User Registration Flow:**
```
User → Frontend Form
  ↓ (validation)
Frontend → POST /api/v1/auth/register
  ↓ (email, username, password)
Backend → Validate input
  ↓
Backend → Check duplicates (email/username)
  ↓
Backend → Hash password (bcrypt)
  ↓
Backend → Insert user into database
  ↓
Backend → Generate JWT token
  ↓
Backend → Send verification email
  ↓
Backend → Return {token, user}
  ↓
Frontend → Store token in localStorage
  ↓
Frontend → Redirect to /dashboard
```

**Lesson View Flow:**
```
User → Click lesson
  ↓
Frontend → GET /api/v1/lessons/{slug}?locale=en
  ↓
Backend → Fetch lesson from database
  ↓
Backend → Fetch sections (join query)
  ↓
Backend → Fetch exercises (join query)
  ↓
Backend → Fetch translations for locale
  ↓
Backend → Build lesson object with translations
  ↓
Backend → Return lesson JSON
  ↓
Frontend → Render sections (KaTeX for math)
  ↓
Frontend → Display exercises
  ↓
If authenticated:
  Frontend → POST /api/v1/progress/lessons/{id}
             {status: "in_progress"}
  Backend → Upsert lesson_progress record
```

**Exercise Submission Flow:**
```
User → Submit answer
  ↓
Frontend → Local validation (optional)
  ↓
Frontend → POST /api/v1/exercises/{id}/submit
           {answer: userAnswer}
  ↓
Backend → Fetch exercise from database
  ↓
Backend → Validate answer based on exercise_type
  ↓
Backend → Return {is_correct, explanation}
  ↓
If authenticated:
  Backend → Record submission in exercise_submissions
  Backend → Update lesson_progress.exercises_completed
  ↓
Frontend → Show feedback (correct/incorrect)
  ↓
If correct:
  Frontend → Celebration animation
  Frontend → Auto-advance to next exercise
```

### 8.7 Scalability Strategy

**Phase 1 (MVP - 10K users):**
- Single region deployment
- Single database instance (PostgreSQL)
- Redis for session storage
- CloudFlare CDN for static assets
- Vertical scaling when needed

**Phase 2 (Growth - 100K users):**
- Database read replicas (1 master, 2 replicas)
- Application server auto-scaling (3-10 instances)
- Redis cluster for caching
- Full-text search with PostgreSQL or Elasticsearch
- Background job queue (Celery + Redis)

**Phase 3 (Scale - 1M+ users):**
- Multi-region deployment
- Database sharding by user_id
- Microservices architecture (if needed)
- Kubernetes orchestration
- Separate read/write database pools
- Advanced caching strategies (per-user, per-lesson)
- CDN edge caching for API responses

### 8.8 Disaster Recovery & Business Continuity

**Backup Strategy:**
- **Database:** Automated daily full backups + hourly incremental
- **Files:** S3 versioning enabled + cross-region replication
- **Retention:** 30 days for daily, 7 days for hourly
- **Testing:** Monthly restore tests

**Recovery Objectives:**
- **RPO (Recovery Point Objective):** 1 hour max data loss
- **RTO (Recovery Time Objective):** 4 hours max downtime

**Incident Response:**
1. Detection (monitoring alerts)
2. Assessment (severity classification)
3. Communication (status page update)
4. Resolution (fix or failover)
5. Post-mortem (root cause analysis)

---

## 9. USER JOURNEYS & WORKFLOWS

### 9.1 Guest User Journey

**Scenario: Discovery & Exploration**

```
1. User lands on homepage (/)
   ├─ Sees hero section with value proposition
   ├─ Views featured subjects (cards with icons)
   ├─ Sees platform statistics (X lessons, Y users)
   └─ Call-to-action: "Start Learning" or "Browse Subjects"

2. User clicks "Browse Subjects"
   ├─ Navigates to /curriculum
   ├─ Filters by level (beginner, intermediate, advanced)
   ├─ Searches for specific subject
   └─ Clicks on subject card

3. User views subject detail page
   ├─ Sees subject description and learning path
   ├─ Views domains organized by level
   ├─ Clicks on a domain

4. User views domain topics
   ├─ Sees list of topics with metadata (difficulty, time)
   ├─ Clicks on first topic

5. User views lesson (guest access)
   ├─ Reads lesson content (all sections visible)
   ├─ Views exercises
   ├─ Tries to complete exercise
   └─ Sees prompt: "Sign up to save your progress"

6. User decides to register
   ├─ Clicks "Sign Up" button
   ├─ Fills registration form
   ├─ Receives verification email
   └─ Now becomes authenticated user
```

### 9.2 Authenticated Learner Journey

**Scenario: Daily Learning Session**

```
1. User logs in (/auth/login)
   ├─ Enters email/username + password
   ├─ Successful authentication
   └─ Redirected to /dashboard

2. Dashboard page (/dashboard)
   ├─ Sees progress overview (completion %, time spent, streak)
   ├─ "Continue Learning" section shows last accessed lesson
   ├─ "Recommended for You" shows 3-5 AI-recommended lessons
   ├─ Recent activity timeline
   └─ Achievement badges earned

3. User clicks "Continue Learning"
   ├─ Navigates to last lesson (/learn/[domain]/[slug])
   ├─ System marks lesson as "in_progress"
   ├─ Timer starts for time tracking

4. User reads lesson content
   ├─ Scrolls through sections
   ├─ Toggles bilingual mode (side-by-side)
   ├─ Clicks on math terms for glossary
   └─ Reaches exercises

5. User completes exercises
   ├─ Answers first exercise (multiple choice)
   ├─ Gets immediate feedback (correct!)
   ├─ Celebration animation plays
   ├─ Auto-advances to next exercise
   ├─ Struggles with exercise 3
   ├─ Clicks "Show Hint"
   ├─ Reads hint, tries again
   ├─ Gets it correct
   └─ Completes all 5 exercises

6. Lesson completion
   ├─ System marks lesson as "completed"
   ├─ Records time spent (15 minutes)
   ├─ Updates progress dashboard
   ├─ Shows completion message
   └─ Suggests next lesson

7. User navigates to next lesson
   ├─ Clicks "Next Lesson" button
   ├─ Repeats learning process
   └─ Continues streak

8. User logs out
   ├─ Progress automatically saved
   ├─ Can resume on any device
   └─ Receives email summary (weekly)
```

### 9.3 Educator Journey

**Scenario: Classroom Management**

```
1. Educator logs in with educator role
   ├─ Dashboard shows educator-specific features
   └─ Has access to classroom management tools

2. Educator creates a class
   ├─ Navigates to /classroom/create
   ├─ Enters class name, subject, grade level
   ├─ Generates join code for students
   └─ Shares code with students

3. Students join class
   ├─ Students enter join code
   ├─ Educator sees students in class roster
   └─ Can assign lessons to class

4. Educator assigns lessons
   ├─ Browses curriculum
   ├─ Selects 5 lessons
   ├─ Sets due date
   ├─ Assigns to class
   └─ Students receive notifications

5. Educator monitors progress
   ├─ Views class dashboard
   ├─ Sees completion rates per student
   ├─ Identifies struggling students
   ├─ Reviews exercise submission history
   └─ Exports progress report (CSV)

6. Educator provides feedback
   ├─ Adds comments on student submissions
   ├─ Sends encouragement messages
   └─ Adjusts assignments based on performance
```

### 9.4 Admin Journey

**Scenario: Content Approval**

```
1. Admin logs in to admin panel (/admin)
   ├─ Sees admin dashboard
   ├─ Notices pending content approval queue (23 items)
   └─ Clicks "Content Approvals"

2. Admin reviews AI-generated content
   ├─ Selects first item (new subject curriculum)
   ├─ Previews generated structure
   ├─ Reviews domains and topics
   ├─ Checks translation quality
   └─ Makes decision

3. Admin approves or rejects
   If approve:
   ├─ Clicks "Approve"
   ├─ Content status changes to "approved"
   ├─ Content becomes visible in admin view
   └─ Can publish when ready

   If reject:
   ├─ Adds rejection reason
   ├─ Content sent back to draft
   └─ AI re-generation triggered (optional)

4. Admin publishes content
   ├─ Changes status from "approved" to "published"
   ├─ Content now visible to all users
   └─ Notification sent to content team

5. Admin monitors platform health
   ├─ Views system metrics dashboard
   ├─ Checks error rates, response times
   ├─ Reviews user complaints
   └─ Takes corrective actions

6. Admin manages users
   ├─ Searches for specific user
   ├─ Views user activity
   ├─ Changes user role (user → educator)
   ├─ Suspends abusive user
   └─ Logs all actions
```

### 9.5 Edge Cases & Error Scenarios

**Scenario: Network Failure During Exercise**
```
1. User answers exercise
2. Submits answer (POST request)
3. Network error occurs (timeout)
4. Frontend shows error message: "Couldn't submit. Retrying..."
5. Automatic retry (3 attempts)
6. If still fails: "Please check your connection and try again"
7. Answer saved locally (localStorage)
8. When connection restored, re-submit
```

**Scenario: Concurrent Login (Same Account, Different Device)**
```
1. User logs in on Device A
2. User logs in on Device B
3. Both sessions are valid (multi-device support)
4. Changes on Device A sync to Device B
5. Progress updates in real-time
```

**Scenario: Content Not Available in User's Language**
```
1. User selects Tamil language
2. Browses to a new lesson
3. Tamil translation not available
4. System fallback order:
   a) User's preferred language (Tamil)
   b) Default language (English)
   c) Show translation key if all fail
5. User sees: [English content] + "Translation pending" badge
6. Option to contribute translation (future)
```

---
