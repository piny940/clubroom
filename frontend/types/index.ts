export type AlertState = 'danger' | 'notice' | 'success'

export interface Alert {
  id: number
  content: string
  hasShown: boolean
  state: 'danger' | 'notice' | 'success'
}
