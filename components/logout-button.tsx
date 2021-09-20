import { SITE_URL } from '@lib/constants'
import { useState } from 'react'
import i18n from 'translate/i18n'
import LoadingDots from './loading-dots'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      id="#logout-button"
      style={{margin:'1rem auto', width:'200px', display:'flex',}}
      className="buttonRed"
      disabled={loading}
      onClick={()=>{
        handleLogoutWindow()
        setLoading(true)
    }}
    >
    {loading ? <LoadingDots size={5}/> : <>{i18n.t('buttons.logout')}</>}</button>
  )
}

const handleLogoutWindow = () => {
  const width = 700
  const height = 700
  const left = (screen.width - width) / 2
  const top = (screen.height - height) / 4
      
  const logoutWindow:any = window.open(`${SITE_URL}/auth/signout`, 'pxv Auth',
  'width=' + width + ', height=' + height +
  ', top=' + top + ', left=' + left)
  logoutWindow.focus()
}