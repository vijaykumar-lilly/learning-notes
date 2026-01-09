import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type BilingualMode = 'single' | 'tooltip' | 'side-by-side' | 'tabs';
export type TranslationVisibility = 'always' | 'on-demand' | 'glossary-only' | 'never';

interface BilingualPreferences {
  // Display preferences
  bilingualMode: BilingualMode;
  translationVisibility: TranslationVisibility;
  
  // Layout preferences
  showGlossary: boolean;
  glossaryCollapsed: boolean;
  
  // Adaptive settings
  adaptiveMode: boolean; // Auto-adjust based on progress
  
  // Accessibility
  fontSize: number; // 14-24
  highContrast: boolean;
  reducedMotion: boolean;
  
  // Actions
  setBilingualMode: (mode: BilingualMode) => void;
  setTranslationVisibility: (visibility: TranslationVisibility) => void;
  setShowGlossary: (show: boolean) => void;
  setGlossaryCollapsed: (collapsed: boolean) => void;
  setAdaptiveMode: (adaptive: boolean) => void;
  setFontSize: (size: number) => void;
  setHighContrast: (highContrast: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  resetToDefaults: () => void;
}

const defaultPreferences = {
  bilingualMode: 'single' as BilingualMode,
  translationVisibility: 'on-demand' as TranslationVisibility,
  showGlossary: false,
  glossaryCollapsed: true,
  adaptiveMode: false,
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
};

export const useBilingualPreferences = create<BilingualPreferences>()(
  persist(
    (set) => ({
      ...defaultPreferences,
      
      setBilingualMode: (mode) => set({ bilingualMode: mode }),
      setTranslationVisibility: (visibility) => set({ translationVisibility: visibility }),
      setShowGlossary: (show) => set({ showGlossary: show }),
      setGlossaryCollapsed: (collapsed) => set({ glossaryCollapsed: collapsed }),
      setAdaptiveMode: (adaptive) => set({ adaptiveMode: adaptive }),
      setFontSize: (size) => set({ fontSize: Math.min(24, Math.max(14, size)) }),
      setHighContrast: (highContrast) => set({ highContrast }),
      setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
      resetToDefaults: () => set(defaultPreferences),
    }),
    {
      name: 'bilingual-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Hook for responsive breakpoints
export const useMediaQuery = (query: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const [matches, setMatches] = React.useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// Import React for useEffect/useState
import React from 'react';
