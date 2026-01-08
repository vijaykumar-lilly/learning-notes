import AppLayout from '@/components/layout/AppLayout'

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
