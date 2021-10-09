import Page from '@components/page/page'
import AddUserForm from '@components/add-user-form'
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Add User',
    description: 'Add a nike User.'
  }

  return (
    <Page meta={meta} fullViewport>
        <Header hero="Add User" description={meta.description}/>
        <AddUserForm />
    </Page>
  )
}
