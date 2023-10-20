import dynamic from 'next/dynamic'

import { getSiteConfig } from '@/config/siteConfig'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

const HankoAuth = dynamic(() => import('@/components/auth/HankoAuth'), {
  ssr: false,
})

export default async function LoginPage() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <div className="flex flex-col gap-[200px]">
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <div className="container items-center">
            <HankoAuth />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
