import dynamic from 'next/dynamic'
import Link from 'next/link'
import { getScopedI18n } from '@/locale/server'

import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

const HankoAuth = dynamic(() => import('@/components/auth/HankoAuth'), {
  ssr: false,
})

export default async function RegisterPage() {
  const t = await getScopedI18n('commons')
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <div className="flex flex-col gap-20">
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <div className="container items-center text-center">
            <div className="text-center">
              <Text
                labelToken={t('auth.registerTitle')}
                className="text-4xl"
                as="h1"
                bold
              />
              <Text
                labelToken={t('auth.registerSubtitle')}
                className="mt-4"
                as="p"
                medium
              />
            </div>
            <HankoAuth />
            <div className="font-xs mx-0 w-full text-center text-primary">
              <Text
                labelToken={t('auth.registerFooterText')}
                className="mb-10"
                as="p"
                size="sm"
              />
              <Text size="xm" as="p" labelToken={t('auth.termsText')} />
              <Link className="underline" href="/">
                <Text
                  size="xm"
                  as="p"
                  labelToken={t('auth.termsTermsAndConditions')}
                />
              </Link>
              <Link className="underline" href="/">
                <Text
                  size="xm"
                  as="p"
                  labelToken={t('auth.termsPrivacyPolicy')}
                />
              </Link>
              <Link className="underline" href="/">
                <Text
                  size="xm"
                  as="p"
                  labelToken={t('auth.termsCookiePolicy')}
                />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
