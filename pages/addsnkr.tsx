import Page from '@components/page/page'
import AddSnkrForm from '@components/form/add-snkr-form'

export default function Conf() {
  const meta = {
    title: 'Add Sneaker',
  }

  return (
    <Page meta={meta}>
        <AddSnkrForm />
    </Page>
  )
}
