'use client'

import { useEffect, useState } from 'react'
import { useScopedI18n } from '@/locale/client'

import { supabase } from '@/lib/supabase'

async function getUserCreditsFromAPI(): Promise<any> {
  const response = await fetch('/api/get-user-credits', {
    method: 'GET',
    cache: 'no-cache',
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user credits')
  }

  return await response.json()
}

export function UserCreditsDisplay(): JSX.Element {
  const t = useScopedI18n('commons.dashboard')

  const [userCredits, setUserCredits] = useState<number>(0)

  useEffect(() => {
    getUserCreditsFromAPI().then((data) => {
      setUserCredits(data.credits)
    })
    const channel = supabase
      .channel('users')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'users' },
        (payload: any) => {
          setUserCredits(payload.new.credits)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <div className="color-primary dark:color-white ml-8 block rounded bg-gray-300 px-4 py-2 text-center font-bold dark:bg-gray-700">
      {t('remain')} {userCredits} {t('credits')}
    </div>
  )
}
