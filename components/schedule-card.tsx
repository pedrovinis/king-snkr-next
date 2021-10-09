import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Snkr } from '@lib/types'
import styles from './schedule-card.module.css'
import SnkrIcon from './icons/snkr-icon'

type Props = {
  key: string
  snkr: Snkr
  showTime: boolean
}

const formatDate = (date: string) => {
  return date
}

export default function ScheduleCard({ snkr, showTime }: Props) {
  const [isReleased, setReleased] = useState(false)

  const releaseHour = new Date(snkr.release*1000).toLocaleString('pt-BR', { hour: '2-digit', minute:'2-digit', hour12: true })

  useEffect(() => {
    const now = Date.now()
    setReleased(now >snkr.release*1000)
  }, [])

  return (
    <div key={snkr.name+snkr.edition+snkr.id} className={styles.talk}>
      {showTime && <p className={styles.time}>{isReleased? <>{releaseHour} - <span style={{color: 'var(--brand)'}}>Released</span>  </> :
      <>{releaseHour}</>}</p>}
      <Link href={`sneaker/${snkr.slug}`}>
        <span
          className={cn(styles.card, {
            [styles['is-released']]: isReleased
          })}
        >
          <div className={styles['card-body']}>
            <h4 title={snkr.name} className={styles.title}>
              {snkr.name}
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
          </div>
        </span>
      </Link>
    </div>
  );
}
