import fs from 'fs'
import Page from '@components/page'
import Layout from '@components/layout'
import ConfigForm from '@components/config-form'
import Header from '@components/header'
import { Config } from '@lib/types'
import { GetServerSideProps } from 'next'
import PageContainer from '@components/page-container'


type Props = {
  config: Config
}

export default function ConfigPage({config}:Props) {
  const meta = {
    title: 'King Snkr | Config',
    description: 'Configure your preferences.'
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Config" description={meta.description}/>
          <ConfigForm config={config}/>
      </Layout>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const config = JSON.parse(fs.readFileSync(`bin/config.json`, 'utf8'))

  return {
    props: {
      config
    }
  }
}