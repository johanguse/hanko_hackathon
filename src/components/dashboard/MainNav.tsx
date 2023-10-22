'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScopedI18n } from '@/locale/client'

import { cn } from '@/lib/utils'
import { LogoutBtn } from '@/components/auth/ButtonLogout'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
      <nav className="container items-center justify-center space-x-4 lg:space-x-6">
        <Link
          href="/dashboard"
          className={
            currentRoute === '/dashboard' ? activeLinkClass : inactiveLinkClass
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
          href="/products"
          className={
            currentRoute === '/products' ? activeLinkClass : inactiveLinkClass
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
        <LogoutBtn />
      </nav>
    </div>
  )
}
