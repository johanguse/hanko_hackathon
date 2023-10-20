import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import { MainNav } from '@/components/dashboard/MainNav'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

export default async function Page() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <Text labelToken="Settings" medium />
    </>
  )
}
