import { useContext, useState } from 'react'
import cn from 'classnames'
import LoadingDots from './loading-dots'
import styles from './sms-confirm-form.module.css'
import { Task } from '@lib/types'
import { PhoneNumberFormat } from '@lib/form-format'
import SMSIcon from './icons/sms-icon'
import { TaskContext } from './task-context'
import { ConfigContext } from './config-context'
import XIcon from './icons/x-icon'

type FormState = 'default' | 'loading' | 'error'

export default function SmsConfirmForm({task}: {task:Task}) {
  const [code, setCode] = useState('')
  const { startTask, setSMSCode, setRunning } = useContext(TaskContext)
  const [inputFocused, setInputFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')
  const { config } = useContext(ConfigContext)

  return (
    <form
    onSubmit={async e => {
      e.preventDefault()
      setFormState('loading')
      // setSMSCode(task, code)
      // startTask(task)
    }}
    >
          <div className={styles.main}>
          <span
          className={styles.close}
          onClick={() => {
            setRunning(task, false)
          }}

          ><XIcon /></span>
          <SMSIcon size={'75px'}/> 
          <p>{task.name} </p>
          <p
          className={config.hideContent ? "hide" : ''}
          >
            {PhoneNumberFormat(task.user.phone)}
          </p>
          <input
            minLength={6}
            maxLength={6}
            style={{width:'96%'}}
            className={styles.input}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="link"
            id="link-input-field"
            value={code}
            onChange={e => setCode(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="SMS Code"
            aria-label="Enter SMS Code"
            required
          />
        <button
          type="submit"
          className={cn("button", styles[formState])}
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? <LoadingDots size={5}/> : <>Confirm</>}
        </button>
      </div>
      </form>
    )
}
