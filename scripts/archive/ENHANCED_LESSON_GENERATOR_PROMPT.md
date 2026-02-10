# Enhanced Claude AI Lesson Generator Prompt Template

Use this prompt with Claude (claude.ai or API) to generate **ENHANCED** math lessons with all new features.

---

## REFERENCE FILES

**Before using this prompt, review the template lessons:**
- `/app/[locale]/learn/pre-algebra/expressions/page.tsx` (Template #1)
- `/app/[locale]/learn/pre-algebra/functions-intro/page.tsx` (Template #2)

These show the EXACT structure and quality expected.

---

## Enhanced Prompt Template

```
I need you to create a COMPLETE, ENHANCED mathematics lesson following our gold-standard template.

PROJECT CONTEXT:
- Next.js 16.1.1 with App Router and TypeScript  
- Bilingual support: English (en) and Tamil (ta) using next-intl
- Target audience: [AGE_RANGE]
- Enhanced lesson structure with new components

LESSON DETAILS:
- Topic: [TOPIC_NAME]
- Domain: [DOMAIN]
- Slug: [SLUG]
- Prerequisites: [LIST 2-3 PREREQUISITE TOPICS]

REQUIRED STRUCTURE (Follow Template Lessons EXACTLY):

1. 'use client' directive at top

2. BeforeYouStart section (2-3 prerequisites)

3. Engaging introduction with Definition component
   - Start with discovery hook: "Let's discover..." or "Imagine..."
   - Use active voice
   - Include real-world analogy

4. 3-4 Visual Explanations (ALL zoomable: zoomable={true})
   - Each with title and caption
   - Inline SVG diagrams
   - Dark mode support

5. 3 Worked Examples using Example component
   - Progressive difficulty
   - StepByStep solutions
   - Answer boxes

6. Common Mistakes section (3 mistakes, CRITICAL!)
   - Use CommonMistake component
   - Side-by-side wrong vs correct
   - Include wrongMath and correctMath
   - Explanation for each
   - Optional tips

7. Exercises with difficulty levels (6 total):
   - 🌤️ Warm-up: 2 easy exercises
   - 💪 Practice: 3 medium exercises
   - 🚀 Challenge: 1 hard exercise
   - Use difficulty prop: difficulty="easy|medium|hard"
   - Group with h3 headers for each level

8. Real-world applications

9. Conclusion with key takeaways

10. What's Next section (2 topic previews)
    - Motivational text
    - Links to related topics

COMPONENT APIS TO USE:

```typescript
// NEW Components
<BeforeYouStart prerequisites={[
  { title: t('prerequisites.skill1.title'), description: t('...') }
]} />

<CommonMistake
  title={t('commonMistakes.mistake1.title')}
  wrongApproach={<p>{t('...')}</p>}
  wrongMath="x + x = x^2"  // LaTeX math
  correctApproach={<p>{t('...')}</p>}
  correctMath="x + x = 2x"  // LaTeX math
  explanation={<p>{t('...')}</p>}
  tip={<p>{t('...')}</p>}  // Optional
/>

<WhatsNext
  motivationalText={<p>{t('...')}</p>}
  topics={[
    { title: t('...'), description: t('...'), link: '/en/learn/...' }
  ]}
/>

// ENHANCED Components
<VisualExplanation 
  title={t('...')}
  caption={t('...')}
  zoomable={true}  // ALWAYS true!
>
  <svg>...</svg>
</VisualExplanation>

<MultipleChoiceExercise
  difficulty="easy"  // or "medium" or "hard"
  question={t('...')}
  choices={[...]}
  explanation={t('...')}
/>

<NumericInputExercise
  difficulty="medium"  // or "easy" or "hard"
  question={t('...')}
  correctAnswer={42}
  hint={t('...')}
  solution={<p>{t('...')}</p>}
/>

// Existing Components (same as before)
<Definition term={t('...')}>...</Definition>
<KeyConcept>...</KeyConcept>
<Example title={t('...')} problem={...} solution={...} />
<StepByStep steps={[...]} />
<Note type="tip">...</Note>
```

JSON STRUCTURE REQUIREMENTS:

All 3 files must have these top-level keys:
- prerequisites (with skill1, skill2, skill3)
- definition
- sections
- visuals
- examples (with title key)
- commonMistakes (with mistake1, mistake2, mistake3)
- exercises (with warmup, practice, challenge sections)
- notes
- realWorld (with intro key)
- whatsNext (with motivation and topic1, topic2)
- conclusion (with keyTakeawaysTitle)

LANGUAGE TONE:
- Active voice ("Let's discover..." not "We will learn...")
- Engaging hooks (questions, scenarios, "imagine...")
- Age-appropriate analogies
- Conversational but educational
- Motivational and encouraging

CRITICAL CHECKLIST:
✓ 'use client' directive
✓ Import all new components
✓ 2-3 prerequisites
✓ Engaging introduction
✓ 3-4 zoomable visuals
✓ 3 worked examples
✓ 3 common mistakes (with math)
✓ 6 exercises (2 easy, 3 medium, 1 hard)
✓ Difficulty badges on exercises
✓ Grouped exercises by level
✓ What's Next with 2 topics
✓ Enhanced motivational language
✓ Exact JSON structure match (EN = TA keys)

Please generate all 3 complete files now.
```

---

## EXAMPLE: Generate Quadratic Equations

**Fill in the template:**

```
Topic: Quadratic Equations
Domain: algebra-1
Slug: quadratics
Age Range: Ages 13-15 / Grade 9
Prerequisites: Polynomial operations, Factoring basics, Solving linear equations

[Use the template above with these values]
```

**Result:** Complete lesson with all enhancements in ~2 minutes!

---

## BATCH AUTOMATION

See example batch config files included in project!
