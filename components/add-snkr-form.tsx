import { useState } from 'react'
import cn from 'classnames'
import LoadingDots from './loading-dots'
import styles from './add-snkr-form.module.css'

import { addSnkrFetch } from '@lib/snkr-api'
import { toast } from 'react-toastify'
import i18n from 'translate/i18n'

type FormState = 'default' | 'loading' | 'error'

export default function AddUserForm() {
  const [link, setLink] = useState('')
  const [linkFocused, setLinkFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  const handleDeleteRes = async(res:any) => {
    const data = await res.json()
    if(data.success) {
      toast.success(`${data.name} successful added.`)
      setLink('')
    }
    else toast.error('Error on add SNEAKER. Please try again.')
  }

  return (
    <form className={styles.form}>
      <div className={styles['form-row']}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <img src={'/snkr-icon.svg'} width={300} />
      </div>
          <input
            spellCheck={false}
            style={{width:'96%'}}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="link"
            id="link-input-field"
            value={link}
            onChange={e => setLink(e.target.value)}
            onFocus={() => setLinkFocused(true)}
            onBlur={() => setLinkFocused(false)}
            placeholder="https://www.nike.com.br/mysnkrlink"
            aria-label="Enter a SNKR link"
            required
          />
        <button
          type="submit"
          className={cn("button", styles[formState])}
          disabled={formState === 'loading'}
          onClick={async()=>{
            setFormState('loading')
            const res = await addSnkrFetch(link)
            await handleDeleteRes(res)
            setFormState('default')
          }}
        >
          {formState === 'loading' ? <LoadingDots size={5}/> : <>{i18n.t('buttons.add')}</>}
        </button>
      </div>
    </form>
    )
}
