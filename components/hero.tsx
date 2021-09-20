import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './hero.module.css';
import { SITE_DESCRIPTION } from '@lib/constants';
import { useEffect, useState } from 'react';
import LoadingDots from './loading-dots';

export default function Hero() {
  const [status, setStatus] = useState('Loading')

  useEffect(()=> {
    (async()=> {
      try {
        const res = await fetch('api/kingsnkr/status')
        const data = await res.json()
        setStatus(data.status)
      }
      catch {
        setStatus('Offline')
      }
    })()
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1 className={cn(styles.hero)}>
        PXV
        <br className={styleUtils['show-on-desktop']} /> King Snkrs Bot
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info, {
          [styles.statusLoading]: status == 'Loading',
          [styles.on]: status == 'Online',
          [styles.off]: status == 'Offline',
      })}>
        <p>Status</p>
        <div className={styles['description-separator']} />
        <p>
          <strong >
            {status == 'Loading' ? (
              <LoadingDots size={13}/>
            ) : (
              `• ${status}` 
            )}
          </strong>
        </p>
      </div>
    </div>
  );
}
