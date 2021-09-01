import { useState } from 'react'
import cn from 'classnames'
import LoadingDots from './loading-dots'
import styles from './add-user-form.module.css'
import IconAvatar from './icons/icon-avatar'
import { addUserFetch } from '@lib/user-api'
import router from 'next/router'
import { toast } from 'react-toastify'
import { PhoneNumberFormat } from '@lib/form-format'

type FormState = 'default' | 'loading' | 'error'

export default function AddUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorTryAgain, setErrorTryAgain] = useState(false)
  const [nameFocused, setNameFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  const handleResponse = async(res:Response) => {
    const data = await res.json()
    if(data.success){
      if(router.route=='/adduser') router.push('/users')
      toast.success(`"${name}" succesfull added.`)
    }
    else {
      toast.error('Error, verify your credentials and try again.')
    }
  }

  return (
    <form className={styles.form}
    onSubmit={async e =>{
      e.preventDefault()
      setFormState('loading')
      const res:any = await addUserFetch({name:name, email:email, phone:phone, password:password})
      await handleResponse(res)
      setFormState('default')
    }}
    >
      <div className={styles['form-row']}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem 0"
      }}>
        <IconAvatar size="200px"/> 
      </div>
      
      <label
          htmlFor="name-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: nameFocused
          })}
        >
          <input
            minLength={1}
            maxLength={25}
            style={{width:'96%'}}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="name"
            id="name-input-field"
            value={name}
            onChange={e => setName(e.target.value)}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            placeholder="Enter a username"
            aria-label="Enter a username"
            required
          />
        </label>

        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: emailFocused
          })}
        >
          <input
            maxLength={256}
            style={{width:'96%'}}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="email"
            id="email-input-field"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Enter your Nike email"
            aria-label="Your Nike email address"
            required
          />
        </label>
        <label
          htmlFor="phone-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: phoneFocused
          })}
        >
          <input
            maxLength={30}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="tel"
            id="phone-input-field"
            value={phone}
            onChange={e => setPhone(PhoneNumberFormat(e.target.value))}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            placeholder="Enter your phone number (xx) x xxxx-xxxx"
            aria-label="Your email phone number"
            required
          />
        <button 
        tabIndex={-1} //Not Focusable
        className={cn(styles.submit, styles.reset, styles[formState])} 
        onClick={()=> setPhone('')}>
          Delete
        </button>
        </label>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: passwordFocused,
          })}
        >
        <input
            minLength={5}
            maxLength={256}
            style={{width:'96%'}}
            disabled={formState === 'loading' }
            className={styles.input}
            autoComplete="off"
            type="password"
            id="password-input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Enter your Nike password"
            aria-label="Your password"
            required
        />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading' }
        >
          {formState === 'loading' ? <LoadingDots size={6} /> : <>Add</>}
        </button>
      </div>
    </form>
    )
}
