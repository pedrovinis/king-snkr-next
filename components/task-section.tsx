import { Task } from '@lib/types'
import styles from './task-section.module.css'
import { useContext, useEffect, useMemo, useState } from 'react'
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
import { PayLoadsContext } from './payloads-context'
import IconInfo from './icons/info-icon'

type Props = {
  task: Task
}

type ButtonState = 'default' | 'loading' | 'error'

export default function TaskSection({ task }: Props) {
  const [deleteButtonState, setDeleteButtonState] = useState<ButtonState>('default')
  const { startTask, stopTask, tasks, setTasks } = useContext(TaskContext)
  const payloads = useContext(PayLoadsContext)
  
  const active = tasks[task.name]?.active
  const progress = tasks[task.name]?.progress

  useEffect(() => {
    const obj:any = {}
    obj[task?.name] = task
    if(!tasks[task.name]) setTasks((prev:any) => ({...prev, ...obj}))
  },[])

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
      <div style={{alignSelf: 'center', margin:'0 1rem'}}>
        <TaskIcon />
        <h2 className={styles.name}>{task.name}</h2>
      </div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles['bio-header']}>SNKR</h2>
            <SnkrCard snkr={task.snkr} sizeDefault={task.cfg?.size?.value} sizeSelectDisabled={true}/>
          </div>
          <div className={styles.card}>
          <h2 className={styles['bio-header']}>User</h2>
            <UserCard user={task.user}/>
          </div>
        </div>
      <StepProgress steps={TASK_PROGRESS} progress={active? progress : 0}/>
      {payloads.loading ? (
          <span style={{alignSelf: 'center'}}><LoadingDots size={10}/></span>
        ) : (
          <>
          {payloads ? (
            <button className={cn({
              ["button"]: !active,
              ["buttonRed"]: active
            })}
              onClick={async()=> {
                active ? stopTask(task) : startTask(task)
              }}
            >
              {active ? <>{i18n.t('buttons.stop_task')}</> : <>{i18n.t('buttons.start_task')}</>}
            </button>
          ) : (
            <></>
          )}
          </>
        )}

      <div className={styles['info']}>
          <h3 className={styles['warning-header']}>Warning <IconInfo /></h3>
          <p>This user info can be found on path: 'bin/tasks'. Do not try to change user using file explorer, it can broke application.</p>
        </div>
        <button
          className='buttonRed'
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
  )}, [active, progress, payloads.loading])
}