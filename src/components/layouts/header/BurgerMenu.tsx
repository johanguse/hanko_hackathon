'use client'

import { FC, useState } from 'react'
import type { MenuNavItem } from '@/types'

import { LogoutBtn } from '@/components/auth/ButtonLogout'
import { Button } from '@/components/common'
import { LogoSVG } from '@/components/icons'

import { BurguerMenuButton } from './BurguerMenuButton'
import { HeaderLink } from './HeaderLink'

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
        <nav>
          <ul className="mt-5 flex flex-col items-center">
            {siteConfig?.mainNav.map((item) => (
              <li key={item.title}>
                <HeaderLink href={item.href} labelToken={item.title} />
              </li>
            ))}
          </ul>
        </nav>
        <LogoutBtn />
      </div>
    </>
  )
}
