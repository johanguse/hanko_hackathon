import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import { MainNav } from '@/components/dashboard/MainNav'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { GradientHero } from '@/components/home/GradientHero'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

export default async function Page() {
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
