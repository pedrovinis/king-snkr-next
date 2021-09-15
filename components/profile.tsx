/* eslint-disable @typescript-eslint/no-unsafe-call */
import styles from './profile.module.css'
import UserIcon from "./icons/icon-user"
import LogoutButton from "./logout-button"

export default function Profile({user}:any) {

  return (
      <div className={styles.main}>
          <UserIcon size={`90px`}/>
        <div className={styles.info}>
            {user?.name}
            <p>{user?.email}</p>
            <LogoutButton />
        </div>
      </div>
    )
}