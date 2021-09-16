import cn from 'classnames'
import { useEffect, useState } from 'react'
import s from './change-widget.module.css'

type Props = {
  onChange: Function
  value: boolean
}

export default function ChangeWidget({onChange, value} : Props) {
  return (
    <>
    <div className={s.button}>
      <input type="checkbox"
      className={s.checkbox}
      id="chk" 
      defaultChecked={value}
      />
      <label className={s.label} htmlFor="chk"
      onClick={()=>{
        onChange(!value)
      }}>
        <a className={s.opt1}>  </a>
        <a className={s.opt2}>  </a>
        <div className={cn(s.ball, {
          [s.actived]: value,
          [s.desactived]: !value
        })}/>
      </label>
    </div>
    </>
  )
}