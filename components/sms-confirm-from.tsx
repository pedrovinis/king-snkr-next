import { useContext, useState } from 'react'
import cn from 'classnames'
import LoadingDots from './loading-dots'
import styles from './sms-confirm-form.module.css'
import { Task } from '@lib/types'
import { PhoneNumberFormat } from '@lib/form-format'
import SMSIcon from './icons/icon-sms'
import { TaskContext } from './task-context'

type FormState = 'default' | 'loading' | 'error'

export default function SmsConfirmForm({task}: {task:Task}) {
  const [link, setLink] = useState('')
  const { setTasks, startTask, tasks } = useContext(TaskContext)
  const [linkFocused, setLinkFocused] = useState(false)
  const [formState, setFormState] = useState<FormState>('default')

  return (
      <div className={styles.main}>
          <SMSIcon size={'75px'}/> 
          <p>{task.name} </p>
          <p>{PhoneNumberFormat(task.user.phone)}</p>
      <label
          htmlFor="link-input-field"
          className={cn(styles['input-label'], {
            [styles.focused]: linkFocused
          })}
        >
          <input
            maxLength={6}
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
            const obj:any = {}
            obj[task?.name] = task
            if(!tasks[task.name]) setTasks((prev:any) => ({...prev, ...obj}))
            startTask(task)
          }}
        >
          {formState === 'loading' ? <LoadingDots size={5}/> : <>Confirm</>}
        </button>
      </div>
    )
}
