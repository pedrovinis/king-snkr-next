import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Snkr } from '@lib/types'
import styles from './snkr-card.module.css'
import SnkrIcon from './icons/icon-snkrs'
import Select from './select'

type Props = {
  snkr: Snkr
}

export default function SnkrCard({ snkr }: Props) {
  const [isReleased, setReleased] = useState(false)
  const [startTime, setStartTime] = useState('')

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
    setStartTime(start)
  }, []);

  return (
    <div key={title} className={styles.main}>
        <a
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
          <Select >
            {snkr.sizes.map( size => {
              return (
                <option>
                  Size: {size.value}
                </option>
              )
            })}
          </Select>
        </a>
    </div>
  )
}
