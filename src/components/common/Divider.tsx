import { FC } from 'react'

import { cn } from '@/lib/utils'

type DividerProps = {
  className?: string
}

export const Divider: FC<DividerProps> = ({ className }) => {
  return (
    <div
      className={cn('h-px w-full bg-gray-200 dark:bg-gray-800', className)}
    />
  )
}
