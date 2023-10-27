'use client'

import { FC, useState } from 'react'
import type { MenuNavItem } from '@/types'

import { LogoutBtn } from '@/components/auth/ButtonLogout'
import { LogoSVG } from '@/components/icons'

import { BurguerMenuButton } from './BurguerMenuButton'

type BurguerMenuProps = {
  siteConfig: { mainNav: MenuNavItem[]; name: string }
}

export const BurguerMenu: FC<BurguerMenuProps> = ({ siteConfig }) => {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <>
      <BurguerMenuButton onClick={toggleNav} isOpen={navOpen} />
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-full overflow-y-auto bg-white p-6 dark:bg-black lg:hidden ${
          navOpen ? '' : 'hidden'
        }`}
      >
        <LogoSVG className="h-8 items-center p-1" />
        <LogoutBtn />
      </div>
    </>
  )
}
