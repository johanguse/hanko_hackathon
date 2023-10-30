import { getScopedI18n } from '@/locale/server'

import { getSiteConfig } from '@/config/siteConfig'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { GradientHero } from '@/components/home/GradientHero'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

export async function generateMetadata() {
  const t = await getScopedI18n('siteConfig')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function LPPage() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <div className="flex flex-col gap-10">
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <div className="container">
            <GradientHero />
            <FeaturesSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
