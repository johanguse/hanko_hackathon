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

  // Check for existence of the token before attempting to decode
  if (!token) {
    redirect('/login')
    return // Ensure no further execution in case of redirection
  }

  let payload
  try {
    payload = jose.decodeJwt(token)
  } catch (error) {
    console.error(error)
    redirect('/login')
    return // Ensure no further execution in case of redirection
  }

  const userID = payload.sub

  if (!userID) {
    redirect('/login')
    return // Ensure no further execution in case of redirection
  }

  return (
    <>
      <Text labelToken={`user-id: ${userID}`} medium />
      <div>{JSON.stringify(payload)}</div>
    </>
  )
}
