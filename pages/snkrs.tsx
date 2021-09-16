import fs from 'fs'
import Page from '@components/page'
import SnkrsGrid from '@components/snkrs-grid'
import Header from '@components/header'
import Layout from '@components/layout'

import { GetServerSideProps } from 'next'
import { Snkr } from '@lib/types'
import Link from 'next/link'
import EmptyList from '@components/empty-list'
import i18n from 'translate/i18n'

type Props = {
  snkrs: Snkr[]
}

export default function SnkrsPage( {snkrs}: Props) {
  const meta = {
    title: 'King Snkr | Snkrs',
    description: 'Here you will find your Nike SNKRS.'
  }

  const isEmpty = !snkrs.length

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="SNKRS" description={meta.description} />
        <Link href={'/addsnkr'}>
          <button
          className='button'
          >
            {i18n.t('buttons.add_snkr')}
          </button>
        </Link>
        {isEmpty ?(
          <EmptyList list={'snkr'} buttonText={i18n.t('buttons.add_snkr')}/>
        ): (
          <SnkrsGrid snkrs={snkrs} />
        )}
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const snkrsFileName = fs.readdirSync('bin/snkrs')
  const snkrs: Snkr[] = snkrsFileName.map( (snkrFileName) => {
    return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
  })

  return {
    props: {
      snkrs
    }
  }
}