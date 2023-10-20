import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

import { staticMetadata } from '@/config/siteMeta'
import { Text } from '@/components/common'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

export default function BillingPage() {
  const token = cookies().get('hanko')?.value
  const payload = jose.decodeJwt(token ?? '')

  const userID = payload.sub

  if (!userID || token === undefined) {
    redirect('/login')
  }
  return (
    <>
      <Text labelToken="Billing" medium />
    </>
  )
}
