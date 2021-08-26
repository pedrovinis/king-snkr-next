import Layout from '@components/layout';
import Page from '@components/page';
import TicketVisual from '@components/ticket-visual'
import Header from '@components/header'
import ActivateKeyForm from '@components/activate-key-from';

export default function Conf() {
  const meta = {
    title: 'King Snkr | Profile',
    description: 'pXv'
  }

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero="Profile" description=""/>
      <TicketVisual
            username={undefined}
            name={undefined}
            ticketCode={undefined}
            ticketGenerationState={undefined}
          />
        <ActivateKeyForm />
      </Layout>
    </Page>
  );
}
