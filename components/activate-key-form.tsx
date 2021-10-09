import { useState } from 'react'
import cn from 'classnames'

import LoadingDots from './loading-dots'
import styles from './activate-key-form.module.css'

import router from 'next/router'
import { toast } from 'react-toastify'
import IconKey from './icons/key-icon'
import { activateFetch } from '@lib/kingsnkr-api'
import i18n from 'translate/i18n'

type FormState = 'default' | 'loading' | 'error'

export default function ActivateKeyForm() {
  const [key, setkey] = useState('')
  const [keyFocused, setkeyFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  const handleActiveRes = async(res:any) => {
    const data = await res.json()
    if(data.success) {
      toast.success(`${data.message}`)
      router.reload()
    }
    else toast.error(`${data.message}`)
  }

  return (
    <form className={styles.form}
    onSubmit={async e =>{
        e.preventDefault()
        setFormState('loading')
        const res = await activateFetch(key)
        await handleActiveRes(res)
        setFormState('default')
      }}
    >
      <div className={styles['form-row']}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <IconKey size={'60px'}/>
      </div>
          <input
            spellCheck={false}
            maxLength={17}
            minLength={17}
            style={{width:'96%'}}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="text"
            id="keycode-input-field"
            value={key}
            onChange={e => setkey(e.target.value.toUpperCase().trim())}
            onFocus={() => setkeyFocused(true)}
            onBlur={() => setkeyFocused(false)}
            placeholder="Enter your Keycode: XXXXX-XXXXX-XXXXX"
            aria-label="Active Keycode"
            required
          />
        <button
          type="submit"
          className={cn("button", styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={5}/> : <>{i18n.t('buttons.activate')} KING SNKR</>}
        </button>
      </div>
    </form>
    )
}
