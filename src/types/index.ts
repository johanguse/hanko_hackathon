export type IdsNav =
  | 'aboutMe'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'dashboard'
interface NavItem {
  id: IdsNav
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export type MenuNavItem = NavItem

export type featureOne = {
  titleToken: string
  descriptionToken: string
  isAnimation?: boolean
  isSlider?: boolean
  imgUrls?: {
    before: string
    after: string
  }
  animationUrl?: string
  linkText: string
  link: string
}
