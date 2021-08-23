import { useState } from 'react'
import cn from 'classnames'
import FormError from '@lib/form-error'
import LoadingDots from './loading-dots'
import styles from './add-user-form.module.css'
import useEmailQueryParam from '@lib/hooks/use-email-query-param'
import IconAvatar from './icons/icon-avatar'

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

  return (
    <form className={styles.form}>
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
            className={styles.input}
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
            className={styles.input}
            autoComplete="off"
            type="email"
            id="email-input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            className={styles.input}
            autoComplete="off"
            type="phone"
            id="phone-input-field"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            placeholder="Enter your phone number (xx) x xxxx-xxxx"
            aria-label="Your email phone number"
            required
          />
        </label>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: passwordFocused
          })}
        >
        <input
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
          disabled={formState === 'loading'}
          onClick={()=>{
            setFormState('loading')
          }}
        >
          {formState === 'loading' ? <LoadingDots size={6} /> : <>Add</>}
        </button>
      </div>
    </form>
    )
}