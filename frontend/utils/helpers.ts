import { breakPoints } from '../resources/constants'
import { BreakPoint } from '../resources/types'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const upBreakPoint = (breakPoint: BreakPoint, property: string) => {
  if (typeof window === 'undefined') return
  return window.innerWidth > breakPoints[breakPoint] ? property : undefined
}
