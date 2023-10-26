import type { Metadata } from 'next'

import { staticMetadata } from '@/config/siteMeta'
import { Text } from '@/components/common'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

export default function BillingPage() {
  return (
    <>
      <Text labelToken="Billing" medium />
    </>
  )
}
