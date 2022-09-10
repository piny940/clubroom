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

export interface Talkroom {
  id: number
  name: string
  group_id: number // DMの機能ができたらgroup_id?: numberになる
  kind: 'group' | 'direct'
  entry_token: string
  created_at: Date
  updated_at: Date
}

export interface Talk {
  id: number
  from_user_id?: number
  content: string
  created_at: Date
  updated_at: Date
}

export interface TalkEntry {
  id: number
  talkroom_id: number
  user_id: number
  role: 'member' | 'staff'
  created_at: Date
  updated_at: Date
}
