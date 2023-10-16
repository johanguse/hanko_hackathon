import { compose, either } from 'ramda'

import { isNotNil } from './validation'

export const randomInt = (max: number = Number.MAX_SAFE_INTEGER) =>
  Math.floor(Math.random() * max)

export function toInt(stringNumber: string): number {
  const result = Number.parseInt(stringNumber, 10)
  return Number.isNaN(result) ? null : result
}

export const isInteger = either(Number.isInteger, compose(isNotNil, toInt))
