import { Snkr } from '@lib/types'
import styles from './snkr-section.module.css'
import IconSnkr from './icons/icon-snkrs'
import { useState } from 'react'
import LoadingDots from './loading-dots'
import { deleteSnkrFetch } from '@lib/snkr-api'
import router from 'next/router'
import BackLink from './backLink'
import CopyButton from './copy-button'
import { toast } from 'react-toastify'

type Props = {
  snkr: Snkr
}

type ButtonState = 'default' | 'loading' | 'error'

export default function SnkrSection({ snkr }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')

    const formatRelease = (release:number) => {
      if(release < new Date().getTime()/1000) return 'Released'
      const timeStamp = new Date(release * 1000)
      const formatedDate = timeStamp.toLocaleString('pt-BR')
      return formatedDate
  }
  
  const handleDeleteSnkrRes = async(res:Response) => {
    const data = await res.json()
    if(data.success){
      router.push('/snkrs')
      toast.success(`"${snkr.name}" succesfull deleted.`)
    }
    else {
      toast.error(`Error on deleting "${snkr.name}"'.`)
    }
  }

  return (
    <>
      <BackLink text={"Back to SNKRS"} href={'/snkrs'}/>
      <div key={snkr.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <IconSnkr />
        </div>
        <div className={styles['snkr-details']}>
          <div>
            <h1 className={styles.name}>{snkr.name}</h1>
            <p className={styles.title} >
              {snkr.id}
            </p>
            <h2 className={styles['bio-header']}>Sale Price</h2>
            <p className={styles.title}>R$ {snkr.sale_price}</p>

            <h2 className={styles['bio-header']}>Release</h2>
            <p className={styles.title}>{formatRelease(snkr.release)}</p>

            <h2 className={styles['bio-header']}>Link</h2>
            <p className={styles.bio}>{snkr.link} <CopyButton value={snkr.link}/> </p>
           

          </div>
        </div>
      </div>
        <div className={styles['info']}>
        <h3 className={styles['warning-header']}>Sizes</h3>
        <div style={{paddingBottom:'1rem'}}>
          {snkr.sizes.sort((a:any,b:any) => parseFloat(a.value) - parseFloat(b.value)).map( size => {
            return <a className="button" id={styles.size}> {size.value} </a>
          })}
        </div>
          <h3 className={styles['warning-header']}>Warning</h3>
          <p>This snkr info can be found on path: 'bin/snkrs'. Do not try to change snkr using file explorer, it can broke application.</p>
        </div>

      <button
      className='buttonRed'
      style={{
        margin: '5px auto',
        width: '325px',
        }}
        onClick={async()=> {
          setDeleteButtonState('loading')
          const res = await deleteSnkrFetch(snkr)
          await handleDeleteSnkrRes(res)
          setDeleteButtonState('default')
        }}
      >
        {deleteButtonState === 'loading' ? <LoadingDots size={6} /> : <>Delete Snkr</>}
      </button>
    </>
  )
}
