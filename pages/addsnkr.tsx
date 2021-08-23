import Page from '@components/page'
import Layout from '@components/layout'
import Form from '@components/form'
import AddSnkrForm from '@components/add-snkr-form'
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Add SNKR',
    description: 'Add a nike Snkr.'
  };


  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Add SNKR" description={meta.description}/>
        <AddSnkrForm />
      </Layout>
    </Page>
  );
}
