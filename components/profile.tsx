/* eslint-disable @typescript-eslint/no-unsafe-call */
import styles from './profile.module.css'
import UserIcon from "./icons/user-icon"
import LogoutButton from "./logout-button"
import { useContext } from 'react'
import { ConfigContext } from './config-context'

export default function Profile({user}:any) {
  const { config } = useContext(ConfigContext)
  return (
      <div className={styles.main}>
          <UserIcon size={`70px`}/>
        <div className={styles.info}>
            {user?.name}
            <p className={config.hideContent ? "hide" : ''}>{user?.email}</p>
            <LogoutButton />
        </div>
      </div>
    )
}