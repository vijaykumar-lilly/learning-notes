'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useBilingualPreferences } from '@/lib/bilingual-preferences';

interface TermProps {
  /** Term in primary language (current locale) */
  primary: string;
  /** Term in secondary language (alternate locale) */
  secondary: string;
  /** Optional: custom display text (defaults to primary term) */
  children?: React.ReactNode;
  /** Optional: show translation inline instead of tooltip */
  inline?: boolean;
}

/**
 * Term component for inline bilingual translation tooltips
 * 
 * Language-agnostic: works with any primary/secondary language pair
 * 
 * Usage:
 * <Term primary="quotient" secondary="ஈவு" />
 * <Term primary="quotient" secondary="ஈவு">custom text</Term>
 * 
 * Features:
 * - Hover to show translation tooltip
 * - Click/tap to toggle tooltip on mobile
 * - Keyboard accessible
 * - Screen reader friendly
 */
export function Term({ primary, secondary, children, inline = false }: TermProps) {
  const locale = useLocale();
  const [showTooltip, setShowTooltip] = useState(false);
  const { translationVisibility, bilingualMode } = useBilingualPreferences();
  
  const displayText = children || primary;
  const translationText = secondary;
  
  // Respect display mode and translation visibility settings
  if (bilingualMode === 'single' || translationVisibility === 'never') {
    return <span>{displayText}</span>;
  }
  
  if (inline || translationVisibility === 'always' || bilingualMode === 'tabs' || bilingualMode === 'side-by-side') {
    return (
      <span className="inline-term">
        <span className="term-primary">
          {displayText}
        </span>
        {' '}
        <span className="term-translation">
          ({translationText})
        </span>
      </span>
    );
  }
  
  // Tooltip mode (default for 'tooltip' bilingualMode or 'on-demand'/'glossary-only' visibility)
  return (
    <span
      className="term-with-tooltip"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShowTooltip(!showTooltip);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${displayText}, translation: ${translationText}`}
      aria-expanded={showTooltip}
    >
      <span className="term-text">
        {displayText}
      </span>
      
      {showTooltip && (
        <span 
          className="term-tooltip" 
          role="tooltip"
        >
          {translationText}
        </span>
      )}
      
      <style jsx>{`
        .term-with-tooltip {
          position: relative;
          display: inline-block;
          font-weight: 500;
          color: var(--color-primary, #3b82f6);
          cursor: help;
          text-decoration: underline;
          text-decoration-style: dotted;
          text-underline-offset: 2px;
          border-radius: 2px;
          transition: background-color 0.2s ease;
        }
        
        .term-with-tooltip:hover,
        .term-with-tooltip:focus {
          background-color: rgba(59, 130, 246, 0.1);
          outline: 2px solid transparent;
        }
        
        .term-with-tooltip:focus-visible {
          outline: 2px solid var(--color-primary, #3b82f6);
          outline-offset: 2px;
        }
        
        .term-text {
          display: inline;
        }
        
        .term-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 0.75rem;
          background-color: var(--color-tooltip-bg, #1f2937);
          color: var(--color-tooltip-text, #fff);
          font-size: 0.875rem;
          font-weight: 400;
          border-radius: 0.375rem;
          white-space: nowrap;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                      0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 50;
          pointer-events: none;
          animation: tooltip-fade-in 0.2s ease-out;
        }
        
        .term-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: var(--color-tooltip-bg, #1f2937);
        }
        
        @keyframes tooltip-fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        /* Inline mode styles */
        .inline-term {
          display: inline;
        }
        
        .term-primary {
          font-weight: 500;
        }
        
        .term-translation {
          font-size: 0.9em;
          opacity: 0.75;
          font-style: italic;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .term-with-tooltip:hover,
          .term-with-tooltip:focus {
            background-color: rgba(59, 130, 246, 0.2);
          }
          
          .term-tooltip {
            background-color: var(--color-tooltip-bg, #374151);
          }
          
          .term-tooltip::after {
            border-top-color: var(--color-tooltip-bg, #374151);
          }
        }
        
        /* Mobile: Larger tap targets */
        @media (max-width: 767px) {
          .term-with-tooltip {
            padding: 0.125rem 0.25rem;
            margin: -0.125rem -0.25rem;
          }
          
          .term-tooltip {
            font-size: 1rem;
            padding: 0.625rem 1rem;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .term-with-tooltip {
            text-decoration-style: solid;
            text-decoration-thickness: 2px;
          }
          
          .term-tooltip {
            border: 2px solid currentColor;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .term-with-tooltip,
          .term-tooltip {
            transition: none;
            animation: none;
          }
        }
      `}</style>
    </span>
  );
}
