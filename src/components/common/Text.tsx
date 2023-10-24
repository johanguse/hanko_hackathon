import { createElement, FC, PropsWithChildren } from 'react'
import { assoc } from 'ramda'

import { cn } from '@/lib/utils'

import { getTextSizeClass, TextSize } from './utils'

type TextTags =
  | 'span'
  | 'small'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'label'
  | 'div'
  | 'option'

type TextCustomProps<TTag extends TextTags> = {
  as?: TTag
  labelToken?: string
  className?: string
  tokenArgs?: { [key: string]: any }
  medium?: boolean
  semibold?: boolean
  bold?: boolean
  italic?: boolean
  size?: TextSize
  gray?: boolean
} & JSX.IntrinsicElements[TTag]

export type TextProps = PropsWithChildren & TextCustomProps<TextTags>

export const Text: FC<TextProps> = ({
  as,
  labelToken,
  tokenArgs,
  className,
  children,
  medium,
  semibold,
  bold,
  italic,
  size,
  gray,
  ...props
}) => {
  const classes = cn(
    'text-gray-800 dark:text-gray-200',
    {
      italic,
      'font-medium': medium,
      'font-semibold': semibold,
      'font-bold': bold,
      'text-gray-600 dark:text-gray-400': gray,
    },
    getTextSizeClass(size),
    className
  )

  return createElement(
    as ?? 'span',
    assoc('className', classes, props),
    children ?? labelToken
  )
}
