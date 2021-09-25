import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { deleteTaskFetch } from '@lib/task-api'
import StartIcon from './icons/icon-start'
import EditIcon from './icons/icon-edit'
import SnkrIcon from './icons/icon-snkr'
import Link from 'next/link'
import TaskProgress from './task-progress'
import DeleteIcon from './icons/icon-delete'
import StopIcon from './icons/icon-stop'
import { TaskContext } from './task-context'
import router from 'next/router'
import { toast } from 'react-toastify'
import { PayLoadsContext } from './payloads-context'
import LoadingDots from './loading-dots'
import SmsConfirmForm from './sms-confirm-from'
import { SMS_CONFIRM_INDEX } from '@lib/constants'


function TaskTable({ task }: { task: Task }) {
  const [isSelected, setIsSelected] = useState(false)
  const { tasks, startTask, stopTask, setTasks } = useContext(TaskContext)
  const payloads = useContext(PayLoadsContext)

  const active = tasks[task.name]?.active
  const running = tasks[task.name]?.running
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

  useEffect(() => {
    const obj:any = {}
    obj[task?.name] = task
    if(!tasks[task.name]) setTasks((prev:any) => ({...prev, ...obj}))
  },[])


  return useMemo(() => {
  return (
    <>
    <tr className={cn({
      [styles.selected]: isSelected,
    })}>
    <td>
      <input 
      type="checkbox" 
      onClick={(e:any)=>{
        setIsSelected(e.target.checked)
      }}/>
    </td>
    <td>
      <Link href={`/task/${task.slug}`}><a className={styles.link}>{task.name}</a></Link>
    </td>
    <td> 
      <Link  href={`user/${task.user.slug}`}>
        <span className={styles.link}>{task.user.name} </span>
      </Link>
    </td>
    <td>
      <Link  href={`snkr/${task.snkr.slug}`}>
        <a className={styles.snkrLink}>
        <SnkrIcon snkrName={task.snkr.name} size={'90px'}/> 
        <span >{task.snkr.name} {task.snkr.edition}</span>
        </a>
      </Link>
    </td>
    <td style={{textAlign: 'center'}}>
      {task.cfg?.size?.value}
    </td>
    <td style={{width:'10rem'}}>
      <TaskProgress progress={running ? tasks[task.name]?.progress : 0}/>
    </td>
    <td>
      <div className={styles.actionsContainer}>
        {payloads.loading ? (
          <span className={styles.action}><LoadingDots size={5}/></span>
        ) : (
          <>
          {payloads.payloads ? (
             <a 
             className={styles.action}
             onClick={async()=> {
               !active && !running ? startTask(task) : stopTask(task)
             }}>
               {running && active ? <StopIcon fill="var(--red)" size={'30px'}/> : <StartIcon fill="var(--green-dark)" size={'30px'}/>}
             </a>
          ) : (
            <a className={styles.actionDisabled}>
              <StartIcon fill="gray" size={'30px'}/>
            </a>
          )}
          </>
        )}

      <Link href={`/task/${task.slug}`}>
      <a className={styles.action}><EditIcon size={'30px'}/></a>
      </Link>
      <a className={styles.action}
        onClick={async()=> {
          const res:any = await deleteTaskFetch(task)
          await handleDeleteResponse(res)
        }}
      ><DeleteIcon fill="var(--red)" size={'30px'}/></a>
      </div>
    </td>
  </tr>
  </>
  )},[active, running, progress, isSelected, payloads.loading])
}

type Props = {
  tasks: Task[]
}

export default function TasksGrid({ tasks }: Props) {
  const tasksCtx = useContext(TaskContext)

  return (
    <>
    <div className={styles.userInput}>
      {Object.keys(tasksCtx?.tasks)?.map( (taskName:string) => {
        const task = tasksCtx.tasks[taskName]
        if(task.running && task.progress == SMS_CONFIRM_INDEX) return <SmsConfirmForm task={task}/>
      })}
      
      </div>

      <div style={{alignSelf: 'center'}}>
        <div className={styles.tableOptions}>
          <div className={styles.allActionsContainer} >
            <a className={styles.action}><StartIcon fill="var(--green-dark)" size={'30px'}/></a>
            <a className={styles.action}><StopIcon fill="var(--red)" size={'30px'}/></a>
            <a className={styles.action}><EditIcon size={'30px'}/></a>
            <a className={styles.action}><DeleteIcon fill="var(--red)" size={'30px'}/></a>
          </div>
        </div>

        <table className={styles.table}>
          <thead className={styles.tHead}>
            <tr>
              <td> </td>
              <td>Task</td>
              <td>User</td>
              <td>SNKR</td>
              <td>Size</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className={styles.tBody}>
          {tasks.map((task, i)=> {
              return <TaskTable key={task.name+i} task={task} />
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
