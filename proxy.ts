import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use locale prefix in URL (e.g., /en/about, /ta/about)
  localePrefix: 'always',

  // Enable locale detection from:
  // 1. URL path
  // 2. Cookie (NEXT_LOCALE)
  // 3. Accept-Language header
  localeDetection: true
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /images (static files)
  // - All files with extensions (e.g. .svg, .png, .css)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
