'use client'

import { useScopedI18n } from '@/locale/client'
import { RefreshCwOff } from 'lucide-react'

import { Text } from '@/components/common'

export default function GeneratePage() {
  const t = useScopedI18n('commons.dashboard.outOfCredits')

  return (
    <>
      <div className="container mx-auto flex flex-col content-center items-center justify-center text-center">
        <Text labelToken={t('title')} as="h1" medium />
        <Text labelToken={t('subtitle')} as="p" />
        <div className="mt-10">
          <RefreshCwOff className="h-24 w-24 text-blue-500" />
        </div>
      </div>
    </>
  )
}
