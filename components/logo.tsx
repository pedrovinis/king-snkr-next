import IconLogo from './icons/icon-logo'
import styles from './logo.module.css'
import PxvLogo from '@components/icons/icon-platform'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.icon}>
        <PxvLogo size="100%" color="var(--accents-2)" />
        <IconLogo backgroundColor="var(--accents-1)" foregroundColor="black" />
      </div>
      <div className={styles.text}>
        <div>KING</div>
        <div
          style={{ color: 'var(--brand)'}}
          className={styles['text-secondary']}
        >
          SNKR
        </div>
      </div>
    </div>
  );
}
