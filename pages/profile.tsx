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
import LoginButton from '@components/login-button'
import PageContainer from '@components/page-container'
import LogoutButton from '@components/logout-button'
import i18n from 'translate/i18n'

export default function Conf() {
  const meta = {
    title: 'King Snkr | Profile',
    description: 'pXv'
  }

  const { loading, session } = useContext(AuthContext)
  const UserProducts = useContext(UserProductsContext)

  const expiration = UserProducts?.products[`king-snkr`]?.expiration
  const active = isActive(expiration)

  return (
    <Page meta={meta} fullViewport>
      <Layout >
      <Header hero={i18n.t('profile.title')} description=""/>
      <PageContainer >
        <TicketVisual
          name={session?.user?.name}
          email={session?.user?.email}
          active={active}
          userState={loading ? 'loading' : 'default'}
          userProductsState={UserProducts.loading ? 'loading' : 'default'}
          expiration={expiration ? expiration : null}
        />

        {loading ? (
          <></>
        ) : (
          <>
          {session ? (
            <>
            <LogoutButton />
            {UserProducts.loading ? (
              <div style={{display:'flex', justifyContent:'center', margin: '3rem 0'}}><LoadingDots size={15}/></div>
            ) : (
              <>
                {active ? (
                  <></>
                ) : (
                  <ActivateKeyForm />
                )}
              </>
            )}
            </>
          ) : (
            <LoginButton />
          )}
          </>
        )}
        
        </PageContainer>
      </Layout>
    </Page>
  )
}