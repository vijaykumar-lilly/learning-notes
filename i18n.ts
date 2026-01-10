import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['en', 'ta'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: {
      common: (await import(`./messages/${locale}/common.json`)).default,
      'number-sense': (await import(`./messages/${locale}/number-sense.json`)).default,
      arithmetic: (await import(`./messages/${locale}/arithmetic.json`)).default,
      decimals: (await import(`./messages/${locale}/decimals.json`)).default,
      fractions: (await import(`./messages/${locale}/fractions.json`)).default,
      percentages: (await import(`./messages/${locale}/percentages.json`)).default,
      'ratios-proportions': (await import(`./messages/${locale}/ratios-proportions.json`)).default,
      'basic-geometry': (await import(`./messages/${locale}/basic-geometry.json`)).default,
      measurement: (await import(`./messages/${locale}/measurement.json`)).default,
      'data-graphs': (await import(`./messages/${locale}/data-graphs.json`)).default,
      'patterns-sequences': (await import(`./messages/${locale}/patterns-sequences.json`)).default,
      integers: (await import(`./messages/${locale}/integers.json`)).default,
      exponents: (await import(`./messages/${locale}/exponents.json`)).default,
      expressions: (await import(`./messages/${locale}/expressions.json`)).default,
      'linear-equations': (await import(`./messages/${locale}/linear-equations.json`)).default
    }
  };
});
