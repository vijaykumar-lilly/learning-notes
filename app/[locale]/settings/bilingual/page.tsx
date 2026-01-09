'use client';

import { useTranslations } from 'next-intl';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';
import AppLayout from '@/components/layout/AppLayout';

export default function BilingualSettingsPage() {
  const t = useTranslations('common');
  const {
    bilingualMode,
    translationVisibility,
    showGlossary,
    adaptiveMode,
    fontSize,
    highContrast,
    reducedMotion,
    setBilingualMode,
    setTranslationVisibility,
    setShowGlossary,
    setAdaptiveMode,
    setFontSize,
    setHighContrast,
    setReducedMotion,
    resetToDefaults,
  } = useBilingualPreferences();
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Bilingual Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Customize how you want to learn with English and Tamil content
      </p>
      
      {/* Display Mode */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Display Mode</h2>
        
        {/* Current mode indicator */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            ✓ Currently active: <strong className="capitalize">{bilingualMode.replace('-', ' ')}</strong>
          </p>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="mode"
              value="single"
              checked={bilingualMode === 'single'}
              onChange={(e) => setBilingualMode(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Single Language</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Show content only in your selected language
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="mode"
              value="tooltip"
              checked={bilingualMode === 'tooltip'}
              onChange={(e) => setBilingualMode(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Tooltip Mode</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hover over terms to see translation
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="mode"
              value="tabs"
              checked={bilingualMode === 'tabs'}
              onChange={(e) => setBilingualMode(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Tabs (Mobile Friendly)</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Switch between languages with tabs
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="mode"
              value="side-by-side"
              checked={bilingualMode === 'side-by-side'}
              onChange={(e) => setBilingualMode(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Side-by-Side (Desktop Only)</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Compare both languages simultaneously (60/40 split)
              </div>
            </div>
          </label>
        </div>
      </section>
      
      {/* Translation Visibility */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Translation Visibility</h2>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="visibility"
              value="always"
              checked={translationVisibility === 'always'}
              onChange={(e) => setTranslationVisibility(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Always Visible</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Show translations everywhere (beginner mode)
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="visibility"
              value="on-demand"
              checked={translationVisibility === 'on-demand'}
              onChange={(e) => setTranslationVisibility(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">On Demand (Recommended)</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Show translations when you need them
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="visibility"
              value="glossary-only"
              checked={translationVisibility === 'glossary-only'}
              onChange={(e) => setTranslationVisibility(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Glossary Only</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Use glossary panel for term lookups (advanced)
              </div>
            </div>
          </label>
          
          <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <input
              type="radio"
              name="visibility"
              value="never"
              checked={translationVisibility === 'never'}
              onChange={(e) => setTranslationVisibility(e.target.value as any)}
              className="mt-1"
            />
            <div>
              <div className="font-medium">Never Show</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Full immersion in selected language
              </div>
            </div>
          </label>
        </div>
      </section>
      
      {/* Features */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
            <div>
              <div className="font-medium">Show Glossary Panel</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Display searchable math term dictionary
              </div>
            </div>
            <input
              type="checkbox"
              checked={showGlossary}
              onChange={(e) => setShowGlossary(e.target.checked)}
              className="w-5 h-5"
            />
          </label>
          
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
            <div>
              <div className="font-medium">Adaptive Mode</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Automatically adjust translation visibility based on progress
              </div>
            </div>
            <input
              type="checkbox"
              checked={adaptiveMode}
              onChange={(e) => setAdaptiveMode(e.target.checked)}
              className="w-5 h-5"
            />
          </label>
        </div>
      </section>
      
      {/* Accessibility */}
      <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="font-size-slider" className="block font-medium mb-2">
              Font Size: {fontSize}px
            </label>
            <input
              id="font-size-slider"
              type="range"
              min="14"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full"
              aria-label={`Font size: ${fontSize} pixels`}
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span>Small (14px)</span>
              <span>Large (24px)</span>
            </div>
          </div>
          
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
            <div>
              <div className="font-medium">High Contrast</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Increase text contrast for better readability
              </div>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-5 h-5"
            />
          </label>
          
          <label className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer">
            <div>
              <div className="font-medium">Reduce Motion</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Minimize animations and transitions
              </div>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-5 h-5"
            />
          </label>
        </div>
      </section>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          Reset to Defaults
        </button>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Settings are automatically saved
        </div>
      </div>
      </div>
    </AppLayout>
  );
}
