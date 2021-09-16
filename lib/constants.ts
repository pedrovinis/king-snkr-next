import i18n from "translate/i18n"

export const SITE_URL = 'https://pxv.vercel.app'
export const SITE_ORIGIN = 'https://pxv.vercel.app/'
export const BRAND_NAME = 'pXv'

export const SITE_DESCRIPTION = 'A melhor experiência para você.'

export const NAVIGATION = [
  {
    name: i18n.t('nav_bar.profile'),
    route: '/profile'
  },
  {
    name: i18n.t('nav_bar.tasks'),
    route: '/tasks'
  },
  {
    name: i18n.t('nav_bar.users'),
    route: '/users'
  },
  {
    name: i18n.t('nav_bar.snkrs'),
    route: '/snkrs'
  },
  {
    name: i18n.t('nav_bar.schedule'),
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
  hideContent: false,
  locale: ['Brasil'],
  lang: [
    ['pt-br', 'Português BR'],
    ['en', 'English'] 
  ]
}

export type UserState = 'default' | 'loading'
export type UserProductsState = 'default' | 'loading'