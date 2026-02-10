// This file is required for Next.js App Router but content is managed by [locale]/layout.tsx
// The middleware handles redirecting root path to appropriate locale
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
