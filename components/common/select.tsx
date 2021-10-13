import ARROWDOWNICON from '@components/icons/arrow-down-icon';
import cn from 'classnames'
import styles from './select.module.css'

export default function Select({ className, ...props }: JSX.IntrinsicElements['select']) {
    return (
      <div className={styles.container}>
        <select className={cn(styles.select, className)} {...props} />
        <div className={styles.arrow}>
            <ARROWDOWNICON />
        </div>
      </div>
    )
  }