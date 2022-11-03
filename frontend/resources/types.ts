import { AlertState } from './enums'

export interface Alert {
  id: number
  content: string
  state: AlertState
}

export interface AlertInput {
  content: string
  state: AlertState
}

export type InputType = 'text' | 'email' | 'password' | 'textarea'
export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface User {
  id: number
  email: string
  name: string
  gender: 'male' | 'female' | 'other'
  school: string
  global_profile: string
  global_icon: string
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
  entry_token: string
}

export interface Joining {
  id: number
  group_id: number
  user_id: number
  role: 'member' | 'staff' | 'admin' | 'ob' | 'left'
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
  from_user: {
    name: string
    global_icon: string
  }
}

export interface TalkEntry {
  id: number
  talkroom_id: number
  user_id: number
  role: 'member' | 'staff'
  created_at: Date
  updated_at: Date
}
