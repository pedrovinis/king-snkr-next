import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { User } from '@lib/types'
import styles from './users-grid.module.css'

function UserCard({ user }: { user: User }) {
  return (
    <Link key={user.name} href={`/user/${user.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
          <Image
            alt={user.name}
            src={'/user-icon.svg'}
            className={cn(styles.image)}
            loading="lazy"
            title={user.name}
            width={1000}
            height={500}
          />
        </div>
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{user.name}</h2>
              <p className={styles.description}>{user.email}</p>
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
