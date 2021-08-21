import cn from 'classnames'
import styleUtils from './utils.module.css'
import styles from './contact.module.css'

export default function LearnMore() {
  return (
    <div className={cn(styleUtils.appear, styleUtils['appear-fifth'], styles.contact)}>
      Learn more on{' '}
      <a href='' className={styles['contact-email']} target="_blank" rel="noopener noreferrer">
        pXv Snkr Bot
      </a>
      .
    </div>
  );
}
