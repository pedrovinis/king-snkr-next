import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import React, { useContext, useMemo, useState } from 'react'
import { deleteTaskFetch } from '@lib/task-api'
import LinkIcon from './icons/icon-link'
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
import SmsConfirmForm from './sms-confirm-from'
import ScheduleSidebar from './schedule-sidebar'


function TaskTable({ 
  task,
 }: { 
  task: Task
}) {
  const [isSelected, setIsSelected] = useState(false)
  const { tasks, startTask, stopTask } = useContext(TaskContext)

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
      <a className={styles.link} href={`user/${task.user.slug}`} target="_blank">
      <span>{task.user.name} <LinkIcon size={'15px'}/></span>
      </a>
    </td>
    <td>
      <a className={styles.snkrLink} href={`snkr/${task.snkr.slug}`} target="_blank">
      <SnkrIcon snkrName={task.snkr.name} size={'90px'}/> 
      <span>{task.snkr.name} {task.snkr.edition} {' '}<LinkIcon size={'15px'}/> </span>
      </a>
    </td>
    <td>
      {task.cfg?.size}
    </td>
    <td style={{width:'10rem'}}>
      <TaskProgress progress={active? tasks[task.name]?.progress : 0}/>
    </td>
    <td>
      <a 
      className={styles.action}
      onClick={async()=> {
        active ? stopTask(task) : startTask(task)
      }}
      >
        {active ? <StopIcon fill="var(--red)" size={'30px'}/> : <StartIcon fill="var(--green-dark)" size={'30px'}/>}
      </a>
      <Link href={`/task/${task.slug}`}>
      <a className={styles.action}><EditIcon size={'30px'}/></a>
      </Link>
      <a className={styles.action}
        onClick={async()=> {
          const res:any = await deleteTaskFetch(task)
          await handleDeleteResponse(res)
        }}
      ><DeleteIcon fill="var(--red)" size={'30px'}/></a>
    </td>
  </tr>
  </>
  )},[active, progress, isSelected])
}

type Props = {
  tasks: Task[]
}

export default function TasksGrid({ tasks }: Props) {
  return (
    <>
      {/* <SmsConfirmForm /> */}
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
            return <TaskTable key={task.name+i} task={task}/>
          })}
        </tbody>
      </table>
    </>
  )
}
