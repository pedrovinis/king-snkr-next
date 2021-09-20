import { useState } from 'react'
import cn from 'classnames'
import LoadingDots from './loading-dots'
import styles from './sms-confirm-form.module.css'
import IconInfo from './icons/info-icon'

type FormState = 'default' | 'loading' | 'error'

export default function SmsConfirmForm() {
  const [link, setLink] = useState('')

  const [linkFocused, setLinkFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')


  return (
      <div className={styles.main}>
          <div style={{justifyContent:'center', display:'flex', padding:'1rem'}}>
            <IconInfo size={'50px'}/>
          </div>
      <label
          htmlFor="link-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: linkFocused
          })}
        >
          <input
            style={{width:'96%'}}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="link"
            id="link-input-field"
            value={link}
            onChange={e => setLink(e.target.value)}
            onFocus={() => setLinkFocused(true)}
            onBlur={() => setLinkFocused(false)}
            placeholder="SMS Code"
            aria-label="Enter SMS Code"
            required
          />
        </label>
        <button
          type="submit"
          className={cn("button", styles[formState])}
          disabled={formState === 'loading'}
          onClick={async()=>{
          }}
        >
          {formState === 'loading' ? <LoadingDots size={5}/> : <>Confirm</>}
        </button>
      </div>
    )
}
