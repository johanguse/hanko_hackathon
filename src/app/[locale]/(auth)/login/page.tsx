import dynamic from 'next/dynamic'
import { getScopedI18n } from '@/locale/server'

import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

const HankoAuth = dynamic(() => import('@/components/auth/HankoAuth'), {
  ssr: false,
})

export default async function RegisterPage() {
  const t = await getScopedI18n('commons.auth')
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <div className="flex flex-col gap-20">
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <div className="container items-center text-center">
            <div className="text-center">
              <Text
                labelToken={t('loginTitle')}
                className="text-4xl"
                as="h1"
                bold
              />
              <Text
                labelToken={t('loginSubtitle')}
                className="mt-4"
                as="p"
                medium
              />
            </div>
            <HankoAuth />
            <div className="font-xs mx-0 mt-8 w-full text-center text-primary">
              <Text as="p" size="sm" labelToken={t('loginFooterText')} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
