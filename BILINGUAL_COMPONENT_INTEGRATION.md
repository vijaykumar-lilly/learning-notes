# Bilingual Component Integration Guide

## Phase 3 Components Usage

This guide shows how to integrate the Phase 3 bilingual components into lessons using a **future-proof approach**.

### Available Components

1. **BilingualSection** - Smart wrapper (recommended for most content)
2. **Term** - Inline translation tooltips
3. **GlossaryPanel** - Searchable math term dictionary  
4. **BilingualContent** - Low-level adaptive dual-language layouts
5. **Settings Page** - User preference configuration

---

## 🎯 Recommended Approach: BilingualSection

The **BilingualSection** component is the **future-proof way** to create bilingual lessons. It automatically handles all display modes based on user preferences.

### Why BilingualSection?

✅ **Simple** - Just provide primary and secondary language content  
✅ **Automatic** - Handles all display modes (single, tooltip, tabs, side-by-side)  
✅ **Language-agnostic** - Works with any language pair, not tied to English/Tamil  
✅ **Maintainable** - One component, consistent behavior  
✅ **Future-proof** - New modes or languages can be added without changing lessons

### Basic Usage

```tsx
import { BilingualSection } from '@/components/bilingual/BilingualSection';

<BilingualSection
  sectionKey="number-intro"
  primaryContent={
    <Definition term="Number">
      <p>A <strong>number</strong> is a mathematical object...</p>
    </Definition>
  }
  secondaryContent={
    <Definition term="எண்">
      <p><strong>எண்</strong> என்பது கணிதப் பொருள்...</p>
    </Definition>
  }
/>
```

**Note**: `primaryContent` = content in current locale, `secondaryContent` = content in alternate locale

### How It Works

The component reads `bilingualMode` from user preferences and renders accordingly:

- **Single mode**: Shows only current locale content
- **Tooltip mode**: Shows current locale (Term components handle tooltips)
- **Tabs mode**: Uses BilingualContent with tab interface
- **Side-by-side mode**: Uses BilingualContent with split view

---

## Complete Example: Number Sense Lesson

```tsx
'use client'

import { useTranslations } from 'next-intl'
import { BilingualSection } from '@/components/bilingual/BilingualSection'
import { Term } from '@/components/bilingual/Term'
import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel'
import { useBilingualPreferences } from '@/lib/bilingual-preferences'
import { Definition, KeyConcept, Note } from '@/components/lesson'

export default function NumberSenseLesson() {
  const { showGlossary } = useBilingualPreferences()
  
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Number Sense & Place Value</h1>

        {/* Section 1: Number Definition */}
        <BilingualSection
          sectionKey="number-intro"
          primaryContent={
            <Definition term="Number">
              <p>
                A <strong>number</strong> is a mathematical object used to count, measure, and label.
              </p>
            </Definition>
          }
          secondaryContent={
            <Definition term="எண்">
              <p>
                <strong>எண்</strong> என்பது எண்ணுவதற்கும், அளவிடுவதற்கும் பயன்படும் ஒரு கணிதப் பொருள்.
              </p>
            </Definition>
          }
        />

        {/* Section 2: Place Value */}
        <BilingualSection
          sectionKey="place-value"
          primaryContent={
            <Definition term="Place Value">
              <p><strong>Place value</strong> tells us the value of a digit based on its position.</p>
              <ul className="list-disc mt-2">
                <li><strong>4</strong> in <Term primary="hundreds" secondary="நூறுகள்" inline /> = 400</li>
                <li><strong>5</strong> in <Term primary="tens" secondary="பத்துகள்" inline /> = 50</li>
                <li><strong>6</strong> in <Term primary="ones" secondary="ஒன்றுகள்" inline /> = 6</li>
              </ul>
            </Definition>
          }
          secondaryContent={
            <Definition term="இட மதிப்பு">
              <p><strong>இட மதிப்பு</strong> ஒரு இலக்கத்தின் இடத்தின் அடிப்படையில் அதன் மதிப்பைக் கூறுகிறது.</p>
              <ul className="list-disc mt-2">
                <li><strong>4</strong> <Term primary="hundreds" secondary="நூறுகள்" inline /> இடத்தில் = 400</li>
                <li><strong>5</strong> <Term primary="tens" secondary="பத்துகள்" inline /> இடத்தில் = 50</li>
                <li><strong>6</strong> <Term primary="ones" secondary="ஒன்றுகள்" inline /> இடத்தில் = 6</li>
              </ul>
            </Definition>
          }
        />

        {/* Section 3: Even and Odd */}
        <BilingualSection
          sectionKey="even-odd"
          primaryContent={
            <Definition term="Even and Odd Numbers">
              <ul>
                <li><strong><Term primary="even number" secondary="இரட்டை எண்" /></strong>: Divisible by 2</li>
                <li><strong><Term primary="odd number" secondary="ஒற்றை எண்" /></strong>: Not divisible by 2</li>
              </ul>
            </Definition>
          }
          secondaryContent={
            <Definition term="இரட்டை மற்றும் ஒற்றை எண்கள்">
              <ul>
                <li><strong><Term primary="even number" secondary="இரட்டை எண்" /></strong>: 2 ஆல் வகுபடும்</li>
                <li><strong><Term primary="odd number" secondary="ஒற்றை எண்" /></strong>: 2 ஆல் வகுபடாது</li>
              </ul>
            </Definition>
          }
        />
      </div>
      
      {showGlossary && <GlossaryPanel />}
    </>
  )
}
```

---

Use for inline technical term translations.

### Basic Usage

```tsx
import { Term } from '@/components/bilingual/Term';

export default function Page() {
  return (
    <p>
      In division, the <Term en="quotient" ta="ஈவு" /> is the result.
    </p>
  );
}
```

**Renders as:**
- Desktop: "quotient" with dotted underline, shows "ஈவு" tooltip on hover
- Mobile: "quotient" clickable, shows "ஈவு" tooltip on tap

### With Custom Children

```tsx
<Term en="place value" ta="இட மதிப்பு">
  <strong>place value</strong>
</Term>
```

### Inline Mode

```tsx
<Term en="dividend" ta="வகுபடு எண்" inline />
```

**Renders as:** "dividend (வகுபடு எண்)" without tooltip

---

## 2. GlossaryPanel Component

Add to lesson layouts for quick term lookup.

### Usage in Layout

```tsx
'use client';

import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  const { showGlossary } = useBilingualPreferences();
  
  return (
    <div>
      {children}
      {showGlossary && <GlossaryPanel />}
    </div>
  );
}
```

### Features
- **Search**: Filters by English or Tamil
- **Categories**: arithmetic, numbers, place-value, operations
- **Responsive**: Right sidebar (desktop), bottom sheet (mobile)
- **30+ Terms Pre-loaded**

---

## 3. BilingualContent Component

Use for sections that benefit from dual-language display.

### Basic Usage

```tsx
import { BilingualContent } from '@/components/bilingual/BilingualContent';

export default function Page() {
  const englishContent = (
    <div>
      <h2>Understanding Division</h2>
      <p>Division is splitting into equal parts...</p>
    </div>
  );
  
  const tamilContent = (
    <div>
      <h2>வகுத்தலைப் புரிந்துகொள்ளுதல்</h2>
      <p>வகுத்தல் என்பது சமமான பகுதிகளாகப் பிரித்தல்...</p>
    </div>
  );
  
  return (
    <BilingualContent
      englishContent={englishContent}
      tamilContent={tamilContent}
      contentKey="division-intro"
    />
  );
}
```

### Display Modes

**Automatic (Responsive):**
- Mobile (<768px): **Tabs** - Switch between languages
- Tablet (768-1024px): **Accordion** - Expand secondary language
- Desktop (>1024px): **Side-by-side** - 60/40 split with scroll sync

**Force Specific Mode:**

```tsx
<BilingualContent
  englishContent={englishContent}
  tamilContent={tamilContent}
  contentKey="example"
  forceMode="side-by-side"  // Always use side-by-side
/>
```

### Side-by-Side Features
- Scroll synchronization (percentage-based)
- Toggle sync on/off via checkbox
- Sticky language labels
- Works with different content lengths

---

## 4. Settings Page

Users configure preferences at `/settings/bilingual`

### Preference Options

**Display Mode:**
- Single Language (default)
- Tooltip Mode
- Tabs (Mobile Friendly)
- Side-by-Side (Desktop Only)

**Translation Visibility:**
- Always Visible (beginner)
- On Demand (recommended)
- Glossary Only (advanced)
- Never Show (immersion)

**Features:**
- Show Glossary Panel (on/off)
- Adaptive Mode (auto-adjust based on progress)

**Accessibility:**
- Font Size (14-24px slider)
- High Contrast
- Reduce Motion

**All settings auto-save to localStorage**

---

## Integration Example: Number Sense Lesson

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Term } from '@/components/bilingual/Term';
import { BilingualContent } from '@/components/bilingual/BilingualContent';
import { GlossaryPanel } from '@/components/bilingual/GlossaryPanel';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';
import { Definition, Example } from '@/components/lesson';

export default function NumberSensePage() {
  const t = useTranslations('number-sense');
  const { showGlossary } = useBilingualPreferences();
  
  return (
    <>
      <h1>{t('title')}</h1>
      
      {/* Section 1: Basic concept with Terms */}
      <section>
        <h2>{t('sections.placeValue.title')}</h2>
        <p>
          Understanding <Term en="place value" ta="இட மதிப்பு" /> helps us
          read large numbers. Each <Term en="digit" ta="இலக்கம்" /> represents
          a different value based on its position.
        </p>
      </section>
      
      {/* Section 2: Dual-language example */}
      <section>
        <h2>{t('sections.examples.title')}</h2>
        
        <BilingualContent
          contentKey="place-value-example"
          englishContent={
            <Example>
              <p>In the number 456:</p>
              <ul>
                <li>4 is in the <Term en="hundreds" ta="நூறுகள்" inline /> place</li>
                <li>5 is in the <Term en="tens" ta="பத்துகள்" inline /> place</li>
                <li>6 is in the <Term en="ones" ta="ஒன்றுகள்" inline /> place</li>
              </ul>
            </Example>
          }
          tamilContent={
            <Example>
              <p>456 என்ற எண்ணில்:</p>
              <ul>
                <li>4 <Term en="hundreds" ta="நூறுகள்" inline /> இடத்தில் உள்ளது</li>
                <li>5 <Term en="tens" ta="பத்துகள்" inline /> இடத்தில் உள்ளது</li>
                <li>6 <Term en="ones" ta="ஒன்றுகள்" inline /> இடத்தில் உள்ளது</li>
              </ul>
            </Example>
          }
        />
      </section>
      
      {/* Glossary panel (if enabled in settings) */}
      {showGlossary && <GlossaryPanel />}
    </>
  );
}
```

---

## Best Practices

### When to Use Term Component
✅ Technical math vocabulary (quotient, divisor, fraction)
✅ First introduction of a concept
✅ Words with no direct 1:1 translation
❌ Common words (the, is, and)
❌ Every word in a paragraph (cognitive overload)

### When to Use BilingualContent
✅ Worked examples with step-by-step explanation
✅ Definition sections
✅ Complex multi-paragraph content
✅ When users might want to compare translations
❌ Single sentences
❌ Simple navigation text

### When to Show GlossaryPanel
✅ In lesson pages (not homepage)
✅ When user enables it in settings
✅ Desktop and tablet (adequate screen space)
❌ Forced on all pages
❌ On mobile without user consent (takes screen space)

---

## Performance Considerations

1. **Lazy Loading**: BilingualContent and GlossaryPanel are client components - use sparingly
2. **Conditional Rendering**: Check `showGlossary` preference before rendering GlossaryPanel
3. **Content Splitting**: Don't wrap entire lesson in BilingualContent - split into sections
4. **Term Moderation**: Use 3-5 Terms per section maximum to avoid overwhelming users

---

## Accessibility

All Phase 3 components are WCAG 2.1 AA compliant:

- **Keyboard Navigation**: All interactions work with Tab, Enter, Space, Escape
- **Screen Readers**: Proper ARIA labels and roles
- **High Contrast**: Components respect high contrast mode
- **Reduced Motion**: Animations respect `prefers-reduced-motion`
- **Font Scaling**: Components support user-defined font sizes

---

## Next Steps

1. Update existing lessons (Number Sense, Arithmetic) with Term and BilingualContent
2. Test on real devices (mobile, tablet, desktop)
3. Gather user feedback on preference settings
4. A/B test adaptive mode effectiveness

## Related Files

- `lib/bilingual-preferences.ts` - State management
- `components/bilingual/Term.tsx` - Term tooltips
- `components/bilingual/GlossaryPanel.tsx` - Glossary sidebar
- `components/bilingual/BilingualContent.tsx` - Dual-language layouts
- `app/[locale]/settings/bilingual/page.tsx` - Settings UI
