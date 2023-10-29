'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Hanko } from '@teamhanko/hanko-elements'

import { getHankoApiUrl } from '@/lib/utils'
import { Button } from '@/components/common'

const hankoApiUrl: string = getHankoApiUrl()

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
        <Button
          variant="primary"
          onClick={() => {
            logout().catch((error) =>
              console.error('Error during logout:', error)
            )
          }}
        >
          Logout
        </Button>
      ) : (
        <div className="mx-auto flex w-fit flex-col justify-center pt-10 text-center lg:flex-row lg:pt-0">
          <Button
            variant="tertiary"
            className="mb-4 mr-0 block lg:mb-0 lg:mr-4"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="primary" className="text-center">
            <Link href="/register">Sign-up</Link>
          </Button>
        </div>
      )}
    </>
  )
}
