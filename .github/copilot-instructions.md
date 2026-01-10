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