import { User } from '@lib/types'
import styles from './user-section.module.css'
import IconUser from './icons/user-icon'
import { useContext, useState } from 'react'
import LoadingDots from './loading-dots'
import { deleteUserFetch } from '@lib/user-api'
import router from 'next/router'
import BackLink from './backLink'
import { toast } from 'react-toastify'
import { PhoneNumberFormat } from '@lib/form-format'
import { ConfigContext } from './config-context'
import cn from 'classnames'
import IconInfo from './icons/info-icon'

type Props = {
  user: User
}

type ButtonState = 'default' | 'loading' | 'error'

export default function UserSection({ user }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')
  const { config } = useContext(ConfigContext)
  
  const handleDeleteResponse = async(res:Response) => {
    const data = await res.json()
    if(data.success) {
      router.push('/users')
      toast.success(`"${user.name}" successful deleted.`)
    }
    else {
      toast.error(`Error on delete "${user.name}". ${data.message}`)
    }
  }

  return (
    <>
      <BackLink text={"Back to Users"} href={'/users'}/>
      <div key={user.name} className={styles.container}>
        <div className={styles.iconUser}>
          <IconUser size={'200px'}/>
        </div>
        <div className={styles['user-details']}>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={cn(styles.title, {
              ["hide"]: config.hideContent
            })}>
              {user.email}
            </p>
            <h2 className={styles['bio-header']}>Phone</h2>
            <p className={cn(styles.title, {
              ["hide"]: config.hideContent
            })}>{PhoneNumberFormat(user.phone)}</p>
        </div>
      </div>
        <div className={styles['info']}>
          <h3 className={styles['warning-header']}>Warning <IconInfo /></h3>
          <p>This user info can be found on path: 'bin/users'. Do not try to change user using file explorer, it can broke application.</p>
        </div>

        <button
        id='buttonRed'
        onClick={async()=> {
          setDeleteButtonState('loading')
          const res:any = await deleteUserFetch(user)
          await handleDeleteResponse(res)
          setDeleteButtonState('default')
        }}
      >
        {deleteButtonState === 'loading' ? <LoadingDots size={5} /> : <>Delete User</>}
      </button>
    </>
  )
}