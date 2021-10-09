import styles from './mobile-menu-controller.module.css'
import cn from 'classnames'
import THREELINESICON from '@components/icons/threelines-icon'
import XICON from '@components/icons/x-icon'

type Props = {
  isOpen: boolean
  toggleMobileMenu: Function
}

export default function MobileMenuController({isOpen, toggleMobileMenu} : Props) {
  return (
    <span 
    className={cn(styles.icon, {
      [styles.isOpen]: isOpen,
      [styles.isClosed]: !isOpen
    })}
    onClick={() => {
      toggleMobileMenu(!isOpen)
    }}
    >
    {isOpen ? (
      <XICON />
    ) : (
      <THREELINESICON />
    )}
    </span>
  )
}
