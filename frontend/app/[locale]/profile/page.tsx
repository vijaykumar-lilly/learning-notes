import ProfileForm from '@/components/profile/ProfileForm'

interface ProfilePageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata() {
  return {
    title: 'Profile Settings | LearningHub',
    description: 'Manage your profile settings and preferences'
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileForm locale={locale} />
    </div>
  )
}
