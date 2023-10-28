'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScopedI18n } from '@/locale/client'

import { cn } from '@/lib/utils'

import { UserCreditsDisplay } from './UserCreditsDisplay'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): JSX.Element {
  const t = useScopedI18n('commons.dashboard')
  const currentRoute = usePathname()

  const commonLinkClass = 'text-sm font-medium hover:text-primary'
  const activeLinkClass = `${commonLinkClass} text-gray-500 dark:text-gray-400`
  const inactiveLinkClass = `${commonLinkClass} text-muted-foreground transition-colors`

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
            href="/dashboard/generate"
            className={
              currentRoute === '/dashboard/generate'
                ? activeLinkClass
                : inactiveLinkClass
            }
          >
            {t('generate')}
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
        <UserCreditsDisplay />
      </div>
    </div>
  )
}
