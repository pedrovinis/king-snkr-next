/* eslint-disable @typescript-eslint/no-unsafe-call */
import { signOut } from "next-auth/client"
import styles from './profile.module.css'

import {  useState } from "react"
import LoadingDots from "./loading-dots"
import UserIcon from "./icons/icon-user"

type ButtonState = 'default' | 'loading' 

export default function Profile({user}:any) {
    const [signOutState, setSignOutState] = useState('default')

  return (
      <div className={styles.main}>
          <UserIcon size={`90px`}/>
        <div className={styles.info}>
            {user?.name}
            <p>{user?.email}</p>
            <button
            style={{'width':`150px`}} 
            className="buttonRed" onClick={()=> {
                setSignOutState('loading')
                void signOut()
            }}>
                {signOutState == 'default' ? <> Sair </> : <LoadingDots size={6}/>}
            </button>
        </div>
      </div>
    )
}
