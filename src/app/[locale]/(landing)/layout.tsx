import { getSiteConfig } from '@/config/siteConfig'
import { baseMetadata } from '@/config/siteMeta'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { I18nProvider, ThemeProvider } from '@/components/provider'

import '@/styles/global.css'

import { Metadata } from 'next/types'

export const metadata: Metadata = {
  ...baseMetadata,
}

interface RootProps {
  children: React.ReactNode
  params: { locale: string }
}
export default async function Root({ children, params }: RootProps) {
  const { name, mainNav } = await getSiteConfig()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          'scroll-smooth font-sans antialiased',
          fontMono.variable,
          fontSans.variable
        )}
      >
        <I18nProvider locale={params.locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col gap-10">{children}</div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
