import NavBar from './navbar'
import Footer from './footer'
import { useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../context/config-context'
import i18n from 'translate/i18n'
import MobileMenuContainer from './moble-menu/mobile-menu-container'


type Props = {
  children: React.ReactNode
  className?: string
  hideNav?: boolean
}

export default function Layout({ children }: Props) {
  const [mobileMenuIsOpen, toggleMobileMenu] = useState(false)
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
      route: '/sneakers'
    },
    {
      name: i18n.t('nav_bar.schedule'),
      route: '/schedule'
    }
  ]

  const FOOTER_LINKS = [
    {
      name: i18n.t('footer.privacy_policy'),
      route: '/privacy-policy'
    },
    {
      name: i18n.t('footer.terms_of_use'),
      route: '/terms-of-use'
    },
    {
      name: i18n.t('footer.contact'),
      route: '/contact'
    }
  ]

  return (
    <>
        <NavBar
          links={NAVIGATION}
          mobileMenuIsOpen={mobileMenuIsOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
          {children}
        {mobileMenuIsOpen && (
          <MobileMenuContainer
            navbarLinks={NAVIGATION}
            footerLinks={FOOTER_LINKS}
            toggleMobileMenu={toggleMobileMenu}
          />
        )}
        <Footer links={FOOTER_LINKS}/>
    </>
  )
}
