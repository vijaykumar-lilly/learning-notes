# 🚀 Get Started with Automated Lesson Generation

Choose your setup path based on your API access type.

---

## 🏢 I Have Enterprise/Shared Access

**Perfect! You have organizational Claude API access.**

### Quick Setup:

```bash
# 1. Get API key from your IT admin/team lead
# 2. Create .env file
cp .env.example .env

# 3. Add the shared key
echo "ANTHROPIC_API_KEY=sk-ant-api03-your-org-key" > .env

# 4. Test connection
node scripts/test-api-connection.js

# 5. Generate lessons!
node scripts/generate-lesson-api.js
```

**📖 Full Guide:** [scripts/ENTERPRISE_SETUP.md](scripts/ENTERPRISE_SETUP.md)  
**📋 Quick Reference:** [ENTERPRISE_QUICK_START.txt](ENTERPRISE_QUICK_START.txt)

**Benefits:**
- ✅ No personal billing
- ✅ No signup needed
- ✅ Organization manages costs
- ✅ Just get key and go!

---

## 👤 I Need Personal Access

**You'll create your own Anthropic API account.**

### Quick Setup:

```bash
# 1. Get API key
# Go to: https://console.anthropic.com/
# Sign up → API Keys → Create Key

# 2. Create .env file
cp .env.example .env

# 3. Add your personal key
echo "ANTHROPIC_API_KEY=sk-ant-api03-your-key" > .env

# 4. Test connection
node scripts/test-api-connection.js

# 5. Generate lessons!
node scripts/generate-lesson-api.js
```

**📖 Full Guide:** [scripts/API_QUICK_SETUP.md](scripts/API_QUICK_SETUP.md)  
**📋 Quick Reference:** [QUICK_REFERENCE.txt](QUICK_REFERENCE.txt)

**Requirements:**
- Anthropic account
- Payment method
- ~$0.15 per lesson

---

## 📖 Complete Documentation

**Setup Guides:**
- 🏢 [Enterprise Setup](scripts/ENTERPRISE_SETUP.md) - For organizational access
- 👤 [Personal Setup](scripts/API_QUICK_SETUP.md) - For individual accounts
- 📚 [Full API Guide](scripts/API_SETUP_GUIDE.md) - Detailed documentation

**Quick References:**
- [ENTERPRISE_QUICK_START.txt](ENTERPRISE_QUICK_START.txt) - Visual enterprise guide
- [QUICK_REFERENCE.txt](QUICK_REFERENCE.txt) - Visual command reference
- [API_AUTOMATION_COMPLETE.md](API_AUTOMATION_COMPLETE.md) - Complete overview

**Automation:**
- [AUTOMATION_QUICKSTART.md](AUTOMATION_QUICKSTART.md) - All methods
- [scripts/README.md](scripts/README.md) - Complete docs

---

## 🎯 After Setup

**Generate lessons with one command:**

```bash
# Interactive mode (prompts you for details)
node scripts/generate-lesson-api.js

# Command line (fastest)
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"

# Build and test
npm run build && npm run dev
```

**Time:** ~2 minutes per lesson  
**Output:** Complete lesson with 3 files (page.tsx, en.json, ta.json)  
**Automated:** Registration, file saving, everything!

---

## ❓ Which Setup Should I Choose?

| Question | Answer | Setup |
|----------|--------|-------|
| Do you work for an organization? | Yes | 🏢 Enterprise |
| Does your company have Claude API access? | Yes | 🏢 Enterprise |
| Are you a solo developer/teacher? | Yes | 👤 Personal |
| Want to manage your own costs? | Yes | 👤 Personal |
| Need organizational cost tracking? | Yes | 🏢 Enterprise |

---

## 🆘 Need Help?

**Enterprise Users:**
- Contact your IT admin
- Read: [scripts/ENTERPRISE_SETUP.md](scripts/ENTERPRISE_SETUP.md)

**Personal Users:**
- Check: [scripts/API_QUICK_SETUP.md](scripts/API_QUICK_SETUP.md)
- Support: https://console.anthropic.com/support

**Both:**
- Troubleshooting: [scripts/API_SETUP_GUIDE.md](scripts/API_SETUP_GUIDE.md)
- General: [API_AUTOMATION_COMPLETE.md](API_AUTOMATION_COMPLETE.md)

---

**Ready? Pick your path and start generating lessons!** 🎓
