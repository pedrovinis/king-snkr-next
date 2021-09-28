import fs from 'fs'
import Page from '@components/page'
import Layout from '@components/layout'
import { Snkr } from '@lib/types'
import SnkrSection from '@components/snkr-section'
import { GetServerSideProps } from 'next'
import PageContainer from '@components/page-container'
import Link from 'next/link'

type Props = {
  snkr?: Snkr | null
}

export default function SnkrPage({ snkr }: Props) {
  const meta = {
    title: `King Snkr | ${snkr? `${snkr.name} ${snkr.edition}`: 'SNKR Not Found'}`,
    description: 'a'
  }

  return (
    <Page meta={meta}>
      <Layout>
        { snkr? (
          <SnkrSection snkr={snkr} />
        ) : (
          <PageContainer>
            <h1> SNEAKER Not Found </h1>
            <Link href="/sneakers"><a>Click here to check your SNEAKERS.</a></Link>
          </PageContainer>
        )}
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const slug = params?.slug;
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })
  const snkr = snkrs.find((s:any) => s.slug === slug) || null

  return {
    props: {
      snkr: snkr
    }
  }
}