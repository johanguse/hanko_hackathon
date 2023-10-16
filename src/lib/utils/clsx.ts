export { clsx as cn } from 'clsx'

const defaultOption = { preferLast: true }

export function removeSimilarTWClasses(
  classes: string,
  { preferLast } = defaultOption
): string {
  const result = []
  const ids = new Map()
  const classList = classes.trim().split(/\s+/)

  for (const classname of classList) {
    const i = classname.lastIndexOf('-')
    if (i !== -1) {
      const id = classname.slice(0, i)
      if (id === 'text') {
        result.push(classname)
      } else if (ids.get(id)) {
        preferLast && ids.set(id, classname)
      } else {
        ids.set(id, classname)
      }
    } else {
      result.push(classname)
    }
  }

  return result.join(' ') + ' ' + Array.from(ids.values()).join(' ')
}
