import styles from './ticket-info.module.css'
import styleUtils from './utils.module.css'
import Logo from './logo'
import { DATE, SITE_URL, UserProductsState } from '@lib/constants'
import cn from 'classnames'

const siteUrl = new URL(SITE_URL);
const siteUrlForTicket = `${siteUrl.host}${siteUrl.pathname}`.replace(/\/$/, '');

type Props = {
  logoTextSecondaryColor?: string
  expiration?: number
  userProductsState?: UserProductsState
}
export default function TicketInfo({ 
  logoTextSecondaryColor = 'var(--brand)', 
  expiration,
  userProductsState
}:Props) {
  const createdBy = (
    <div className={styles['created-by']}>
      <div className={styles['created-by-text']}>{siteUrlForTicket}</div>
    </div>
  )
  return (
    <div className={styles.info}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.date}>
      <span
          className={cn(styles.skeleton, styles.wrapper, {
            [styles.show]: userProductsState == 'loading'
          })}
          > Expires In</span>
        {expiration ? (
          <>
          <div>{new Date(expiration * 1000).toLocaleDateString('pt-br')}</div>
          <div></div>
          </>
        ) : (
          ''
        )}

      </div>
      <div className={styleUtils['hide-on-mobile']}>{createdBy}</div>
      <div className={styleUtils['show-on-mobile']}>{createdBy}</div>
    </div>
  )
}
