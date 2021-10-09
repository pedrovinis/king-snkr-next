import styles from './mobile-menu-container.module.css'
import router from 'next/router'
import { link } from '@lib/types'

type Props = {
  navbarLinks: link[]
  footerLinks: link[] 
  toggleMobileMenu: Function
}

export default function MobileMenuContainer({ navbarLinks, footerLinks, toggleMobileMenu } : Props) {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.navContainer}>
        <h1>Navegação</h1>
        {navbarLinks?.map( (link, i) => {
            return (
            <button
                key={i}
                className={styles.link}
                onClick={() => {
                  router.push(`${link.route}`)
                  toggleMobileMenu(false)
                }}
              >
                {link.name}
              </button>
        )})}
        </div>
        <div className={styles.resourcesContainer}>
          <h1>Recursos</h1>
        {footerLinks?.map( (link, i) => {
          return (
            <button
                key={i}
                className={styles.link}
                onClick={() => {
                  router.push(`${link.route}`)
                  toggleMobileMenu(false)
                }}
              >
                {link.name}
              </button>
          )
        })}
        </div>
        <div className={styles.footerContainer}>
          <p>© {new Date().getFullYear()}  pXV. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
