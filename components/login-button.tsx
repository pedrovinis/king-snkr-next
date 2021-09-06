import { SITE_URL } from '@lib/constants'
import cn from 'classnames'
import { useState } from 'react'
import LoadingDots from './loading-dots'

export default function LoginButton() {
  const [loading, setLoading] = useState(false)
  return (
    <a
      id="#auth-button"
      style={{margin:'1rem auto', width:'50%', display:'flex',}}
      className="button"
      onClick={()=>{
        handleAuthWindow()
        setLoading(true)
    }}
    >
    {loading ? <LoadingDots size={6}/> : <>Login or Register </>}</a>
  )
}


const handleAuthWindow = () => {
  window.open('')
}