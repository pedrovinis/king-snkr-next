export type Config = {
  hideContent: boolean
  locale: string
  lang: string
}

export type Image = {
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
}

export type TaskCfg = {
  size: string
}

export type Event = {
  name: string
  bio: string
  title: string
  slug: string
  talk: Talk
  image: Image
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

export type Link = {
  url: string
}

export type Sponsor = {
  name: string
  description: string
  slug: string;
  website: string
  callToAction: string
  callToActionLink: string
  links: SponsorLink[]
  discord: string
  tier: string
  cardImage: Image
  logo: Image
  youtubeSlug: string
}

export type User = {
  name: string
  email: string
  phone: string
  password: string
  slug: string
  createdAt: number
  validated: boolean
  authCookieCreatedAt: number
  authCookie: string
}

export type Snkr = {
  id: string
  slug: string
  name: string
  edition: string
  link: string
  sizes: Size[]
  release: number
  sale_price: string
}

export type Size = {
  value: string
  id: string
  code: string
}

export type SponsorLink = {
  text: string
  url: string
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