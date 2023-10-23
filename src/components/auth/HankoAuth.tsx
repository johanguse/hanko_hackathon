'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentLocale } from '@/locale/client'
import { hankoEsTranslations } from '@/locale/hanko.es'
import { Hanko, register, Translation } from '@teamhanko/hanko-elements'
import { all } from '@teamhanko/hanko-elements/i18n/all'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApiUrl: string = process.env.NEXT_PUBLIC_HANKO_API_URL!

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
            console.log('No user data')
            return
          }
          try {
            const response = await fetch('/api/create-user', {
              method: 'POST',
              body: JSON.stringify(user),
            })

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`)
            const data = await response.json()
            console.log('Create user data: ', data)
          } catch (error) {
            console.log('Fetch Error: ', error)
          }
        }
        await fetchData()
        router.replace('/dashboard')
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
