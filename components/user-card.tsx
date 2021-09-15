import cn from 'classnames'
import { useState } from 'react'
import { User } from '@lib/types'
import styles from './user-card.module.css'
import UserIcon from './icons/icon-user'
import { PhoneNumberFormat } from '@lib/form-format'

type Props = {
  user: User
}

export default function UserCard({ user }: Props) {
  const [isReleased, setReleased] = useState(false)

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
            <a className={styles.name}>{user.email}</a>
            
            <div className={styles.speaker}>
              <div className={styles['avatar-group']}>
                  <div className={styles['avatar-wrapper']}>
                    <UserIcon size={'85px'}/>
                  </div>
              </div>
              <h5 className={styles.phone}>
                Phone: <br/>
                {PhoneNumberFormat(user.phone)}
              </h5>
            </div>
          </div>
        </a>
    </div>
  )
}
