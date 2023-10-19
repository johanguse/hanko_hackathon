import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import { Header } from '@/components/common/header/header'
import { MainNav } from '@/components/dashboard/MainNav'
import Footer from '@/components/layouts/Footer'

export default async function Page() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <Header siteConfig={{ mainNav, name }} />
      <main className="w-full">
        <div className="container">
          <MainNav />
          <Text labelToken="textest" medium />
        </div>
      </main>
      <Footer />
    </>
  )
}
