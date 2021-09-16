import cn from 'classnames'
import { useContext, useState } from 'react'
import { User } from '@lib/types'
import styles from './user-card.module.css'
import UserIcon from './icons/icon-user'
import { PhoneNumberFormat } from '@lib/form-format'
import { ConfigContext } from './config-context'

type Props = {
  user: User
}

export default function UserCard({ user }: Props) {
  const [isReleased, setReleased] = useState(false)
  const { config } = useContext(ConfigContext)

  const title = user.name

  return (
    <div key={title} className={styles.main}>
        <a
          className={cn(styles.card, {
            [styles['is-released']]: isReleased
          })}
        >
          <div className={styles['card-body']}>
            <h4 title={title} className={styles.title}> 
              {title} 
            </h4>
            <span className={cn(styles.name, {
              ["hide"]: config.hideContent
            })}>{user.email}</span>
            
            <div className={styles.speaker}>
              <div className={styles['avatar-group']}>
                  <div className={styles['avatar-wrapper']}>
                    <UserIcon size={'85px'}/>
                  </div>
              </div>
              <h5 className={styles.phone}>
                Phone: <br/>
                <span className={config.hideContent ? "hide": ''}>
                  {PhoneNumberFormat(user.phone)}</span>
              </h5>
            </div>
          </div>
        </a>
    </div>
  )
}
