import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { SkipNavContent } from '@reach/skip-nav'
import { NAVIGATION } from '@lib/constants'
import styles from './layout.module.css'
import Logo from './icons/icon-logo'
import MobileMenu from './mobile-menu'
import Footer from './footer'
import GearIcon from './icons/icon-gear'

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export default function Layout({ children, className, hideNav, layoutStyles }: Props) {
  const router = useRouter()
  const activeRoute = router.asPath
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
            <Link href="/">
                <a className={styles.logo}>
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
