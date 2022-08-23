import { AlertState } from '../utils/enums'

export interface Alert {
  id: number
  content: string
  state: AlertState
}

export type InputType = 'text' | 'email' | 'password'
