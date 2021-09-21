import i18n from "translate/i18n"

export const SITE_URL = 'https://pxv.vercel.app'
export const SITE_ORIGIN = 'https://pxv.vercel.app/'
export const BRAND_NAME = 'pXv'

export const LOCAL_LINK =  'http://localhost:3000'

export const SITE_DESCRIPTION = i18n.t('index.the_best_experience')

export const TASK_PROGRESS = [
  `Desactived`,
  'Waiting',
  'NIKE LOGIN',
  'Waiting',
  'Adding to Cart',
  'Generating SMS',
  'Waiting SMS Confirm',
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