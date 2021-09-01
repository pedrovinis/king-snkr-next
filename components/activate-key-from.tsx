import { useState } from 'react'
import cn from 'classnames'

import LoadingDots from './loading-dots'
import styles from './activate-key-form.module.css'

import { addSnkrFetch } from '@lib/snkr-api'
import router from 'next/router'
import { toast } from 'react-toastify'
import IconKey from './icons/icon-key'

type FormState = 'default' | 'loading' | 'error'

export default function ActivateKeyForm() {
  const [link, setLink] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorTryAgain, setErrorTryAgain] = useState(false)
  const [linkFocused, setLinkFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  const handleDeleteRes = async(res:any) => {
    const data = await res.json()
    if(data.success) {
      router.push('/snkrs')
      toast.success(`${data.name} successful added.`)
    }
    else toast.error('Error on add Snkr. Please try again.')
  }

  return (
    <form className={styles.form}
    onSubmit={async e =>{
        e.preventDefault()
        setFormState('loading')
      }}
    >
      <div className={styles['form-row']}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <IconKey size={'80px'}/>
      </div>
      <label
          htmlFor="link-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: linkFocused
          })}
        >
          <input
            maxLength={50}
            style={{width:'96%'}}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="text"
            id="keycode-input-field"
            value={link}
            onChange={e => setLink(e.target.value.toUpperCase().trim())}
            onFocus={() => setLinkFocused(true)}
            onBlur={() => setLinkFocused(false)}
            placeholder="Enter your Keycode: XXXX-XXXX-XXXX-XXXX"
            aria-label="Active Keycode"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={6}/> : <>Active KING SNKR</>}
        </button>
      </div>
    </form>
    )
}
