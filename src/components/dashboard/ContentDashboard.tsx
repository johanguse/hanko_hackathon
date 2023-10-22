import * as React from 'react'

import { getSiteConfig } from '@/config/siteConfig'
import { cn } from '@/lib/utils'
import { MainNav } from '@/components/dashboard/MainNav'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

interface DashboardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function DashboardContent({
  children,
  className,
  ...props
}: DashboardContentProps) {
  const { mainNav, name } = await getSiteConfig()
  return (
    <>
      <div className={cn('flex flex-col gap-10', className)} {...props}>
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <MainNav className="bg-gray-100 py-4 text-center dark:bg-gray-800" />
          <div className="container py-12">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}
