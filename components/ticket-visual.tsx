import { TicketGenerationState } from '@lib/constants'
import TicketColoredMobile from './ticket-colored-mobile'
import TicketColored from './ticket-colored'
import styles from './ticket-visual.module.css'
import Tilt from 'vanilla-tilt'
import TicketProfile from './ticket-profile'
import TicketCode from './ticket-code'
import TicketMono from './ticket-mono'
import TicketInfo from './ticket-info'
import TicketMonoMobile from './ticket-mono-mobile'
import cn from 'classnames'
import { useEffect, useRef } from 'react'

type Props = {
  size?: number
  name?: string
  ticketCode?: string
  username?: string
  ticketGenerationState?: TicketGenerationState;
};

export default function TicketVisual({
  size = 1,
  name,
  username,
  ticketCode,
  ticketGenerationState = 'default'
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
          {username ? <TicketColored /> : <TicketMono />}
        </div>
        <div className={styles['vertical-ticket']}>
          {username ? <TicketColoredMobile /> : <TicketMonoMobile />}
        </div>
        <div className={styles.profile}>
          <TicketProfile
            name={name}
            username={username}
            size={size}
            ticketGenerationState={ticketGenerationState}
          />
        </div>
        <div className={styles.info}>
          <TicketInfo logoTextSecondaryColor={ticketCode ? 'var(--brand)' : undefined} />
        </div>
        {ticketCode && (
          <div className={styles['ticket-code-wrapper']}>
            <div className={styles['ticket-code']}>
              <TicketCode code={ticketCode} />
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
