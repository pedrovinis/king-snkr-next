import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { User } from '@lib/types'
import styles from './users-grid.module.css'
import UserIcon from './icons/icon-user'
import { useContext } from 'react'
import { ConfigContext } from './config-context'

function UserCard({ user }: { user: User }) {
  const { config } = useContext(ConfigContext)

  return (
    <Link key={user.name} href={`/user/${user.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
          <UserIcon size={`150px`}/>
        </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{user.name}</h2>
              <p className={cn(styles.description, {
                ["hide"]: config.hideContent
              })}>{user.email}</p>
            </div>
          </div>
      </a>
    </Link>
  );
}

type Props = {
  users: User[]
}

export default function usersGrid({ users }: Props) {
  return (
    <>
      <div className={styles.grid}>
        {users.map(user => <UserCard key={user.name} user={user} /> )}
      </div>
    </>
  )
}
