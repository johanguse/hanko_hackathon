'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { Hanko, register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

const hankoEs: Translation = {
  ...hankoEsTranslations,
}

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL

export default function HankoAuth() {
  const locale = useCurrentLocale()
  const router = useRouter()

  const [hanko, setHanko] = useState<Hanko>()

  const isDarkTheme = true

  useEffect(() => {
    import('@teamhanko/hanko-elements')
      .then(({ Hanko }) =>
        setHanko(new Hanko(hankoApi, { translations: { ...all, hankoEs } }))
      )
      .catch((error) =>
        console.error('Failed to import @teamhanko/hanko-elements.', error)
      )
  }, [])

  const redirectAfterLogin = useCallback(async () => {
    // successfully logged in, redirect to a page in your application
    try {
      await router.replace('/dashboard')
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
    register(hankoApi, { translations: { ...all, hankoEs } }).catch((error) =>
      console.error('Failed to register translations.', error)
    )
  }, [hankoApi])

  return (
    <hanko-auth
      class={`hanko ${isDarkTheme ? 'dark' : ''}`}
      lang={locale === 'es' ? 'hankoEs' : 'en'}
    />
  )
}
