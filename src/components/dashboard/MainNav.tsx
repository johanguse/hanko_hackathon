'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScopedI18n } from '@/locale/client'

import { cn } from '@/lib/utils'

async function getUserCreditsFromAPI(): Promise<any> {
  const response = await fetch('/api/get-user-credits', {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user credits')
  }

  return await response.json()
}

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const t = useScopedI18n('commons.dashboard')
  const currentRoute = usePathname()

  const commonLinkClass = 'text-sm font-medium hover:text-primary'
  const activeLinkClass = `${commonLinkClass} text-gray-500 dark:text-gray-400`
  const inactiveLinkClass = `${commonLinkClass} text-muted-foreground transition-colors`

  const [userCredits, setUserCredits] = useState<number>(0)

  useEffect(() => {
    getUserCreditsFromAPI()
      .then((data) => {
        setUserCredits(data.credits)
      })
      .catch((error) => {
        console.error('Failed to get user credits from API: ', error.message)
      })
  }, [])

  return (
    <div
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <div className="container flex flex-row items-center justify-center">
        <nav className="justify-center space-x-4 lg:space-x-6">
          <Link
            href="/dashboard"
            className={
              currentRoute === '/dashboard'
                ? activeLinkClass
                : inactiveLinkClass
            }
          >
            {t('overview')}
          </Link>
          <Link
            href="/dashboard/billing"
            className={
              currentRoute === '/dashboard/billing'
                ? activeLinkClass
                : inactiveLinkClass
            }
          >
            {t('billing')}
          </Link>
          <Link
            href="/dashboard/generate"
            className={
              currentRoute === '/dashboard/generate'
                ? activeLinkClass
                : inactiveLinkClass
            }
          >
            {t('products')}
          </Link>
          <Link
            href="/dashboard/settings"
            className={
              currentRoute === '/dashboard/settings'
                ? activeLinkClass
                : inactiveLinkClass
            }
          >
            {t('settings')}
          </Link>
        </nav>
        <div className="color-primary dark:color-white ml-10 block rounded bg-gray-300 px-4 py-2 text-center font-bold dark:bg-gray-700">
          Remain {userCredits} Credits
        </div>
      </div>
    </div>
  )
}
