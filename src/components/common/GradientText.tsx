import { FC } from 'react'

import { Text, TextProps } from './Text'

type GradientTextProps = {
  charRange: [number, number?]
} & TextProps

const splitRange = (text: string, range: [number, number?]) => {
  return [
    text.slice(0, range[0]),
    text.slice(range[0], range[1] ?? text.length),
    range[1] ? text.slice(range[1]) : '',
  ]
}

export const GradientText: FC<GradientTextProps> = ({
  labelToken,
  charRange,
  ...props
}) => {
  const [leftText, gradientText, rightText] = splitRange(
    String(labelToken),
    charRange
  )

  return (
    <Text {...props}>
      <>
        {leftText}
        <span
          className={`
            bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent 
              dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400
          `}
        >
          {gradientText}
        </span>
        {rightText}
      </>
    </Text>
  )
}
