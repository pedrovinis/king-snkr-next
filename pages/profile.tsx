import Page from '@components/page/page'
import TicketVisual from '@components/ticket-visual'
import ActivateKeyForm from '@components/form/activate-key-form'
import { AuthContext } from '@components/context/auth-context'
import { useContext } from 'react'
import LoadingDots from '@components/loading-dots'
import { UserProductsContext } from '@components/context/user-products-context'
import { isActive } from '@lib/isActive'
import LoginButton from '@components/login-button'
import LogoutButton from '@components/logout-button'

export default function Conf() {
  const meta = {
    title: 'pXv Profile',
  }

  const { loading, session } = useContext(AuthContext)
  const UserProducts = useContext(UserProductsContext)

  const expiration = UserProducts?.products[`king-snkr`]?.expiration
  const active = isActive(expiration)

  return (
    <Page meta={meta}>
        <TicketVisual
          name={session?.user?.name}
          email={session?.user?.email}
          active={active}
          userState={loading ? 'loading' : 'default'}
          userProductsState={UserProducts.loading ? 'loading' : 'default'}
          expiration={expiration ? expiration : null}
        />
        {!loading && (
          <>
          {session ? (
            <>
            <LogoutButton />
            {UserProducts.loading ? (
              <LoadingDots size={15}/>
            ) : (
              !active && <ActivateKeyForm />
            )}
            </>
          ) : (
            <LoginButton />
          )}
          </>
        )}
    </Page>
  )
}