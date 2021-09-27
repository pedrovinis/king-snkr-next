import Page from '@components/page'
import Layout from '@components/layout'
import AddSnkrForm from '@components/add-snkr-form'
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Add SNEAKER',
    description: 'Add a nike SNEAKER.'
  };


  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Add SNEAKER" description={meta.description}/>
        <AddSnkrForm />
      </Layout>
    </Page>
  )
}
