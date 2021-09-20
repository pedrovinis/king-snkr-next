import { useState } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import LoadingDots from './loading-dots'
import styleUtils from './utils.module.css'
import styles from './form.module.css'

type FormState = 'default' | 'loading' | 'error'

type Props = {
  sharePage?: boolean;
};

export default function Form({ sharePage }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorTryAgain, setErrorTryAgain] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')
  // const { setPageState, setUserData } = useConfData()
  const router = useRouter()
  

  return formState === 'error' ? (
    <div
      className={cn(styles.form, {
        [styles['share-page']]: sharePage
      })}
    >
      <div className={styles['form-row']}>
        <div className={cn(styles['input-label'], styles.error)}>
          <div className={cn(styles.input, styles['input-text'])}>{errorMsg}</div>
          <button
            type="button"
            className={cn(styles.submit, styles.register, styles.error)}
            onClick={() => {
              setFormState('default');
              setErrorTryAgain(true);
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  ) : (
    <form
      className={cn(styles.form, {
        [styles['share-page']]: sharePage,
        [styleUtils.appear]: !errorTryAgain,
        [styleUtils['appear-fifth']]: !errorTryAgain && !sharePage,
        [styleUtils['appear-third']]: !errorTryAgain && sharePage
      })}
        
    >
      <div className={styles['form-row']}>
        <label
          htmlFor="email-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: emailFocused
          })}
        >
          <input
            style={{width:'96%'}}
            className={styles.input}
            autoComplete="off"
            type="email"
            id="email-input-field"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Enter your email"
            aria-label="Your email address"
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
            style={{width:'96%'}}
            className={styles.input}
            autoComplete="off"
            type="password"
            id="password-input-field"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Enter your password"
            aria-label="Your password"
            required
        />
        </label>
        <button
          type="submit"
          className={cn(styles.submit, styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={5} /> : <>Login</>}
        </button>
      </div>
    </form>
  )
}
