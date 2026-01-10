# 🔑 Claude API Setup Guide

Complete guide to set up Claude API for automated lesson generation.

---

## Step 1: Get Your API Key

### 🏢 Enterprise/Shared Access (Recommended for Organizations)

**If your organization has a shared Claude API subscription:**

1. **Contact your administrator**
   - IT department or team lead
   - Request shared API key for development
   - Key format: `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Understand your access**
   - Check if there are usage quotas
   - Ask about cost allocation
   - Follow organizational policies

3. **Benefits of shared access**
   - ✅ No individual billing needed
   - ✅ Centralized cost management
   - ✅ Higher rate limits (usually)
   - ✅ Organization-wide monitoring

**Once you have the key, skip to Step 2!**

---

### 👤 Individual Access (Personal Use)

#### Option A: Anthropic Console (Recommended)

1. **Go to Anthropic Console**: https://console.anthropic.com/
2. **Sign up or Log in** with your email
3. **Navigate to API Keys**: 
   - Click on your profile/settings
   - Go to "API Keys" section
4. **Create New Key**:
   - Click "Create Key"
   - Give it a name like "Math Teacher Lesson Generator"
   - Copy the key immediately (you won't see it again!)

#### Option B: Through Anthropic Website

1. Visit: https://www.anthropic.com/api
2. Click "Get API Access"
3. Follow the sign-up process
4. Navigate to console and create key

---

## Step 2: Set Up Environment Variables

### Method 1: Using .env File (Recommended)

```bash
# 1. Copy the example file
cp .env.example .env

# 2. Open .env file
nano .env
# or
code .env

# 3. Replace 'your_api_key_here' with your actual key
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 4. Save and close
```

**Your `.env` file should look like:**
```env
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=8000
```

### Method 2: Export in Terminal (Temporary)

```bash
# Set for current terminal session only
export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"

# Verify it's set
echo $ANTHROPIC_API_KEY
```

### Method 3: Add to Shell Profile (Permanent)

**For zsh (macOS default):**
```bash
# Edit your .zshrc
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"' >> ~/.zshrc

# Reload
source ~/.zshrc
```

**For bash:**
```bash
# Edit your .bashrc or .bash_profile
echo 'export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"' >> ~/.bashrc

# Reload
source ~/.bashrc
```

---

## Step 3: Install Required Packages

```bash
# Install the Anthropic SDK
npm install @anthropic-ai/sdk

# Install dotenv for environment variables
npm install dotenv

# Verify installation
npm list @anthropic-ai/sdk
```

---

## Step 4: Verify Setup

```bash
# Test API connection
node scripts/test-api-connection.js
```

**Expected output:**
```
✅ API Key found in environment
✅ Testing connection to Claude API...
✅ Success! Connected to Claude API
   Model: claude-sonnet-4-20250514
   Response: Hello! I'm Claude, an AI assistant...
```

---

## Step 5: Generate Your First Lesson

```bash
# Generate a lesson using API
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"

# Or use interactive mode
node scripts/generate-lesson-api.js
```

---

## 🔒 Security Best Practices

### ✅ DO:
- ✅ Keep your API key secret
- ✅ Use `.env` file (already in `.gitignore`)
- ✅ Rotate keys periodically
- ✅ Set usage limits in Anthropic Console
- ✅ Monitor your API usage

### ❌ DON'T:
- ❌ Commit `.env` to git
- ❌ Share your API key publicly
- ❌ Hardcode keys in source files
- ❌ Use the same key across projects

---

## 💰 API Costs

### For Enterprise/Shared Access Users

**If using organizational API key:**
- ✅ Costs are handled by your organization
- ✅ No personal billing needed
- ✅ May have usage quotas or limits
- ℹ️ Check with your admin for policies

**Usage tracking:**
- The script shows token usage for each generation
- You can track your personal usage
- Report usage to admin if required

---

### For Individual Users

**Claude Sonnet 4 Pricing (as of Jan 2025):**
- Input: $3 per million tokens
- Output: $15 per million tokens

**Estimated cost per lesson:**
- ~8,000 output tokens (3 files)
- ~2,000 input tokens (prompt)
- **Cost: ~$0.12-0.18 per lesson**

**Monthly estimates:**
- 10 lessons: ~$1.50
- 50 lessons: ~$7.50
- 100 lessons: ~$15.00

**Set usage limits:**
1. Go to Anthropic Console
2. Settings → Billing
3. Set monthly spending limit

---

## 🧪 Test Your Setup

### Quick Test

```bash
# Test 1: Check environment variable
node -e "require('dotenv').config(); console.log('API Key:', process.env.ANTHROPIC_API_KEY ? '✅ Found' : '❌ Not found')"

# Test 2: Test API connection
node scripts/test-api-connection.js

# Test 3: Generate a small test
node scripts/generate-lesson-api.js --test
```

### Troubleshooting

**Error: "API key not found"**
```bash
# Check if .env exists
ls -la .env

# Check if key is set
cat .env | grep ANTHROPIC_API_KEY

# Reload environment
source .env  # Won't work directly - use dotenv in Node
```

**Error: "Invalid API key"**
- Verify key starts with `sk-ant-api03-`
- Check for extra spaces or quotes
- Regenerate key in Anthropic Console

**Error: "Rate limit exceeded"**
- You're making too many requests
- Wait a few minutes
- Check your plan limits

**Error: "Insufficient credits"**
- Add payment method in Anthropic Console
- Check your billing settings
- Set up auto-reload

---

## 🔄 Environment Variable Priority

The scripts check for API keys in this order:

1. `.env` file in project root (highest priority)
2. System environment variable `ANTHROPIC_API_KEY`
3. Shell profile exports

**Recommendation:** Use `.env` file for project-specific keys.

---

## 📊 Monitor Usage

### View Usage in Console

1. Go to: https://console.anthropic.com/
2. Navigate to "Usage" or "Billing"
3. See requests, tokens, and costs

### Track Locally

```bash
# The generate-lesson-api.js script logs:
# - Tokens used (input + output)
# - Estimated cost
# - Total time

# Example output:
# ✅ Lesson generated successfully!
#    Tokens: 2,100 input / 7,850 output
#    Cost: ~$0.15
#    Time: 45 seconds
```

---

## 🚀 You're Ready!

Once setup is complete:

```bash
# Generate lessons with one command
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"

# No more copy-pasting to claude.ai!
# Full automation from prompt to working lesson
```

---

## Need Help?

**Common Issues:**
- API key issues → Check `.env` file
- Connection errors → Check internet/firewall
- Rate limits → Wait or upgrade plan
- Costs too high → Use caching, batch requests

**Resources:**
- Anthropic Docs: https://docs.anthropic.com/
- API Reference: https://docs.anthropic.com/api/reference
- Status: https://status.anthropic.com/

---

**Next Steps:**
1. ✅ Get API key from console.anthropic.com
2. ✅ Create `.env` file with your key
3. ✅ Run `npm install @anthropic-ai/sdk dotenv`
4. ✅ Test with `node scripts/test-api-connection.js`
5. ✅ Generate your first lesson!
