import Page from '@components/page'
import Layout from '@components/layout'
import AddUserForm from '@components/add-user-form'
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Add User',
    description: 'Add a nike User.'
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout>
        <Header hero="Add user" description={meta.description}/>
        <AddUserForm />
      </Layout>
    </Page>
  );
}
