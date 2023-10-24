'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Hanko } from '@teamhanko/hanko-elements'

import { Button as ButtonUI } from '@/components/ui/Button'

if (!process.env.NEXT_PUBLIC_HANKO_API_URL) {
  throw new Error('Missing NEXT_PUBLIC_HANKO_API_URL environment variable')
}

const hankoApiUrl: string = process.env.NEXT_PUBLIC_HANKO_API_URL!

export function LogoutBtn() {
  const router = useRouter()
  const [hanko, setHanko] = useState<Hanko>()

  const pathname = usePathname()

  const isDashboardPage = pathname.startsWith('/dashboard')

  useEffect(() => {
    import('@teamhanko/hanko-elements')
      .then(({ Hanko }) => setHanko(new Hanko(hankoApiUrl)))
      .catch((error) =>
        console.error('Failed to import @teamhanko/hanko-elements.', error)
      )
  }, [])

  const logout = async () => {
    try {
      await hanko?.user.logout()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <>
      {isDashboardPage ? (
        <ButtonUI
          variant="default"
          size="sm"
          onClick={() => {
            logout().catch((error) =>
              console.error('Error during logout:', error)
            )
          }}
        >
          Logout
        </ButtonUI>
      ) : (
        <div className="mx-auto flex w-fit flex-col justify-center pt-10 text-center lg:flex-row lg:pt-0">
          <ButtonUI
            variant="link"
            size="sm"
            className="mb-4 mr-0 block lg:mb-0 lg:mr-4"
            asChild
          >
            <Link href="/login">Login</Link>
          </ButtonUI>
          <ButtonUI variant="default" size="sm" className="text-center" asChild>
            <Link href="/register">Sign-up</Link>
          </ButtonUI>
        </div>
      )}
    </>
  )
}
