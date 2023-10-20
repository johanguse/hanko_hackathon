import { getSiteConfig } from '@/config/siteConfig'
import { staticMetadata } from '@/config/siteMeta'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { I18nProvider, ThemeProvider } from '@/components/provider'

import '@/styles/global.css'

import type { Metadata } from 'next'

import { Header } from '@/components/common/header/header'
import { MainNav } from '@/components/dashboard/MainNav'
import Footer from '@/components/layouts/Footer'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

interface RootProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function Root({ children, params }: RootProps) {
  const bodyClasses = 'scroll-smooth font-sans antialiased'
  const additionalClasses = `${fontMono.variable} ${fontSans.variable}`
  const { mainNav, name } = await getSiteConfig()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn(bodyClasses, additionalClasses)}>
        <I18nProvider locale={params.locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col gap-10">
              <Header siteConfig={{ mainNav, name }} />
              <main className="w-full">
                <MainNav className="bg-gray-100 py-4 dark:bg-gray-800" />
                <div className="container">{children}</div>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
