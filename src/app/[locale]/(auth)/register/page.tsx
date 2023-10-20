import dynamic from 'next/dynamic'
import Link from 'next/link'

import { getSiteConfig } from '@/config/siteConfig'
import { Text } from '@/components/common'
import Footer from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/header/header'

const HankoAuth = dynamic(() => import('@/components/auth/HankoAuth'), {
  ssr: false,
})

export default async function RegisterPage() {
  const { mainNav, name } = await getSiteConfig()

  return (
    <>
      <div className="flex flex-col gap-20">
        <Header siteConfig={{ mainNav, name }} />
        <main className="w-full">
          <div className="container items-center text-center">
            <div className="text-center">
              <Text labelToken="Register" className="text-4xl" as="h1" bold />
              <Text
                labelToken="Enter your email below to create an account."
                className="mt-4"
                as="p"
                medium
              />
            </div>
            <HankoAuth />
            <div className="font-xs mx-0 mt-8 w-full text-center text-primary">
              <Text
                as="p"
                labelToken="By creating an account, you agree to our"
              />
              <Link className="underline" href="/">
                <Text as="p" labelToken="Terms and Conditions" />
              </Link>
              <Link className="underline" href="/">
                <Text as="p" labelToken="Privacy Policy" />
              </Link>
              <Link className="underline" href="/">
                <Text as="p" labelToken="Cookie Policy" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
