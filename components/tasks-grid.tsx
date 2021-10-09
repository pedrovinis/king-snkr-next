import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import { deleteTaskFetch } from '@lib/task-api'
import StartIcon from './icons/start-icon'
import EditIcon from './icons/edit-icon'
import SnkrIcon from './icons/snkr-icon'
import Link from 'next/link'
import TaskProgress from './task-progress'
import DeleteIcon from './icons/delete-icon'
import StopIcon from './icons/stop-icon'
import { TaskContext } from './task-context'
import router from 'next/router'
import { toast } from 'react-toastify'
import { PayLoadsContext } from './payloads-context'
import LoadingDots from './loading-dots'
import SmsConfirmForm from './sms-confirm-from'
import { SMS_CONFIRM_INDEX } from '@lib/constants'
import SearchBar from './search-bar'


function TaskRow({ task }: { task: Task }) {
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
      <Link  href={`sneaker/${task.snkr.slug}`}>
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
  const [searchValue, setSearchValue] = useState('')
  const fSearchValue = searchValue.toUpperCase().replace(/\s/g, '').replace(/\s/g, '').replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

  const filtredTASKS:ReactElement[] = []
  const usersInputs:ReactElement[] = []

  Object.keys(tasksCtx?.tasks)?.find( (taskName:string) => {
    const task = tasksCtx.tasks[taskName]
    if(task.running && task.progress == SMS_CONFIRM_INDEX) usersInputs.push(<SmsConfirmForm task={task}/>)
  })

  tasks.map((task, i) => {
    const fTaskName = task.name.toUpperCase().replace(/\s/g, '')
    const fTaskUserName = task.user.name.toUpperCase().replace(/\s/g, '')
    const fTaskSnkrName = (task.snkr.name + task.snkr.edition).toUpperCase().replace(/\s/g, '')
    if(
    fTaskName.search(fSearchValue)>=0
    || 
    fTaskUserName.search(fSearchValue)>=0
    || 
    fTaskSnkrName.search(fSearchValue)>=0
    ) {
      filtredTASKS.push(<TaskRow key={task.name+i} task={task} /> )
    }
  })

  return (
    <>
    {usersInputs.length ? (
      <div className={styles.userInput}>
        {usersInputs}
      </div>
    ) : (
      <></>
    )}

      {tasks.length > 1 ? ( 
      <SearchBar value={searchValue} setValue={setSearchValue}/>
      ) : (
        <></>
      )}

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
          {filtredTASKS}
          </tbody>
        </table>
      </div>
      {filtredTASKS.length == 0 ? (
        <div className={styles.notFoundMessage}>
          There are no tasks that match
          <a style={{color:'var(--brand)'}}> "{searchValue}" </a>
        </div>
        ): (
          <></>
        )}
    </>
  )
}
