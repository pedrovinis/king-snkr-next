import { useState } from 'react'
import LoadingDots from '../loading-dots'
import styles from './add-task-form.module.css'
import router from 'next/router'
import { toast } from 'react-toastify'
import { Snkr, User } from '@lib/types'
import TaskIcon from '../icons/task-icon'
import SnkrCard from '@components/snkr-card'
import UserCard from '../user-card'
import { addTaskFetch } from '@lib/task-api'
import i18n from 'translate/i18n'
import Select from '@components/common/select'

type FormState = 'default' | 'loading' | 'error'

type Props = {
    users: User[]
    snkrs: Snkr[]
}

export default function AddTaskForm({users, snkrs}: Props) {
  const [taskName, setTaskName] = useState('')
  const [userSelected, setUserSelected] = useState('')
  const [snkrSelected, setSnkrSelected] = useState('')
  const [sizeSelected, setSizeSelected] = useState('')
  const [formState, setFormState] = useState<FormState>('default')
  
  const handleResponse = async(res:Response) => {
    const data = await res.json()
    if(data.success){
      router.push('/tasks')
      toast.success(`"${taskName}" successful added.`)
    }
    else {
      toast.error('Error, try again.')
    }
  }
  return (
    <form className={styles.form}
      onSubmit={async e =>{
        e.preventDefault()
        setFormState('loading')
        const res:any = await addTaskFetch(
          taskName,
          userSelected,
          snkrSelected,
          sizeSelected
        )
        await handleResponse(res)
        setFormState('default')
      }}
      >
        <TaskIcon size={'100px'}/>
          <input
            spellCheck={false}
            minLength={1}
            maxLength={25}
            disabled={formState === 'loading' }
            autoComplete="off"
            type="task"
            id="task-input-field"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            placeholder="Enter a task name"
            aria-label="Enter a task name"
            required
          />
        <div className={styles.Selects}>
        <div className={styles.Select}>
          <Select
              disabled={formState === 'loading' }
              aria-label="Select a User"
              value={userSelected}
              required
              onChange={e => {
              const user = e.target.value
              setUserSelected(user)
          }}>
              <option value="" disabled selected>Select a USER</option>
              {users.map( user => {
                return (
                    <option key={user.name} value={user.name}>
                        {user.name}
                    </option>
                )
              })}
          </Select>
          {users.map( user => {
              if(userSelected == user.name) {
                return <UserCard user={user} key={user.name}/>
              }
          })}
          </div>
          <div className={styles.Select}>
          <Select
              disabled={formState === 'loading' }
              placeholder={'Select a Snkr'}
              aria-label="Select a Snkr"
              value={snkrSelected}
              required
              onChange={e => {
              const snkrId = e.target.value
              setSnkrSelected(snkrId)
          }}>
              <option value="" disabled selected>Select a SNKR</option>
              {snkrs.map( snkr => {
                  return (
                      <option key={snkr.kingsnkr_id} value={snkr.id}>
                          {snkr.name} {snkr.edition}
                      </option>
                  )
              })}
          </Select>
          {snkrs.map( snkr => {
              if(snkrSelected == snkr.id) {
                return <SnkrCard snkr={snkr} setSize={setSizeSelected} formState={formState} key={snkr.kingsnkr_id}/>
              }
          })}
          </div>
        </div>
        <button type="submit" disabled={formState === 'loading'}>
          {formState === 'loading' ? <LoadingDots size={5} /> : <>{i18n.t('buttons.add_task')}</>}
        </button>
    </form>
    )
}

