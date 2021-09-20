import { Snkr } from '@lib/types'
import styles from './snkr-section.module.css'
import IconSnkr from './icons/icon-snkr'
import { useState } from 'react'
import LoadingDots from './loading-dots'
import { deleteSnkrFetch } from '@lib/snkr-api'
import router from 'next/router'
import BackLink from './backLink'
import CopyButton from './copy-button'
import { toast } from 'react-toastify'
import IconInfo from './icons/info-icon'

type Props = {
  snkr: Snkr
}

type ButtonState = 'default' | 'loading' | 'error'

export default function SnkrSection({ snkr }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')

    const released = Date.now() > (snkr.release * 1000)

    const formatRelease = (release:number) => {
      const timeStamp = new Date(release * 1000)
      const formatedDate = timeStamp.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour:'numeric',
        minute: '2-digit',
        hour12: true
      })
      return formatedDate
  }
  
  const handleDeleteSnkrRes = async(res:Response) => {
    const data = await res.json()
    if(data.success){
      router.push('/snkrs')
      toast.success(`"${snkr.name} ${snkr.edition}" succesfull deleted.` ,{})
    }
    else {
      toast.error(`Error on deleting "${snkr.name} ${snkr.edition}"'.`)
    }
  }

  return (
    <>
      <BackLink text={"Back to SNKRS"} href={'/snkrs'}/>
      <div className={styles.main}>
      <div key={snkr.name} className={styles.container}>
        <div className={styles.imagesContainer}>
          <IconSnkr snkrName={snkr.name} size={'250px'}/>
          <img src={snkr.image} width={'250px'} height={'250px'}/>
        </div>
        <div className={styles['snkr-details']}>
          <div style={{padding: '0.5rem'}}>
            <h1 className={styles.name}>{snkr.name}</h1>
            <a className={styles.edition}>{snkr.edition}</a>
            <p className={styles.title} >
              {snkr.plataform_id}
            </p>
            <h2 className={styles['bio-header']}>Sale Price</h2>
            <p className={styles.title}>R$ {snkr.sale_price}</p>

            <h2 className={styles['bio-header']}>Release</h2>
            <p className={styles.title}>
              {formatRelease(snkr.release)}
              {released ? (
              <> { ' - '} <span style={{color: 'var(--brand'}}>Released</span></>
              ): <></>}
            </p>

            <h2 className={styles['bio-header']}>Link</h2>
            <p className={styles.bio}>{snkr.link}</p>
            <CopyButton value={snkr.link}/>
          </div>
        </div>
      </div>
        <div className={styles['sizes-container']}>
        <h3 className={styles['bio-header']}>Sizes</h3>
        <div style={{paddingBottom:'1rem'}}>
          {snkr.sizes.sort((a:any,b:any) => parseFloat(a.value) - parseFloat(b.value)).map( size => {
            return <a key={size.value} id={styles.size}> {size.value} </a>
          })}
        </div>
        </div>
      </div>
      <div className={styles['info']}>
      <h3 className={styles['warning-header']}>Warning<IconInfo /></h3>
          <p>This SNKR info can be found on path: 'bin/snkrs'. Do not try to change snkr using file explorer, it can broke application.</p>
      </div>
      <button
      className='buttonRed'
        onClick={async()=> {
          setDeleteButtonState('loading')
          const res = await deleteSnkrFetch(snkr)
          await handleDeleteSnkrRes(res)
          setDeleteButtonState('default')
        }}
      >
        {deleteButtonState === 'loading' ? <LoadingDots size={5} /> : <>Delete Snkr</>}
      </button>
    </>
  )
}