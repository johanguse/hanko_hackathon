import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import { Header } from '@/components/common/header/header'
import { MainNav } from '@/components/dashboard/MainNav'
import Footer from '@/components/layouts/Footer'

export default async function Page() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <Text labelToken="settings" medium />
    </>
  )
}
