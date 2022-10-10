import { breakPoints } from '../resources/constants'
import { BreakPoint } from '../resources/types'

export const toClass = (...args: string[]) => {
  return args.join(' ')
}
export const upBreakPoint = (breakPoint: BreakPoint, property: string) => {
  return window.innerWidth > breakPoints[breakPoint] ? property : undefined
}
