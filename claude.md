# LearningHub - Claude Context Document

**Last Updated:** 2026-02-11
**Project Status:** 75% Complete - MVP Development
**Current Phase:** Phase 1 Critical Fixes

---

## 🎯 PROJECT OVERVIEW

### What is LearningHub?

LearningHub is an **AI-powered, multi-language educational platform** that enables learners to master any subject in their native language. Built with Claude Opus 4.6 for content generation, the platform provides:

- **2,500+ AI-generated lessons** across 25+ subjects
- **Multi-language support** (English, Tamil, with more planned)
- **Interactive exercises** with immediate feedback
- **Progress tracking** with personalized recommendations
- **Adaptive learning** that adjusts to user pace

### Business Goals

1. **Democratize Education**: Make quality learning accessible in any language
2. **Market Leadership**: Become the #1 multi-language learning platform
3. **User Acquisition**: 100K users in Year 1
4. **Revenue**: $500K ARR by end of Year 2 (freemium model)

---

## 📚 DOCUMENTATION STRUCTURE

### Business Requirements (BRD)

All requirements are in `/business_docs/`:

| Document | Purpose | Read When... |
|----------|---------|--------------|
| **[README.md](business_docs/README.md)** | Central index and navigation | Starting any new work |
| **[01_Executive_Summary](business_docs/01_BRD_Header_Executive_Summary.md)** | Project overview, vision, budget | Understanding big picture |
| **[02_Business_Objectives](business_docs/02_BRD_Business_Objectives_Scope.md)** | Goals, scope, financial projections | Making strategic decisions |
| **[03_Functional_Requirements](business_docs/03_BRD_Stakeholders_Personas_Functional_Requirements.md)** | FR-AUTH, FR-CURR, FR-LESSON, FR-EX, FR-PROG | Implementing features |
| **[04_Technical_Requirements](business_docs/04_BRD_Additional_Functional_NonFunctional_Requirements.md)** | NFRs, performance, security | Technical implementation |
| **[05_Architecture](business_docs/05_BRD_Architecture_Workflows.md)** | System design, tech stack, workflows | Understanding system design |
| **[06_Data_Security](business_docs/06_BRD_Data_Integration_Security.md)** | Database, integrations, GDPR | Database/security work |
| **[07_UX_Performance](business_docs/07_BRD_UX_Performance_Analytics.md)** | UI/UX design system, performance | Frontend design work |
| **[08_Timeline_Budget](business_docs/08_BRD_Metrics_Risks_Timeline_Budget_Appendices.md)** | KPIs, risks, 13-week plan, $172K budget | Project planning |
| **[09_Token_Efficiency](business_docs/09_Token_Efficient_Lesson_Generation.md)** | AI cost optimization (34% savings) | AI/Claude integration |
| **[10_Technical_Decisions](business_docs/10_Technical_Decisions_Solutions.md)** | All 7 technical challenges & solutions | Problem-solving reference |

### Key Technical Decisions (Document 10)

When facing any technical challenge, **always check Document 10 first**:

1. **Multi-Language Architecture** → Inline objects (not key-value pairs)
2. **Frontend-Backend Sync** → Component Registry + Schema Generator
3. **Component Contract** → AI-Aware registry with Zod schemas
4. **Media Types** → Lazy loading with React.Suspense (95% bundle reduction)
5. **Data Storage** → Hybrid JSONB + Protobuf (72% size reduction)
6. **AI Token Costs** → 5-layer optimization (34% cost savings)
7. **Alternative Formats** → Use compact JSON (not TOML/YAML/DSL)

---

## 🏗️ ARCHITECTURE QUICK REFERENCE

### Tech Stack

**Frontend:**
- Next.js 16.1.1 (React 19.0.0, App Router)
- TypeScript 5.7.2 (Strict mode)
- Tailwind CSS 3.4.17
- Zustand 5.0.9 (state)
- next-intl 4.7.0 (i18n)
- KaTeX 0.16.11 (math)
- Framer Motion 12.34.0 (animations)

**Backend:**
- FastAPI 0.115.12 (Python 3.12+)
- SQLAlchemy 2.0.36 (ORM)
- PostgreSQL 15+
- JWT + bcrypt (auth)
- Alembic (migrations)

**AI:**
- Claude Opus 4.6 API (Anthropic)
- Compact notation prompts (83% token reduction)
- Batch generation (10 lessons/request)
- Prompt caching (90% discount)

### Database Models (11 tables)

```
User → LessonProgress → Lesson → LessonSection
                           ↓
                      Exercise → ExerciseSubmission

Subject → Domain → Topic → Lesson

Translation (multi-language content)
GenerationTask (AI tracking)
```

### API Endpoints (25+)

**Critical Paths:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - JWT login
- `GET /api/v1/curriculum` - Full curriculum tree
- `GET /api/v1/lessons/{slug}` - Lesson with sections & exercises
- `POST /api/v1/exercises/{id}/submit` - Submit answer
- `GET /api/v1/progress/overview` - User progress stats
- `POST /api/v1/admin/subjects/generate` - AI curriculum generation

### Multi-Language System

**Implementation:** Inline objects (Document 10, Challenge 1)

```typescript
// ✅ CORRECT (what we use)
{
  "title": {
    "en": "Quadratic Equations",
    "ta": "இருபடி சமன்பாடுகள்"
  }
}

// ❌ WRONG (don't use key-value pairs)
{
  "title_key": "lessons.quadratic.title"
}
```

**Display Modes:**
1. Single Language - Show one language only
2. Tooltip - Hover to see translation
3. Side-by-Side - Two columns (original | translation)
4. Tabbed - Language tabs above content

---

## 📊 CURRENT STATUS (75% Complete)

### ✅ What's Working

**Frontend:**
- Modern homepage with hero, features, testimonials (NEW)
- Curriculum browser with filtering
- Subject detail pages with domain grouping
- Lesson viewer with 7+ section types
- Interactive exercises (MC, numeric, drag-drop, text)
- Progress dashboard UI
- Bilingual content with 4 display modes
- Auth pages (login, register)
- Dark mode + responsive design

**Backend:**
- User registration & JWT authentication
- Curriculum API (subjects, domains, topics)
- Lesson delivery with sections & exercises
- Exercise submission & validation
- Progress tracking (overview, updates, recommendations)
- AI curriculum generation (Claude API)
- Translation management
- Admin approval workflow

### 🔴 Critical Gaps (Blocking MVP)

1. **Lesson Content Generation** - HIGH PRIORITY
   - **Issue:** Domains/topics created, but `LessonSection` content is empty
   - **Location:** `app/agents/curriculum_agent.py`
   - **Impact:** Users see empty lessons
   - **Fix:** Implement section content generation in agent
   - **Effort:** 3-5 days

2. **Status Field Enum Consistency** - HIGH PRIORITY
   - **Issue:** Code uses `'draft'` (string) instead of `ContentStatus.DRAFT` (enum)
   - **Location:** `app/api/v1/admin.py` line 156
   - **Impact:** Database integrity issues
   - **Fix:** Use enums consistently
   - **Effort:** 2-4 hours

3. **User Profile Management** - HIGH PRIORITY
   - **Issue:** UI missing, `/me` endpoint exists but untested
   - **Location:** Need `/[locale]/profile` page
   - **Impact:** Users can't edit preferences
   - **Fix:** Create profile page + settings UI
   - **Effort:** 1-2 days

### ⚠️ Medium Priority Gaps

4. **Password Reset** - Not implemented
5. **Admin Content Management UI** - Returns 501
6. **Analytics Dashboard** - Endpoints exist, UI minimal
7. **Search Functionality** - Component exists, not connected

### Coverage by Area

| Area | Progress | Status |
|------|----------|--------|
| Authentication | 80% | ⚠️ Missing password reset |
| Curriculum | 100% | ✅ Complete |
| Lessons | 100% | ✅ Complete (but content empty!) |
| Exercises | 100% | ✅ Complete |
| Progress | 100% | ✅ Complete |
| Admin | 56% | 🔴 Missing management UI |
| **Overall** | **75%** | **⚠️ Phase 1 fixes needed** |

---

## 🚀 MVP COMPLETION PLAN

### Phase 1: Critical Fixes (1-2 weeks) - **DO THIS FIRST**

**Goal:** Fix blocking issues, make core flow production-ready

**Tasks:**
1. ✅ Fix status field enum consistency
   - Replace all string status values with enum types
   - Update admin.py, models.py
   - Test status workflow

2. ✅ Complete lesson content generation
   - Modify `CurriculumAgent` to generate `LessonSection` content
   - Use compact notation prompts (Document 09)
   - Test with sample subjects

3. ✅ Build user profile page
   - Create `/[locale]/profile` route
   - UI for editing name, email, language preference
   - Test `/auth/me` endpoint thoroughly

4. ✅ Comprehensive error handling
   - Add try-catch blocks in critical paths
   - Proper HTTP status codes
   - User-friendly error messages

5. ✅ Verify core user flow end-to-end
   - Register → Login → Browse → Lesson → Exercise → Progress
   - Fix any broken links or errors

**Acceptance Criteria:**
- Users can complete full learning cycle without errors
- Lesson content displays properly (not empty)
- User profile editable
- No database integrity errors

### Phase 2: Core Features (2-3 weeks)

**Goal:** Complete feature parity with BRD

**Tasks:**
1. ✅ Password reset flow
   - Email service integration (SendGrid)
   - Reset token generation
   - UI for password reset

2. ✅ Admin content management UI
   - Dashboard overview
   - Lesson CRUD operations
   - Approval workflow UI
   - Analytics views

3. ✅ Complete analytics system
   - User analytics endpoints
   - Admin dashboard
   - Export reports (CSV)

4. ✅ Email notifications
   - Welcome email
   - Progress summaries
   - Achievement notifications

**Acceptance Criteria:**
- Admins can manage content without direct database access
- Users receive email notifications
- Analytics provide actionable insights

### Phase 3: Polish & Launch (1-2 weeks)

**Goal:** Production-ready platform

**Tasks:**
1. ✅ Connect search functionality
2. ✅ Performance optimization
   - Caching headers
   - Image optimization
   - Database query optimization

3. ✅ Security hardening
   - Rate limiting
   - CORS configuration
   - Change production SECRET_KEY
   - Penetration testing

4. ✅ Monitoring & logging
   - Sentry for error tracking
   - Analytics integration
   - Performance monitoring

5. ✅ Deployment setup
   - Docker compose for production
   - CI/CD pipeline
   - Backup strategy

**Acceptance Criteria:**
- All non-functional requirements met (Document 04)
- Security audit passed
- Performance targets achieved (LCP < 2.5s)
- Ready for beta users

---

## 💡 DEVELOPMENT GUIDELINES

### Before Starting Any Task

1. **Check BRD Requirements**
   - Read relevant section in business_docs/
   - Understand acceptance criteria
   - Note dependencies

2. **Check Technical Decisions**
   - Review Document 10 for similar problems
   - Follow established patterns
   - Don't reinvent solved problems

3. **Review Current Implementation**
   - Search for existing code
   - Check for TODOs or FIXMEs
   - Understand current state

### Code Quality Standards

**Frontend (TypeScript):**
- Strict TypeScript mode enabled
- All props typed with interfaces
- ESLint rules enforced
- Tailwind CSS for styling
- Components must be responsive

**Backend (Python):**
- Type hints for all functions
- Pydantic models for validation
- SQLAlchemy ORM (no raw SQL)
- Comprehensive docstrings
- Follow FastAPI best practices

**Database:**
- Use Alembic migrations (never manual schema changes)
- Indexes on frequently queried columns
- Enums for status fields (not strings)
- Foreign keys with proper constraints

**AI Integration:**
- Use compact notation prompts (Document 09)
- Batch generation (10 items/request)
- Prompt caching for repeated content
- Track token usage and costs

### Common Pitfalls (AVOID THESE)

❌ **Don't use string status values** → Use `ContentStatus` enum
❌ **Don't use key-value translation pairs** → Use inline objects
❌ **Don't bundle all JS upfront** → Use lazy loading
❌ **Don't use verbose JSON schemas** → Use compact notation
❌ **Don't hardcode secrets** → Use environment variables
❌ **Don't skip migrations** → Always use Alembic

✅ **Do follow Document 10 decisions**
✅ **Do use established patterns**
✅ **Do test thoroughly**
✅ **Do document changes**

---

## 🔧 QUICK COMMANDS

### Development

```bash
# Frontend
cd frontend
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint

# Backend
cd backend
source venv/bin/activate  # Activate virtual environment
uvicorn app.main:app --reload  # Start dev server (http://localhost:8000)
alembic revision --autogenerate -m "message"  # Create migration
alembic upgrade head  # Run migrations
pytest               # Run tests

# Full Stack (Docker)
docker-compose up    # Start all services
docker-compose down  # Stop all services
```

### Useful URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 📞 KEY CONTACTS & RESOURCES

### Documentation References

- **Next.js:** https://nextjs.org/docs
- **FastAPI:** https://fastapi.tiangolo.com/
- **Claude API:** https://docs.anthropic.com/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **PostgreSQL:** https://www.postgresql.org/docs/

### Project-Specific Docs

- **BRD Suite:** `/business_docs/README.md`
- **Technical Decisions:** `/business_docs/10_Technical_Decisions_Solutions.md`
- **Token Efficiency:** `/business_docs/09_Token_Efficient_Lesson_Generation.md`
- **Architecture:** `/business_docs/05_BRD_Architecture_Workflows.md`

---

## 🎯 SUCCESS CRITERIA

### MVP Launch Criteria (Phase 1 Complete)

✅ Users can complete full learning cycle without errors
✅ Lesson content displays properly (not empty stubs)
✅ Progress tracking works correctly
✅ Exercise validation accurate
✅ Multi-language switching works
✅ Responsive on mobile/tablet/desktop
✅ Dark mode functional
✅ No critical security vulnerabilities
✅ Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Production Launch Criteria (Phase 3 Complete)

✅ All Phase 1 + Phase 2 features complete
✅ Password reset functional
✅ Admin can manage content via UI
✅ Email notifications working
✅ Analytics dashboard complete
✅ Search functional
✅ Rate limiting enabled
✅ Monitoring & logging operational
✅ Backup strategy implemented
✅ Security audit passed
✅ 99.9% uptime target achievable

---

## 🚨 EMERGENCY PROCEDURES

### If Production is Down

1. Check monitoring dashboard
2. Review error logs (Sentry)
3. Check database connectivity
4. Verify API health: `GET /health`
5. Rollback to last known good version
6. Post incident, run root cause analysis

### If AI Costs Spike

1. Check token usage metrics
2. Review recent generation tasks
3. Verify batch size (should be 10)
4. Confirm prompt caching enabled
5. Disable AI generation if needed
6. Investigate prompt efficiency

### If Database Corruption

1. Stop writes immediately
2. Restore from last backup
3. Verify data integrity
4. Run migrations if schema mismatch
5. Test thoroughly before resuming

---

## 📈 METRICS TO TRACK

### Technical Metrics

- **API Response Time:** P95 < 200ms
- **Page Load Time:** LCP < 2.5s
- **Error Rate:** < 1%
- **Uptime:** 99.9%
- **Database Queries:** < 100ms
- **AI Token Usage:** Track cost per lesson

### Business Metrics

- **Users:** MAU, registrations, churn
- **Engagement:** Lessons completed, time spent
- **Retention:** D1, D7, D30 retention rates
- **Content:** Total lessons, exercise accuracy
- **Revenue:** MRR, ARR (Phase 2+)

---

## 🎓 LEARNING RESOURCES

### For New Developers

**Day 1-2: Understanding**
1. Read this document (claude.md)
2. Review BRD Executive Summary (Document 01)
3. Explore codebase structure
4. Run local development environment

**Day 3-5: Contributing**
1. Pick a task from MVP Plan
2. Read relevant BRD sections
3. Check Document 10 for patterns
4. Implement, test, submit PR

**Day 6-10: Ownership**
1. Take ownership of a feature area
2. Understand full stack (frontend → backend → database)
3. Contribute to documentation
4. Help onboard next developer

---

**END OF CONTEXT DOCUMENT**

---

**Remember:** This document is your single source of truth. When in doubt:
1. Check this file first
2. Check Document 10 (Technical Decisions)
3. Check relevant BRD sections
4. Ask for clarification

Keep this document updated as the project evolves!
