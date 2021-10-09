import Page from '@components/page/page'
import AddSnkrForm from '@components/add-snkr-form'
import Header from '@components/header'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Add SNEAKER',
    description: 'Add a nike SNEAKER.'
  };


  return (
    <Page meta={meta} fullViewport>
        <Header hero="Add SNEAKER" description={meta.description}/>
        <AddSnkrForm />
    </Page>
  )
}
