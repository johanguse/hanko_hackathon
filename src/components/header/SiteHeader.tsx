import Link from 'next/link'
import type { MenuNavItem } from '@/types'

import { ChangeLanguage } from '@/components/layouts/components/ChangeLanguage'
import { ThemeToggle } from '@/components/layouts/components/ThemeToggle'

interface SiteHeaderProps {
  siteConfig: { mainNav: MenuNavItem[]; name: string }
}

export function SiteHeader({ siteConfig }: SiteHeaderProps) {
  return (
    <header className="border-b border-transparent bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-row items-center justify-between space-y-3 text-center">
        <nav className=" flex h-16 flex-row items-center">
          <div className="w-full">
            <ul className="flex flex-row gap-1">
              {siteConfig?.mainNav?.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`#${item.id}`}
                    aria-label={item.title}
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <ThemeToggle />
        <ChangeLanguage />
      </div>
    </header>
  )
}
