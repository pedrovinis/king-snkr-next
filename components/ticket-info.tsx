import styles from './ticket-info.module.css'
import styleUtils from './utils.module.css'
import Logo from './logo'
import { DATE, SITE_URL } from '@lib/constants'

const siteUrl = new URL(SITE_URL);
const siteUrlForTicket = `${siteUrl.host}${siteUrl.pathname}`.replace(/\/$/, '');

export default function TicketInfo({ logoTextSecondaryColor = 'var(--brand)' }) {
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
        <div>datevalidty</div>
        <div>Validity</div>
      </div>
      <div className={styleUtils['hide-on-mobile']}>{createdBy}</div>
      <div className={styleUtils['show-on-mobile']}>{createdBy}</div>
    </div>
  )
}
