import cn from 'classnames'
import styles from './footer.module.css'
import { SITE_URL } from '@lib/constants'
import i18n from 'translate/i18n'
import { link } from '@lib/types'

type Props = {
  links: link[]
}

export default function Footer({ links } : Props) {
  return (
    <footer className={cn(styles.footer)}>
      <div className={styles['footer-legal']}>
        <div className={styles['footer-copyright']}>
          Copyright © {`${new Date().getFullYear()} `} pXv. All
          rights reserved.
        </div>
        <div className={styles['footer-center-group']}>
          {links.map( (link, i) => {
            return (
              <>
                <p className={styles['footer-paragraph']}>
                <a
                  href={`${SITE_URL}${link.route}`}
                  className={styles['footer-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a></p>
                {i != links.length - 1 && <div className={styles['footer-separator']} />}
              </>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
