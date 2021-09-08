import { TicketGenerationState } from '@lib/constants'
import PxvIcon from '@components/icons/icon-platform'
import cn from 'classnames'
import IconUser from './icons/icon-user'
import styles from './ticket-profile.module.css'

type Props = {
  name?: string;
  email?: string;
  size?: number;
  ticketGenerationState: TicketGenerationState;
};

export default function TicketProfile({ name, email, size = 1, ticketGenerationState }: Props) {
  return (
    <div className={styles.profile}>
      <span
        className={cn(styles.skeleton, styles.wrapper, styles.inline, styles.rounded, {
          [styles.show]: ticketGenerationState === 'loading'
        })}
      >
        <span className={cn(styles.image, styles['empty-icon'])}>
          <IconUser size={'50px'}/> 
        </span>
      </span>
      <div className={styles.text}>
        <p
          className={cn(styles.name, {
            [styles['name-blank']]: !email
          })}
        >
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              [styles.show]: ticketGenerationState === 'loading'
            })}
          >
            {name || email || 'Your Name'}
          </span>
        </p>
        <p className={styles.email}>
          <span
            className={cn(styles.skeleton, styles.wrapper, {
              [styles.show]: ticketGenerationState === 'loading'
            })}
          >
            <span className={styles.githubIcon}>
              <PxvIcon color="var(--secondary-color)" size={`20`} />
            </span>
            {email || <>email</>}
          </span>
        </p>
      </div>
    </div>
  );
}
