import {
  createElement,
  FC,
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

type InputProps = InputHTMLAttributes<HTMLInputElement>

type TextInputProps = { textArea?: boolean } & (TextAreaProps | InputProps)

export const TextInput = forwardRef(function Text(
  { textArea, className, ...props }: TextInputProps,
  ref
) {
  return createElement(textArea ? 'textarea' : 'input', {
    ...props,
    type: 'text',
    className: cn(
      `
        rounded-md border-gray-300
            dark:bg-black dark:text-white dark:border-gray-700
        focus:ring focus:ring-purple-200 focus:ring-opacity-50
            dark:focus:ring-purple-300
      `,
      className
    ),
    ref,
  })
})
