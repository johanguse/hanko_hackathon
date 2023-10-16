export type TextSize =
  | 'xm'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '4xl'
  | '6xl'
  | '7xl'
  | 'base'

export const getTextSizeClass = (size?: TextSize) => {
  switch (size) {
    case 'xm':
      return 'text-xs'
    case 'sm':
      return 'text-sm'
    case 'md':
    case 'base':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    case '2xl':
      return 'text-2xl'
    case '4xl':
      return 'text-4xl'
    case '6xl':
      return 'text-6xl'
    case '7xl':
      return 'text-7xl'
    default:
      return ''
  }
}
