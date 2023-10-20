'use client'

import React, { useEffect } from 'react'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

const hankoEs: Translation = {
  ...hankoEsTranslations,
}

export default function AccountProfile() {
  const locale = useCurrentLocale()
  useEffect(() => {
    register(hankoApiUrl, { translations: { ...all, hankoEs } }).catch((e) =>
      console.error('Error registering hanko element', e)
    )
  }, [])

  return <hanko-profile lang={locale === 'es' ? 'hankoEs' : 'en'} />
}
