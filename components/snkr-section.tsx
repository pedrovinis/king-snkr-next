import Link from 'next/link'
import Image from 'next/image'
import { Snkr } from '@lib/types'
import styles from './snkr-section.module.css'
import IconSnkr from './icons/icon-snkrs'
import { useState } from 'react'
import LoadingDots from './loading-dots'

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
  
  return (
    <>
      <Link href="/snkrs">
        <a className={styles.backlink} >
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
          Back to Snkrs
        </a>
      </Link>
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
            <p className={styles.bio}>R$ {snkr.sale_price}</p>

            <h2 className={styles['bio-header']}>Release</h2>
            <p className={styles.bio}>{formatRelease(snkr.release)}</p>

            <h2 className={styles['bio-header']}>Link</h2>
            <p className={styles.bio} >{snkr.link}</p>

          </div>
        </div>
      </div>
        <div className={styles['info']}>
        <h3 className={styles['warning-header']}>Sizes</h3>
        <div style={{paddingBottom:'1rem'}}>
          {snkr.sizes.map( size => {
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
        onClick={()=> {
          setDeleteButtonState('loading')
        }}
      >
        {deleteButtonState === 'loading' ? <LoadingDots size={6} /> : <>Delete Snkr</>}
      </button>
    </>
  )
}
