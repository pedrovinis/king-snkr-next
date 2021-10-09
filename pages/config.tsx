import Page from '@components/page/page'
import ConfigForm from '@components/config-form'
import Header from '@components/header'
import i18n from 'translate/i18n'
import packageJSON from '../package.json'

export default function ConfigPage() {
  const meta = {
    title: 'King Snkr | Config',
    description: i18n.t('config.desc')
  }

  return (
    <Page meta={meta} fullViewport>
        <Header hero={i18n.t('config.title')} description={meta.description}/>
          <ConfigForm />
          <h5 style={{margin: '0 auto', marginTop: '1.5rem'}}>{`KING SNKR V${packageJSON.version}`}</h5>
    </Page>
  )
}