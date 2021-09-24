import styles from './ticket-info.module.css'
import styleUtils from './utils.module.css'
import Logo from './logo'
import { SITE_URL, UserProductsState } from '@lib/constants'
import cn from 'classnames'

const siteUrl = new URL(SITE_URL);
const siteUrlForTicket = `${siteUrl.host}${siteUrl.pathname}`.replace(/\/$/, '');

type Props = {
  logoTextSecondaryColor?: string
  active?: boolean
  expiration?: number | null | undefined
  userProductsState?: UserProductsState
}
export default function TicketInfo({ 
  logoTextSecondaryColor = 'var(--brand)', 
  active,
  expiration,
  userProductsState
}:Props) {
  const createdBy = (
    <div className={styles['created-by']}>
      <div className={styles['created-by-text']}>pxv.app</div>
    </div>
  )
  return (
    <div className={styles.info}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.date}>
        <span 
        style={{'color':'var(--brand)'}}
        className={cn(styles.skeleton, styles.wrapper, {
          [styles.show]: userProductsState == 'loading'
        })}>{expiration ? (
          <>
          {active ? (
            <>Expira em</>
          ) : (
            <span style={{'color': 'var(--red)'}}>Expirado em</span>
          )}
          </>
        ) : (
          <span style={{'color': 'var(--red)'}}>Desativado</span>
        )}
        </span>
        <span
        className={cn(styles.skeleton, styles.wrapper, styles.expiration, {
          [styles.show]: userProductsState == 'loading'
        })}
        > 
        {expiration ? (
          <>
          <div>{new Date(expiration * 1000).toLocaleDateString('pt-br')}</div>
          <div></div>
          </>
        ) : (
          <>
          {userProductsState == 'loading' ? (
            <>XX/XX/XXXX</>
          ) : (
            ''
          )}
          </>
        )}
      </span>
      </div>
      <div className={styleUtils['hide-on-mobile']}>{createdBy}</div>
      <div className={styleUtils['show-on-mobile']}>{createdBy}</div>
    </div>
  )
}
