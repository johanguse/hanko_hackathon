'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { Hanko, register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

import { getHankoApiUrl } from '@/lib/utils'

const hankoApiUrl: string = getHankoApiUrl()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        const user = await hanko.user.getCurrent()

        const fetchData = async () => {
          if (!user) {
            console.error('No user data')
            return
          }
          try {
            const response = await fetch('/api/create-user', {
              method: 'POST',
              body: JSON.stringify(user),
            })

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`)
          } catch (error) {
            console.error('Fetch Error: ', error)
          }
        }
        await fetchData()
        router.replace('/dashboard/collection')
      }),
    [hanko, router]
  )

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
