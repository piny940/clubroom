export const MY_TALK_COLOR: string = 'rgb(94, 187, 242)' // Blue
export const OTHERS_TALK_COLOR: string = 'rgb(0, 220, 48)' // Green
export const TALK_BORDER_RADIUS: string = '10px'

export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://clubroom.fly.dev'

export const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}
