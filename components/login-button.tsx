import { SITE_URL } from '@lib/constants'
import { useState } from 'react'
import LoadingDots from './loading-dots'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      id="#auth-button"
      style={{margin:'1rem auto', width:'50%', display:'flex',}}
      className="button"
      disabled={loading}
      onClick={()=>{
        handleAuthWindow()
        setLoading(true)
    }}
    >
    {loading ? <LoadingDots size={6}/> : <>Entre ou registre-se</>}</button>
  )
}

const handleAuthWindow = () => {
  const width = 700
  const height = 700
  const left = (screen.width - width) / 2
  const top = (screen.height - height) / 4
      
  const authWindow:any = window.open(`${SITE_URL}/auth`, 'pxv Auth',
    'width=' + width + ', height=' + height +
    ', top=' + top + ', left=' + left)
  authWindow.focus()
}