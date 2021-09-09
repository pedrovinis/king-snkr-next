import { UserProductsState, UserState } from '@lib/constants'
import TicketColoredMobile from './ticket-colored-mobile'
import TicketColored from './ticket-colored'
import styles from './ticket-visual.module.css'
import Tilt from 'vanilla-tilt'
import TicketProfile from './ticket-profile'
import TicketMono from './ticket-mono'
import TicketInfo from './ticket-info'
import TicketMonoMobile from './ticket-mono-mobile'
import cn from 'classnames'
import { useEffect, useRef } from 'react'

type Props = {
  size?: number
  name?: string
  email?: string
  active?: boolean
  userState?: UserState
  userProductsState?: UserProductsState
}

export default function TicketVisual({
  size = 1,
  name,
  email,
  active,
  userState = 'default',
  userProductsState = 'default'
}: Props) {
  const ticketRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ticketRef.current && !window.matchMedia('(pointer: coarse)').matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        'max-glare': 0.16,
        'full-page-listening': true
      });
    }
  }, [ticketRef])

  return (
    <>
      <div
          ref={ticketRef}
          className={cn(styles['ticket-visual'])}
        >
      <div className={styles.visual} style={{ ['--size' as string]: size }}>
        <div className={styles['horizontal-ticket']}>
          {active ? <TicketColored /> : <TicketMono />}
        </div>
        <div className={styles['vertical-ticket']}>
          {active ? <TicketColoredMobile /> : <TicketMonoMobile />}
        </div>
        <div className={styles.profile}>
          <TicketProfile
            name={name}
            email={email}
            size={size}
            userState={userState}
          />
        </div>
        <div className={styles.info}>
          <TicketInfo userProductsState={userProductsState} logoTextSecondaryColor={active ? 'var(--brand)' : undefined} />
        </div>
        
      </div>
      </div>
    </>
  );
}
