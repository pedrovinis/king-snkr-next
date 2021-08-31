import Link from 'next/link'
import cn from 'classnames'
import { Task } from '@lib/types'
import styles from './tasks-grid.module.css'
import TaskIcon from '@components/icons/icon-task'
import { useState } from 'react'
import LinkIcon from './icons/icon-link'
import StartIcon from './icons/icon-start'
import PauseIcon from './icons/icon-pause'
import EditIcon from './icons/icon-edit'


function TaskCard({ task }: { task: Task }) {
  return (
    <Link key={task.name} href={`/task/${task.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card)}
      >
        <div className={styles.imageWrapper}>
        <TaskIcon size={'25'}/>
        </div>
          <div className={styles.cardBody}>
            <div>
              <h3 className={styles.name}><a className={styles.edition}>{task.name}</a></h3>
              <h3 className={styles.name}>{task.snkr.name} {task.snkr.edition} - {task.cfg.size}</h3>
            </div>
            <h4 className={styles.description}>{task.user.name} - {task.user.email}</h4>
          </div>
      </a>
    </Link>
  )
}

function TaskTable({ task, setSelected, selected }: { task: Task, setSelected: Function, selected:string }) {
  const isSelected = selected == task.name
  return (
    <>
    <tr 
    onClick={()=>setSelected(task.name)}
    className={cn({
      [styles.selected]: isSelected
    })}
    >
    
    <td>
      {task.user.name} <LinkIcon size={'15px'} fill={isSelected ? 'black' : 'white'}/>
    </td>
    <td>{task.snkr.name} {task.snkr.edition} - {task.cfg.size} </td>
    <td>{task.progress}</td>
    <td>
      Completed
    </td>
    <td>
      <StartIcon fill={isSelected ? 'black' : 'white'}/>
      <PauseIcon fill={isSelected ? 'black' : 'white'}/>
      <EditIcon fill={isSelected ? 'black' : 'white'}/>
    </td>
  </tr>
  </>
  )
}

type Props = {
  tasks: Task[]
}

export default function TasksGrid({ tasks }: Props) {
  const [selected, setSelected] = useState('')
  
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr>
            <td>Task</td>
            <td>User</td>
            <td>SNKR</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody className={styles.tBody}>
          {tasks.map((task)=> {
            return <TaskTable key={task.name} task={task} setSelected={setSelected} selected={selected}/>
          })}
        </tbody>
      </table>
    </>
  )
}
