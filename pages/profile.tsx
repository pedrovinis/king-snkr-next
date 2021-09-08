import Layout from '@components/layout';
import Page from '@components/page';
import TicketVisual from '@components/ticket-visual'
import Header from '@components/header'
import ActivateKeyForm from '@components/activate-key-from';
import { AuthContext } from '@components/auth-context';
import { useContext } from 'react';
import LoadingDots from '@components/loading-dots';

export default function Conf() {
  const meta = {
    title: 'King Snkr | Profile',
    description: 'pXv'
  }
  const { loading, session } = useContext(AuthContext)

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero="Profile" description=""/>
      {loading ? (
        <LoadingDots size={20} />
      ) : (
      <>
      {session ? (
        <TicketVisual
          name={session?.user?.name}
          email={session?.user?.email}
          ticketCode={undefined}
          ticketGenerationState={undefined}
        />
      ) : (
        <>NO SESSION</>
      )}

      </>
      )}

        <ActivateKeyForm />
      </Layout>
    </Page>
  );
}
