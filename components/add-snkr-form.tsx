import { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import FormError from '@lib/form-error'
import LoadingDots from './loading-dots'
import styles from './add-user-form.module.css'
import useEmailQueryParam from '@lib/hooks/use-email-query-param'

type FormState = 'default' | 'loading' | 'error'

export default function AddUserForm() {
    const [link, setLink] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [errorTryAgain, setErrorTryAgain] = useState(false)
    const [linkFocused, setLinkFocused] = useState(false)
    const [formState, setFormState] = useState<FormState>('default')

  return (
    <form className={styles.form}>
      <div className={styles['form-row']}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <Image src={'/snkr-icon.svg'} width={400} height={250}/>
      </div>
      
      <label
          htmlFor="link-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: linkFocused
          })}
        >
          <input
            className={styles.input}
            autoComplete="off"
            type="link"
            id="link-input-field"
            value={link}
            onChange={e => setLink(e.target.value)}
            onFocus={() => setLinkFocused(true)}
            onBlur={() => setLinkFocused(false)}
            placeholder="Enter SNKR link"
            aria-label="Enter SNKR link"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading'}
          onClick={()=>{
            setFormState('loading')
          }}
        >
          {formState === 'loading' ? <LoadingDots size={4} /> : <>Add SNKR</>}
        </button>
      </div>
    </form>
    )
}
