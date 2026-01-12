'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/i18n';
import { useEffect, useRef } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const scrollPositionRef = useRef<number>(0);
  
  const currentLang = LANGUAGES.find(l => l.code === locale);

  // Save scroll position before language change
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem('scrollPosition');
    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY, 10));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [locale]);
  
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // Save current scroll position
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // Replace locale in pathname
    // pathname is like /en/learn/decimals or /ta/learn/decimals
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPathname = segments.join('/');
    
    router.push(newPathname);
  };
  
  return (
    <div className="language-switcher">
      <select 
        value={locale} 
        onChange={(e) => switchLanguage(e.target.value)}
        aria-label="Select language"
        className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}
