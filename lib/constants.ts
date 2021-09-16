export const SITE_URL = 'https://pxv.vercel.app'
export const SITE_ORIGIN = 'https://pxv.vercel.app/'
export const BRAND_NAME = 'pXv'

export const SITE_DESCRIPTION = 'A melhor experiência para você.'

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

export const TASK_PROGRESS = [
  `Desactived`,
  'Starting',
  'Waiting',
  'NIKE LOGIN',
  'Waiting',
  'Buying SNKR',
  'SMS Confirm',
  'Checkout',
  'Completed'
]

export const CONFIG_OPTIONS = {
  locale: ['Brasil'],
  lang: [
    ['pt-br', 'Português BR'],
    ['en-us', 'English'] 
  ]
}

export type UserState = 'default' | 'loading'
export type UserProductsState = 'default' | 'loading'