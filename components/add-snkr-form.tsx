import { useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'
import FormError from '@lib/form-error'
import LoadingDots from './loading-dots'
import styles from './add-snkr-form.module.css'

import { addSnkrFetch } from '@lib/snkr-api'
import router from 'next/router'
import { toast } from 'react-toastify'

type FormState = 'default' | 'loading' | 'error'

export default function AddUserForm() {
  const [link, setLink] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorTryAgain, setErrorTryAgain] = useState(false)
  const [linkFocused, setLinkFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  const handleDeleteRes = async(res:any) => {
    const data = await res.json()
    if(data.success) {
      // if(router.route=='/addsnkr') router.push('/snkrs')
      toast.success(`${data.name} successful added.`)
      setLink('')
    }
    else toast.error('Error on add Snkr. Please try again.')
  }

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
            placeholder="https://www.nike.com.br/mysnkrlink"
            aria-label="Enter a SNKR link"
            required
          />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading'}
          onClick={async()=>{
            setFormState('loading')
            const res = await addSnkrFetch(link)
            await handleDeleteRes(res)
            setFormState('default')
          }}
        >
          {formState === 'loading' ? <LoadingDots size={6}/> : <>Add SNKR</>}
        </button>
      </div>
    </form>
    )
}
