import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Snkr } from '@lib/types'
import styles from './schedule-card.module.css'
import SnkrIcon from './icons/icon-snkrs'

type Props = {
  key: string
  snkr: Snkr
  showTime: boolean
}

const formatDate = (date: string) => {
  // https://github.com/date-fns/date-fns/issues/946
  //return format(parseISO(date), "h:mmaaaaa'm'");
  return date
};

export default function ScheduleCard({ snkr, showTime }: Props) {
  const [isReleased, setReleased] = useState(false)
  const [startTime, setStartTime] = useState('')

  const title = snkr.name
  const start = new Date(snkr.release*1000).toLocaleString('pt-BR', { hour: '2-digit', minute:'2-digit', hour12: true })

  useEffect(() => {
    const now = Date.now()
    setReleased(now >snkr.release*1000)
    setStartTime(`${formatDate(start)}`)
  }, []);

  return (
    <div key={title} className={styles.talk}>
      {showTime && <p className={styles.time}>{isReleased? <>Released</> : <>{start}</>}</p>}
      <Link href={`snkr/${snkr.slug}`}>
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
          </div>
        </a>
      </Link>
    </div>
  );
}
