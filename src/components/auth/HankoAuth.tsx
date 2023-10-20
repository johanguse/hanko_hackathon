'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { Hanko, register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApiUrl: string = process.env.NEXT_PUBLIC_HANKO_API_URL!

//ts ignore next line
// @ts-ignore eslint-disable-next-line
const hankoEs: Translation = {
  ...hankoEsTranslations,
}

export default function HankoAuth() {
  const router = useRouter()
  const locale = useCurrentLocale()

  const [hanko, setHanko] = useState<Hanko>()

  const isDarkTheme = true

  useEffect(() => {
    import('@teamhanko/hanko-elements')
      .then(({ Hanko }) => setHanko(new Hanko(hankoApiUrl)))
      .catch((error) =>
        console.error('Failed to import @teamhanko/hanko-elements.', error)
      )
  }, [])

  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    try {
      router.replace('/dashboard')
    } catch (error) {
      console.error('Failed to redirect.', error)
    }
  }, [router])

  useEffect(() => {
    if (hanko) {
      hanko.onAuthFlowCompleted(redirectAfterLogin)
    }
  }, [hanko, redirectAfterLogin])

  useEffect(() => {
    register(hankoApiUrl, { translations: { ...all, hankoEs } }).catch(
      (error) => console.error('Failed to register translations.', error)
    )
  }, [hankoApiUrl])

  return (
    <hanko-auth
      class={`hanko ${isDarkTheme ? 'dark' : ''}`}
      lang={locale === 'es' ? 'hankoEs' : 'en'}
    />
  )
}
