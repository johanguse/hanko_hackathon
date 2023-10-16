import { ComponentType, FC, PropsWithChildren, SVGProps } from 'react'
import { isNil } from 'ramda'

import { cn, isNotNil } from '@/lib/utils'
import { Button, Text } from '@/components/common'

export type ConfigSectionProps = PropsWithChildren & {
  titleToken: string
  actionToken?: string
  actionMessage?: string
  actionHref?: string
  actionLoading?: boolean
  onActionClick?: () => void
  danger?: boolean
  className?: string
  actionIcon?: ComponentType<SVGProps<SVGSVGElement>>
}
export const ConfigSection: FC<ConfigSectionProps> = ({
  titleToken,
  children,
  actionToken,
  actionMessage,
  actionIcon,
  actionHref,
  actionLoading,
  onActionClick,
  danger,
  className,
}) => {
  return (
    <section
      className={cn(
        'mb-4 rounded-md border border-gray-200 dark:border-gray-800',
        {
          'border-rose-600 dark:border-rose-800': danger,
        },
        className
      )}
    >
      <div className="flex flex-col p-5 pt-6">
        <Text
          as="h2"
          labelToken={titleToken}
          size="lg"
          className="mb-2 ml-1"
          semibold
        />
        <div className="ml-1">{children}</div>
      </div>
      <div
        className={cn(
          'flex items-center rounded-b-md border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900',
          { 'justify-between': isNotNil(actionMessage) },
          { 'justify-end': isNil(actionMessage) }
        )}
      >
        {actionMessage && <Text as="p" labelToken={actionMessage} size="sm" />}
        <Button
          labelToken={actionToken}
          className="py-1 outline-none lg:text-sm"
          onClick={onActionClick}
          loading={actionLoading}
          href={actionHref}
          {...(danger && { variant: 'danger' })}
          {...(actionIcon && {
            Icon: actionIcon,
            iconPlacement: 'right',
            iconSize: 'sm',
          })}
        />
      </div>
    </section>
  )
}
