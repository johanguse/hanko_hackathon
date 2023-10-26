'use client'

import { useEffect } from 'react'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

import { getHankoApiUrl } from '@/lib/utils'

const hankoApiUrl: string = getHankoApiUrl()

export default function HankoProfile() {
  const locale = useCurrentLocale()
  const isDarkTheme = true

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hankoEs: Translation = {
    ...hankoEsTranslations,
  }

  useEffect(() => {
    register(hankoApiUrl, { translations: { ...all, hankoEs } }).catch((e) =>
      console.error('Error registering hanko element', e)
    )
  }, [])
  return (
    <hanko-profile
      class={`hanko ${isDarkTheme ? 'dark' : ''}`}
      lang={locale === 'es' ? 'hankoEs' : 'en'}
    />
  )
}
