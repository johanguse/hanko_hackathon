import * as React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import * as jose from 'jose'

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
  const token = cookies().get('hanko')?.value
  const { mainNav, name } = await getSiteConfig()
  try {
    const payload = jose.decodeJwt(token ?? '')
    const userID = payload.sub

    if (!userID || token === undefined) {
      redirect('/login')
    }

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
  } catch (error) {
    redirect('/login')
  }
}
