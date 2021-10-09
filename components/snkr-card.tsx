import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Snkr } from '@lib/types'
import styles from './snkr-card.module.css'
import SnkrIcon from './icons/snkr-icon'

type FormState = 'default' | 'loading' | 'error'

type Props = {
  snkr: Snkr
  setSize?: any
  formState?: FormState
  sizeDefault?: string
  sizeSelectDisabled?: boolean
}

export default function SnkrCard({ snkr, setSize, formState, sizeDefault, sizeSelectDisabled }: Props) {
  const [isReleased, setReleased] = useState(false)

  const sortedSizes = snkr.sizes.sort((a,b) => parseInt(a.value) - parseInt(b.value))

  const title = snkr.name
  const start = new Date(snkr.release*1000).toLocaleString('pt-BR',
  { 
    year: 'numeric',
    month:'long',
    day: 'numeric',
    hour: '2-digit',
    minute:'2-digit',
    hour12: true 
  })

  useEffect(() => {
    const now = Date.now()
    setReleased(now >snkr.release*1000)
  }, [])
  
  return (
    <div key={title} className={styles.main}>
        <span
          className={cn(styles.card, {
            [styles['is-released']]: isReleased
          })}
        >
          <div className={styles['card-body']}>
              <h4 title={title} className={styles.title}> 
                {title}
              </h4>
              <a className={styles.name}>{snkr.edition}</a>
            <div className={styles.speaker}>
              <div className={styles['avatar-group']}>
                  <div className={styles['avatar-wrapper']}>
                    <SnkrIcon snkrName={snkr.name} size={'150px'}/>
                  </div>
              </div>
              
              <h5 className={styles.price}>
                R$ {snkr.sale_price}
              </h5>
            </div>
          <p className={styles.time}>{isReleased? <>Released</> : <>{start}</>}</p>
          </div>
          <select
            disabled={formState === 'loading'}
            required
            onChange={e => {
              const sizeValue = e.target.value
              if(!sizeSelectDisabled) setSize(sizeValue)
          }}>
            <option value="" disabled selected>Select a Size</option>
            {sortedSizes.map( size => {
              return (
                <option key={size.value} disabled={sizeSelectDisabled} selected={sizeDefault==size.value} value={size.value}>
                  Size: {size.value}
                </option>
              )
            })}
          </select>
        </span>
    </div>
  )
}
