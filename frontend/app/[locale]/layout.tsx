import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/Providers';
import { locales } from '@/i18n';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const titles = {
    en: 'LearnHub - Mathematics Education from Basics to Expertise',
    ta: 'LearnHub - அடிப்படையிலிருந்து நிபுணத்துவம் வரை கணிதக் கல்வி'
  };
  
  const descriptions = {
    en: 'Open-source mathematics education platform covering 11 domains, 87 topics, and 4000+ exercises. Learn math from basics to expertise level.',
    ta: 'அடிப்படையிலிருந்து நிபுணத்துவம் வரை கணிதத்தைக் கற்றுக்கொள்ளுங்கள். 11 களங்கள், 87 தலைப்புகள் மற்றும் 4000+ பயிற்சிகள்.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: ['mathematics', 'math education', 'learning platform', 'calculus', 'algebra', 'geometry', 'open source', 'கணிதம்', 'கணிதக் கல்வி'],
    authors: [{ name: 'LearnHub Team' }],
    icons: {
      icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    },
    manifest: '/manifest.json',
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'website',
      locale: locale,
      images: ['/logo.svg'],
    },
    twitter: {
      card: 'summary',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ['/logo.svg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
