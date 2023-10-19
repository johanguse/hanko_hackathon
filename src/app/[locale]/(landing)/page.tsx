import { getSiteConfig } from '@/config/siteConfig'
import { Header } from '@/components/common/header/header'
import { FeaturesSection } from '@/components/home/FeaturesSection'
import { GradientHero } from '@/components/home/GradientHero'
import Footer from '@/components/layouts/Footer'

export default async function Page() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <Header siteConfig={{ mainNav, name }} />
      <main className="w-full">
        <div className="container">
          <GradientHero />
          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </>
  )
}
