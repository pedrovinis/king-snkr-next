import { TicketGenerationState } from '@lib/constants';
import TicketColoredMobile from './ticket-colored-mobile';
import TicketColored from './ticket-colored';
import styles from './ticket-visual.module.css';
import TicketProfile from './ticket-profile';
import TicketNumber from './ticket-number';
import TicketMono from './ticket-mono';
import TicketInfo from './ticket-info';
import TicketMonoMobile from './ticket-mono-mobile';

type Props = {
  size?: number;
  name?: string;
  ticketNumber?: number;
  username?: string;
  ticketGenerationState?: TicketGenerationState;
};

export default function TicketVisual({
  size = 1,
  name,
  username,
  ticketNumber,
  ticketGenerationState = 'default'
}: Props) {
  return (
    <>
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
          <TicketInfo logoTextSecondaryColor={ticketNumber ? 'var(--brand)' : undefined} />
        </div>
        {ticketNumber && (
          <div className={styles['ticket-number-wrapper']}>
            <div className={styles['ticket-number']}>
              <TicketNumber number={ticketNumber} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
