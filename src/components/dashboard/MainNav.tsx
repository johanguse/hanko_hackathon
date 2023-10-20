'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
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
          Overview
        </Link>
        <Link
          href="/dashboard/billing"
          className={
            currentRoute === '/billing' ? activeLinkClass : inactiveLinkClass
          }
        >
          Billing
        </Link>
        <Link
          href="/products"
          className={
            currentRoute === '/products' ? activeLinkClass : inactiveLinkClass
          }
        >
          Products
        </Link>
        <Link
          href="/dashboard/settings"
          className={
            currentRoute === '/dashboard/settings'
              ? activeLinkClass
              : inactiveLinkClass
          }
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}
