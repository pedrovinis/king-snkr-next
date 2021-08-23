import Link from 'next/link';
import { User } from '@lib/types';
import styles from './user-section.module.css';
import IconAvatar from './icons/icon-avatar';

type Props = {
  user: User
}

export default function UserSection({ user }: Props) {
  return (
    <>
      <Link href="/users">
        <a className={styles.backlink}>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Users
        </a>
      </Link>
      <div key={user.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <IconAvatar size={'90%'}/>
        </div>
        <div className={styles['user-details']}>
          <div>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.title}>
              {user.email}
            </p>
            <h2 className={styles['bio-header']}>Phone</h2>
            <p className={styles.bio}>{user.phone}</p>
          </div>
        </div>
      </div>
        <div className={styles['info']}>
          <h3 className={styles['warning-header']}>Warning</h3>
          <p>This user info can be found on 'bin/users'</p>
        </div>
    </>
  )
}
