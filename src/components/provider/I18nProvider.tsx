'use client'

import { type ReactNode } from 'react'
import { I18nProviderClient } from '@/locale/client'
import es from '@/locale/messages/es'

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode
  locale: string
}) {
  return (
    <I18nProviderClient locale={locale} fallbackLocale={es}>
      {children}
    </I18nProviderClient>
  )
}
