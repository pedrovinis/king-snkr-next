import { User } from '@lib/types'
import styles from './user-section.module.css'
import IconAvatar from './icons/icon-avatar'
import { useState } from 'react'
import LoadingDots from './loading-dots'
import { deleteUserFetch } from '@lib/user-api'
import router from 'next/router'
import BackLink from './backLink'
import { toast } from 'react-toastify'

type Props = {
  user: User
}

type ButtonState = 'default' | 'loading' | 'error'

export default function UserSection({ user }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')
  
  const handleDeleteResponse = async(res:Response) => {
    const data = await res.json()
    if(data.success) {
      router.push('/users')
      toast.success(`"${user.name}" successful deleted.`)
    }
    else {
      toast.error(`Error on delete "${user.name}".`)
    }
  }

  return (
    <>
      <BackLink text={"Back to Users"} href={'/users'}/>
      <div key={user.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <IconAvatar size={'250px'}/>
        </div>
        <div className={styles['user-details']}>
          <div>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.title}>
              {user.email}
            </p>
            <h2 className={styles['bio-header']}>Phone</h2>
            <p className={styles.title}>{user.phone}</p>
          </div>
        </div>
      </div>
        <div className={styles['info']}>
          <h3 className={styles['warning-header']}>Warning</h3>
          <p>This user info can be found on path: 'bin/users'. Do not try to change user using file explorer, it can broke application.</p>
        </div>

        <button
      className='buttonRed'
      style={{
        margin: '5px auto',
        width: '325px',
        }}
        onClick={async()=> {
          setDeleteButtonState('loading')
          const res:any = await deleteUserFetch(user)
          await handleDeleteResponse(res)
          setDeleteButtonState('default')
        }}
      >
        {deleteButtonState === 'loading' ? <LoadingDots size={6} /> : <>Delete User</>}
      </button>
    </>
  )
}