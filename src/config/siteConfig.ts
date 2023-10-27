import { getI18n } from '@/locale/server'
import type { featureOne, MenuNavItem } from '@/types'

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
        href: '/dashboard',
      },
      {
        id: 'skills',
        title: t('siteConfig.menuNav.skills'),
        href: '/dashboard/billing',
      },
      {
        id: 'experience',
        title: t('siteConfig.menuNav.experience'),
        href: '/dashboard/settings',
      },
      {
        id: 'projects',
        title: t('siteConfig.menuNav.projects'),
        href: '/dashboard/generate',
      },
      {
        id: 'education',
        title: t('siteConfig.menuNav.education'),
        href: '/login',
      },
      {
        id: 'dashboard',
        title: t('siteConfig.menuNav.dashboard'),
        href: '/dashboard',
      },
    ] satisfies MenuNavItem[],
    featureOne: [
      {
        titleToken: t('home.featureTitle'),
        descriptionToken: t('home.featureSubtitle'),
        isSlider: true,
        imgUrls: {
          before: '/images/me_4x4.jpg',
          after: '/images/me_after.png',
        },
        linkText: t('home.featureButton'),
        link: '/register',
      },
    ] satisfies featureOne[],
  }
}
