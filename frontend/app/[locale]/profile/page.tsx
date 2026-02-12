'use client'

import AppLayout from '@/components/layout/AppLayout'
import ProfileForm from '@/components/profile/ProfileForm'
import { useLocale } from 'next-intl'

export default function ProfilePage() {
  const locale = useLocale()

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ProfileForm locale={locale} />
      </div>
    </AppLayout>
  )
}
