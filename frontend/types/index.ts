import { AlertState } from '../utils/enums'

export interface Alert {
  id: number
  content: string
  state: AlertState
}

export interface AlertInput {
  content: string
  state: AlertState
}

export type InputType = 'text' | 'email' | 'password'

export interface User {
  id: number
  name: string
  kind: string
  created_at: Date
  updated_at: Date
}

export interface Group {
  id: number
  name: string
  school?: string
  created_at: Date
  updated_at: Date
}
