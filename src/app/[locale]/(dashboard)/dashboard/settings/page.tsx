'use client'

import React, { useEffect } from 'react'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

const hankoEs: Translation = {
  ...hankoEsTranslations,
}

const hankoApiUrl = process.env.NEXT_PUBLIC_HANKO_API_URL

export default function AccountProfile() {
  const locale = useCurrentLocale()
  useEffect(() => {
    // register the component
    // see: https://github.com/teamhanko/hanko/blob/main/frontend/elements/README.md#script
    register(hankoApiUrl, { translations: { ...all, hankoEs } })
  }, [])

  return <hanko-profile lang={locale === 'es' ? 'hankoEs' : 'en'} />
}
