# Lesson Creation Guide - Bilingual Implementation

This guide provides step-by-step instructions for creating new bilingual lessons in the Math Learning Platform.

## Prerequisites

- Basic understanding of React and Next.js
- Familiarity with TypeScript
- Knowledge of the next-intl library (for internationalization)

## Translation File Structure

**Important**: We use a **namespace-based structure** to keep translation files manageable:

```
messages/
├── en/
│   ├── common.json           # Navigation, UI buttons (~20 keys)
│   ├── number-sense.json     # Number Sense lesson (~100 keys)
│   ├── arithmetic.json       # Arithmetic lesson (~200 keys)
│   ├── decimals.json         # Decimals lesson
│   ├── fractions.json        # Fractions lesson
│   ├── percentages.json      # Percentages lesson
│   └── integers.json         # Integers lesson
└── ta/
    ├── common.json
    ├── number-sense.json
    ├── arithmetic.json
    └── ... (same structure)
```

**Benefits**:
- ✅ Smaller, manageable files (100-200 lines each)
- ✅ Easier collaboration (less merge conflicts)
- ✅ Better performance (load only needed translations)
- ✅ Clear organization by feature

---

## Interactive Learning Philosophy

Our lessons follow an **active learning approach** with these core principles:

### 🎯 Learning by Doing
- **Immediate practice**: Every concept is followed by interactive exercises
- **Multiple attempts**: Students can try again without penalty
- **Progressive hints**: Help available when needed, encouraging independent problem-solving
- **Detailed solutions**: Step-by-step explanations after completion

### 💡 Engagement Strategies We Use

#### 1. **Interactive Exercises** (Not Just Reading)
Every lesson includes:
- **Multiple Choice Questions**: Quick concept checks with instant feedback
- **Numeric Input Exercises**: Apply calculations and formulas
- **Visual Demonstrations**: See concepts in action
- **Gamified Elements**: Points, progress tracking, success messages

#### 2. **Immediate Feedback Loop**
```
Student answers → Instant feedback → Explanation → Try again or Continue
```
- ✅ **Correct**: Positive reinforcement + detailed explanation
- ❌ **Incorrect**: Helpful hints + option to retry
- 💡 **Hint system**: Progressive help without giving away answers

#### 3. **Visual Learning Aids**
- **Color-coded boxes**: Blue for examples, green for success, yellow for tips
- **KaTeX math rendering**: Beautiful, professional mathematical notation
- **Dark mode support**: Comfortable learning in any environment
- **Structured layouts**: Lists, tables, step-by-step breakdowns

#### 4. **Scaffolded Learning**
- Start with simple, concrete examples
- Build complexity gradually
- Connect to real-world applications
- Review and synthesize at the end

#### 5. **Accessibility & Inclusivity**
- **Bilingual support**: Learn in your preferred language (English/Tamil)
- **Responsive design**: Works on mobile, tablet, desktop
- **Clear typography**: Easy-to-read fonts and spacing
- **Progressive disclosure**: Information revealed when needed

---

## Interactive Components Available

### 1. **MultipleChoiceExercise**
```tsx
<MultipleChoiceExercise
  question={t('exercise.question')}
  choices={[
    { id: 'a', text: '20', isCorrect: false },
    { id: 'b', text: '25', isCorrect: true },
    { id: 'c', text: '30', isCorrect: false }
  ]}
  explanation={t('exercise.explanation')}
  hint={t('exercise.hint')}
/>
```
**When to use**:
- Concept understanding checks
- Identifying correct patterns or rules
- Comparing multiple approaches
- Quick knowledge verification

**Engagement features**:
- ✨ Click to select answer
- 🎯 Instant right/wrong feedback
- 💭 Optional hint button
- 📖 Detailed explanation on submit
- 🔄 Retry with different wrong answer

### 2. **NumericInputExercise**
```tsx
<NumericInputExercise
  question={t('exercise.question')}
  correctAnswer={42}
  hint={t('exercise.hint')}
  solution={
    <div>
      <p>{t('exercise.solution1')}</p>
      <p className="mt-2">{t('exercise.solution2')}</p>
    </div>
  }
/>
```
**When to use**:
- Calculation practice
- Applying formulas
- Finding specific values
- Problem-solving exercises

**Engagement features**:
- ⌨️ Type numeric answer
- ✅ Automatic validation
- 💡 Progressive hints
- 📝 Full worked solution
- 🎨 Visual feedback on correctness

### 3. **Definition Component**
```tsx
<Definition term={t('concept.term')} example={<div>...</div>}>
  <p>{t('concept.description')}</p>
</Definition>
```
**When to use**:
- Introducing new terms
- Explaining key concepts
- Providing formal definitions
- Showing examples in context

**Engagement features**:
- 📌 Highlighted term
- 🎨 Visual separation from body text
- 📋 Optional example section
- 🌈 Colored background boxes

### 4. **KeyConcept Component**
```tsx
<KeyConcept title={t('concept.title')}>
  {t('concept.description')}
</KeyConcept>
```
**When to use**:
- Highlighting important ideas
- Summarizing rules or patterns
- Emphasizing critical information

**Engagement features**:
- 🎯 Visual emphasis (colored border/background)
- 💡 Icon to draw attention
- 📐 Distinct styling from regular text

### 5. **Example with StepByStep**
```tsx
<Example
  problem={t('example.problem')}
  solution={
    <StepByStep
      steps={[
        { title: t('step1.title'), content: <>{t('step1.content')}</> },
        { title: t('step2.title'), content: <>{t('step2.content')}</> }
      ]}
    />
  }
  hint={t('example.hint')}
/>
```
**When to use**:
- Demonstrating problem-solving process
- Teaching methodology
- Complex calculations
- Multi-step procedures

**Engagement features**:
- 📝 Numbered steps
- 🔍 Clear progression
- 💭 Optional hint before revealing solution
- 🎨 Visual step separation

### 6. **Note Component**
```tsx
<Note type="tip">
  {t('note.tip')}
</Note>

<Note type="warning">
  {t('note.warning')}
</Note>

<Note type="success">
  {t('note.success')}
</Note>
```
**When to use**:
- Tips and tricks
- Common mistakes to avoid
- Success/congratulations messages
- Important warnings or caveats

**Engagement features**:
- 🎨 Color-coded by type (blue/yellow/green)
- 🔔 Icon for visual attention
- 📌 Stands out from main content

### 7. **MathRenderer**
```tsx
<MathRenderer math="E = mc^2" />
<MathRenderer math="\int_{a}^{b} f(x)dx" display={true} />
```
**When to use**:
- Mathematical equations
- Formulas
- Mathematical symbols
- Complex expressions

**Engagement features**:
- 🎓 Professional typesetting (KaTeX)
- 📱 Responsive sizing
- 🌙 Dark mode compatible
- ✨ Beautiful rendering

---

## Engagement Best Practices

### 1. **Variety is Key**
Mix different exercise types:
- 40% Multiple choice (quick checks)
- 30% Numeric input (application)
- 20% Worked examples (modeling)
- 10% Visual demonstrations

### 2. **Immediate Interactivity**
- ❌ **DON'T**: Long text blocks without interaction
- ✅ **DO**: Introduce concept → Practice immediately
- Rule of thumb: No more than 2-3 paragraphs before an interactive element

### 3. **Progressive Difficulty**
```
Easy → Medium → Hard → Challenge
```
- First exercise: Apply concept directly
- Second exercise: Slight variation
- Third exercise: Multiple steps
- Final exercise: Synthesis/application

### 4. **Feedback Quality**
**Poor feedback**: "Wrong. The answer is 25."
**Good feedback**: "Not quite. Remember, we multiply the base by the height. Try 5 × 5 = ?"

### 5. **Hint Strategy**
- **Level 1 Hint**: Remind of the concept/formula
- **Level 2 Hint**: Break down the problem
- **Level 3 Hint**: Show partial work
- **Solution**: Complete step-by-step explanation

---

## Lesson Structure Overview

Each lesson consists of:
1. **Lesson Component** (`app/[locale]/learn/[domain]/[topic]/page.tsx`)
2. **English Translations** (`messages/en.json`)
3. **Tamil Translations** (`messages/ta.json`)

---

## Recommended Lesson Content Structure

Follow this pedagogical structure for consistent, effective learning:

### 1. **Title** (Required)
```tsx
<h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>
```
- Clear, descriptive lesson title
- Use heading level 1 for main title

### 2. **Introduction / Main Definition** (Required)
```tsx
<Definition term={t('mainConcept.term')}>
  <p>{t.rich('mainConcept.definition', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
  {/* Optional: Add examples box */}
  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
    <p className="font-semibold mb-2">{t('mainConcept.examplesLabel')}</p>
    <p>{t('mainConcept.example1')}</p>
    <p>{t('mainConcept.example2')}</p>
  </div>
</Definition>
```
**Purpose**: 
- Introduce the main topic
- Define key terms
- Provide real-world context
- Show 2-3 simple examples

### 3. **Key Concepts** (1-3 concepts)
```tsx
<KeyConcept title={t('concept1.title')}>
  {t('concept1.description')}
</KeyConcept>
```
**Purpose**:
- Break down the topic into digestible parts
- Explain patterns and rules
- Build foundational understanding

### 4. **Interactive Exercise (After Each Concept)**
```tsx
<MultipleChoiceExercise
  question={t('exercise1.question')}
  choices={[...]}
  explanation={t('exercise1.explanation')}
  hint={t('exercise1.hint')}
/>
```
**Purpose**:
- Immediate practice after learning
- Reinforce understanding
- Build confidence before moving forward

### 5. **Detailed Definition with Visual/Structured Content**
```tsx
<Definition term={t('detailedConcept.term')}>
  <p>{t('detailedConcept.definition')}</p>
  <div className="mt-4">
    {/* Use lists, tables, or structured content */}
    <ul className="list-disc list-inside space-y-1">
      <li>{t('detailedConcept.point1')}</li>
      <li>{t('detailedConcept.point2')}</li>
      <li>{t('detailedConcept.point3')}</li>
    </ul>
  </div>
</Definition>
```
**Purpose**:
- Deep dive into specific aspects
- Show relationships and patterns
- Use visual organization (lists, tables)

### 6. **Worked Example**
```tsx
<Example
  problem={t('example1.problem')}
  solution={
    <StepByStep
      steps={[
        { title: t('example1.step1.title'), content: <>{t('example1.step1.content')}</> },
        { title: t('example1.step2.title'), content: <>{t('example1.step2.content')}</> },
        { title: t('example1.step3.title'), content: <>{t('example1.step3.content')}</> }
      ]}
    />
  }
  hint={t('example1.hint')}
/>
```
**Purpose**:
- Demonstrate problem-solving process
- Show step-by-step methodology
- Model correct thinking patterns

### 7. **Practice Exercise (Numeric Input)**
```tsx
<NumericInputExercise
  question={t('practice1.question')}
  correctAnswer={42}
  hint={t('practice1.hint')}
  solution={<div>...</div>}
/>
```
**Purpose**:
- Apply learned concepts
- Check numerical understanding
- Provide detailed solutions

### 8. **Additional Concepts** (Optional)
Repeat the pattern:
- Definition/Explanation
- Example (if needed)
- Exercise

### 9. **Advanced/Related Concepts** (Optional)
```tsx
<Definition term={t('advanced.term')} example={...}>
  <p>{t('advanced.description')}</p>
  <Note type="tip">
    {t('advanced.tip')}
  </Note>
</Definition>
```
**Purpose**:
- Connect to related topics
- Introduce advanced applications
- Prepare for future lessons

### 10. **Final Exercises** (2-3 exercises)
Mix of multiple choice and numeric input to test full understanding

### 11. **Conclusion** (Required)
```tsx
<Note type="success">
  <p className="font-semibold">{t('conclusion.title')}</p>
  <p className="mt-1">{t('conclusion.message')}</p>
</Note>
```
**Purpose**:
- Summarize key learnings
- Motivate continued practice
- Build confidence

### 12. **Lesson Navigation** (Required)
```tsx
<LessonNavigation navigation={navigation} />
```
**Purpose**:
- Link to previous/next lessons
- Improve navigation flow

---

## Content Flow Example

Here's a complete lesson structure example:

```tsx
export default function YourLesson() {
  const t = useTranslations('lessons.yourLesson')
  const navigation = getLessonNavigation('domain', 'topic')
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 1. TITLE */}
      <h1>{t('title')}</h1>

      {/* 2. INTRODUCTION */}
      <Definition term={t('intro.term')}>
        <p>{t('intro.definition')}</p>
        <div className="examples-box">
          <p>{t('intro.example1')}</p>
          <p>{t('intro.example2')}</p>
        </div>
      </Definition>

      {/* 3. CONCEPT 1 */}
      <KeyConcept title={t('concept1.title')}>
        {t('concept1.description')}
      </KeyConcept>

      {/* 4. EXERCISE 1 */}
      <MultipleChoiceExercise {...} />

      {/* 5. CONCEPT 2 WITH DETAILS */}
      <Definition term={t('concept2.term')}>
        <p>{t('concept2.definition')}</p>
        <ul>
          <li>{t('concept2.point1')}</li>
          <li>{t('concept2.point2')}</li>
        </ul>
      </Definition>

      {/* 6. WORKED EXAMPLE */}
      <Example problem={...} solution={<StepByStep steps={...} />} />

      {/* 7. PRACTICE EXERCISE */}
      <NumericInputExercise {...} />

      {/* 8. CONCEPT 3 (if applicable) */}
      <Definition term={t('concept3.term')}>
        <p>{t('concept3.description')}</p>
        <Note type="tip">{t('concept3.tip')}</Note>
      </Definition>

      {/* 9. EXERCISE 2 */}
      <MultipleChoiceExercise {...} />

      {/* 10. FINAL EXERCISE */}
      <NumericInputExercise {...} />

      {/* 11. CONCLUSION */}
      <Note type="success">
        <p className="font-semibold">{t('conclusion.title')}</p>
        <p>{t('conclusion.message')}</p>
      </Note>

      {/* 12. NAVIGATION */}
      <LessonNavigation navigation={navigation} />
    </div>
  )
}
```

---

## Content Guidelines

### Pacing
- **Short lessons**: 3-5 main concepts with 4-6 exercises (15-20 minutes)
- **Medium lessons**: 5-7 concepts with 6-10 exercises (25-35 minutes)
- **Long lessons**: 7-10 concepts with 10-15 exercises (40-50 minutes)

### Exercise Placement
- ✅ **DO**: Place exercise immediately after introducing a concept
- ❌ **DON'T**: Group all exercises at the end
- ✅ **DO**: Mix multiple choice and numeric input
- ❌ **DON'T**: Use only one exercise type

### Difficulty Progression
1. Start with simple, concrete examples
2. Build to abstract understanding
3. End with application and synthesis
4. Each exercise should be slightly more challenging than the previous

### Visual Elements
- Use colored boxes for examples: `bg-blue-50 dark:bg-blue-900/20`
- Use lists for structured information
- Use tables for comparisons (when needed)
- Use `Note` components for tips, warnings, success messages

### Language Tone
- **English**: Clear, friendly, encouraging
- **Tamil**: Formal educational tone, respectful
- **Both**: Age-appropriate vocabulary
- **Both**: Positive, motivating language

---

## Step 1: Create the Lesson Component

### File Location
```
app/[locale]/learn/[domain]/[topic]/page.tsx
```

### Template Structure

```tsx
'use client'

import { useTranslations } from 'next-intl'
import MathRenderer from '@/components/math/MathRenderer'
import { 
  Definition, 
  Example, 
  KeyConcept, 
  Note, 
  StepByStep
} from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'

export default function YourLessonName() {
  // Use namespace directly (not 'lessons.xxx')
  const t = useTranslations('your-lesson-namespace')
  const navigation = getLessonNavigation('domain-slug', 'topic-slug')
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* Lesson content here */}

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
```

### Key Points

1. **Always use `'use client'`** directive at the top
2. **Import `useTranslations`** from 'next-intl'
3. **Use namespace directly**: `useTranslations('arithmetic')` NOT `'lessons.arithmetic'`
4. **Use `t()` for simple text**: `{t('title')}`
5. **Use `t.rich()` for HTML formatting**: See examples below

---

## Step 2: Handling HTML Content with `t.rich()`

### Simple Text (No HTML)
```tsx
<p>{t('description')}</p>
```

### Text with `<strong>` Tags
```tsx
<p>
  {t.rich('definition', {
    strong: (chunks) => <strong>{chunks}</strong>
  })}
</p>
```

### Multiple HTML Elements
```tsx
<div>
  {t.rich('content', {
    strong: (chunks) => <strong>{chunks}</strong>,
    em: (chunks) => <em>{chunks}</em>,
    code: (chunks) => <code>{chunks}</code>
  })}
</div>
```

### In List Items
```tsx
<li>{t.rich('placeValue.hundreds', { strong: (chunks) => <strong>{chunks}</strong> })}</li>
```

### In Component Props
```tsx
<Example
  solution={
    <StepByStep
      steps={[
        {
          title: t('step1.title'),
          content: <>{t.rich('step1.content', { strong: (chunks) => <strong>{chunks}</strong> })}</>
        }
      ]}
    />
  }
/>
```

---

## Step 3: Create Translation Files

### 3.1: Create English Translation File

**File**: `messages/en/your-lesson-namespace.json`

Example: `messages/en/arithmetic.json`

```json
{
  "title": "Your Lesson Title",
  
  "concept1": {
    "term": "Concept Term",
    "definition": "A <strong>concept</strong> is defined here with HTML tags.",
    "examplesLabel": "Examples:",
    "example1": "First example text",
    "example2": "Second example text"
  },
  
  "exercise1": {
    "question": "What is the answer?",
    "hint": "Think about the pattern...",
    "explanation": "The answer is X because...",
    "solution1": "Step 1 with <strong>emphasis</strong>",
    "solution2": "Step 2 plain text"
  },
  
  "conclusion": {
    "title": "Great job!",
    "message": "You've learned about..."
  }
}
```

### 3.2: Create Tamil Translation File

**File**: `messages/ta/your-lesson-namespace.json`

Mirror the exact same structure as English:

```json
{
  "title": "உங்கள் பாடத் தலைப்பு",
  
  "concept1": {
    "term": "கருத்து சொல்",
    "definition": "<strong>கருத்து</strong> இங்கே வரையறுக்கப்பட்டுள்ளது HTML குறிச்சொற்களுடன்.",
    "examplesLabel": "எடுத்துக்காட்டுகள்:",
    "example1": "முதல் எடுத்துக்காட்டு உரை",
    "example2": "இரண்டாவது எடுத்துக்காட்டு உரை"
  },
  
  "exercise1": {
    "question": "பதில் என்ன?",
    "hint": "முறையைப் பற்றி சிந்தியுங்கள்...",
    "explanation": "பதில் X ஏனெனில்...",
    "solution1": "படி 1 <strong>முக்கியத்துவத்துடன்</strong>",
    "solution2": "படி 2 வெற்று உரை"
  },
  
  "conclusion": {
    "title": "சிறப்பாக செய்தீர்கள்!",
    "message": "நீங்கள் கற்றுக்கொண்டீர்கள்..."
  }
}
```

### 3.3: Register in i18n.ts

Add your new lesson namespace to `i18n.ts`:

```typescript
return {
  locale,
  messages: {
    common: (await import(`./messages/${locale}/common.json`)).default,
    'number-sense': (await import(`./messages/${locale}/number-sense.json`)).default,
    arithmetic: (await import(`./messages/${locale}/arithmetic.json`)).default,
    'your-lesson': (await import(`./messages/${locale}/your-lesson.json`)).default, // Add this
  }
};
```

### Translation Best Practices

1. **Organize by sections**: Group related translations together
2. **Use descriptive keys**: `placeValue.exercise.hint` instead of `hint1`
3. **Keep HTML minimal**: Only use `<strong>`, `<em>`, avoid complex nested HTML
4. **Consistent naming**: 
   - `term` for definition labels
   - `question` for exercise questions
   - `hint` for hints
   - `explanation` for explanations
   - `solution1`, `solution2`, etc. for multi-step solutions
5. **Tamil guidelines**:
   - Match English structure exactly (same keys, same nesting)
   - Preserve HTML tags in same positions
   - Math notation stays universal (numbers, symbols)
   - Use proper Tamil script (UTF-8 encoding)
   - Professional educational tone

---

## Step 5: Using Lesson Components

### Definition Component
```tsx
<Definition term={t('concept.term')}>
  <p>
    {t.rich('concept.definition', {
      strong: (chunks) => <strong>{chunks}</strong>
    })}
  </p>
</Definition>
```

### Definition with Example
```tsx
<Definition 
  term={t('concept.term')} 
  example={
    <div>
      <p>{t('concept.example1')}</p>
      <p>{t('concept.example2')}</p>
    </div>
  }
>
  <p>{t('concept.description')}</p>
</Definition>
```

### Key Concept
```tsx
<KeyConcept title={t('keyConcept.title')}>
  {t('keyConcept.description')}
</KeyConcept>
```

### Example with Step-by-Step Solution
```tsx
<Example
  problem={t('example.problem')}
  solution={
    <StepByStep
      steps={[
        {
          title: t('example.step1.title'),
          content: <>{t.rich('example.step1.content', { strong: (chunks) => <strong>{chunks}</strong> })}</>
        },
        {
          title: t('example.step2.title'),
          content: <>{t.rich('example.step2.content', { strong: (chunks) => <strong>{chunks}</strong> })}</>
        }
      ]}
    />
  }
  hint={t('example.hint')}
/>
```

### Multiple Choice Exercise
```tsx
<MultipleChoiceExercise
  question={t('exercise1.question')}
  choices={[
    { id: 'a', text: '20', isCorrect: false },
    { id: 'b', text: '25', isCorrect: true },
    { id: 'c', text: '30', isCorrect: false }
  ]}
  explanation={t('exercise1.explanation')}
  hint={t('exercise1.hint')}
/>
```

### Numeric Input Exercise
```tsx
<NumericInputExercise
  question={t('exercise2.question')}
  correctAnswer={42}
  hint={t('exercise2.hint')}
  solution={
    <div>
      <p>{t.rich('exercise2.solution1', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
      <p className="mt-2">{t('exercise2.solution2')}</p>
    </div>
  }
/>
```

### Note Component
```tsx
<Note type="tip">
  {t('note.tip')}
</Note>

<Note type="warning">
  {t('note.warning')}
</Note>

<Note type="success">
  <p className="font-semibold">{t('conclusion.title')}</p>
  <p className="mt-1">{t('conclusion.message')}</p>
</Note>
```

---

## Step 6: Math Rendering

### Inline Math
```tsx
<p>The formula is <MathRenderer math="E = mc^2" /></p>
```

### Display Math (Block)
```tsx
<MathRenderer 
  math="\\int_{a}^{b} f(x)dx = F(b) - F(a)" 
  display={true} 
/>
```

### Math Symbols in Text
```tsx
<p><MathRenderer math="<" /> {t('symbols.lessThan')}</p>
<p><MathRenderer math=">" /> {t('symbols.greaterThan')}</p>
<p><MathRenderer math="=" /> {t('symbols.equals')}</p>
```

**Important**: Math notation is **NOT translated**. It remains universal across all languages.

---

## Step 7: Testing Your Lesson

### 1. Verify Routes Work
- English: `http://localhost:3000/en/learn/[domain]/[topic]`
- Tamil: `http://localhost:3000/ta/learn/[domain]/[topic]`

### 2. Check Language Switching
- Click the language switcher in the header
- Verify all content updates correctly
- Ensure no English text appears in Tamil mode and vice versa

### 3. Validate Translations
- Check for missing translation keys (console errors)
- Verify HTML formatting displays correctly
- Test all interactive exercises work in both languages

### 4. Review Accessibility
- All text should be readable
- Tamil font displays properly (system fonts)
- Screen readers can access content

---

## Common Translation Keys Reference

### Standard Keys for All Lessons

```json
{
  "title": "Lesson Title",
  "subtitle": "Lesson Subtitle (optional)",
  
  "definition": {
    "term": "Term Name",
    "definition": "Definition text with <strong>emphasis</strong>",
    "examplesLabel": "Examples:",
    "example1": "...",
    "example2": "..."
  },
  
  "exercise": {
    "question": "Question text?",
    "hint": "Hint text",
    "explanation": "Explanation text",
    "solution1": "First solution step",
    "solution2": "Second solution step"
  },
  
  "conclusion": {
    "title": "Great job!",
    "message": "Summary of what was learned"
  }
}
```

---

## Example: Complete Lesson Implementation

See the reference implementation:
- **File**: `app/[locale]/learn/foundations/number-sense/page.tsx`
- **English**: `messages/en.json` → `lessons.numberSense`
- **Tamil**: `messages/ta.json` → `lessons.numberSense`

This demonstrates:
- ✅ Proper use of `useTranslations`
- ✅ `t.rich()` for HTML content
- ✅ All interactive components
- ✅ Math rendering
- ✅ Full English/Tamil translations

---

## Troubleshooting

### Error: "FORMATTING_ERROR: The intl string context variable 'strong' was not provided"

**Problem**: Using `t()` instead of `t.rich()` for HTML content

**Solution**: Replace `t('key')` with `t.rich('key', { strong: (chunks) => <strong>{chunks}</strong> })`

### Error: Translation key not found

**Problem**: Missing translation in `en.json` or `ta.json`

**Solution**: 
1. Check spelling of translation key
2. Verify JSON structure matches exactly
3. Ensure both `en.json` and `ta.json` have the same keys

### Sidebar not highlighting current lesson

**Problem**: Fixed! The sidebar now uses `pathname.endsWith()` to match locale-prefixed routes

### Hydration errors

**Problem**: Mismatch between server and client rendering

**Solution**:
- Use `t.rich()` consistently
- Don't use `dangerouslySetInnerHTML`
- Ensure root layout has proper HTML structure

---

## Lesson Creation Checklist

- [ ] Create lesson component file in correct domain/topic folder
- [ ] Add `'use client'` directive
- [ ] Import and use `useTranslations` hook
- [ ] Implement lesson content using translation keys
- [ ] Use `t.rich()` for any HTML formatting
- [ ] Add English translations to `messages/en.json`
- [ ] Add Tamil translations to `messages/ta.json`
- [ ] Test both `/en/` and `/ta/` routes
- [ ] Verify language switcher works
- [ ] Check exercises function correctly
- [ ] Review math rendering displays properly
- [ ] Test on mobile and desktop
- [ ] Verify sidebar highlights active lesson

---

## Resources

- **Next.js i18n**: https://next-intl-docs.vercel.app/
- **KaTeX Math**: https://katex.org/
- **Tailwind CSS**: https://tailwindcss.com/
- **React Components**: See `components/lesson/` for available components

---

## Getting Help

If you encounter issues:
1. Check the reference implementation (Number Sense lesson)
2. Review console errors for specific translation key issues
3. Verify JSON syntax in translation files
4. Test incrementally - add translations section by section

---

**Last Updated**: January 9, 2026
**Platform Version**: Next.js 16.1.1 with next-intl
