# 🏢 Enterprise Shared Access Setup

Quick guide for users with enterprise/organizational Claude API access.

---

## What is Enterprise Shared Access?

You have access to a Claude API key that's managed by your organization, rather than creating your own personal account. This means:

- ✅ **No personal billing** - costs handled by organization
- ✅ **Centralized management** - admin controls access
- ✅ **Higher limits** - usually better rate limits
- ✅ **Team collaboration** - shared resources
- ⚠️ **Usage policies** - may have organizational guidelines

---

## Quick Setup (5 Minutes)

### Step 1: Get the API Key from Your Admin

**Contact:**
- IT department
- Team lead
- Platform administrator
- DevOps team

**Request:**
> "I need the shared Claude API key for the Math Teacher Lesson Generator project. 
> It's for automated lesson content generation using the Anthropic API."

**Ask about:**
- Any usage quotas or limits
- Cost tracking requirements
- Organizational policies
- Approved use cases

### Step 2: Configure Locally

```bash
# Navigate to project
cd /Users/L066916/math_teacher

# Create .env file
cp .env.example .env

# Edit and add the key
nano .env
# or
code .env
```

**Add this line:**
```env
# Shared organizational API key
ANTHROPIC_API_KEY=sk-ant-api03-your-org-shared-key-here
```

### Step 3: Test Connection

```bash
node scripts/test-api-connection.js
```

**Expected output:**
```
✅ API Key found in environment
✅ Success! Connected to Claude API
```

### Step 4: Start Generating Lessons!

```bash
# Interactive mode
node scripts/generate-lesson-api.js

# Or direct command
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11"
```

---

## Important Notes for Shared Access

### ✅ Do:

- **Track your usage** - The script shows token count for each generation
- **Follow policies** - Adhere to organizational guidelines
- **Report issues** - Notify admin if you hit rate limits
- **Keep secure** - Don't share the key outside your organization
- **Document usage** - Keep records if required by your org

### ❌ Don't:

- **Share the key publicly** - Never commit to GitHub or share outside
- **Exceed quotas** - Stay within organizational limits
- **Use for personal projects** - Only approved use cases
- **Modify billing** - You won't have access to billing settings

---

## Usage Tracking

The script automatically shows usage for each generation:

```
✅ Response received!
   Time: 45.3s
   Input tokens: 2,156
   Output tokens: 7,832
   Estimated cost: $0.1241
```

**Keep a log if needed:**
```bash
# Redirect output to log file
node scripts/generate-lesson-api.js data-graphs foundations "Ages 5-11" 2>&1 | tee lesson-gen.log
```

---

## Rate Limits

**If you see "Rate limit exceeded":**

1. **Wait** - Usually 1 minute is enough
2. **Check with admin** - You might be hitting org quotas
3. **Space out requests** - Don't batch generate too quickly
4. **Report** - Let admin know if limits are too restrictive

---

## Cost Management (Organizational)

**For your records:**
- Each lesson: ~$0.12-0.15
- The script shows exact token usage
- You can calculate: `(input_tokens/1M × $3) + (output_tokens/1M × $15)`

**If admin asks for usage report:**
```bash
# Example log format
Date: 2026-01-10
Lessons Generated: 3
Total Input Tokens: 6,450
Total Output Tokens: 23,500
Estimated Cost: $0.37
```

---

## Security Best Practices

### Protect the Shared Key:

1. **Local only**
   ```bash
   # .env is already in .gitignore
   cat .gitignore | grep .env
   ```

2. **Don't commit**
   ```bash
   # Never do this:
   git add .env  # ❌ BAD
   ```

3. **File permissions**
   ```bash
   # Make .env readable only by you
   chmod 600 .env
   ```

4. **Team sharing**
   - Share through secure channels only
   - Use password managers if available
   - Follow org security policies

---

## Troubleshooting

### "Unauthorized" or "Invalid API key"

1. **Verify the key** - Check with admin it's still active
2. **Check format** - Should start with `sk-ant-api03-`
3. **No spaces** - Remove extra spaces in .env file
4. **Regenerate** - Ask admin if key needs refresh

### "Rate limit exceeded"

1. **Wait 60 seconds**
2. **Check org quotas** - You might be hitting team limits
3. **Contact admin** - May need higher limits
4. **Space requests** - Don't generate many lessons at once

### "Insufficient credits"

1. **Org issue** - Contact admin immediately
2. **Payment** - Organization needs to top up
3. **Not your responsibility** - This is managed centrally

---

## FAQ

**Q: Do I need my own Anthropic account?**
A: No! You're using the organizational key. No personal account needed.

**Q: Will I be charged?**
A: No. All costs are handled by your organization.

**Q: Can I see usage in the Anthropic Console?**
A: Only if your admin gives you access. Usually only admins see the console.

**Q: What if I hit rate limits?**
A: Contact your admin. They can increase limits or help you schedule usage.

**Q: Can I use this for other projects?**
A: Check with your admin. The key might be restricted to approved projects only.

**Q: How do I report usage?**
A: The script logs all token usage. Save the output if you need to report.

---

## Getting Help

**Internal:**
- Contact your IT admin
- Check internal docs
- Ask team lead

**External:**
- Read: [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)
- Check: [API_AUTOMATION_COMPLETE.md](../API_AUTOMATION_COMPLETE.md)
- Reference: [QUICK_REFERENCE.txt](../QUICK_REFERENCE.txt)

---

## You're Ready!

Once you have the shared key:

```bash
# 1. Add to .env
echo "ANTHROPIC_API_KEY=sk-ant-api03-shared-key" > .env

# 2. Test
node scripts/test-api-connection.js

# 3. Generate
node scripts/generate-lesson-api.js

# 4. Done! 🎉
```

**Happy lesson creating with enterprise access!** 🏢
