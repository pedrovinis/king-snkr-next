import { UserState } from '@lib/constants'
import PxvIcon from '@components/icons/icon-platform'
import cn from 'classnames'
import IconUser from './icons/icon-user'
import styles from './ticket-profile.module.css'
import { useContext } from 'react'
import { ConfigContext } from './config-context'

type Props = {
  name?: string
  email?: string
  size?: number
  userState: UserState
}

export default function TicketProfile({ name, email, size = 1, userState }: Props) {
  const { config } = useContext(ConfigContext)
  return (
    <div className={styles.profile}>
      <span
        className={cn(styles.skeleton, styles.wrapper, styles.inline, styles.rounded, {
          [styles.show]: userState === 'loading'
        })}
      >
        <span className={cn(styles.image, styles['empty-icon'])}>
          <IconUser size={'50px'}/> 
        </span>
      </span>
      <div className={styles.text}>
        <p
          className={cn(styles.name, {
            [styles['name-blank']]: !email
          })}
        >
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              [styles.show]: userState=== 'loading'
            })}
          >
            {name || email || 'Your Name'}
          </span>
        </p>
        <p className={styles.email}>
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              [styles.show]: userState=== 'loading',
              ["hide"]: config.hideContent
            })}
          >
            <span className={styles.icon}>
              <PxvIcon color="var(--secondary-color)" size={`20`} />
            </span>
            {email || <>Email</>}
          </span>
        </p>
      </div>
    </div>
  );
}
