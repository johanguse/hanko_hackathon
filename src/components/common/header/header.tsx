'use client'

import { FC, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { MenuNavItem } from '@/types'

import { cn } from '@/lib/utils'
import { LogoSVG } from '@/components/icons/Logo'
import { ChangeLanguage } from '@/components/layouts/components/ChangeLanguage'
import { ThemeToggle } from '@/components/layouts/components/ThemeToggle'

import { BurguerMenu } from './BurgerMenu'
import { HeaderLink } from './HeaderLink'

type HeaderProps = {
  className?: string
  showBottomLineOnScroll?: boolean
  noSticky?: boolean
  siteConfig: { mainNav: MenuNavItem[]; name: string }
}

export const Header: FC<HeaderProps> = ({
  className,
  showBottomLineOnScroll = true,
  noSticky,
  siteConfig,
}) => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (showBottomLineOnScroll) {
      const handler = () => {
        window.scrollY > 16
          ? headerRef.current?.classList.add('border-b')
          : headerRef.current?.classList.remove('border-b')
      }
      document.addEventListener('scroll', handler)
      return () => document.removeEventListener('scroll', handler)
    }
  }, [showBottomLineOnScroll])

  return (
    <header
      ref={headerRef}
      className={cn(
        `
          top-0 z-40 w-full border-gray-200 bg-white py-6 dark:border-gray-800
          dark:bg-background
        `,
        { sticky: !noSticky },
        className
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <LogoSVG className="h-8" />
        </Link>
        <nav className="hidden lg:flex">
          <ul className="flex items-center">
            {siteConfig?.mainNav.map((item) => (
              <li key={item.title}>
                <HeaderLink href={item.href} labelToken={item.title} />
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden justify-end lg:flex">
          <ThemeToggle />
          <ChangeLanguage />
        </div>
        <div className="flex justify-end lg:hidden">
          <BurguerMenu siteConfig={siteConfig} />
        </div>
      </div>
    </header>
  )
}
