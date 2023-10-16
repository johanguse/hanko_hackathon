import { FC } from 'react'

import { cn } from '@/lib/utils'

type LoadingDotsProps = {
  containerClasses?: string
  dotClasses?: string
  size?: 'sm' | 'md' | 'lg'
}

export const LoadingDots: FC<LoadingDotsProps> = ({
  containerClasses,
  size = 'md',
  dotClasses = 'bg-purple-700',
}) => {
  const dotContainerClasses = cn('flex items-center justify-center', {
    'w-3 h-3': size === 'sm',
    'w-6 h-6': size === 'md',
    'w-8 h-8': size === 'lg',
  })
  const _dotClasses = cn('rounded-full bg-purple-700', dotClasses)

  return (
    <div className={cn('flex', containerClasses)}>
      <div className={dotContainerClasses}>
        <div className={cn('dot-pulse-before', _dotClasses)} />
      </div>
      <div className={dotContainerClasses}>
        <div className={cn('dot-pulse', _dotClasses)} />
      </div>
      <div className={dotContainerClasses}>
        <div className={cn('dot-pulse-after', _dotClasses)} />
      </div>
    </div>
  )
}
