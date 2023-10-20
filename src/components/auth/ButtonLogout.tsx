'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hanko } from '@teamhanko/hanko-elements'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApiUrl: string = process.env.NEXT_PUBLIC_HANKO_API_URL!

export function LogoutBtn() {
  const router = useRouter()
  const [hanko, setHanko] = useState<Hanko>()

  useEffect(() => {
    import('@teamhanko/hanko-elements').then(({ Hanko }) =>
      setHanko(new Hanko(hankoApiUrl ?? ''))
    )
  }, [])

  const logout = async () => {
    try {
      await hanko?.user.logout()
      router.push('/')
      router.refresh()
      return
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return <button onClick={logout}>Logout</button>
}
