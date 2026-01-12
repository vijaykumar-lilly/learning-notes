# Math Learning Platform - Project Instructions

## Project Overview
Open-source mathematics education platform covering basics to expertise level.

## Tech Stack
- Next.js 16.1.1 with App Router
- TypeScript
- Tailwind CSS
- KaTeX for math rendering
- PostgreSQL database
- i18n support (English, future Tamil)

## Development Guidelines
- Use TypeScript strict mode
- Follow Next.js 15+ conventions (App Router)
- Component naming: PascalCase
- Utility functions: camelCase
- Use server components by default, client components only when needed
- Math content under CC BY-SA license
- Code under Apache-2.0 license

## Lesson Styling & Consistency
**CRITICAL**: All lessons must follow the same visual style and structure as the "Algebraic Expressions" lesson.

### Style Requirements:
- Use **reusable lesson components**: `<Definition>`, `<Example>`, `<KeyConcept>`, `<StepByStep>`, `<VisualExplanation>`, `<Note>`
- Import from `@/components/lesson`
- Keep styling simple, clean, and consistent  
- Use standard Tailwind color schemes (blue, purple, green gradients)
- Avoid custom SVG graphics unless absolutely necessary for concept understanding
- Standard spacing: `my-8` for sections, `mb-4` for headings
- Title: `text-3xl sm:text-4xl font-bold mb-6`

### Component Usage:
```tsx
import { 
  Definition, 
  Example, 
  KeyConcept, 
  StepByStep,
  VisualExplanation,
  Note 
} from '@/components/lesson'
```

### Lesson Component Guidelines:
1. **Definition** - For formal mathematical definitions with optional examples
2. **KeyConcept** - For important concepts that need emphasis
3. **Example** - For worked examples with problem/solution structure
4. **StepByStep** - For multi-step procedures
5. **VisualExplanation** - For tables, diagrams, or visual aids
6. **Note** - For tips, warnings, or additional information

**DO NOT** create heavily customized visual styles or complex custom SVG diagrams that deviate from the established pattern. Use simple gradients and standard Tailwind classes as seen in Algebraic Expressions lesson.

### Page Structure Pattern:
```tsx
'use client'

import MathRenderer from '@/components/math/MathRenderer'
import { Definition, Example, KeyConcept, StepByStep, VisualExplanation, Note } from '@/components/lesson'
import LessonNavigation from '@/components/lesson/LessonNavigation'
import { getLessonNavigation } from '@/lib/lesson-navigation'
import { useTranslations } from 'next-intl'

export default function LessonPage() {
  const t = useTranslations('lesson-name')
  const navigation = getLessonNavigation('domain', 'lesson-slug')

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">{t('title')}</h1>
      
      {/* Use components here */}
      
      <LessonNavigation navigation={navigation} />
    </div>
  )
}
```
## Lesson Structure Requirements
When creating new lessons, include the following sections:

### Required Sections:
1. **Introduction/Definition** - Core concept explanation
2. **Key Concepts** - Main ideas and terminology
3. **Visual Explanations** - Diagrams, tables, or color-coded examples
4. **Worked Examples** - Step-by-step problem solving (3-5 examples)
5. **Real World Applications** - Where the concept is used in real life
   - Include 2-3 practical examples
   - Show clear connection between math concept and real-world use
   - Provide specific scenarios students can relate to
   - Explain WHY this math matters in daily life
6. **Practice Exercises** - Interactive exercises (5+ exercises)
7. **Tips & Notes** - Helpful reminders and common mistakes
8. **Conclusion** - Summary and key takeaways

### Real World Section Format:
```tsx
<section className="my-8">
  <h2 className="text-2xl font-bold mb-4">🌍 {t('realWorld.title')}</h2>
  <p className="mb-4">{t('realWorld.intro')}</p>
  
  <div className="space-y-4">
    {/* Application 1 */}
    <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
      <h3 className="font-semibold text-lg mb-2">{t('realWorld.app1.title')}</h3>
      <p className="mb-2">{t('realWorld.app1.description')}</p>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <strong>{t('realWorld.app1.exampleLabel')}</strong> {t('realWorld.app1.example')}
      </div>
    </div>
    
    {/* Additional applications... */}
  </div>
</section>
```