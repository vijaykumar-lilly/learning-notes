## 10. DATA REQUIREMENTS

### 10.1 Data Model Overview

**Entities & Relationships:**

```
Subject (1) ─────< (M) Domain
                         │
                         └─────< (M) Topic
                                   │
                                   ├─────< (M) Lesson
                                   │         │
                                   │         └─────< (M) LessonSection
                                   │
                                   └─────< (M) Exercise
                                             │
                                             └─────< (M) ExerciseSubmission
                                                       │
User (1) ─────────────────────────────────────────────┘
  │
  └─────< (M) LessonProgress

Translation (M) ───── Namespaced by Subject/Domain/Topic
```

### 10.2 Data Volume Projections

**Year 1 Projections:**

| Entity | Month 1 | Month 6 | Month 12 | Growth Rate |
|--------|---------|---------|----------|-------------|
| **Users** | 500 | 15,000 | 100,000 | 200%/quarter |
| **Subjects** | 3 | 10 | 25 | Manual growth |
| **Domains** | 15 | 50 | 125 | ~5 per subject |
| **Topics** | 75 | 250 | 625 | ~5 per domain |
| **Lessons** | 300 | 1,000 | 2,500 | ~4 per topic |
| **Exercises** | 1,500 | 5,000 | 12,500 | ~5 per lesson |
| **Submissions** | 5K | 500K | 5M | High activity |
| **Progress Records** | 2K | 200K | 1.5M | Per user/lesson |
| **Translations** | 10K | 30K | 75K | Per content item |

**Storage Requirements:**

| Component | Month 1 | Month 12 | Notes |
|-----------|---------|----------|-------|
| Database | 500 MB | 10 GB | Text-heavy |
| User Files | 50 MB | 5 GB | Profile pics |
| Static Assets | 200 MB | 2 GB | Images, icons |
| Backups | 1 GB | 50 GB | 30-day retention |
| Logs | 100 MB/day | 500 MB/day | 7-day retention |

### 10.3 Data Retention Policy

**Operational Data:**
- **Active Users:** Retained indefinitely while account active
- **Inactive Users:** Anonymized after 3 years of inactivity
- **Exercise Submissions:** Retained for 2 years, then archived
- **Progress Data:** Retained while account active
- **Audit Logs:** 1 year retention (compliance requirement)

**Backup Data:**
- **Daily Backups:** 30 days retention
- **Monthly Backups:** 1 year retention
- **Yearly Snapshots:** 7 years (compliance)

**User Data Deletion:**
- Upon user request (GDPR Right to Erasure)
- 30-day grace period (can undo)
- Anonymization of exercise data (preserve analytics)
- Complete deletion of PII

### 10.4 Data Quality Requirements

**Accuracy:**
- Content accuracy validated by subject matter experts
- Translation quality score >90%
- Exercise answer validation tested before publish
- AI-generated content human-reviewed before approval

**Completeness:**
- All required fields must be populated
- Translations must exist for supported languages
- Lessons must have ≥3 exercises
- Each subject must have ≥3 domains

**Consistency:**
- Terminology standardized across curriculum
- Naming conventions enforced (snake_case for DB, camelCase for API)
- Enum values consistent across system
- Translation keys follow dot-notation standard

**Timeliness:**
- Real-time progress updates
- Exercise feedback immediate (<200ms)
- Dashboard data refreshed on page load
- Analytics updated daily (batch job)

### 10.5 Data Privacy & Compliance

**Personal Identifiable Information (PII):**
- Email, username, full name, profile picture
- IP address (for security logging)
- Learning history, exercise answers

**Data Protection Measures:**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.2+)
- Field-level encryption for sensitive data
- Access controls on PII tables
- Audit logging for PII access

**GDPR Compliance:**
- ✅ Right to Access (export user data)
- ✅ Right to Rectification (edit profile)
- ✅ Right to Erasure (delete account)
- ✅ Right to Portability (JSON export)
- ✅ Right to Object (opt-out of emails)
- ✅ Consent Management (checkboxes at registration)
- ✅ Data Breach Notification (within 72 hours)

**COPPA Compliance (Users <13):**
- Age verification at registration
- Parental consent required
- Limited data collection
- No behavioral advertising
- Parent portal for account management

### 10.6 Data Migration Strategy

**Phase 1: Initial Seeding**
- Manually create 3 subjects
- AI-generate curriculum structure
- Human-review and approve
- Manually create sample lessons
- Translate to 2 languages

**Phase 2: Bulk Import**
- Import from existing curriculum (if any)
- CSV upload for bulk translations
- API for third-party content ingestion
- Validation before import

**Phase 3: Continuous Updates**
- AI-generated content pipeline
- User-contributed translations (future)
- Admin content creation tools
- Version control for content

---

## 11. INTEGRATION REQUIREMENTS

### 11.1 AI Integration (Anthropic Claude API)

**Purpose:** Generate curriculum structure and lesson content

**Integration Type:** RESTful API over HTTPS

**API Endpoints Used:**
- `POST /v1/messages` (Main inference endpoint)

**Request Format:**
```json
{
  "model": "claude-opus-4-6",
  "max_tokens": 4096,
  "temperature": 0.7,
  "messages": [
    {
      "role": "user",
      "content": "Generate a mathematics curriculum for grade 10..."
    }
  ],
  "tools": [
    {
      "name": "create_domain",
      "description": "Create a new domain within a subject",
      "input_schema": {...}
    }
  ]
}
```

**Response Handling:**
- Parse JSON response
- Extract tool calls (function calling)
- Validate generated structure
- Store in database with status=draft
- Queue for human review

**Error Handling:**
- Rate limiting (429): Exponential backoff
- Server errors (5xx): Retry 3 times
- Invalid response: Log and alert admin
- Timeout: 30 seconds, then fail

**Cost Tracking:**
- Track tokens used (input + output)
- Calculate cost per generation
- Daily budget limits
- Alert on unusual spikes

**Security:**
- API key stored in environment variables
- Rotate keys quarterly
- Rate limiting on our side (max 100 req/hour)

### 11.2 Email Service Integration

**Purpose:** Transactional emails (verification, reset, notifications)

**Options:**
- **Primary:** SendGrid
- **Fallback:** AWS SES

**Email Types:**
- Welcome email (on registration)
- Email verification
- Password reset
- Weekly progress summary
- Admin notifications

**Template System:**
- HTML + Plain Text versions
- Localized templates (per language)
- Dynamic variables (username, link, etc.)
- Unsubscribe link in footer

**Deliverability:**
- SPF, DKIM, DMARC configured
- Sender reputation monitoring
- Bounce and complaint handling
- Email validation before sending

**Compliance:**
- CAN-SPAM compliance
- GDPR consent requirements
- Unsubscribe mechanism

### 11.3 Analytics Integration

**Primary:** Google Analytics 4

**Events Tracked:**
- User registration
- Lesson viewed
- Exercise completed
- Exercise failed
- Progress milestone (10, 50, 100 lessons)
- Language changed
- Subscription purchased (future)

**Custom Dimensions:**
- User role (user, educator, admin)
- Preferred language
- Subject viewed
- Lesson difficulty

**Secondary:** Mixpanel

**Purpose:** Product analytics and user cohorts

**Events:**
- Same as GA4 + additional behavioral events
- Funnel analysis (registration → first lesson → 10 lessons)
- Retention cohorts (D1, D7, D30)
- A/B test experiment tracking

**Privacy:**
- No PII sent to analytics
- User ID hashed before sending
- IP anonymization enabled
- Cookie consent banner

### 11.4 Error Tracking Integration

**Service:** Sentry

**Captured Errors:**
- Frontend JavaScript errors
- Backend Python exceptions
- API errors (4xx, 5xx)
- Performance issues (slow queries)

**Context Captured:**
- User ID (hashed)
- Request URL and method
- User agent and browser
- Stack trace
- Breadcrumbs (user actions)

**Alerts:**
- New error types
- Error spike (>10x normal rate)
- High severity errors (security, data loss)

**Privacy:**
- Scrub PII from error messages
- Filter sensitive headers (Authorization)
- Exclude user input data

### 11.5 Payment Integration (Phase 2)

**Service:** Stripe

**Features Required:**
- Subscription management
- Multiple tiers (Free, Premium, Pro)
- Billing portal for users
- Webhooks for events (payment success, subscription cancelled)
- Invoice generation
- Tax calculation (Stripe Tax)

**Flow:**
1. User selects plan
2. Redirected to Stripe Checkout
3. Payment processed
4. Webhook received
5. Update user subscription status
6. Grant premium features

**Security:**
- PCI compliance (handled by Stripe)
- Webhook signature verification
- No credit card storage on our servers

### 11.6 Future Integrations

**LMS Integration (Phase 3):**
- SCORM 1.2/2004 support
- LTI (Learning Tools Interoperability)
- Export grades to LMS gradebook

**SSO Integration (Phase 2):**
- Google OAuth
- Microsoft Azure AD
- GitHub OAuth
- SAML 2.0 for enterprises

**Video Integration (Phase 3):**
- YouTube API (embed videos)
- Vimeo API
- Self-hosted video (Mux or similar)

**Translation API (Future):**
- Google Translate API (machine translation baseline)
- DeepL API (higher quality)
- Human-in-the-loop review

---

## 12. SECURITY REQUIREMENTS

### 12.1 Authentication & Authorization

**Authentication Methods:**
- Email + Password (primary)
- OAuth 2.0 (Google, GitHub - Phase 2)
- SSO/SAML (Enterprise - Phase 3)

**Password Policy:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- No common passwords (use dictionary check)
- No reuse of last 5 passwords

**Session Management:**
- JWT tokens (stateless)
- Token expiration: 24 hours (access token)
- Refresh tokens: 30 days (Phase 2)
- Logout: Clear token from client (no blacklist in Phase 1)
- Concurrent sessions allowed (multi-device)

**Multi-Factor Authentication (Phase 2):**
- TOTP (Time-based One-Time Password)
- SMS backup codes
- Recovery codes
- Enforcement for admin accounts

**Account Security:**
- Rate limiting on login attempts (5 per minute)
- Account lockout after 5 failed attempts (15 min)
- Suspicious login detection (new device, new location)
- Security email notifications

### 12.2 Data Security

**Encryption:**
- **In Transit:** TLS 1.2+ for all connections
- **At Rest:** AES-256 encryption for database
- **Field-Level:** Encrypt sensitive PII fields
- **Backups:** Encrypted before storage
- **Logs:** Sensitive data redacted

**Data Classification:**
- **Public:** Subject titles, descriptions
- **Internal:** Lesson content, exercises
- **Confidential:** User email, progress data
- **Restricted:** Password hashes, payment info

**Access Controls:**
- Role-based access control (RBAC)
- Principle of least privilege
- Database user separation (app, admin, readonly)
- API key rotation policy (90 days)

**Data Sanitization:**
- Input validation on all user input
- Output encoding to prevent XSS
- SQL parameterization to prevent injection
- File upload restrictions (type, size, content scan)

### 12.3 Application Security

**OWASP Top 10 Mitigation:**

1. **Broken Access Control:**
   - Authorization checks on every endpoint
   - Object-level permission validation
   - No direct object references in URLs

2. **Cryptographic Failures:**
   - Strong encryption algorithms (AES-256, RS256)
   - Secure key management (environment variables, KMS)
   - No hardcoded secrets in code

3. **Injection:**
   - ORM usage (SQLAlchemy)
   - Parameterized queries
   - Input validation with Pydantic
   - Output encoding

4. **Insecure Design:**
   - Threat modeling performed
   - Security requirements in design phase
   - Regular security reviews

5. **Security Misconfiguration:**
   - Secure defaults
   - Minimal attack surface (disable unused features)
   - Error messages don't leak info
   - Security headers configured

6. **Vulnerable Components:**
   - Dependency scanning (Dependabot)
   - Regular updates
   - CVE monitoring
   - No end-of-life dependencies

7. **Authentication Failures:**
   - Strong password policy
   - MFA available
   - Session management secure
   - Brute force protection

8. **Data Integrity Failures:**
   - Signature verification on external data
   - Checksums for file uploads
   - CI/CD pipeline integrity

9. **Logging Failures:**
   - Comprehensive logging
   - Security event monitoring
   - No sensitive data in logs
   - Centralized log aggregation

10. **SSRF (Server-Side Request Forgery):**
    - URL validation
    - Whitelist allowed domains
    - No user-controlled URLs in server requests

**Security Headers:**
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 12.4 API Security

**Rate Limiting:**
- Anonymous: 20 req/min
- Authenticated: 100 req/min
- Premium: 500 req/min
- Per endpoint limits (stricter on write operations)

**API Authentication:**
- JWT Bearer token in Authorization header
- API keys for programmatic access (Phase 2)
- Webhook signature verification

**Input Validation:**
- Request body size limits (1MB)
- Parameter type validation
- Range checks on numeric inputs
- String length limits
- Regex validation for formats (email, URL)

**Output Filtering:**
- Don't expose internal IDs unnecessarily
- Filter sensitive fields based on user role
- Pagination limits (max 100 per page)

**CORS Configuration:**
```python
ALLOWED_ORIGINS = [
    "https://learninghub.com",
    "https://app.learninghub.com",
    "http://localhost:3000"  # Development only
]
```

### 12.5 Infrastructure Security

**Network Security:**
- VPC with private subnets
- Security groups (firewall rules)
- DDoS protection (CloudFlare)
- WAF (Web Application Firewall)

**Server Hardening:**
- Minimal base images (Alpine Linux)
- No root user in containers
- Regular OS patches
- Disable unnecessary services

**Secrets Management:**
- Environment variables for config
- AWS Secrets Manager / HashiCorp Vault
- No secrets in version control
- Rotate secrets regularly

**Monitoring & Alerting:**
- Security event logging
- Failed login attempts
- Unusual API patterns
- Unauthorized access attempts
- Certificate expiration warnings

### 12.6 Compliance & Auditing

**Audit Logging:**
- **What to log:**
  - User authentication (login, logout, failed attempts)
  - Permission changes (role updates)
  - Data access (PII queries)
  - Content changes (create, update, delete)
  - Admin actions
- **Log format:** JSON structured logs
- **Retention:** 1 year
- **Storage:** Centralized log aggregation (ELK, Splunk)

**Compliance Frameworks:**
- **GDPR:** Data protection and privacy
- **COPPA:** Children's online privacy
- **CCPA:** California consumer privacy
- **SOC 2 (Future):** Security, availability, confidentiality

**Security Testing:**
- **Automated:** SAST (Static Application Security Testing)
- **Automated:** DAST (Dynamic Application Security Testing)
- **Automated:** Dependency scanning
- **Manual:** Penetration testing (annually)
- **Manual:** Code reviews for security

**Incident Response Plan:**
1. **Detection:** Monitoring alerts trigger
2. **Containment:** Isolate affected systems
3. **Eradication:** Remove threat
4. **Recovery:** Restore normal operations
5. **Post-Incident:** Root cause analysis, improvements

---
