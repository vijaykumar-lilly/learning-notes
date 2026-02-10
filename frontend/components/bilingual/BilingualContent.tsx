'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useBilingualPreferences, useMediaQuery } from '@/lib/bilingual-preferences';

interface BilingualContentProps {
  /** English content */
  englishContent: React.ReactNode;
  /** Tamil content */
  tamilContent: React.ReactNode;
  /** Content key for identifying sections (for sync) */
  contentKey?: string;
  /** Force specific mode (overrides user preference) */
  forceMode?: 'single' | 'tabs' | 'accordion' | 'side-by-side';
}

/**
 * BilingualContent component - Displays content in both languages
 * with adaptive layout based on device and user preferences
 * 
 * Modes:
 * - Mobile: Tabs (switch between languages)
 * - Tablet: Accordion (expand secondary language)
 * - Desktop: Optional side-by-side (60/40 split)
 * 
 * Usage:
 * <BilingualContent
 *   englishContent={<p>English text</p>}
 *   tamilContent={<p>Tamil text</p>}
 * />
 */
export function BilingualContent({ 
  englishContent, 
  tamilContent,
  contentKey,
  forceMode 
}: BilingualContentProps) {
  const locale = useLocale();
  const { bilingualMode } = useBilingualPreferences();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  // Determine effective mode
  const getEffectiveMode = () => {
    if (forceMode) return forceMode;
    if (isMobile) return 'tabs';
    if (isTablet && bilingualMode === 'side-by-side') return 'accordion';
    if (bilingualMode === 'single') return 'single';
    return bilingualMode;
  };
  
  const effectiveMode = getEffectiveMode();
  
  // Tabs state
  const [activeTab, setActiveTab] = useState<'en' | 'ta'>(locale as 'en' | 'ta');
  
  // Accordion state
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  
  // Side-by-side scroll sync
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLDivElement>(null);
  const [syncScroll, setSyncScroll] = useState(true);
  
  const handleScroll = (source: 'left' | 'right') => {
    if (!syncScroll) return;
    
    const sourceRef = source === 'left' ? leftPaneRef : rightPaneRef;
    const targetRef = source === 'left' ? rightPaneRef : leftPaneRef;
    
    if (!sourceRef.current || !targetRef.current) return;
    
    const scrollPercentage = 
      sourceRef.current.scrollTop / 
      (sourceRef.current.scrollHeight - sourceRef.current.clientHeight || 1);
    
    targetRef.current.scrollTop = 
      scrollPercentage * 
      (targetRef.current.scrollHeight - targetRef.current.clientHeight);
  };
  
  // Single language mode
  if (effectiveMode === 'single') {
    return (
      <div lang={locale}>
        {locale === 'en' ? englishContent : tamilContent}
      </div>
    );
  }
  
  // Tabs mode (mobile)
  if (effectiveMode === 'tabs') {
    return (
      <div className="bilingual-tabs">
        <div className="tab-list" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'en'}
            aria-controls="panel-en"
            onClick={() => setActiveTab('en')}
            className={`tab-button ${activeTab === 'en' ? 'active' : ''}`}
          >
            🇬🇧 English
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'ta'}
            aria-controls="panel-ta"
            onClick={() => setActiveTab('ta')}
            className={`tab-button ${activeTab === 'ta' ? 'active' : ''}`}
          >
            🇮🇳 தமிழ்
          </button>
        </div>
        
        <div
          role="tabpanel"
          id="panel-en"
          aria-labelledby="tab-en"
          hidden={activeTab !== 'en'}
          lang="en"
          className="tab-panel"
        >
          {englishContent}
        </div>
        
        <div
          role="tabpanel"
          id="panel-ta"
          aria-labelledby="tab-ta"
          hidden={activeTab !== 'ta'}
          lang="ta"
          className="tab-panel"
        >
          {tamilContent}
        </div>
        
        <style jsx>{`
          .bilingual-tabs {
            width: 100%;
          }
          
          .tab-list {
            display: flex;
            gap: 0.5rem;
            border-bottom: 2px solid var(--color-border, #e5e7eb);
            margin-bottom: 1.5rem;
          }
          
          .tab-button {
            flex: 1;
            padding: 0.75rem 1rem;
            background: transparent;
            border: none;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            color: var(--color-text-secondary, #6b7280);
            transition: all 0.2s;
            min-height: 48px;
          }
          
          .tab-button:hover {
            color: var(--color-text-primary, #111827);
            background: var(--color-hover, #f3f4f6);
          }
          
          .tab-button.active {
            color: var(--color-primary, #3b82f6);
            border-bottom-color: var(--color-primary, #3b82f6);
          }
          
          .tab-button:focus-visible {
            outline: 2px solid var(--color-primary, #3b82f6);
            outline-offset: 2px;
          }
          
          .tab-panel {
            animation: fade-in 0.3s ease-out;
          }
          
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .tab-panel {
              animation: none;
            }
          }
        `}</style>
      </div>
    );
  }
  
  // Accordion mode (tablet)
  if (effectiveMode === 'accordion') {
    const primaryContent = locale === 'en' ? englishContent : tamilContent;
    const secondaryContent = locale === 'en' ? tamilContent : englishContent;
    const secondaryLang = locale === 'en' ? 'ta' : 'en';
    const secondaryLabel = locale === 'en' ? 'தமிழ் (Tamil)' : 'English';
    
    return (
      <div className="bilingual-accordion">
        <div lang={locale} className="primary-content">
          {primaryContent}
        </div>
        
        <details 
          className="secondary-content"
          open={accordionExpanded}
          onToggle={(e) => setAccordionExpanded((e.target as HTMLDetailsElement).open)}
        >
          <summary className="accordion-summary">
            {accordionExpanded ? '▼' : '▶'} Show in {secondaryLabel}
          </summary>
          <div lang={secondaryLang} className="accordion-content">
            {secondaryContent}
          </div>
        </details>
        
        <style jsx>{`
          .bilingual-accordion {
            width: 100%;
          }
          
          .primary-content {
            margin-bottom: 1.5rem;
          }
          
          .secondary-content {
            border: 1px solid var(--color-border, #e5e7eb);
            border-radius: 0.5rem;
            padding: 0;
            overflow: hidden;
          }
          
          .accordion-summary {
            padding: 1rem;
            cursor: pointer;
            font-weight: 500;
            background: var(--color-bg-subtle, #f9fafb);
            user-select: none;
            list-style: none;
          }
          
          .accordion-summary::-webkit-details-marker {
            display: none;
          }
          
          .accordion-summary:hover {
            background: var(--color-hover, #f3f4f6);
          }
          
          .accordion-content {
            padding: 1rem;
            border-top: 1px solid var(--color-border, #e5e7eb);
            animation: slide-down 0.3s ease-out;
          }
          
          @keyframes slide-down {
            from { opacity: 0; transform: translateY(-8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
  
  // Side-by-side mode (desktop)
  if (effectiveMode === 'side-by-side' && isDesktop) {
    return (
      <div className="bilingual-side-by-side">
        <div className="sync-control">
          <label className="sync-checkbox">
            <input
              type="checkbox"
              checked={syncScroll}
              onChange={(e) => setSyncScroll(e.target.checked)}
            />
            <span>Sync scroll</span>
          </label>
        </div>
        
        <div className="split-view">
          <div 
            ref={leftPaneRef}
            lang="en" 
            className="pane pane-left"
            onScroll={() => handleScroll('left')}
          >
            <div className="pane-label">English</div>
            {englishContent}
          </div>
          
          <div className="divider"></div>
          
          <div 
            ref={rightPaneRef}
            lang="ta" 
            className="pane pane-right"
            onScroll={() => handleScroll('right')}
          >
            <div className="pane-label">தமிழ்</div>
            {tamilContent}
          </div>
        </div>
        
        <style jsx>{`
          .bilingual-side-by-side {
            width: 100%;
          }
          
          .sync-control {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
          }
          
          .sync-checkbox {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            cursor: pointer;
          }
          
          .split-view {
            display: grid;
            grid-template-columns: 60% 2px 1fr;
            gap: 2rem;
            align-items: start;
          }
          
          .pane {
            max-height: 80vh;
            overflow-y: auto;
            padding-right: 0.5rem;
          }
          
          .pane-left {
            font-size: 1rem;
          }
          
          .pane-right {
            font-size: 0.9rem;
            opacity: 0.85;
          }
          
          .pane-label {
            position: sticky;
            top: 0;
            background: var(--color-surface, #ffffff);
            padding: 0.5rem 0;
            font-weight: 600;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-text-secondary, #6b7280);
            border-bottom: 2px solid var(--color-border, #e5e7eb);
            margin-bottom: 1rem;
            z-index: 1;
          }
          
          .divider {
            background: var(--color-border, #e5e7eb);
            width: 2px;
            align-self: stretch;
          }
          
          .pane::-webkit-scrollbar {
            width: 6px;
          }
          
          .pane::-webkit-scrollbar-track {
            background: transparent;
          }
          
          .pane::-webkit-scrollbar-thumb {
            background: var(--color-border, #d1d5db);
            border-radius: 3px;
          }
          
          .pane::-webkit-scrollbar-thumb:hover {
            background: var(--color-text-secondary, #9ca3af);
          }
        `}</style>
      </div>
    );
  }
  
  // Fallback to single mode
  return (
    <div lang={locale}>
      {locale === 'en' ? englishContent : tamilContent}
    </div>
  );
}
