# 🚀 Complete API Setup - Step by Step

Follow these exact steps to set up Claude API for fully automated lesson generation.

---

## Step 1: Get Your API Key (5 minutes)

### 🏢 For Enterprise/Shared Access Users

**If you have enterprise or shared organizational access:**

1. **Contact your IT admin or team lead**
   - Request the shared Claude API key
   - Ask about usage policies and rate limits
   - Confirm if there are any spending caps

2. **Get the API key**
   - Format: `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - This is managed by your organization
   - You don't need to create your own account

3. **Check organizational policies**
   - Ask about monthly usage limits
   - Understand cost tracking (if applicable)
   - Follow any internal guidelines

**Skip to Step 2** once you have the key!

---

### 👤 For Individual/Personal Access

1. **Open your browser** and go to: https://console.anthropic.com/

2. **Sign up or Log in**
   - Use your email address
   - Verify your email if needed

3. **Navigate to API Keys**
   - Click on your account/profile icon (top right)
   - Select "API Keys" from the menu

4. **Create a new API key**
   - Click "Create Key" button
   - Name it: `Math Teacher Lesson Generator`
   - **IMPORTANT**: Copy the key immediately!
   - Format: `sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - You won't be able to see it again

5. **Set up billing (if not done)**
   - Go to "Settings" → "Billing"
   - Add a payment method
   - Set a monthly spending limit (e.g., $10)
   - Lessons cost ~$0.15 each

---

## Step 2: Install Dependencies (1 minute)

```bash
cd /Users/L066916/math_teacher

# Install required packages (already done!)
npm install
```

**Packages installed:**
- `@anthropic-ai/sdk` - Official Claude API client
- `dotenv` - Environment variable management

---

## Step 3: Create .env File (2 minutes)

```bash
# Copy the example file
cp .env.example .env

# Open in your editor
code .env
# or
nano .env
```

**Edit the .env file:**
```env
# Replace 'your_api_key_here' with your actual key
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here

# Optional: Use different model
CLAUDE_MODEL=claude-sonnet-4-20250514

# Optional: Adjust token limit
CLAUDE_MAX_TOKENS=8000
```

**Save and close** the file.

---

## Step 4: Test Your Setup (1 minute)

```bash
# Test API connection
node scripts/test-api-connection.js
```

**Expected output:**
```
🔍 Testing Claude API Connection...

✅ API Key found in environment
   Key prefix: sk-ant-api03-xxxxx...

🔗 Testing connection to Claude API...
✅ Success! Connected to Claude API

📊 Connection Details:
   Model: claude-sonnet-4-20250514
   Response ID: msg_xxxxx
   Input tokens: 15
   Output tokens: 12

💬 Response: "API connection successful"

✨ Your API is working correctly!
   You can now use: node scripts/generate-lesson-api.js
```

**If you see errors:**
- ❌ "API key not found" → Check your .env file
- ❌ "Invalid API key" → Verify the key in console.anthropic.com
- ❌ "Rate limit" → Wait a minute and try again

---

## Step 5: Generate Your First Lesson! (2 minutes)

### Method A: Quick Example

```bash
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" "Basic Data & Graphs"
```

### Method B: Interactive Mode

```bash
node scripts/generate-lesson-api.js
```

**The script will prompt you:**
```
Enter lesson slug (e.g., data-graphs): data-graphs
Enter domain (foundations/pre-algebra/algebra): foundations
Enter age range (e.g., Ages 5-11): Ages 5-11
Enter topic name (press Enter for "Data Graphs"): Basic Data & Graphs
```

**What happens:**
1. ⏳ Generates prompt from template
2. 🤖 Calls Claude API (takes ~30-60 seconds)
3. 📦 Extracts 3 files from response
4. 💾 Saves files to correct locations
5. 🔧 Registers lesson automatically
6. ✅ Shows you the results!

**Output example:**
```
============================================================
  🎓 Automated Lesson Generator with Claude API
============================================================

📋 Lesson Details:
   Topic: Basic Data & Graphs
   Slug: data-graphs
   Domain: foundations
   Age Range: Ages 5-11

📝 Generating prompt from template...
   Prompt length: 5234 characters

🤖 Calling Claude API...
   Model: claude-sonnet-4-20250514
   Max tokens: 8000

✅ Response received!
   Time: 45.3s
   Input tokens: 2,156
   Output tokens: 7,832
   Estimated cost: $0.1241

📦 Extracting generated files...
   Found 3/3 files

💾 Saving files...
   ✅ app/[locale]/learn/foundations/data-graphs/page.tsx
   ✅ messages/en/data-graphs.json
   ✅ messages/ta/data-graphs.json

🔧 Registering lesson...
   ✅ Added namespace to i18n.ts
   ✅ Updated exerciseCount to 5
   ✅ All files verified

============================================================
✅ Lesson generation complete!
============================================================

Next steps:
  1. Review generated files
  2. Run: npm run build
  3. Test: npm run dev
  4. Navigate to: /en/learn/foundations/data-graphs
============================================================
```

---

## Step 6: Build and Test (1 minute)

```bash
# Build the project
npm run build

# Start dev server
npm run dev
```

**Open in browser:**
http://localhost:3000/en/learn/foundations/data-graphs

**Check:**
- ✅ Lesson loads correctly
- ✅ All text appears (English)
- ✅ SVG diagrams render
- ✅ Exercises work
- ✅ Language switch works (Tamil)

---

## 🎉 You're Done!

You can now create lessons with ONE command:

```bash
node scripts/generate-lesson-api.js <slug> <domain> <ageRange> [topic]
```

**No more:**
- ❌ Copy-pasting to claude.ai
- ❌ Manually saving 3 files
- ❌ Editing i18n.ts
- ❌ Updating curriculum-data.ts

**Everything is automated!** 🚀

---

## Cost Management

### Track Your Usage

**Each lesson costs approximately:**
- Input: ~2,000 tokens × $3/M = $0.006
- Output: ~8,000 tokens × $15/M = $0.120
- **Total: ~$0.12-0.15 per lesson**

### Set Spending Limits

1. Go to: https://console.anthropic.com/
2. Settings → Billing
3. Set monthly limit (e.g., $10 = ~65 lessons)
4. Enable email alerts

### Monitor Usage

```bash
# The script shows cost for each generation:
#   Estimated cost: $0.1241
```

**In Anthropic Console:**
- View total usage
- See request history
- Download usage reports

---

## Troubleshooting

### Problem: "API key not found"

```bash
# Check if .env exists
ls -la .env

# View contents (safely)
cat .env | grep ANTHROPIC_API_KEY

# Make sure it's not .env.example
mv .env.example .env  # if needed
# Then edit .env with your key
```

### Problem: "Invalid API key"

- Verify key starts with `sk-ant-api03-`
- No extra spaces or quotes in .env
- Generate new key at console.anthropic.com

### Problem: "Rate limit exceeded"

- You're making requests too fast
- Wait 60 seconds
- Check your plan limits

### Problem: "Insufficient credits"

- Add payment method in console
- Check billing settings
- Top up your account

### Problem: Files not generated correctly

```bash
# Check response manually
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" > output.txt

# Look for code blocks in output.txt
grep "```" output.txt
```

---

## Next Steps

**Create more lessons:**
```bash
# Foundation lessons
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"

# Pre-algebra lessons  
node scripts/generate-lesson-api.js integers pre-algebra "Ages 11-13"

# Batch create (coming soon)
node scripts/batch-generate-lessons-api.js my-lessons.json
```

**Customize prompts:**
- Edit `scripts/CLAUDE_LESSON_GENERATOR_PROMPT.md`
- Add specific requirements
- Adjust visual explanations needed

**Monitor costs:**
- Check console.anthropic.com weekly
- Set up usage alerts
- Track per-lesson costs

---

## Security Reminders

✅ **DO:**
- Keep .env in .gitignore (already done)
- Never commit API keys
- Rotate keys periodically
- Use different keys for different projects

❌ **DON'T:**
- Share your API key
- Commit .env to GitHub
- Use production keys in testing
- Leave unused keys active

---

## Support

**Resources:**
- API Docs: https://docs.anthropic.com/
- Status: https://status.anthropic.com/
- Support: https://console.anthropic.com/support

**Local Help:**
- Full guide: [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)
- Workflow: [../docs/LESSON_WORKFLOW.md](../docs/LESSON_WORKFLOW.md)
- README: [README.md](README.md)

---

**You're all set! Start generating lessons with one command! 🚀**
