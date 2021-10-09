export type Config = {
  hideContent: boolean
  locale: string
  lang: string
}

export type image = {
  url: string
}

export type Task = {
  name: string
  slug: string
  user: User
  snkr: Snkr
  cfg: TaskCfg
  progress: number
  active: boolean
  running: boolean
}

export type TaskCfg = {
  size: Size
}

export type Event = {
  name: string
  bio: string
  title: string
  slug: string
  talk: Talk
  image: image
}

export type Stage = {
  name: string
  slug: string
  schedule: Snkr[]
}

export type Talk = {
  title: string
  description: string
  start: string
  end: string
}

export type link = {
  name: string
  route: string
}


export type User = {
  kingsnkr_id: string
  plataform: string
  name: string
  email: string
  phone: string
  password: string
  slug: string
  created_at: number
  authCookieCreatedAt: number
  authCookie: string
}

export type Size = {
  value: string
  id: string
  code: string
}

export type Snkr = {
  plataform: string
  id: string
  SKU: string
  slug: string
  name: string
  image: string
  edition: string
  link: string
  sizes: Size[]
  release: number
  sale_price: string
  kingsnkr_id: string
}


export type Service = {
  id: string
  companyName: string
  title: string
  description: string
  discord: string
  link: string
  rank: number
}

export type ConfUser = {
  id?: string
  email: string
  ticketNumber: number
  name?: string
  username?: string
  createdAt: number
}