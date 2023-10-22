import type { Metadata } from 'next'

import { staticMetadata } from '@/config/siteMeta'
import { validateJwtAndFetchUserId } from '@/lib/validateJwtAndFetchUserId'
import { Text } from '@/components/common'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

export default function DashboardPage() {
  const userID = validateJwtAndFetchUserId()
  return (
    <>
      <Text labelToken="dashboard" medium />
    </>
  )
}
