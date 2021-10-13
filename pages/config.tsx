import Page from '@components/page/page'
import ConfigForm from '@components/form/config-form'
import packageJSON from '../package.json'

export default function ConfigPage() {
  const meta = {
    title: 'Configurations'
  }

  return (
    <Page meta={meta}>
      <ConfigForm />
      <h5>{`KING SNKR V${packageJSON.version}`}</h5>
    </Page>
  )
}