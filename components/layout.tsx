import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { SkipNavContent } from '@reach/skip-nav'
import styles from './layout.module.css'
import Logo from './icons/icon-logo'
import MobileMenu from './mobile-menu'
import Footer from './footer'
import GearIcon from './icons/icon-gear'
import i18n from 'translate/i18n'
import { useContext, useEffect, useState } from 'react'
import { ConfigContext } from './config-context'

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export default function Layout({ children, className, hideNav, layoutStyles }: Props) {
  const router = useRouter()
  const activeRoute = router.asPath
  const { config } = useContext(ConfigContext)
  const [refreshState, setRefreshState] = useState(false)

  useEffect(() => {
    setRefreshState(!refreshState)
  },[config.lang])

  const NAVIGATION = [
    {
      name: i18n.t('nav_bar.profile'),
      route: '/profile'
    },
    {
      name: i18n.t('nav_bar.tasks'),
      route: '/tasks'
    },
    {
      name: i18n.t('nav_bar.users'),
      route: '/users'
    },
    {
      name: i18n.t('nav_bar.snkrs'),
      route: '/snkrs'
    },
    {
      name: i18n.t('nav_bar.schedule'),
      route: '/schedule'
    }
  ]

  return (
    <>
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/">
                <a className={styles.logo}>
                  <Logo />
                </a>
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link key={name+route} href={route}>
                  <a
                    className={cn(styles.tab, {
                      [styles['tab-active']]: activeRoute == route
                    })}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
            <div className={styles['header-logos']}>
            <Link href="/config">
                <a className={styles.gear}>
                  <GearIcon size={'30px'}/>
                </a>
              </Link>
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
