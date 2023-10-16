'use client'

import { FC, useState } from 'react'
import type { MenuNavItem } from '@/types'

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
        className={`fixed left-0 top-0 z-40 h-screen w-full overflow-y-auto bg-white p-6 dark:bg-black lg:flex lg:hidden ${
          navOpen ? '' : 'hidden'
        }`}
      >
        <nav>
          <ul className="flex flex-col items-center">
            {siteConfig?.mainNav.map((item) => (
              <li key={item.title}>
                <HeaderLink href={item.href} labelToken={item.title} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
