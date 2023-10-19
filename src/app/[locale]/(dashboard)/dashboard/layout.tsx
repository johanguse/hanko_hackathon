import { getSiteConfig, siteConfig } from '@/config/siteConfig'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { I18nProvider, ThemeProvider } from '@/components/provider'

import '@/styles/global.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'portafolio',
    'portfolio',
    'developer',
    'desarrollador',
    'web',
    'app',
    'React',
    'NextJs',
    'typescript',
    'javascript',
    'tailwind',
  ],
  authors: [
    {
      name: siteConfig.name.split('|')[0].trim(),
      url: siteConfig.links.LinkedIn,
    },
  ],
  creator: siteConfig.name.split('|')[0].trim(),
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'es',
    url: new URL(siteConfig.url),
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@cavargasl',
  },
  icons: {
    icon: '/favicon.ico',
  },
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
