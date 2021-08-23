import fs from 'fs'
import Page from '@components/page'
import SnkrsGrid from '@components/snkrs-grid'
import Header from '@components/header'
import Layout from '@components/layout'

import { GetServerSideProps } from 'next'
import { Snkr } from '@lib/types'
import Link from 'next/link'

type Props = {
  snkrs: Snkr[]
}


export default function SnkrsPage( {snkrs}: Props) {
  const meta = {
    title: 'King Snkr | Snkrs',
    description: 'Here you will find your nike snkrs.'
  }

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Snkrs" description={meta.description} />
        <Link href={'/addsnkr'}>
          <a
          className='button'
          style={{
            width:'325px',
          }}
          >
            Add Snkr
          </a>
        </Link>
        <SnkrsGrid snkrs={snkrs} />
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })

  return {
    props: {
      snkrs
    }
  }
}