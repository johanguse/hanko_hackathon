import { staticMetadata } from '@/config/siteMeta'
import { Text } from '@/components/common'

import '@/styles/global.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

export default function Page() {
  return (
    <>
      <Text labelToken="dashboard" medium />
    </>
  )
}
