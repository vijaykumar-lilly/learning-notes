```mermaid
graph TD
    A[Start: Need New Lesson] --> B{Single or Batch?}
    
    B -->|Single| C[Open Prompt Template]
    B -->|Batch| D[Create lessons.config.json]
    
    C --> E[Fill in Placeholders<br/>TOPIC, DOMAIN, SLUG, AGE]
    D --> F[Run batch-generate-lessons.js]
    
    E --> G[Copy Prompt to Claude.ai]
    F --> H[Get Generated Prompts in<br/>generated-prompts/ folder]
    
    H --> G
    
    G --> I[Claude Generates 3 Files:<br/>page.tsx + en.json + ta.json]
    
    I --> J[Save Files to Correct Locations]
    
    J --> K[Create Directories if Needed:<br/>app/locale/learn/DOMAIN/SLUG/<br/>messages/en/<br/>messages/ta/]
    
    K --> L[Save page.tsx to<br/>app/locale/learn/DOMAIN/SLUG/]
    L --> M[Save en.json to<br/>messages/en/SLUG.json]
    M --> N[Save ta.json to<br/>messages/ta/SLUG.json]
    
    N --> O[Run Registration Script:<br/>node scripts/register-lesson.js<br/>SLUG COUNT DOMAIN]
    
    O --> P{All Files<br/>Verified?}
    
    P -->|No| Q[Fix Missing Files]
    Q --> O
    
    P -->|Yes| R[Script Updates:<br/>✓ i18n.ts<br/>✓ curriculum-data.ts]
    
    R --> S[Build Project:<br/>npm run build]
    
    S --> T{Build<br/>Success?}
    
    T -->|No| U[Check Errors:<br/>- Translation key mismatches<br/>- Import errors<br/>- TypeScript issues]
    U --> V[Fix Issues]
    V --> S
    
    T -->|Yes| W[Start Dev Server:<br/>npm run dev]
    
    W --> X[Test Lesson in Browser:<br/>/en/learn/DOMAIN/SLUG]
    
    X --> Y{Lesson<br/>Works?}
    
    Y -->|No| Z[Debug:<br/>- Check console errors<br/>- Verify translations<br/>- Check SVG rendering]
    Z --> AA[Make Fixes]
    AA --> S
    
    Y -->|Yes| AB[✅ Lesson Complete!<br/>Ready for Next One]
    
    AB --> AC{More<br/>Lessons?}
    AC -->|Yes| A
    AC -->|No| AD[🎉 All Done!]
    
    style A fill:#e1f5ff
    style AB fill:#c8e6c9
    style AD fill:#ffeb3b
    style G fill:#fff9c4
    style O fill:#ffe0b2
    style S fill:#f8bbd0
    style X fill:#d1c4e9
```

## Workflow Steps

### Phase 1: Generation (5 min)
1. Choose single or batch
2. Fill prompt template OR create config
3. Generate prompts (if batch)
4. Paste into Claude.ai
5. Get 3 generated files

### Phase 2: Setup (2 min)
6. Create necessary directories
7. Save page.tsx to lesson folder
8. Save en.json to messages/en/
9. Save ta.json to messages/ta/

### Phase 3: Registration (1 min)
10. Run register-lesson.js script
11. Script verifies all files exist
12. Script updates i18n.ts and curriculum-data.ts

### Phase 4: Testing (2 min)
13. Build project
14. Fix any build errors if needed
15. Start dev server
16. Test lesson in browser
17. Verify functionality

### Total Time: ~10 minutes per lesson

## Quick Commands

```bash
# Single Lesson
cat scripts/example-data-graphs-prompt.txt  # Get prompt
# → Paste to Claude → Save files
node scripts/register-lesson.js data-graphs 5 foundations
npm run build && npm run dev

# Batch Lessons  
node scripts/batch-generate-lessons.js lessons.config.json
# → For each prompt in generated-prompts/: Claude → Save → Register
npm run build && npm run dev
```

## Automation Benefits

- ⏱️ **Time**: 2-3 hours → 10 minutes
- ✅ **Quality**: Consistent structure across all lessons
- 🔄 **Repeatability**: Same workflow every time
- 🛡️ **Safety**: Automated verification of files
- 📚 **Scale**: Can generate 10+ lessons in an hour
