import Layout from '@components/layout'
import Page from '@components/page'
import TicketVisual from '@components/ticket-visual'
import Header from '@components/header'
import ActivateKeyForm from '@components/activate-key-from'
import { AuthContext } from '@components/auth-context'
import { useContext } from 'react'
import LoadingDots from '@components/loading-dots'
import { UserProductsContext } from '@components/user-products-context'
import { isActive } from '@lib/isActive'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Profile',
    description: 'pXv'
  }
  const { loading, session } = useContext(AuthContext)
  const UserProducts = useContext(UserProductsContext)

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero="Profile" description=""/>
        <TicketVisual
          name={session?.user?.name}
          email={session?.user?.email}
          active={isActive(UserProducts.products['king-snkr']?.expiration * 1000) ? true : false}
          userState={!loading ? 'loading' : 'default'}
          userProductsState={UserProducts.loading ? 'loading' : 'default'}
        />
        <ActivateKeyForm />
      </Layout>
    </Page>
  );
}
