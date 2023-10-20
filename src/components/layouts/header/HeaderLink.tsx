import Link from 'next/link'

import { Text } from '@/components/common'

type HeaderLinkProps = {
  href: string
  labelToken: string
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  labelToken,
  target = '_self',
}) => {
  return (
    <Link
      href={href}
      target={target}
      className="flex h-10 items-center rounded px-5 hover:bg-gray-100 dark:hover:bg-gray-700"
      scroll={false}
    >
      <Text labelToken={labelToken} medium />
    </Link>
  )
}
