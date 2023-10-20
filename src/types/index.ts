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
