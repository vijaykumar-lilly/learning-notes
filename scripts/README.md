# Lesson Automation Scripts

Automate the creation and registration of new math lessons using Claude AI.

## Quick Start

### Prerequisites

For **automated generation** (recommended):
```bash
# 1. Install dependencies
npm install

# 2. Get API key from https://console.anthropic.com/
# 3. Set up .env file
cp .env.example .env
# Edit .env and add: ANTHROPIC_API_KEY=sk-ant-api03-...

# 4. Test connection
node scripts/test-api-connection.js
```

**Full setup guide:** [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)

---

### Method 1: Fully Automated (API)

**Generate lesson with one command:**
```bash
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" "Basic Data & Graphs"
```

**Interactive mode:**
```bash
node scripts/generate-lesson-api.js
# Script will prompt for: slug, domain, age range, topic
```

**What it does:**
- ✅ Generates prompt from template
- ✅ Calls Claude API automatically
- ✅ Extracts and saves 3 files
- ✅ Registers lesson in i18n and curriculum
- ✅ Shows token usage and cost

---

### Method 2: Manual with Claude.ai

### 1. Generate a Single Lesson with Claude

**Copy the prompt template:**
```bash
cat scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md
```

**Fill in these values:**
- `[TOPIC_NAME]` - e.g., "Basic Data & Graphs"
- `[DOMAIN]` - e.g., "foundations", "pre-algebra"
- `[SLUG]` - e.g., "data-graphs"
- `[AGE_RANGE]` - e.g., "Ages 5-11 / Grades K-5"

**Paste into Claude** (claude.ai) and get 3 files:
1. `page.tsx` - Lesson page component
2. `en/[slug].json` - English translations
3. `ta/[slug].json` - Tamil translations

**Save the files:**
```bash
# Create directories if needed
mkdir -p app/[locale]/learn/[DOMAIN]/[SLUG]
mkdir -p messages/en
mkdir -p messages/ta

# Save the generated files
# page.tsx → app/[locale]/learn/[DOMAIN]/[SLUG]/page.tsx
# en/[slug].json → messages/en/[SLUG].json
# ta/[slug].json → messages/ta/[SLUG].json
```

**Register the lesson:**
```bash
node scripts/register-lesson.js [SLUG] [EXERCISE_COUNT] [DOMAIN]
```

Example:
```bash
node scripts/register-lesson.js data-graphs 5 foundations
```

**Test:**
```bash
npm run build
npm run dev
# Navigate to http://localhost:3000/en/learn/[DOMAIN]/[SLUG]
```

---

## Batch Generation

### 1. Create a config file

Copy the example:
```bash
cp lessons.config.example.json my-lessons.config.json
```

Edit `my-lessons.config.json`:
```json
[
  {
    "topic": "Basic Data & Graphs",
    "domain": "foundations",
    "slug": "data-graphs",
    "ageRange": "Ages 5-11 / Grades K-5",
    "exercises": 5,
    "topics": 4
  }
]
```

### 2. Generate prompts

```bash
node scripts/batch-generate-lessons.js my-lessons.config.json
```

This creates individual prompt files in `generated-prompts/` folder.

### 3. Use with Claude

For each prompt file:
1. Copy the content
2. Paste into Claude
3. Save the 3 generated files
4. Run register script

---

## Scripts Reference

### `register-lesson.js`

Registers a lesson by updating `i18n.ts` and `curriculum-data.ts`.

**Usage:**
```bash
node scripts/register-lesson.js <slug> <exerciseCount> [domain]
```

**Arguments:**
- `slug` - URL-friendly lesson identifier (e.g., "data-graphs")
- `exerciseCount` - Number of exercises in the lesson (e.g., 5)
- `domain` - Optional, defaults to "foundations" (e.g., "pre-algebra")

**Example:**
```bash
node scripts/register-lesson.js measurement 5 foundations
```

**What it does:**
1. ✅ Adds namespace to `i18n.ts`
2. ✅ Updates exercise count in `curriculum-data.ts`
3. ✅ Verifies translation files exist
4. ✅ Verifies page.tsx exists

---

### `batch-generate-lessons.js`

Generates Claude prompts for multiple lessons from a config file.

**Usage:**
```bash
node scripts/batch-generate-lessons.js <config-file>
```

**Example:**
```bash
node scripts/batch-generate-lessons.js lessons.config.json
```

**Config file format:**
```json
[
  {
    "topic": "Lesson Title",
    "domain": "foundations",
    "slug": "lesson-slug",
    "ageRange": "Ages 5-11",
    "exercises": 5,
    "topics": 3,
    "notes": "Optional: specific requirements"
  }
]
```

**Output:**
- Creates `generated-prompts/` folder
- One `.txt` file per lesson with customized prompt
- Ready to copy-paste into Claude

---

## Workflow Examples

### Example 1: Create "Basic Data & Graphs" Lesson

```bash
# 1. Get the prompt
cat scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md

# 2. Fill in values in the prompt:
#    [TOPIC_NAME] = "Basic Data & Graphs"
#    [DOMAIN] = "foundations"
#    [SLUG] = "data-graphs"
#    [AGE_RANGE] = "Ages 5-11 / Grades K-5"

# 3. Paste filled prompt into Claude → Get 3 files

# 4. Save files:
#    page.tsx → app/[locale]/learn/foundations/data-graphs/page.tsx
#    en/data-graphs.json → messages/en/data-graphs.json
#    ta/data-graphs.json → messages/ta/data-graphs.json

# 5. Register
node scripts/register-lesson.js data-graphs 5 foundations

# 6. Test
npm run build
npm run dev
```

### Example 2: Batch Create 3 Lessons

```bash
# 1. Create config
cat > my-lessons.json << 'EOF'
[
  {
    "topic": "Basic Data & Graphs",
    "domain": "foundations",
    "slug": "data-graphs",
    "ageRange": "Ages 5-11",
    "exercises": 5
  },
  {
    "topic": "Integers & Rational Numbers",
    "domain": "pre-algebra",
    "slug": "integers",
    "ageRange": "Ages 11-13",
    "exercises": 6
  },
  {
    "topic": "Exponents & Powers",
    "domain": "pre-algebra",
    "slug": "exponents",
    "ageRange": "Ages 11-13",
    "exercises": 6
  }
]
EOF

# 2. Generate prompts
node scripts/batch-generate-lessons.js my-lessons.json

# 3. For each lesson in generated-prompts/:
#    - Copy prompt → Claude → Save files
#    - Run: node scripts/register-lesson.js <slug> <count> <domain>
#    - Test: npm run build

# Example for first lesson:
node scripts/register-lesson.js data-graphs 5 foundations
```

---

## Tips

### Claude API Usage (Advanced)

If you have Claude API access, you can automate further:

```javascript
// Example: auto-generate.js
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');

const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

async function generateLesson(promptFile) {
  const prompt = fs.readFileSync(promptFile, 'utf8');
  
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{ role: 'user', content: prompt }]
  });
  
  return message.content[0].text;
}
```

### Quality Checklist

After generating a lesson, verify:
- [ ] Age-appropriate language
- [ ] 2-4 VisualExplanation components with SVG
- [ ] 3-5 worked examples
- [ ] 5-6 practice exercises
- [ ] Translation files match exactly (same keys)
- [ ] All text uses t() translations
- [ ] Dark mode support in SVGs
- [ ] Build succeeds
- [ ] Lesson displays correctly in browser

---

## Troubleshooting

**Problem:** `i18n.ts` already has the namespace

**Solution:** The script detects this and skips. You can manually verify the import is correct.

---

**Problem:** Lesson not showing in sidebar

**Solution:** 
1. Check `curriculum-data.ts` has the entry
2. Verify slug matches exactly
3. Clear cache and rebuild: `rm -rf .next && npm run build`

---

**Problem:** Translation keys missing

**Solution:**
1. Compare EN and TA JSON files - they must have identical keys
2. Use a JSON validator to check syntax
3. Run: `node -e "console.log(require('./messages/en/[slug].json'))"`

---

**Problem:** Build fails with module not found

**Solution:**
1. Verify all 3 files are saved correctly
2. Check file paths match exactly (case-sensitive)
3. Run register script again: `node scripts/register-lesson.js [slug] [count]`

---

## Make Scripts Executable (Optional)

```bash
chmod +x scripts/register-lesson.js
chmod +x scripts/batch-generate-lessons.js

# Then run without 'node':
./scripts/register-lesson.js data-graphs 5
```
