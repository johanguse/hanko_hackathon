import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

import { staticMetadata } from '@/config/siteMeta'
import { Text } from '@/components/common'

export const metadata: Metadata = {
  ...staticMetadata.dashboard,
}

export default function DashboardPage() {
  const token = cookies().get('hanko')?.value

  try {
    const payload = jose.decodeJwt(token ?? '')
    const userID = payload.sub

    if (!userID || token === undefined) {
      redirect('/login')
    }

    return (
      <>
        {userID && token !== undefined ? (
          <Text labelToken={`user-id: ${userID}`} medium />
        ) : (
          <Text labelToken="No ID" medium />
        )}
      </>
    )
  } catch (error) {
    redirect('/login')
  }
}
