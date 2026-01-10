# 🤖 Automated Lesson Creation - Quick Start

## ✅ What's Been Set Up

You now have a complete automation workflow for creating math lessons using Claude AI:

### Files Created:
1. **[scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md](scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md)** - Master prompt template
2. **[scripts/register-lesson.js](scripts/register-lesson.js)** - Auto-registration script
3. **[scripts/batch-generate-lessons.js](scripts/batch-generate-lessons.js)** - Batch generation script  
4. **[scripts/README.md](scripts/README.md)** - Complete documentation
5. **[scripts/example-data-graphs-prompt.txt](scripts/example-data-graphs-prompt.txt)** - Ready-to-use example
6. **[lessons.config.example.json](lessons.config.example.json)** - Batch config template

---

## 🚀 Create Your Next Lesson in 5 Minutes

### ⚡ NEW: Fully Automated (No Copy-Pasting!)

With Claude API integration, generate lessons with one command:

```bash
# 1. Set up API key (one-time setup)

🏢 Enterprise/Shared Access? → See scripts/ENTERPRISE_SETUP.md
👤 Personal Access? → See scripts/API_QUICK_SETUP.md

cp .env.example .env
# Edit .env and add your API key

# 2. Install dependencies (already done)
npm install

# 3. Test API connection
node scripts/test-api-connection.js

# 4. Generate lesson automatically
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" "Basic Data & Graphs"

# That's it! No copy-pasting to Claude.ai needed!
# Files are created, registered, and ready to build
```

**Setup guides:**
- 🏢 **Enterprise/Shared:** [scripts/ENTERPRISE_SETUP.md](scripts/ENTERPRISE_SETUP.md) ⭐
- 👤 **Personal:** [scripts/API_SETUP_GUIDE.md](scripts/API_SETUP_GUIDE.md)

---

### Option 1: Use the Pre-Made Example (Manual - claude.ai)

```bash
# 1. Copy the example prompt
cat scripts/example-data-graphs-prompt.txt

# 2. Go to claude.ai and paste the entire prompt

# 3. Claude will generate 3 files - save them:
#    page.tsx → app/[locale]/learn/foundations/data-graphs/page.tsx
#    en/data-graphs.json → messages/en/data-graphs.json  
#    ta/data-graphs.json → messages/ta/data-graphs.json

# 4. Register the lesson
node scripts/register-lesson.js data-graphs 5 foundations

# 5. Test
npm run build
npm run dev
# Go to: http://localhost:3000/en/learn/foundations/data-graphs
```

### Option 2: Create Custom Lesson with API

```bash
# Interactive mode - script will prompt for details
node scripts/generate-lesson-api.js

# Or provide all details at once
node scripts/generate-lesson-api.js <slug> <domain> <ageRange> [topic]

# Example:
node scripts/generate-lesson-api.js integers pre-algebra "Ages 11-13" "Integers & Rational Numbers"
```

### Option 3: Manual Method (Using claude.ai)

```bash
# 1. Open the template
open scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md

# 2. Replace these placeholders:
#    [TOPIC_NAME] → "Your Topic"
#    [DOMAIN] → "foundations" or "pre-algebra"
#    [SLUG] → "your-slug"
#    [AGE_RANGE] → "Ages 5-11" or "Ages 11-13"

# 3. Copy to Claude → Get 3 files → Save them

# 4. Register
node scripts/register-lesson.js your-slug 5 foundations

# 5. Test
npm run build && npm run dev
```

### Option 4: Batch Create Multiple Lessons

```bash
# 1. Create config file
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
  }
]
EOF

# 2. Generate prompts
node scripts/batch-generate-lessons.js my-lessons.json

# 3. Check generated-prompts/ folder
ls generated-prompts/

# 4. For each prompt:
#    - Copy → Claude → Save files
#    - node scripts/register-lesson.js <slug> <count>
```

---

## 📋 What the Register Script Does

When you run `node scripts/register-lesson.js <slug> <count>`:

1. ✅ Adds the lesson to `i18n.ts` (namespace registration)
2. ✅ Updates exercise count in `curriculum-data.ts`
3. ✅ Verifies all 3 files exist (page.tsx, en.json, ta.json)
4. ✅ Gives you a checklist of next steps

**Example output:**
```
📝 Registering lesson: data-graphs
   Domain: foundations
   Exercises: 5

1️⃣  Updating i18n.ts...
   ✅ Added namespace to i18n.ts
2️⃣  Updating curriculum-data.ts...
   ✅ Updated exerciseCount to 5
3️⃣  Checking translation files...
   ✅ English translation file exists
   ✅ Tamil translation file exists
4️⃣  Checking lesson page...
   ✅ Lesson page exists

✅ Lesson registration complete!
```

---

## 🎯 Recommended Workflow

**For Beginners:**
1. Start with the example prompt (data-graphs)
2. Practice the full workflow once
3. Then create custom lessons

**For Experienced:**
1. Use batch generation for multiple lessons
2. Customize the prompt template for your needs
3. Consider Claude API for full automation

---

## 📁 File Structure After Creation

```
math_teacher/
├── app/[locale]/learn/
│   └── foundations/
│       └── data-graphs/          ← New lesson folder
│           └── page.tsx           ← Generated by Claude
├── messages/
│   ├── en/
│   │   └── data-graphs.json      ← Generated by Claude
│   └── ta/
│       └── data-graphs.json      ← Generated by Claude
├── i18n.ts                        ← Auto-updated by script
├── lib/
│   └── curriculum-data.ts         ← Auto-updated by script
└── scripts/
    ├── register-lesson.js         ← Run this after saving files
    └── example-data-graphs-prompt.txt  ← Copy to Claude
```

---

## 🐛 Common Issues

**"Namespace already registered"**
- The script detects this and skips. You're good to go!

**"Missing translation files"**
- Make sure you saved all 3 files Claude generated
- Check file paths match exactly (case-sensitive)

**Build fails**
- Run: `npm run build 2>&1 | grep Error`
- Check for typos in translation keys (EN and TA must match exactly)

**Lesson not in sidebar**
- Clear cache: `rm -rf .next`
- Rebuild: `npm run build`

---

## 💡 Tips for Best Results with Claude

1. **Be specific about age range** - affects vocabulary complexity
2. **Mention exact number of topics** you want (3-4 is ideal)
3. **Request specific visualizations** if you know what would help
4. **Ask for real-world examples** relevant to the age group
5. **Iterate if needed** - ask Claude to improve specific sections

### Example Customizations:

```
"Add more examples about sports and games"
"Make the SVG diagrams larger and more colorful"
"Include a section about common mistakes"
"Add more practice exercises (8 instead of 5)"
```

---

## 🎓 What You've Automated

### Before:
- ⏱️ 2-3 hours per lesson
- ❌ Manual file creation
- ❌ Manual registration in 2 files
- ❌ Easy to forget steps
- ❌ Translation key mismatches

### After:
- ✅ 5-10 minutes per lesson
- ✅ Claude generates all content
- ✅ One command registers everything
- ✅ Automated verification
- ✅ Quality checks built-in

---

## 🚀 Next Steps

**Try it now:**
```bash
# Use the example prompt
cat scripts/example-data-graphs-prompt.txt

# Copy → Paste into claude.ai → Generate → Save files

# Register
node scripts/register-lesson.js data-graphs 5 foundations

# Test
npm run build && npm run dev
```

**Read full documentation:**
```bash
cat scripts/README.md
```

**Create your own config:**
```bash
cp lessons.config.example.json my-lessons.json
# Edit my-lessons.json
node scripts/batch-generate-lessons.js my-lessons.json
```

---

## 📚 Resources

- **Prompt Template**: [scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md](scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md)
- **Full Documentation**: [scripts/README.md](scripts/README.md)
- **Example Config**: [lessons.config.example.json](lessons.config.example.json)
- **Ready Prompt**: [scripts/example-data-graphs-prompt.txt](scripts/example-data-graphs-prompt.txt)

---

**Questions? Check [scripts/README.md](scripts/README.md) for troubleshooting and advanced usage.**
