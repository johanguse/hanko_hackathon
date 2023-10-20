import { getI18n } from '@/locale/server'
import type { MenuNavItem } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000'

export const siteConfig = {
  name: 'Johan Guse | Frontend Developer',
  description:
    'Personal web portfolio, where you can find information about me, my skills, my work experience, and my projects.',
  url: BASE_URL,
  ogImage: `${BASE_URL}/images/og.png`,
  links: {
    twitter: 'https://twitter.com/johanguse/',
    github: 'https://github.com/johanguse/',
    LinkedIn: 'https://www.linkedin.com/in/johanguse/',
  },
}
export async function getSiteConfig() {
  const t = await getI18n()

  return {
    ...siteConfig,
    name: t('siteConfig.title'),
    description: t('siteConfig.description'),
    mainNav: [
      {
        id: 'aboutMe',
        title: t('siteConfig.menuNav.aboutMe'),
        href: '/about',
      },
      {
        id: 'skills',
        title: t('siteConfig.menuNav.skills'),
        href: '#skills',
      },
      {
        id: 'experience',
        title: t('siteConfig.menuNav.experience'),
        href: '#experience',
      },
      {
        id: 'projects',
        title: t('siteConfig.menuNav.projects'),
        href: '#projects',
      },
      {
        id: 'education',
        title: t('siteConfig.menuNav.education'),
        href: '#education',
      },
      {
        id: 'dashboard',
        title: t('siteConfig.menuNav.dashboard'),
        href: '/dashboard',
      },
    ] satisfies MenuNavItem[],
  }
}
