'use client';

import React, { useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';

interface GlossaryEntry {
  en: string;
  ta: string;
  category?: string;
  definition?: string;
}

const MATH_GLOSSARY: GlossaryEntry[] = [
  // Arithmetic terms
  { en: 'Addition', ta: 'கூட்டல்', category: 'arithmetic' },
  { en: 'Subtraction', ta: 'கழித்தல்', category: 'arithmetic' },
  { en: 'Multiplication', ta: 'பெருக்கல்', category: 'arithmetic' },
  { en: 'Division', ta: 'வகுத்தல்', category: 'arithmetic' },
  { en: 'Sum', ta: 'கூட்டுத்தொகை', category: 'arithmetic' },
  { en: 'Difference', ta: 'வித்தியாசம்', category: 'arithmetic' },
  { en: 'Product', ta: 'பெருக்கல் விடை', category: 'arithmetic' },
  { en: 'Quotient', ta: 'ஈவு', category: 'arithmetic' },
  { en: 'Divisor', ta: 'வகுப்பான்', category: 'arithmetic' },
  { en: 'Remainder', ta: 'மீதம்', category: 'arithmetic' },
  
  // Number concepts
  { en: 'Number', ta: 'எண்', category: 'numbers' },
  { en: 'Fraction', ta: 'பின்னம்', category: 'numbers' },
  { en: 'Decimal', ta: 'தசம எண்', category: 'numbers' },
  { en: 'Percentage', ta: 'சதவீதம்', category: 'numbers' },
  { en: 'Integer', ta: 'முழு எண்', category: 'numbers' },
  { en: 'Even number', ta: 'இரட்டை எண்', category: 'numbers' },
  { en: 'Odd number', ta: 'ஒற்றை எண்', category: 'numbers' },
  
  // Place value
  { en: 'Place value', ta: 'இட மதிப்பு', category: 'place-value' },
  { en: 'Ones', ta: 'ஒன்றுகள்', category: 'place-value' },
  { en: 'Tens', ta: 'பத்துகள்', category: 'place-value' },
  { en: 'Hundreds', ta: 'நூறுகள்', category: 'place-value' },
  { en: 'Thousands', ta: 'ஆயிரங்கள்', category: 'place-value' },
  
  // Operations
  { en: 'Equation', ta: 'சமன்பாடு', category: 'operations' },
  { en: 'Expression', ta: 'வெளிப்பாடு', category: 'operations' },
  { en: 'Variable', ta: 'மாறி', category: 'operations' },
  { en: 'Constant', ta: 'மாறிலி', category: 'operations' },
];

export function GlossaryPanel() {
  const locale = useLocale();
  const t = useTranslations('common');
  const { showGlossary, glossaryCollapsed, setGlossaryCollapsed, setShowGlossary } = useBilingualPreferences();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(MATH_GLOSSARY.map(e => e.category).filter(Boolean)));
    return ['all', ...cats];
  }, []);
  
  // Filter glossary entries
  const filteredEntries = useMemo(() => {
    return MATH_GLOSSARY.filter(entry => {
      // Category filter
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          entry.en.toLowerCase().includes(query) ||
          entry.ta.toLowerCase().includes(query)
        );
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by primary language
      const aText = locale === 'en' ? a.en : a.ta;
      const bText = locale === 'en' ? b.en : b.ta;
      return aText.localeCompare(bText);
    });
  }, [searchQuery, selectedCategory, locale]);
  
  if (!showGlossary) {
    return null;
  }
  
  return (
    <>
      {/* Desktop: Sidebar */}
      <aside 
        className={`glossary-panel ${glossaryCollapsed ? 'collapsed' : ''}`}
        aria-label="Math terms glossary"
      >
        <div className="glossary-header">
          <h2 className="glossary-title">
            📚 {locale === 'en' ? 'Glossary' : 'சொல்லகராதி'}
          </h2>
          
          <div className="glossary-actions">
            <button
              onClick={() => setGlossaryCollapsed(!glossaryCollapsed)}
              className="collapse-btn"
              aria-label={glossaryCollapsed ? 'Expand glossary' : 'Collapse glossary'}
              aria-expanded={!glossaryCollapsed}
            >
              {glossaryCollapsed ? '▶' : '◀'}
            </button>
            
            <button
              onClick={() => setShowGlossary(false)}
              className="close-btn"
              aria-label="Close glossary"
            >
              ✕
            </button>
          </div>
        </div>
        
        {!glossaryCollapsed && (
          <div className="glossary-content">
            {/* Search */}
            <div className="glossary-search">
              <input
                type="search"
                placeholder={locale === 'en' ? 'Search terms...' : 'சொற்களைத் தேடு...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search glossary"
              />
            </div>
            
            {/* Category filter */}
            <div className="category-filter">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
                aria-label="Filter by category"
              >
                <option value="all">{locale === 'en' ? 'All Categories' : 'அனைத்து வகைகள்'}</option>
                {categories.filter(c => c !== 'all').map(cat => cat && (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Entries list */}
            <div className="glossary-list" role="list">
              {filteredEntries.length === 0 ? (
                <p className="no-results">
                  {locale === 'en' ? 'No terms found' : 'சொற்கள் கிடைக்கவில்லை'}
                </p>
              ) : (
                filteredEntries.map((entry, index) => (
                  <div key={index} className="glossary-entry" role="listitem">
                    <div className="entry-primary" lang={locale}>
                      <strong>{locale === 'en' ? entry.en : entry.ta}</strong>
                    </div>
                    <div className="entry-translation" lang={locale === 'en' ? 'ta' : 'en'}>
                      {locale === 'en' ? entry.ta : entry.en}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="glossary-footer">
              <small>
                {filteredEntries.length} {locale === 'en' ? 'terms' : 'சொற்கள்'}
              </small>
            </div>
          </div>
        )}
      </aside>
      
      <style jsx>{`
        .glossary-panel {
          position: fixed;
          right: 0;
          top: 4rem;
          bottom: 0;
          width: 320px;
          background: var(--color-surface, #ffffff);
          border-left: 1px solid var(--color-border, #e5e7eb);
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 40;
          transition: width 0.3s ease;
        }
        
        .glossary-panel.collapsed {
          width: 48px;
        }
        
        .glossary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid var(--color-border, #e5e7eb);
          min-height: 64px;
        }
        
        .glossary-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .glossary-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .collapse-btn,
        .close-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 1.25rem;
          color: var(--color-text-secondary, #6b7280);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }
        
        .collapse-btn:hover,
        .close-btn:hover {
          background-color: var(--color-hover, #f3f4f6);
        }
        
        .glossary-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          gap: 1rem;
        }
        
        .glossary-search {
          position: sticky;
          top: 0;
          background: var(--color-surface, #ffffff);
          z-index: 1;
        }
        
        .search-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--color-border, #d1d5db);
          border-radius: 0.375rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .search-input:focus {
          border-color: var(--color-primary, #3b82f6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .category-filter {
          margin-top: -0.5rem;
        }
        
        .category-select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--color-border, #d1d5db);
          border-radius: 0.375rem;
          font-size: 0.875rem;
          background: var(--color-surface, #ffffff);
          cursor: pointer;
        }
        
        .glossary-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .glossary-entry {
          padding: 0.75rem;
          background: var(--color-bg-subtle, #f9fafb);
          border-radius: 0.5rem;
          border-left: 3px solid var(--color-primary, #3b82f6);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .glossary-entry:hover {
          transform: translateX(-2px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .entry-primary {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .entry-translation {
          font-size: 0.875rem;
          color: var(--color-text-secondary, #6b7280);
        }
        
        .no-results {
          text-align: center;
          color: var(--color-text-secondary, #6b7280);
          padding: 2rem 1rem;
        }
        
        .glossary-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--color-border, #e5e7eb);
          text-align: center;
          color: var(--color-text-secondary, #6b7280);
        }
        
        /* Mobile */
        @media (max-width: 767px) {
          .glossary-panel {
            width: 100%;
            top: auto;
            bottom: 0;
            max-height: 60vh;
            border-left: none;
            border-top: 1px solid var(--color-border, #e5e7eb);
          }
          
          .glossary-panel.collapsed {
            max-height: 64px;
            width: 100%;
          }
        }
        
        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .glossary-panel {
            background: var(--color-surface, #1f2937);
            border-left-color: var(--color-border, #374151);
          }
          
          .glossary-entry {
            background: var(--color-bg-subtle, #111827);
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .glossary-panel,
          .glossary-entry {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
