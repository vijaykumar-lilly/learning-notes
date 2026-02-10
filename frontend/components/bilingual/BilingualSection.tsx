'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';
import { BilingualContent } from './BilingualContent';

interface BilingualSectionProps {
  /** Content in the primary language (current locale) */
  primaryContent: React.ReactNode;
  /** Content in the secondary language (alternate locale) */
  secondaryContent: React.ReactNode;
  /** Unique key for this section (used for BilingualContent) */
  sectionKey?: string;
}

/**
 * BilingualSection - Smart wrapper that automatically handles all bilingual display modes
 * 
 * This component makes lessons future-proof by handling mode logic in one place.
 * Lesson authors just provide primary and secondary language content, and this component
 * renders it appropriately based on user preferences.
 * 
 * Works with any language pair - not tied to English/Tamil.
 * 
 * Usage:
 * <BilingualSection
 *   primaryContent={<Definition term="Number">...</Definition>}
 *   secondaryContent={<Definition term="எண்">...</Definition>}
 *   sectionKey="number-intro"
 * />
 */
export function BilingualSection({ 
  primaryContent, 
  secondaryContent, 
  sectionKey = 'section' 
}: BilingualSectionProps) {
  const locale = useLocale();
  const { bilingualMode } = useBilingualPreferences();
  
  // Single language mode - show only primary content
  if (bilingualMode === 'single') {
    return <>{primaryContent}</>;
  }
  
  // Tooltip mode - show primary content (Term components handle tooltips)
  if (bilingualMode === 'tooltip') {
    return <>{primaryContent}</>;
  }
  
  // Tabs or Side-by-Side modes - use BilingualContent component
  // Pass content based on locale (en -> english slot, ta -> tamil slot, etc.)
  return (
    <BilingualContent
      englishContent={locale === 'en' ? primaryContent : secondaryContent}
      tamilContent={locale === 'en' ? secondaryContent : primaryContent}
      contentKey={sectionKey}
    />
  );
}
