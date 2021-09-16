import cn from 'classnames'
import { useEffect, useState } from 'react'
import s from './change-widget.module.css'

export default function ChangeWidget()  {
  const [active, setActive] = useState(false)
  useEffect(()=>{

  },[])
  
  return (
    <>
    <div className={s.button}>
      <input type="checkbox"
      className={s.checkbox}
      id="chk" />
      <label className={s.label} htmlFor="chk"
      onClick={()=>{
        setActive(!active)
      }}>
        <a className={s.opt1}>  </a>
        <a className={s.opt2}>  </a>
        <div className={cn(s.ball, {
          [s.actived]: active,
          [s.desactived]: !active
        })}/>
      </label>
    </div>
    </>
  )
}