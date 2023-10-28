'use client'

import dynamic from 'next/dynamic'

const HankoProfile = dynamic(() => import('@/components/auth/HankoProfile'), {
  ssr: false,
})

export default function AccountProfile() {
  return <HankoProfile />
}
