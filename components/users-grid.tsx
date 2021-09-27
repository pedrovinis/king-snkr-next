import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { User } from '@lib/types'
import styles from './users-grid.module.css'
import UserIcon from './icons/icon-user'
import { ReactElement, useContext, useState } from 'react'
import { ConfigContext } from './config-context'
import SearchBar from './search-bar'

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
  const [searchValue, setSearchValue] = useState('')
  const fSearchValue = searchValue.toUpperCase().replace(/\s/g, '').replace(/\s/g, '').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

  const filtredUSERS:ReactElement[] = []

  users.map(user => {
    const fSnkrName = user.name.toUpperCase().replace(/\s/g, '')
    if(fSnkrName.search(fSearchValue) >= 0) {
      filtredUSERS.push(<UserCard key={user.name} user={user} /> )
    }
  })

  return (
    <>
      {users.length > 1 ? <SearchBar value={searchValue} setValue={setSearchValue}/> : ''}
      {filtredUSERS.length ? (
        <div className={styles.grid}>
          {filtredUSERS}
        </div>
      ) : (
        <div className={styles.notFoundMessage}>
          There are no users that match
        <a style={{color:'var(--brand)'}}> "{searchValue}" </a>
      </div>
      )}

    </>
  )
}
