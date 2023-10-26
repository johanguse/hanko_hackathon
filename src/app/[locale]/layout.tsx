import { TriggerProvider } from '@trigger.dev/react'

import { baseMetadata } from '@/config/siteMeta'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { I18nProvider, ThemeProvider } from '@/components/provider'

import '@/styles/global.css'

import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  ...baseMetadata,
}

interface RootProps {
  children: React.ReactNode
  params: { locale: string }
}
export default function Root({ children, params }: RootProps) {
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
            <TriggerProvider
              publicApiKey={process.env.TRIGGER_PUBLIC_API_KEY!}
              apiUrl={process.env.TRIGGER_API_URL}
            >
              {children}
            </TriggerProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
