import { Task } from '@lib/types'
import styles from './task-section.module.css'
import { useContext, useMemo, useState } from 'react'
import LoadingDots from './loading-dots'
import { deleteTaskFetch } from '@lib/task-api'
import router from 'next/router'
import BackLink from './backLink'
import { toast } from 'react-toastify'
import TaskIcon from './icons/icon-task'
import UserCard from './user-card'
import SnkrCard from './snkr-card'

import StepProgress from './step-progress'
import { TASK_PROGRESS } from '@lib/constants'
import cn from 'classnames'
import { TaskContext } from './task-context'
import i18n from 'translate/i18n'

type Props = {
  task: Task
}

type ButtonState = 'default' | 'loading' | 'error'

export default function TaskSection({ task }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')
  const { startTask, stopTask, tasks } = useContext(TaskContext)
  
  const active = tasks[task.name]?.active
  const progress = tasks[task.name]?.progress

  const handleDeleteResponse = async(res:Response) => {
    const data = await res.json()
    if(data.success) {
      router.push('/tasks')
      toast.success(`"${task.name}" successful deleted.`)
    }
    else {
      toast.error(`Error on delete "${task.name}".`)
    }
  }

  return useMemo(() => {
    return (
    <>
      <BackLink text={"Back to Tasks"} href={'/tasks'}/>
      <div key={task.name} className={styles.container}>
        <div style={{ minWidth: '300px' }}>
          <TaskIcon />
        </div>
        <div>
          <div className={styles.grid}>
            <h1 className={styles.name}>{task.name}</h1>
            <div className={styles.card}>
              <h2 className={styles['bio-header']}>SNKR</h2>
              <SnkrCard snkr={task.snkr} sizeDefault={task.cfg.size} sizeSelectDisabled={true}/>
            </div>
            <div className={styles.card}>
            <h2 className={styles['bio-header']}>User</h2>
              <UserCard user={task.user}/>
            </div>
           </div>
        </div>
      </div>
      
        <a
        className={cn({
          ["button"]: !active,
          ["buttonRed"]: active
        })}
        style={{
          margin: '',
          width: '300px',
          }}
          
          onClick={async()=> {
            active ? stopTask(task) : startTask(task)
          }}
        >
          {active ? <>{i18n.t('buttons.stop_task')}</> : <>{i18n.t('buttons.start_task')}</>}
        </a>
          <StepProgress steps={TASK_PROGRESS} progress={active? progress : 0}/>
      <div className={styles['info']}>
          <h3 className={styles['warning-header']}>Warning</h3>
          <p>This user info can be found on path: 'bin/tasks'. Do not try to change user using file explorer, it can broke application.</p>
        </div>
        <button
          className='buttonRed'
          style={{
            margin: '5px auto',
            width: '325px',
            }}
            onClick={async()=> {
              setDeleteButtonState('loading')
              const res:any = await deleteTaskFetch(task)
              await handleDeleteResponse(res)
              setDeleteButtonState('default')
            }}
        >
          {deleteButtonState === 'loading' ? <LoadingDots size={6} /> : <>Delete Task</>}
      </button>
    </>
  )}, [active, progress])
}