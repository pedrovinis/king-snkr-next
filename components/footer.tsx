import cn from 'classnames';
import styles from './footer.module.css';
import { SITE_URL } from '@lib/constants';
import i18n from 'translate/i18n';


export default function Footer() {
  return (
    <footer className={cn(styles.footer)}>
      <div className={styles['footer-legal']}>
        <div className={styles['footer-hostedby']}>

          <div className={styles['footer-separator']} />
        </div>
        <div className={styles['footer-copyright']}>
          Copyright © {`${new Date().getFullYear()} `} pXv. All
          rights reserved.
        </div>
        <div className={styles['footer-center-group']}>
          <p className={styles['footer-paragraph']}>
            <a
              href={`${SITE_URL}/privacy-policy`}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.t('footer.privacy_policy')}
            </a>
          </p>
          <div className={styles['footer-separator']} />
          <p className={styles['footer-paragraph']}>
            <a
              href={`${SITE_URL}/terms-of-use`}
              className={styles['footer-link']}
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.t('footer.terms_of_use')}
            </a>
          </p>
            <>
              <div className={styles['footer-separator']} />
              <p className={styles['footer-paragraph']}>
                <a
                  href={`${SITE_URL}/contact`}
                  className={styles['footer-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {i18n.t('footer.contact')}
                </a>
              </p>
            </>
        </div>
      </div>
    </footer>
  );
}
