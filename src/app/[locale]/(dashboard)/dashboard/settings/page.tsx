import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'

export default async function Page() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <Text labelToken="Settings" medium />
    </>
  )
}
