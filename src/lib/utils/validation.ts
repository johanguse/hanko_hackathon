import { complement, either, equals, isNil } from 'ramda'

export function isNumericString(value: any): boolean {
  const valueType = typeof value
  if (valueType === 'number') return true
  if (valueType !== 'string') return false

  return !Number.isNaN(value) && !Number.isNaN(parseFloat(value))
}

export const isNotNil: (value: any) => boolean = complement(isNil)

const isHttpProtocol = either(equals('http:'), equals('https:'))

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return isHttpProtocol(url.protocol)
  } catch (_) {
    return false
  }
}
