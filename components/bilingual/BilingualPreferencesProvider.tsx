'use client';

import { useEffect } from 'react';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';

/**
 * BilingualPreferencesProvider applies user preferences to the DOM
 * Mount this at the root level to apply settings globally
 */
export function BilingualPreferencesProvider({ children }: { children: React.ReactNode }) {
  const { fontSize, highContrast, reducedMotion } = useBilingualPreferences();

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.style.setProperty('--bilingual-font-size', `${fontSize}px`);
    
    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Apply reduced motion
    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [fontSize, highContrast, reducedMotion]);

  return <>{children}</>;
}
