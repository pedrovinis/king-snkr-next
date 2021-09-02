import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import TaskIcon from '@components/icons/icon-task'
import { useState } from 'react'
import LinkIcon from './icons/icon-link'
import StartIcon from './icons/icon-start'
import PauseIcon from './icons/icon-pause'
import EditIcon from './icons/icon-edit'
import SnkrIcon from './icons/icon-snkr'
import Link from 'next/link'
import TaskProgress from './task-progress'
import DeleteIcon from './icons/icon-delete'

function TaskTable({ task }: { task: Task }) {
  const [isSelected, setIsSelected] = useState(false)
  const [progress, setProgress] = useState(0)

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
        {task.user.name} <LinkIcon size={'15px'}/>
      </a>
    </td>
    <td>
      <a className={styles.snkrLink} href={`snkr/${task.snkr.slug}`} target="_blank">
      <SnkrIcon snkrName={task.snkr.name} size={'90px'}/> 
      {task.snkr.name} {task.snkr.edition} - {task.cfg.size}<LinkIcon size={'15px'}/>
      </a>
    </td>
    <td>
      <TaskProgress progress={task.progress}/>
    </td>
    <td>
      <a className={styles.action}><StartIcon size={'35px'}/></a>
      <a className={styles.action}><PauseIcon size={'35px'}/></a>
      <a className={styles.action}><EditIcon size={'35px'}/></a>
      <a className={styles.action}><DeleteIcon size={'35px'}/></a>
    </td>
  </tr>
  </>
  )
}

type Props = {
  tasks: Task[]
}

export default function TasksGrid({ tasks }: Props) {

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr>
            <td> </td>
            <td>Task</td>
            <td>User</td>
            <td>SNKR</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody className={styles.tBody}>
          {tasks.map((task, i)=> {
            return (
            <>
              <TaskTable key={task.name+i} task={task} />
            </>)
          })}
        </tbody>
      </table>
    </>
  )
}
