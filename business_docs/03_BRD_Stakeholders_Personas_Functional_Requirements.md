## 4. STAKEHOLDER ANALYSIS

### 4.1 Stakeholder Matrix

| Stakeholder | Interest Level | Influence Level | Engagement Strategy |
|-------------|----------------|-----------------|---------------------|
| **End Users (Learners)** | High | Medium | Regular feedback, beta testing, surveys |
| **Educators** | High | High | Advisory board, content review, workshops |
| **Product Owner** | High | High | Weekly sync, decision authority |
| **Development Team** | High | High | Daily standups, sprint planning |
| **Investors/Board** | Medium | High | Monthly reports, quarterly reviews |
| **Educational Institutions** | Medium | Medium | Pilot programs, partnership meetings |
| **Regulatory Bodies** | Low | High | Compliance audits, documentation |
| **Content Moderators** | High | Medium | Training, clear guidelines, tools |

### 4.2 Stakeholder Requirements

**Learners:**
- Easy-to-use interface
- Fast, reliable access to content
- Clear progress tracking
- Mobile-friendly experience
- Affordable pricing
- Quality educational content

**Educators:**
- Content creation/approval tools
- Student progress visibility
- Classroom management features
- Bulk user management
- Export capabilities for reports

**Administrators:**
- User management dashboard
- Content moderation tools
- System health monitoring
- Security controls
- Analytics and reporting

**Business/Product Owner:**
- Revenue tracking
- User growth metrics
- Feature usage analytics
- Cost optimization insights
- Competitive advantage data

---

## 5. USER PERSONAS

### 5.1 Primary Persona: Maya (Multilingual Learner)

**Demographics:**
- Age: 22
- Location: Mumbai, India
- Education: University student (Engineering)
- Language: Native Hindi, learning in English
- Income: Student (limited budget)

**Goals:**
- Master technical subjects in English (career requirement)
- Understand complex concepts in native language first
- Track progress toward degree completion
- Learn at own pace (busy schedule)

**Pain Points:**
- Struggles with technical terminology in English
- Expensive tutoring not affordable
- Standard courses move too fast
- No way to switch between languages easily

**User Story:**
> "As a multilingual learner, I want to view lessons in both my native language and English simultaneously, so that I can understand complex concepts better while improving my English proficiency."

**Usage Patterns:**
- Studies 1-2 hours daily (evening)
- Mobile device primary (70%), laptop (30%)
- Completes 3-5 lessons per week
- Prefers video + text combination
- Uses hint system frequently

### 5.2 Secondary Persona: David (Educator)

**Demographics:**
- Age: 35
- Location: Toronto, Canada
- Role: High School Teacher
- Subject: Mathematics
- Experience: 8 years teaching

**Goals:**
- Provide supplementary materials to students
- Track individual student progress
- Support immigrant students with language barriers
- Reduce time spent creating lesson materials

**Pain Points:**
- Limited time for content creation
- Language barriers with ESL students
- Difficulty tracking 150+ students
- No good multilingual resources available

**User Story:**
> "As an educator, I want to assign lessons in multiple languages and track student completion, so that I can support diverse learners and measure engagement."

**Usage Patterns:**
- Reviews student progress weekly
- Assigns 5-10 lessons per week
- Accesses platform during work hours
- Desktop primary usage
- Needs export to gradebook

### 5.3 Tertiary Persona: Alex (Platform Administrator)

**Demographics:**
- Age: 28
- Location: Remote
- Role: Content Operations Manager
- Background: EdTech, content curation

**Goals:**
- Maintain high content quality
- Ensure platform security
- Monitor system performance
- Manage user support escalations

**Pain Points:**
- Manual content review is time-consuming
- Lack of automated moderation tools
- Difficult to spot trending issues
- No centralized admin dashboard

**User Story:**
> "As an administrator, I want automated content quality checks and a comprehensive dashboard, so that I can efficiently manage the platform and quickly address issues."

**Usage Patterns:**
- Monitors platform daily
- Approves 20-30 content pieces daily
- Responds to support tickets
- Desktop-only usage
- Works across time zones

### 5.4 Persona: Priya (Enterprise Client)

**Demographics:**
- Age: 42
- Location: Singapore
- Role: Director of Learning & Development
- Company: Multinational corporation (5000+ employees)

**Goals:**
- Upskill employees in technical subjects
- Provide training in multiple languages
- Track completion and competency
- Demonstrate ROI to executives

**Pain Points:**
- Expensive custom content development
- Integration with existing HR systems
- Need for reporting and compliance tracking
- Multi-language requirement

**User Story:**
> "As a corporate L&D director, I want white-labeled courses with SSO integration and detailed analytics, so that I can provide seamless learning experiences and measure training effectiveness."

**Usage Patterns:**
- Annual contract, monthly usage review
- Manages 500-2000 learners
- Requires quarterly reports
- Integration with HRIS/LMS
- Desktop only, no mobile requirement

---

## 6. FUNCTIONAL REQUIREMENTS

### 6.1 User Management & Authentication

**FR-AUTH-001: User Registration**
- **Priority:** CRITICAL
- **Description:** Users must be able to create accounts
- **Acceptance Criteria:**
  - Email-based registration
  - Username, password, optional full name
  - Email verification required
  - Password strength validation (min 8 characters, 1 number, 1 special char)
  - Duplicate email/username prevention
  - Privacy policy and Terms of Service acceptance
- **Dependencies:** Email service integration
- **API Endpoint:** `POST /api/v1/auth/register`

**FR-AUTH-002: User Login**
- **Priority:** CRITICAL
- **Description:** Users must authenticate to access protected features
- **Acceptance Criteria:**
  - Login with email OR username
  - JWT token issued on successful auth
  - Token expiry: 24 hours
  - "Remember me" option (30 days)
  - Failed login attempt tracking (lockout after 5 attempts)
- **Dependencies:** JWT library, database session
- **API Endpoint:** `POST /api/v1/auth/login`

**FR-AUTH-003: Password Reset**
- **Priority:** HIGH
- **Description:** Users can reset forgotten passwords
- **Acceptance Criteria:**
  - Request reset via email
  - Secure token sent via email (expires in 1 hour)
  - New password must meet strength requirements
  - Old password invalidated immediately
  - Email confirmation of password change
- **Dependencies:** Email service
- **API Endpoint:** `POST /api/v1/auth/password-reset`

**FR-AUTH-004: User Profile Management**
- **Priority:** HIGH
- **Description:** Users can view and edit their profiles
- **Acceptance Criteria:**
  - View current profile details
  - Update: full name, email (re-verification required), preferred locale
  - Upload profile picture (max 5MB, jpg/png)
  - Change password (requires current password)
  - Delete account (with confirmation)
- **Dependencies:** Image storage service
- **API Endpoint:** `GET/PUT /api/v1/auth/me`

**FR-AUTH-005: Role-Based Access Control (RBAC)**
- **Priority:** CRITICAL
- **Description:** Different user roles have different permissions
- **Acceptance Criteria:**
  - Roles: Guest, User, Educator, Admin, SuperAdmin
  - Permissions assigned by role
  - Middleware validates permissions on protected routes
  - Admin can change user roles
  - Audit log of role changes
- **Dependencies:** Database schema for roles/permissions
- **API Endpoint:** N/A (middleware)

### 6.2 Curriculum Management

**FR-CURR-001: Browse Subjects**
- **Priority:** CRITICAL
- **Description:** Users can view all available subjects
- **Acceptance Criteria:**
  - List all published subjects
  - Display: title, description, icon, level
  - Filter by: level (beginner/intermediate/advanced)
  - Sort by: popularity, alphabetical, newest
  - Pagination (20 per page)
  - Search functionality
- **Dependencies:** None
- **API Endpoint:** `GET /api/v1/curriculum/subjects`

**FR-CURR-002: View Subject Details**
- **Priority:** CRITICAL
- **Description:** Users can view subject structure
- **Acceptance Criteria:**
  - Display subject info (title, description, objectives)
  - List all domains within subject
  - Show topic count per domain
  - Display progress indicators (if authenticated)
  - Hierarchical tree view
- **Dependencies:** Authentication (optional)
- **API Endpoint:** `GET /api/v1/curriculum/subjects/{id}`

**FR-CURR-003: Browse Topics**
- **Priority:** CRITICAL
- **Description:** Users can view topics within a domain
- **Acceptance Criteria:**
  - List topics with: title, difficulty, estimated time
  - Show completion status (if authenticated)
  - Display prerequisites
  - Show lesson count
  - Sequential ordering
- **Dependencies:** None
- **API Endpoint:** `GET /api/v1/curriculum/domains/{id}/topics`

**FR-CURR-004: AI Curriculum Generation**
- **Priority:** HIGH
- **Description:** Admins can generate curriculum via AI
- **Acceptance Criteria:**
  - Input: subject name, description, target level
  - AI generates: domains (3-5), topics per domain (3-8)
  - Preview before approval
  - Editable after generation
  - Track generation costs (tokens, time)
  - Success rate monitoring
- **Dependencies:** Anthropic Claude API
- **API Endpoint:** `POST /api/v1/admin/generate-curriculum`

**FR-CURR-005: Content Status Workflow**
- **Priority:** HIGH
- **Description:** Content goes through approval workflow
- **Acceptance Criteria:**
  - Status: draft → approved → published
  - Only published content visible to users
  - Admins can change status
  - Audit trail of status changes
  - Notification on status change
- **Dependencies:** Role-based access
- **API Endpoint:** `PATCH /api/v1/admin/content/{id}/status`

### 6.3 Lesson Delivery

**FR-LESSON-001: View Lesson**
- **Priority:** CRITICAL
- **Description:** Users can view lesson content
- **Acceptance Criteria:**
  - Display lesson title, description, metadata
  - Render all section types (definition, example, visual, note, etc.)
  - Support KaTeX math rendering
  - Responsive design (mobile/desktop)
  - Track lesson view (if authenticated)
  - Show estimated reading time
- **Dependencies:** KaTeX library
- **API Endpoint:** `GET /api/v1/lessons/{slug}`

**FR-LESSON-002: Lesson Navigation**
- **Priority:** HIGH
- **Description:** Users can navigate between lessons
- **Acceptance Criteria:**
  - Previous/Next lesson buttons
  - Breadcrumb navigation
  - Sidebar curriculum tree
  - "Back to topic" link
  - Progress indicator (X of Y lessons)
- **Dependencies:** Curriculum structure
- **API Endpoint:** Included in lesson response

**FR-LESSON-003: Multi-Language Display**
- **Priority:** CRITICAL
- **Description:** Lessons support multiple languages
- **Acceptance Criteria:**
  - Language switcher in UI
  - Instant language change (no reload)
  - 4 display modes:
    1. Single language only
    2. Tooltip (hover to translate)
    3. Side-by-side comparison
    4. Tabbed view
  - Preserve user's language preference
  - Fallback to English if translation missing
- **Dependencies:** Translation system
- **API Endpoint:** `?locale=xx` query parameter

**FR-LESSON-004: Lesson Sections**
- **Priority:** CRITICAL
- **Description:** Support multiple content section types
- **Acceptance Criteria:**
  - Section types supported:
    - Definition (with term and meaning)
    - Example (problem + solution)
    - Visual Explanation (image + description)
    - Note (info/tip/warning styles)
    - Common Mistake (wrong vs correct approach)
    - Prerequisites (what to learn first)
    - What's Next (motivational, next steps)
  - Each section rendered appropriately
  - Sections ordered by display_order
  - Rich text formatting support
- **Dependencies:** Content schema
- **API Endpoint:** Embedded in lesson response

**FR-LESSON-005: Lesson Progress Tracking**
- **Priority:** HIGH
- **Description:** Track user progress through lessons
- **Acceptance Criteria:**
  - Mark lesson as "started" on first view
  - Mark lesson as "completed" when all exercises done OR manual completion
  - Track time spent on lesson
  - Record last accessed timestamp
  - Update progress overview in real-time
- **Dependencies:** Authentication required
- **API Endpoint:** `POST /api/v1/progress/lessons/{id}`

### 6.4 Exercise System

**FR-EX-001: Multiple Choice Exercises**
- **Priority:** CRITICAL
- **Description:** Users can answer multiple choice questions
- **Acceptance Criteria:**
  - Display question with 2-6 choices
  - Single correct answer
  - Immediate feedback on submission
  - Show explanation after answer
  - Hint system (optional)
  - Attempt counter
  - "Try again" for incorrect answers
- **Dependencies:** None
- **API Endpoint:** `POST /api/v1/exercises/{id}/submit`

**FR-EX-002: Numeric Input Exercises**
- **Priority:** CRITICAL
- **Description:** Users can enter numeric answers
- **Acceptance Criteria:**
  - Text input for numbers
  - Tolerance-based validation (e.g., ±0.001)
  - Unit display (if applicable)
  - Range validation
  - Decimal/integer support
  - Scientific notation support
- **Dependencies:** None
- **API Endpoint:** `POST /api/v1/exercises/{id}/submit`

**FR-EX-003: Drag & Drop Exercises**
- **Priority:** MEDIUM
- **Description:** Users can drag items to match/sort
- **Acceptance Criteria:**
  - Touch-friendly on mobile
  - Visual feedback during drag
  - Snap to drop zones
  - Support 3-10 draggable items
  - Multiple drop zones (matching)
  - Order validation (sorting)
- **Dependencies:** Drag-and-drop library
- **API Endpoint:** `POST /api/v1/exercises/{id}/submit`

**FR-EX-004: Text Input Exercises**
- **Priority:** MEDIUM
- **Description:** Users can enter free-text answers
- **Acceptance Criteria:**
  - Multi-line text input
  - Character limit display
  - Spell check support
  - Case-insensitive matching (option)
  - Keyword-based validation
  - Manual review option (for subjective)
- **Dependencies:** NLP library (future)
- **API Endpoint:** `POST /api/v1/exercises/{id}/submit`

**FR-EX-005: Exercise Submission Recording**
- **Priority:** HIGH
- **Description:** Record all exercise attempts
- **Acceptance Criteria:**
  - Store: user_id, exercise_id, answer, is_correct, timestamp
  - Track number of attempts
  - Calculate accuracy rate
  - Time to completion
  - Available for analytics
  - Works for authenticated users only
- **Dependencies:** Authentication, database
- **API Endpoint:** Automatic on exercise submit

**FR-EX-006: Exercise Hints**
- **Priority:** MEDIUM
- **Description:** Users can reveal hints for exercises
- **Acceptance Criteria:**
  - "Show Hint" button
  - Hint revealed on click (no undo)
  - Track hint usage in submissions
  - Multiple hints possible (reveal sequentially)
  - Optional penalty for using hints
- **Dependencies:** None
- **API Endpoint:** N/A (client-side)

**FR-EX-007: Exercise Difficulty Badges**
- **Priority:** LOW
- **Description:** Display difficulty level of exercises
- **Acceptance Criteria:**
  - Levels: Easy, Medium, Hard
  - Color-coded badges (green, yellow, red)
  - Icon representation
  - Filterable by difficulty
- **Dependencies:** None
- **API Endpoint:** Included in exercise data

### 6.5 Progress Tracking

**FR-PROG-001: Progress Overview Dashboard**
- **Priority:** HIGH
- **Description:** Users see their overall learning progress
- **Acceptance Criteria:**
  - Total lessons: completed, in-progress, not started
  - Total time spent learning
  - Current streak (days)
  - Completion percentage by subject
  - Recent activity timeline
  - Achievement badges
- **Dependencies:** Authentication required
- **API Endpoint:** `GET /api/v1/progress/overview`

**FR-PROG-002: Lesson Progress Details**
- **Priority:** HIGH
- **Description:** Track detailed progress per lesson
- **Acceptance Criteria:**
  - Status: not_started, in_progress, completed
  - Exercises completed count
  - Time spent on lesson
  - First accessed date
  - Completion date
  - Last accessed timestamp
- **Dependencies:** Authentication
- **API Endpoint:** `GET /api/v1/progress/lessons/{id}`

**FR-PROG-003: Progress Analytics**
- **Priority:** MEDIUM
- **Description:** Detailed analytics on learning behavior
- **Acceptance Criteria:**
  - Daily/weekly/monthly activity charts
  - Completion rates by subject/topic
  - Average time per lesson
  - Exercise accuracy rate
  - Strength/weakness analysis
  - Learning velocity trend
- **Dependencies:** Analytics service
- **API Endpoint:** `GET /api/v1/progress/analytics`

**FR-PROG-004: Personalized Recommendations**
- **Priority:** HIGH
- **Description:** AI-powered lesson recommendations
- **Acceptance Criteria:**
  - Recommend 3-5 next lessons based on:
    - Current progress
    - Performance in exercises
    - Prerequisites completion
    - Learning velocity
    - Popular lessons
  - Reason for each recommendation
  - "Continue where you left off" section
  - "Recommended for you" section
- **Dependencies:** Progress data, ML model (simple)
- **API Endpoint:** `GET /api/v1/progress/recommendations`

---
