/* eslint-disable @typescript-eslint/no-unsafe-call */
import { signOut } from "next-auth/client"
import styles from './profile.module.css'

import {  useState } from "react"
import LoadingDots from "./loading-dots"
import UserIcon from "./icons/icon-user"
import { SITE_URL } from "@lib/constants"
import LogoutButton from "./logout-button"

type ButtonState = 'default' | 'loading' 

export default function Profile({user}:any) {
    const [signOutState, setSignOutState] = useState('default')

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