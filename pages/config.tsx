import Page from '@components/page'
import Layout from '@components/layout'
import ConfigForm from '@components/config-form'
import Header from '@components/header'
import i18n from 'translate/i18n'

export default function ConfigPage() {
  const meta = {
    title: 'King Snkr | Config',
    description: i18n.t('config.desc')
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero={i18n.t('config.title')} description={meta.description}/>
          <ConfigForm />
      </Layout>
    </Page>
  )
}