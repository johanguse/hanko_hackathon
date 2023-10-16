import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <VercelAnalytics />
    </>
  )
}
