export const SITE_URL = 'https://pxv.vercel.app'
export const SITE_ORIGIN = 'https://pxv.vercel.app/'
export const BRAND_NAME = 'pXv'

export const SITE_DESCRIPTION = 'The best experience for you.'
export const DATE = 'September 20, 2021'

export const COOKIE = 'user-id'

export const NAVIGATION = [
  {
    name: 'Profile',
    route: '/profile'
  },
  {
    name: 'Tasks',
    route: '/tasks'
  },
  {
    name: 'Users',
    route: '/users'
  },
  {
    name: 'SNKRS',
    route: '/snkrs'
  },
  {
    name: 'Schedule',
    route: '/schedule'
  }
]

export const TASKPROGRESS = [
  `Desactived`,
  'Starting',
  'Waiting',
  'NIKE LOGIN',
  'Waiting',
  'SNKR Buy',
  'SMS Confirm',
  'Completed'
]

export type TicketGenerationState = 'default' | 'loading'
