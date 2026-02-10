import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['en', 'ta'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Fetch translations from API
async function fetchTranslations(locale: string): Promise<Record<string, any>> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  try {
    const response = await fetch(`${API_BASE}/translations/${locale}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Failed to fetch translations for ${locale}, using empty object`);
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching translations for ${locale}:`, error);
    // Return basic translations to prevent app crash
    return {
      common: {
        welcome: locale === 'en' ? 'Welcome' : 'வரவேற்பு',
        loading: locale === 'en' ? 'Loading...' : 'ஏற்றுகிறது...',
        error: locale === 'en' ? 'Error' : 'பிழை'
      }
    };
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Fetch translations from API
  const messages = await fetchTranslations(locale);

  return {
    locale,
    messages,
  };
});
