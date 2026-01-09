# Language-Agnostic Bilingual Architecture

## Overview

The bilingual system has been refactored to be **language-agnostic**, using `primary` and `secondary` language concepts instead of hardcoded `English` and `Tamil`. This makes it trivial to add new languages in the future.

## Key Changes

### 1. BilingualSection Component

**Before** (language-specific):
```tsx
<BilingualSection
  englishContent={<Definition term="Number">...</Definition>}
  tamilContent={<Definition term="எண்">...</Definition>}
/>
```

**After** (language-agnostic):
```tsx
<BilingualSection
  primaryContent={<Definition term="Number">...</Definition>}
  secondaryContent={<Definition term="எண்">...</Definition>}
/>
```

- `primaryContent` = content in the current locale
- `secondaryContent` = content in the alternate locale

### 2. Term Component

**Before**:
```tsx
<Term en="hundreds" ta="நூறுகள்" />
```

**After**:
```tsx
<Term primary="hundreds" secondary="நூறுகள்" />
```

- `primary` = term in current locale
- `secondary` = term in alternate locale

### 3. Internal Logic

Components now determine which content to show based on the current locale dynamically, rather than hardcoding language slots.

## Adding New Languages

### Step 1: Add Locale to i18n Configuration

```typescript
// i18n.ts
export const locales = ['en', 'ta', 'fr', 'es'] as const;
```

### Step 2: Create Message Files

```
messages/
  en/
    common.json
    number-sense.json
  ta/
    common.json
    number-sense.json
  fr/
    common.json
    number-sense.json
```

### Step 3: Add Translations in Lessons

The existing lessons will automatically work! Just provide content in the new language:

```tsx
// When locale is 'fr', primaryContent shows French, secondaryContent shows English
<BilingualSection
  primaryContent={<Definition term="Nombre">...</Definition>}
  secondaryContent={<Definition term="Number">...</Definition>}
/>
```

### Step 4: Update GlossaryPanel (Optional)

Add entries for the new language pairs in the glossary terms array.

## Benefits

✅ **No Code Changes Needed** - Existing lessons work with new languages  
✅ **Scalable** - Add as many languages as needed  
✅ **Maintainable** - Language logic centralized in components  
✅ **Flexible** - Users can switch between any language pair  
✅ **Consistent** - Same API across all lessons

## Example: Adding Spanish

1. Add `'es'` to `locales` in `i18n.ts`
2. Create `messages/es/` directory with translation files
3. Existing lessons automatically support EN ↔ ES, TA ↔ ES, etc.
4. No changes to BilingualSection or Term components needed

## Migration Guide

For any existing lessons using the old API:

### Find and Replace

- `englishContent=` → `primaryContent=`
- `tamilContent=` → `secondaryContent=`
- `en=` (in Term) → `primary=`
- `ta=` (in Term) → `secondary=`

All done! The lesson is now language-agnostic.

## Architecture Diagram

```
User selects locale: 'en'
└─> BilingualSection
    ├─> primaryContent = English content
    ├─> secondaryContent = Tamil content
    └─> Displays based on bilingualMode setting

User selects locale: 'ta'
└─> BilingualSection
    ├─> primaryContent = Tamil content
    ├─> secondaryContent = English content
    └─> Displays based on bilingualMode setting

User selects locale: 'fr' (future)
└─> BilingualSection
    ├─> primaryContent = French content
    ├─> secondaryContent = English content (or any other)
    └─> Displays based on bilingualMode setting
```

## Component Behavior by Mode

| Mode | What Gets Shown |
|------|-----------------|
| **Single** | Only `primaryContent` |
| **Tooltip** | Only `primaryContent` (Term tooltips show `secondary`) |
| **Tabs** | BilingualContent with both, switchable via tabs |
| **Side-by-Side** | BilingualContent with both in split view |

The system automatically adapts to the current locale without any language-specific logic in lessons.
