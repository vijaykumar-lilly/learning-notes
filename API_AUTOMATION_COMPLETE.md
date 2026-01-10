# 🎉 Full API Automation - Complete Setup

## ✅ What's Been Installed

Your project now has **full Claude API integration** for automated lesson generation!

### New Files Created:

**Configuration:**
- [.env.example](.env.example) - Template for API key
- `.env` - Your actual API key (create from example)

**Scripts:**
- [scripts/test-api-connection.js](scripts/test-api-connection.js) - Test API setup
- [scripts/generate-lesson-api.js](scripts/generate-lesson-api.js) - Auto-generate lessons
- [scripts/register-lesson.js](scripts/register-lesson.js) - Auto-register lessons

**Documentation:**
- [scripts/API_QUICK_SETUP.md](scripts/API_QUICK_SETUP.md) - **START HERE** (5-min setup)
- [scripts/API_SETUP_GUIDE.md](scripts/API_SETUP_GUIDE.md) - Detailed guide
- [AUTOMATION_QUICKSTART.md](AUTOMATION_QUICKSTART.md) - Quick reference
- [scripts/README.md](scripts/README.md) - Complete docs

**Packages Installed:**
- `@anthropic-ai/sdk` - Claude API client
- `dotenv` - Environment variables

---

## 🚀 Quick Start (5 Steps - 10 Minutes)

### 🏢 For Enterprise/Shared Access Users

**You have organizational API access! Follow this guide:**
👉 **[scripts/ENTERPRISE_SETUP.md](scripts/ENTERPRISE_SETUP.md)** ⭐

**Quick version:**
1. Contact your IT admin/team lead
2. Request the shared Claude API key
3. Add to .env file
4. Start generating!

---

### 👤 For Personal Access Users

### Step 1: Get API Key

```bash
# Go to: https://console.anthropic.com/
# Sign up → API Keys → Create Key
# Copy your key: sk-ant-api03-xxxxxxxxxx
```

### Step 2: Create .env File
```bash
cp .env.example .env
nano .env  # or code .env
```

Add your key:
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

### Step 3: Test Connection
```bash
node scripts/test-api-connection.js
```

Expected: `✅ Success! Connected to Claude API`

### Step 4: Generate Your First Lesson
```bash
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" "Basic Data & Graphs"
```

**That's it!** The script will:
- ✅ Generate prompt automatically
- ✅ Call Claude API
- ✅ Create 3 files (page.tsx, en.json, ta.json)
- ✅ Save files to correct locations
- ✅ Register in i18n.ts and curriculum-data.ts
- ✅ Ready to build!

### Step 5: Build and Test
```bash
npm run build
npm run dev
# Open: http://localhost:3000/en/learn/foundations/data-graphs
```

---

## 📖 Full Documentation

**Quick Setup (5 min):**
👉 [scripts/API_QUICK_SETUP.md](scripts/API_QUICK_SETUP.md)

**Detailed Guide:**
- [scripts/API_SETUP_GUIDE.md](scripts/API_SETUP_GUIDE.md) - Complete setup
- [AUTOMATION_QUICKSTART.md](AUTOMATION_QUICKSTART.md) - All methods
- [scripts/README.md](scripts/README.md) - Full documentation

---

## 💡 Usage Examples

### Interactive Mode
```bash
node scripts/generate-lesson-api.js
# Script prompts for: slug, domain, age range, topic
```

### Command Line
```bash
node scripts/generate-lesson-api.js <slug> <domain> <ageRange> [topic]

# Examples:
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"
node scripts/generate-lesson-api.js integers pre-algebra "Ages 11-13"
node scripts/generate-lesson-api.js exponents pre-algebra "Ages 11-13" "Exponents & Powers"
```

### Test API
```bash
node scripts/test-api-connection.js
```

---

## 💰 Costs

**Per Lesson:**
- ~$0.12-0.15 per lesson
- Input: 2,000 tokens (~$0.006)
- Output: 8,000 tokens (~$0.120)

**Monthly Estimates:**
- 10 lessons: ~$1.50
- 50 lessons: ~$7.50
- 100 lessons: ~$15.00

**Set spending limits** at: https://console.anthropic.com/settings/billing

---

## 🔒 Security

**Your .env file is protected:**
- ✅ Already in `.gitignore`
- ✅ Won't be committed to git
- ✅ Stays local only

**Best practices:**
- Keep API key secret
- Don't share .env file
- Rotate keys periodically
- Monitor usage in console

---

## 🐛 Troubleshooting

**"API key not found"**
```bash
# Check .env exists
ls -la .env

# Verify content
cat .env
```

**"Invalid API key"**
- Regenerate at console.anthropic.com
- Check for typos/extra spaces
- Ensure key starts with `sk-ant-api03-`

**Build fails after generation**
```bash
# Check for errors
npm run build 2>&1 | grep Error

# Common fix: rebuild
rm -rf .next
npm run build
```

**Files not saving correctly**
- Check write permissions
- Ensure directories exist
- Review script output for errors

---

## 🎯 What You Can Do Now

### Before (Manual Method):
1. Open prompt template
2. Fill in placeholders
3. Copy to claude.ai
4. Wait for response
5. Copy page.tsx code
6. Save to correct location
7. Copy en.json
8. Save to messages/en/
9. Copy ta.json
10. Save to messages/ta/
11. Edit i18n.ts
12. Edit curriculum-data.ts
13. Build and test

**Time: ~30 minutes per lesson**

### After (API Method):
```bash
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"
```

**Time: ~2 minutes per lesson**

---

## 📊 Workflow Comparison

| Step | Manual | API Automated |
|------|--------|---------------|
| Get prompt | Edit template | Auto-generated |
| Call Claude | Copy-paste to web | API call |
| Extract files | Manual copy | Auto-extracted |
| Save files | Manual save × 3 | Auto-saved |
| Register | Edit 2 files | Auto-registered |
| **Total Time** | **30 min** | **2 min** |

---

## 🚀 Next Steps

**1. Set up API key** (5 min)
```bash
# Follow: scripts/API_QUICK_SETUP.md
```

**2. Test connection** (1 min)
```bash
node scripts/test-api-connection.js
```

**3. Generate first lesson** (2 min)
```bash
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"
```

**4. Build and enjoy!** (1 min)
```bash
npm run build && npm run dev
```

---

## 📚 Resources

**Setup Guides:**
- 👉 **[API_QUICK_SETUP.md](scripts/API_QUICK_SETUP.md)** - Start here!
- [API_SETUP_GUIDE.md](scripts/API_SETUP_GUIDE.md) - Detailed guide
- [AUTOMATION_QUICKSTART.md](AUTOMATION_QUICKSTART.md) - Quick reference

**External Links:**
- Get API Key: https://console.anthropic.com/
- API Docs: https://docs.anthropic.com/
- Pricing: https://anthropic.com/pricing
- Status: https://status.anthropic.com/

---

## ✨ Summary

You now have a **fully automated lesson generation system**:

✅ One command generates complete lessons
✅ No manual copy-pasting needed
✅ All files created and registered automatically
✅ Cost: ~$0.15 per lesson
✅ Time: ~2 minutes per lesson
✅ Quality: Consistent, production-ready code

**Start creating lessons now:**
```bash
node scripts/generate-lesson-api.js
```

Happy teaching! 🎓
