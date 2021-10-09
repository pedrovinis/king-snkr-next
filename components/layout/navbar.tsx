import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from 'next/router'
import styles from './navbar.module.css'
import Logo from '@components/icons/logo-icon'
import GearIcon from '../icons/gear-icon'
import MobileMenuController from './moble-menu/mobile-menu-controller'
import { link } from '@lib/types'

type Props = {
    links: link[]
    toggleMobileMenu: Function
    mobileMenuIsOpen: boolean
}

export default function NavBar({ links, toggleMobileMenu, mobileMenuIsOpen }: Props) {
    const activeRoute = useRouter().asPath

    return (
        <nav className={cn(styles.nav, {
            [styles.mobile]: mobileMenuIsOpen
        })}>
                <div className={styles['navbar-logos']}>
                <MobileMenuController isOpen={mobileMenuIsOpen} toggleMobileMenu={toggleMobileMenu}/>
                <Link href="/">
                    <a className={styles.logo}>
                        <Logo />
                    </a>
                </Link>
                </div>
                <div className={styles.tabs}>
                {links.map(({ name, route }) => (
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
                <div className={styles['navbar-logos']}>
                <Link href="/config">
                    <a className={styles.gear}>
                    <GearIcon size={'30px'}/>
                    </a>
                </Link>
                </div>
            </nav>
  )
}
