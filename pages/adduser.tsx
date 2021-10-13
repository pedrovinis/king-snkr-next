import Page from '@components/page/page'
import AddUserForm from '@components/form/add-user-form'

export default function Conf() {
  const meta = {
    title: 'Add User',
  }

  return (
    <Page meta={meta}>
        <AddUserForm />
    </Page>
  )
}
