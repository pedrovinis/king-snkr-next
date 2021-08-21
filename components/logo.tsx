import IconLogo from './icons/icon-logo'
import styles from './logo.module.css'
import { SITE_NAME_MULTILINE } from '@lib/constants'
import PxvLogo from '@components/icons/icon-platform'

export default function Logo({ textSecondaryColor = 'var(--accents-5)' }) {
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <PxvLogo size="100%" color="var(--accents-4)" />
        <IconLogo backgroundColor="var(--accents-1)" foregroundColor="black" />
      </div>
      <div className={styles.text}>
        <div>{SITE_NAME_MULTILINE[0]}</div>
        <div
          style={{ ['--color' as string]: textSecondaryColor }}
          className={styles['text-secondary']}
        >
          SNKRS
        </div>
      </div>
    </div>
  );
}
