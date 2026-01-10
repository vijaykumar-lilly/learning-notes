# ⚡ Quick Start: Create New Lesson in 60 Minutes

**Based on analysis of all 5 foundation lessons** - Updated after comprehensive code review

---

## ✅ ALL LESSONS NOW FOLLOW BEST PRACTICES

### ✅ **All Lessons Use Server Components**

**Status:**
- ✅ [fractions/page.tsx](../app/[locale]/learn/foundations/fractions/page.tsx) - Server component
- ✅ [decimals/page.tsx](../app/[locale]/learn/foundations/decimals/page.tsx) - Server component
- ✅ [percentages/page.tsx](../app/[locale]/learn/foundations/percentages/page.tsx) - Server component
- ✅ [number-sense/page.tsx](../app/[locale]/learn/foundations/number-sense/page.tsx) - Server component (FIXED ✅)
- ✅ [arithmetic/page.tsx](../app/[locale]/learn/foundations/arithmetic/page.tsx) - Server component (FIXED ✅)

**Benefits:** All lessons now have optimal performance, smaller bundle size, and better SEO

---

## 📊 LESSON STATISTICS (From Real Data)

| Lesson | Lines | Translation Keys | Server Component | Status |
|--------|-------|-----------------|------------------|--------|
| Fractions | 356 | 157 (9 sections) | ✅ Yes | Perfect |
| Number Sense | 370 | ~100 (9 sections) | ✅ Yes | Perfect |
| Arithmetic | 373 | ~200 (7 sections) | ✅ Yes | Perfect |
| Decimals | 470 | ~250 (10 sections) | ✅ Yes | Perfect |
| Percentages | 577 | 290 (8 sections) | ✅ Yes | Perfect |

**Lesson Complexity Range:** 356-577 lines (avg 429 lines)  
**Target for new lessons:** 350-450 lines

---

## ✅ WHAT ALL LESSONS DO RIGHT

1. ✅ All use `useTranslations('namespace')` pattern
2. ✅ All use `t.rich()` for HTML formatting
3. ✅ All have complete EN and TA translations
4. ✅ All use same core components: Definition, Example, KeyConcept, Note, StepByStep
5. ✅ All use NumericInputExercise and MultipleChoiceExercise
6. ✅ All have MathRenderer for KaTeX
7. ✅ All have LessonNavigation
8. ✅ Build passes with zero errors

---

## 🎯 STANDARDIZED TRANSLATION STRUCTURE

### ❌ **Current Problem:** Inconsistent JSON structures

Each lesson uses different top-level keys:
- **arithmetic:** 7 sections (operation-based: addition, subtraction, etc.)
- **number-sense:** 9 sections (topic-based: counting, placeValue, etc.)
- **fractions/decimals/percentages:** 8-10 sections (mixed structure)

### ✅ **Recommended Standard Structure**

Use this for ALL future lessons:

```json
{
  "title": "Lesson Title",
  
  "definition": {
    "mainConcept": { /* ... */ }
  },
  
  "keyConcepts": {
    "concept1": { /* ... */ },
    "concept2": { /* ... */ }
  },
  
  "examples": {
    "example1": { /* ... */ },
    "example2": { /* ... */ }
  },
  
  "exercises": {
    "exercise1": { /* ... */ },
    "exercise2": { /* ... */ }
  },
  
  "notes": {
    "tip1": "...",
    "warning1": "..."
  },
  
  "conclusion": {
    "title": "Summary",
    "summary": "...",
    "keyTakeawaysTitle": "Key Takeaways:",
    "takeaway1": "...",
    "takeaway2": "...",
    "takeaway3": "..."
  }
}
```

**Why this structure?**
- Matches fractions/decimals/percentages (our 3 perfect examples)
- Clear progression: definition → concepts → examples → exercises
- Easy to extend with more examples/exercises
- Predictable for AI/automation

---

## 🚀 FASTEST WORKFLOW (Proven Method)

### Step 1: Copy Best Template (5 mins)
```bash
# Copy fractions lesson (cleanest structure, 356 lines)
cp -r app/[locale]/learn/foundations/fractions app/[locale]/learn/foundations/your-lesson
```

### Step 2: Rename & Update (10 mins)
1. Rename function: `FractionsBasicsLesson` → `YourLessonName`
2. Update namespace: `useTranslations('fractions')` → `useTranslations('your-lesson')`
3. Update navigation: `getLessonNavigation('foundations', 'fractions')` → your lesson

### Step 3: Write Content (20 mins)
- Replace definitions, examples, exercises with your content
- Keep structure (Definition → KeyConcept → Example → Exercise)
- Don't worry about translations yet

### Step 4: Extract Translation Keys (5 mins)
```bash
# Get all t() calls
grep -oE "t\.[a-z]*\('[^']+'" app/[locale]/learn/foundations/your-lesson/page.tsx | sort | uniq > keys.txt
```

### Step 5: Create EN JSON (15 mins)
```bash
# Copy fractions.json as template
cp messages/en/fractions.json messages/en/your-lesson.json
```
- Replace all values with your English content
- Keep same structure (definition, keyConcepts, examples, exercises, notes, conclusion)

### Step 6: Build & Validate (5 mins)
```bash
npm run build
```
- ✅ Zero errors = All keys present
- ❌ MISSING_MESSAGE = Add missing keys
- ❌ FORMATTING_ERROR = Use t.rich() not t()

### Step 7: Update Sidebar Navigation (2 mins)
**File:** `lib/curriculum-data.ts`

Add your lesson to the appropriate domain:
```typescript
{ id: '1.6', title: 'Your Lesson Title', slug: 'your-lesson-slug', exerciseCount: 6 }
```
**Critical:** The `slug` must exactly match your folder name!

### Step 8: Create TA JSON (10 mins)
```bash
# Copy EN structure
cp messages/en/your-lesson.json messages/ta/your-lesson.json
```
- Translate all values to Tamil (use ChatGPT/Claude)
- Keep keys identical

### Step 9: Final Test (5 mins)
- Language switching (EN ↔ TA)
- All exercises work
- **Sidebar shows lesson** ✅
- Sidebar clickable
- Text selectable

**Total Time: ~77 minutes**

---

## 📋 COMPONENT IMPORT CHECKLIST

### ✅ Always Import (Every Lesson):
```tsx
import MathRenderer from '@/components/math/MathRenderer'
import { Definition, Example, KeyConcept, Note, StepByStep } from '@/components/lesson'
import { NumericInputExercise, MultipleChoiceExercise } from '@/components/interactive'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'
```

### 📦 Optional Imports (Lesson-Specific):
```tsx
// Only if you need theorems
import { Theorem } from '@/components/lesson'

// Only if you need bilingual terms inline
import { Term } from '@/components/bilingual/Term'
import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel'

// Lesson-specific visualizers
import FractionVisualizer from '@/components/visualizations/FractionVisualizer'
import DecimalVisualizer from '@/components/visualizations/DecimalVisualizer'
import PercentageVisualizer from '@/components/visualizations/PercentageVisualizer'

// Lesson-specific interactive sliders
import InteractiveFractionSlider from '@/components/interactive/InteractiveFractionSlider'
import InteractiveDecimalSlider from '@/components/interactive/InteractiveDecimalSlider'
import InteractivePercentageSlider from '@/components/interactive/InteractivePercentageSlider'

// Static visual explanation components
import { VisualExplanation, RatioDiagram, ProportionDiagram, UnitRateDiagram } from '@/components/lesson'
```

---

## 🎨 VISUAL COMPONENTS GUIDE

### **CRITICAL DISTINCTION:**

#### 📊 **Static Visual Explanations** (for teaching concepts)
Use these to **explain** concepts with clear, non-interactive diagrams:

```tsx
// Wrapper for any visual explanation
<VisualExplanation
  title="Understanding Proportions"
  caption="Notice how both ratios show the same relationship"
>
  <ProportionDiagram
    ratio1a={1} ratio1b={2}
    ratio2a={2} ratio2b={4}
    label="Equal Ratios: 1:2 = 2:4"
  />
</VisualExplanation>

// Simple ratio diagram
<VisualExplanation title="Ratio Parts">
  <RatioDiagram
    ratio1={3} ratio2={5}
    label1="Part A" label2="Part B"
    color1="#3b82f6" color2="#f59e0b"
  />
</VisualExplanation>

// Unit rate visualization
<VisualExplanation title="Speed Example">
  <UnitRateDiagram
    value={60}
    unit="miles per hour"
    icon="speed"
  />
</VisualExplanation>
```

**Use static diagrams for:**
- Explaining a concept after definition
- Showing a specific example
- Illustrating step-by-step solutions
- Demonstrating relationships

#### 🎮 **Interactive Visualizers** (for exploration)
Use these when students should **manipulate** and **explore**:

```tsx
// Interactive ratio explorer with scale control
<RatioVisualizer
  ratio1={3}
  ratio2={5}
  label1={t('visualLabel1')}
  label2={t('visualLabel2')}
  color1="#3b82f6"
  color2="#f59e0b"
  showScale={true}  // Adds interactive slider!
/>

// Interactive fraction slider
<InteractiveFractionSlider
  maxNumerator={12}
  maxDenominator={12}
  initialNumerator={3}
  initialDenominator={4}
  visualType="circle"
  showDecimal={true}
/>
```

**Use interactive components for:**
- Letting students experiment with values
- Discovering patterns through manipulation
- Testing different scenarios
- Hands-on practice

### **Typical Lesson Structure:**
1. **Definition** → Static diagram to explain
2. **Example** → Static diagram showing specific case
3. **KeyConcept** → Interactive visualizer to explore
4. **Exercise** → Student practices

### **Example Ratio Lesson Pattern:**
```tsx
// 1. Explain the concept (STATIC)
<Definition term="Ratio">
  <p>A ratio compares two quantities...</p>
</Definition>

<VisualExplanation title="Understanding Ratios">
  <RatioDiagram ratio1={2} ratio2={3} label1="Apples" label2="Oranges" />
</VisualExplanation>

// 2. Let students explore (INTERACTIVE)
<KeyConcept title="Scaling Ratios">
  <p>Try changing the scale below...</p>
</KeyConcept>

<RatioVisualizer
  ratio1={2}
  ratio2={3}
  showScale={true}  // Students can experiment!
/>
```

**❌ DON'T:**
- Use interactive visualizers for static explanations (overkill)
- Use static diagrams where students should explore (missed opportunity)
- Mix up the purposes - be intentional!

**✅ DO:**
- Use ~2-4 static diagrams per lesson (explain concepts)
- Use ~1-2 interactive visualizers per lesson (hands-on exploration)
- Place static diagrams right after definitions
- Place interactive components after students understand basics

---

## 🎯 CODE QUALITY RULES

### ✅ DO:
- ✅ Use server components (default, no 'use client')
- ✅ Add `relative` to main container
- ✅ Use `t.rich()` for HTML content
- ✅ Keep EN and TA JSON structures identical
- ✅ Use descriptive variable names
- ✅ Add type annotations
- ✅ Test build before committing

### ❌ DON'T:
- ❌ Add 'use client' to lesson pages
- ❌ Use `dangerouslySetInnerHTML`
- ❌ Use `t()` with HTML tags (use `t.rich()`)
- ❌ Have different keys in EN vs TA
- ❌ Skip testing language switching
- ❌ Commit without running build

---

## 🐛 COMMON ISSUES & FIXES

### Issue: MISSING_MESSAGE error
```
Error: MISSING_MESSAGE: Could not resolve `examples.example1.title`
```
**Fix:** Add the key to your JSON file:
```json
{
  "examples": {
    "example1": {
      "title": "Your example title"
    }
  }
}
```

### Issue: FORMATTING_ERROR
```
Error: FORMATTING_ERROR: Markup in content, but not using t.rich()
```
**Fix:** Change from `t()` to `t.rich()`:
```tsx
// ❌ Wrong
<p>{t('text')}</p>  // when text has <strong>

// ✅ Correct
<p>{t.rich('text', { strong: chunks => <strong>{chunks}</strong> })}</p>
```

### Issue: Page freezes, can't click
**Fix:** Add `relative` to main container:
```tsx
<div className="max-w-4xl mx-auto px-4 py-8 relative">
```

### Issue: Build succeeds but runtime errors
**Fix:** Check nested keys exist in JSON:
```tsx
// If you use: t('parent.child.grandchild')
// JSON must have all 3 levels:
{
  "parent": {
    "child": {
      "grandchild": "value"
    }
  }
}
```

---

## 📐 LESSON STRUCTURE TEMPLATE

```tsx
export default function YourLessonName() {
  const t = useTranslations('your-lesson')  // Match JSON filename
  const navigation = getLessonNavigation('category', 'lesson-name')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>

      {/* 1. DEFINITION - What is this concept? */}
      <Definition term={t('definition.mainConcept.title')}>
        <p>{t.rich('definition.mainConcept.intro', { 
          strong: (chunks) => <strong>{chunks}</strong> 
        })}</p>
      </Definition>

      {/* 2. KEY CONCEPTS - Core principles */}
      <KeyConcept title={t('keyConcepts.concept1.title')}>
        <p>{t('keyConcepts.concept1.explanation')}</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>{t('keyConcepts.concept1.point1')}</li>
          <li>{t('keyConcepts.concept1.point2')}</li>
        </ul>
      </KeyConcept>

      {/* 3. EXAMPLES - Show how it works */}
      <Example title={t('examples.example1.title')}>
        <p>{t('examples.example1.question')}</p>
        <StepByStep steps={[
          t('examples.example1.step1'),
          t('examples.example1.step2'),
          t('examples.example1.step3')
        ]} />
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-semibold">{t('examples.example1.answerLabel')}</p>
          <MathRenderer math="answer" />
        </div>
      </Example>

      {/* 4. NOTES - Tips and warnings */}
      <Note type="tip">{t('notes.tip1')}</Note>

      {/* 5. EXERCISES - Practice */}
      <NumericInputExercise
        question={t('exercises.exercise1.question')}
        correctAnswer={42}
        hint={t('exercises.exercise1.hint')}
        explanation={t('exercises.exercise1.explanation')}
      />

      <MultipleChoiceExercise
        question={t('exercises.exercise2.question')}
        options={[
          t('exercises.exercise2.option1'),
          t('exercises.exercise2.option2'),
          t('exercises.exercise2.option3'),
          t('exercises.exercise2.option4')
        ]}
        correctAnswer={0}
        explanation={t('exercises.exercise2.explanation')}
      />

      {/* 6. CONCLUSION - Summary */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p>{t('conclusion.summary')}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">{t('conclusion.keyTakeawaysTitle')}</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>{t('conclusion.takeaway1')}</li>
            <li>{t('conclusion.takeaway2')}</li>
            <li>{t('conclusion.takeaway3')}</li>
          </ul>
        </div>
      </div>

      <LessonNavigation navigation={navigation} />
    </div>
  )
}
```

---

## 🎓 BEST LESSON EXAMPLES TO COPY

### **Best Overall:** [fractions/page.tsx](../app/[locale]/learn/foundations/fractions/page.tsx)
- ✅ Clean structure (356 lines)
- ✅ No 'use client'
- ✅ Perfect component usage
- ✅ Complete translations

### **Best for Complex Topics:** [decimals/page.tsx](../app/[locale]/learn/foundations/decimals/page.tsx)
- ✅ 470 lines (good example for detailed lessons)
- ✅ Multiple sections with sub-topics
- ✅ Good use of visualizers

### **Best Translation Structure:** [percentages.json](../messages/en/percentages.json)
- ✅ 290 keys, well-organized
- ✅ Clear nesting (definition.percentage.intro)
- ✅ Consistent naming

### **All Lessons Are Good Templates:**
All 5 foundation lessons now follow best practices and can be used as templates. For simplest structure, start with [fractions/page.tsx](../app/[locale]/learn/foundations/fractions/page.tsx).

---

## ✅ PRE-COMMIT CHECKLIST

Before submitting your lesson:

- [ ] No 'use client' directive
- [ ] Main container has `relative` class
- [ ] Namespace matches JSON filename
- [ ] All t() calls have keys in JSON
- [ ] Used t.rich() for HTML content
- [ ] EN and TA JSON structures identical
- [ ] **Lesson registered in `lib/curriculum-data.ts` with correct slug**
- [ ] `npm run build` passes with zero errors
- [ ] Language switching works
- [ ] All exercises functional
- [ ] **Lesson appears in sidebar navigation**
- [ ] Sidebar clickable
- [ ] Text selectable
- [ ] Math renders correctly
- [ ] Mobile responsive
- [ ] LessonNavigation correct
- [ ] LessonNavigation correct

---

## 📊 PERFORMANCE TARGETS

Based on 5 existing lessons:

- **Lines of Code:** 350-450 (sweet spot)
- **Translation Keys:** 150-300 (depending on complexity)
- **Sections:** 6-10 top-level (definition, keyConcepts, examples, etc.)
- **Examples:** 3-5 worked examples
- **Exercises:** 4-8 interactive exercises
- **Build Time:** <30 seconds
- **Bundle Size:** <100KB per lesson

---

## 🎉 YOU'RE READY!

Follow this guide to create professional bilingual lessons in **60-75 minutes** with:
- ✅ Clean, maintainable code
- ✅ Complete translations
- ✅ Interactive exercises
- ✅ Beautiful rendering
- ✅ Zero errors
- ✅ Great UX

**Start with:** Copy [fractions/page.tsx](../app/[locale]/learn/foundations/fractions/page.tsx) and go! 🚀
