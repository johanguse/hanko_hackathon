import Link from 'next/link'
import { LucideProps } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BadgeLinkProps {
  linkHref?: string
  text: string
  IconComponent?: React.ComponentType<LucideProps>
}

const BadgeLink: React.FC<BadgeLinkProps> = ({
  linkHref = '/',
  text,
  IconComponent,
}) => {
  return (
    <Link href={linkHref}>
      <span className="group relative mx-auto inline-block w-fit overflow-hidden rounded-full p-[1px]">
        <span
          className={cn(
            'absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#71717a_0%,#27272a_50%,#71717a_100%)]',
            'animate-spin rounded-full duration-700 group-hover:animate-none'
          )}
        />
        <div
          className={cn(
            'group flex h-full w-full items-center justify-center gap-1 rounded-full bg-zinc-950 px-3 py-1 text-sm text-zinc-200 backdrop-blur-3xl',
            'transition-all duration-200 ease-in-out hover:bg-zinc-900 hover:shadow-lg hover:backdrop-blur-2xl'
          )}
        >
          <p>{text}</p>
          {IconComponent && (
            <IconComponent
              className="transition-all group-hover:ml-[5px]"
              size={18}
            />
          )}
        </div>
      </span>
    </Link>
  )
}

export default BadgeLink
