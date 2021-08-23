import Page from '@components/page'
import SponsorsGrid from '@components/sponsors-grid'
import Header from '@components/header'
import Layout from '@components/layout'

import { Sponsor } from '@lib/types'

type Props = {
  products: Sponsor[]
}

export default function ExpoPage({ products }: Props) {
  const meta = {
    title: 'pXv | Snkrs',
    description: 'Here you are going to find pXv official products to buy.'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Snkrs" description={meta.description} />
        <SponsorsGrid sponsors={products} />
      </Layout>
    </Page>
  )
}