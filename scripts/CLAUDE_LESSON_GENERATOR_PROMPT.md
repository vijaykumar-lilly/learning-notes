# Claude AI Lesson Generator Prompt Template

Use this prompt with Claude (claude.ai or API) to generate new math lessons.

---

## Prompt Template

```
I need you to create a complete mathematics lesson for an open-source education platform.

PROJECT CONTEXT:
- Next.js 16.1.1 with App Router and TypeScript
- Bilingual support: English (en) and Tamil (ta) using next-intl
- Target audience: [AGE_RANGE] (e.g., Ages 5-11 / Grades K-5)
- License: Content under CC BY-SA, Code under Apache-2.0

LESSON DETAILS:
- Topic: [TOPIC_NAME] (e.g., "Measurement", "Basic Data & Graphs")
- Domain: [DOMAIN] (e.g., "foundations", "pre-algebra")
- Slug: [SLUG] (e.g., "measurement", "data-graphs")
- Age-appropriate language for [AGE_RANGE]

REQUIRED OUTPUTS (3 files):

1. **app/[locale]/learn/[DOMAIN]/[SLUG]/page.tsx**
   - Import required components from '@/components/lesson' and '@/components/interactive'
   - Structure: Title → Definition → Topics (with KeyConcepts) → Examples → Exercises → Conclusion
   - Include 2-4 static VisualExplanation components with inline SVG diagrams
   - Each SVG should:
     * Use viewBox for responsiveness
     * Support dark mode with conditional fill classes
     * Be simple, educational, and age-appropriate
     * Include text labels using t() translations
   - Include 3-5 worked examples using Example component
   - Include 5-6 exercises (mix of MultipleChoiceExercise and NumericInputExercise)
   - Use t() function for ALL text content
   - NO 'use client' directive (server component)

2. **messages/en/[SLUG].json**
   - Complete English translations
   - Structure: title, definition, keyConcepts, examples, exercises, visuals, notes, conclusion
   - Include real-world analogies and age-appropriate explanations
   - Memory tricks and helpful tips in notes section
   - All exercise options, hints, and explanations

3. **messages/ta/[SLUG].json**
   - Complete Tamil translations
   - EXACT same JSON structure as English file
   - All keys must match English file exactly
   - Numbers, units, and formulas remain the same

COMPONENT APIs TO USE:

```tsx
// Lesson Components
<Definition term="Title">Content</Definition>
<KeyConcept>Content</KeyConcept>
<Example title="Title">Content with steps</Example>
<StepByStep steps={['Step 1', 'Step 2']} />
<Note>Helpful tip or warning</Note>

// Visual Components
<VisualExplanation title={t('...')} caption={t('...')}>
  <svg viewBox="0 0 400 200">
    {/* SVG content */}
  </svg>
</VisualExplanation>

// Interactive Exercises
<MultipleChoiceExercise
  question={t('exercises.exercise1.question')}
  options={[
    { text: t('exercises.exercise1.option1'), isCorrect: false },
    { text: t('exercises.exercise1.option2'), isCorrect: true },
  ]}
  explanation={t('exercises.exercise1.explanation')}
/>

<NumericInputExercise
  question={t('exercises.exercise2.question')}
  correctAnswer={3000}
  hint={t('exercises.exercise2.hint')}
  explanation={t('exercises.exercise2.explanation')}
/>
```

VISUAL EXPLANATION GUIDELINES:
- 2-4 static diagrams per lesson using VisualExplanation wrapper
- Each SVG should teach ONE concept clearly
- Use simple shapes: circles, rectangles, lines, text
- Color scheme: Use Tailwind color classes (blue-500, green-500, etc.)
- Dark mode: Add conditional classes like `fill-gray-800 dark:fill-gray-200`
- Accessibility: Include text labels and clear contrast
- Examples: measurement tools, geometric shapes, number lines, graphs, diagrams

LESSON STRUCTURE TEMPLATE:
1. Introduction/Definition (what is this topic?)
2. Main Topics (2-4 subtopics with explanations)
   - Each with VisualExplanation showing the concept
   - KeyConcept boxes for important facts/formulas
3. Worked Examples (3-5 examples with step-by-step solutions)
4. Practice Exercises (5-6 exercises, mix of MC and numeric)
5. Notes/Tips (memory tricks, common mistakes)
6. Conclusion (summary and key takeaways)

TRANSLATION FILE STRUCTURE:
```json
{
  "title": "Lesson Title",
  "definition": {
    "intro": { "title": "...", "intro": "...", "details": "..." },
    "topic1": { "title": "...", "explanation": "..." },
    "topic2": { ... }
  },
  "keyConcepts": {
    "concept1": { "title": "...", "items": ["...", "..."] }
  },
  "examples": {
    "example1": { "title": "...", "question": "...", "step1": "...", "answer": "..." }
  },
  "exercises": {
    "exercise1": { "question": "...", "option1": "...", "explanation": "..." }
  },
  "visuals": {
    "visual1": { "title": "...", "caption": "...", "labels": "..." }
  },
  "notes": {
    "tip1": "...", "trick1": "...", "warning1": "..."
  },
  "conclusion": {
    "title": "...", "summary": "...", "takeaway1": "..."
  }
}
```

CONSTRAINTS:
- Server components only (no 'use client')
- All text through t() translations
- Age-appropriate vocabulary for [AGE_RANGE]
- Practical, real-world examples
- Clear, simple SVG diagrams
- 5-6 exercises total (not 35 or 50 - that's placeholder)
- File size: ~400-500 lines for page.tsx, ~130-150 lines per translation file

Please generate all 3 files with complete, production-ready code.
```

---

## After Claude Generates the Files

1. **Save the files** to the correct locations:
   - `app/[locale]/learn/[DOMAIN]/[SLUG]/page.tsx`
   - `messages/en/[SLUG].json`
   - `messages/ta/[SLUG].json`

2. **Run the registration script**:
   ```bash
   node scripts/register-lesson.js [SLUG] [EXERCISE_COUNT]
   ```

3. **Build and test**:
   ```bash
   npm run build
   npm run dev
   ```

---

## Example Usage

For creating "Basic Data & Graphs" lesson:

**Fill in the template:**
- [TOPIC_NAME] = "Basic Data & Graphs"
- [DOMAIN] = "foundations"
- [SLUG] = "data-graphs"
- [AGE_RANGE] = "Ages 5-11 / Grades K-5"

**Run with Claude** → Get 3 files

**Register the lesson:**
```bash
node scripts/register-lesson.js data-graphs 5
```

**Test:**
```bash
npm run build
```

---

## Tips for Better Results

1. **Be specific about age range** - affects complexity and vocabulary
2. **Specify exactly how many topics** you want (usually 3-4)
3. **Mention specific concepts** to cover if you have requirements
4. **Request specific visualizations** if you know what diagrams would help
5. **Ask for iterations** if the first output needs refinement

## Advanced: Batch Generation

To generate multiple lessons, create a lessons.config.json:
```json
[
  {
    "topic": "Basic Data & Graphs",
    "domain": "foundations",
    "slug": "data-graphs",
    "ageRange": "Ages 5-11",
    "exercises": 5
  }
]
```

Then use the batch script:
```bash
node scripts/batch-generate-lessons.js lessons.config.json
```
